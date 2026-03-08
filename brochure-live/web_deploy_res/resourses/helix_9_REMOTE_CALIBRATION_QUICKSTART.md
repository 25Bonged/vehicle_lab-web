# 🚀 Remote Calibration Quick Start

**Goal:** Get remote calibration working in 4 weeks

---

## Week 1: Cloud Gateway Foundation

### Step 1: Create Gateway Service Structure

```bash
mkdir -p backend/app/services/remote
touch backend/app/services/remote/__init__.py
touch backend/app/services/remote/xcp_gateway.py
touch backend/app/services/remote/vehicle_connection.py
```

### Step 2: Basic Vehicle Connection

```python
# backend/app/services/remote/vehicle_connection.py

import asyncio
import socket
from typing import Optional
from datetime import datetime

class VehicleConnection:
    """Manages TCP connection to remote vehicle"""
    
    def __init__(self, vehicle_id: str, host: str, port: int):
        self.vehicle_id = vehicle_id
        self.host = host
        self.port = port
        self.reader: Optional[asyncio.StreamReader] = None
        self.writer: Optional[asyncio.StreamWriter] = None
        self.connected = False
        self.last_heartbeat = datetime.now()
    
    async def connect(self) -> bool:
        """Establish TCP connection to vehicle"""
        try:
            self.reader, self.writer = await asyncio.open_connection(
                self.host, self.port
            )
            self.connected = True
            self.last_heartbeat = datetime.now()
            return True
        except Exception as e:
            print(f"Connection failed: {e}")
            self.connected = False
            return False
    
    async def send_command(self, command: bytes) -> bytes:
        """Send command and wait for response"""
        if not self.connected:
            raise ConnectionError("Not connected")
        
        # Send command
        self.writer.write(command)
        await self.writer.drain()
        
        # Wait for response (simple implementation)
        response = await self.reader.read(1024)
        return response
    
    async def disconnect(self):
        """Close connection"""
        if self.writer:
            self.writer.close()
            await self.writer.wait_closed()
        self.connected = False
    
    async def heartbeat(self):
        """Send heartbeat to check connection"""
        try:
            await self.send_command(b"PING")
            self.last_heartbeat = datetime.now()
            return True
        except:
            self.connected = False
            return False
```

---

### Step 3: XCP Gateway Service

```python
# backend/app/services/remote/xcp_gateway.py

from typing import Dict, Optional
from app.services.remote.vehicle_connection import VehicleConnection

class XCPGateway:
    """Cloud-based XCP gateway"""
    
    def __init__(self):
        self.vehicles: Dict[str, VehicleConnection] = {}
    
    async def connect_vehicle(self, vehicle_id: str, host: str, port: int = 5555) -> bool:
        """Connect to remote vehicle"""
        if vehicle_id in self.vehicles:
            # Already connected
            return self.vehicles[vehicle_id].connected
        
        conn = VehicleConnection(vehicle_id, host, port)
        success = await conn.connect()
        
        if success:
            self.vehicles[vehicle_id] = conn
            # Start heartbeat task
            asyncio.create_task(self._heartbeat_loop(vehicle_id))
        
        return success
    
    async def disconnect_vehicle(self, vehicle_id: str):
        """Disconnect vehicle"""
        if vehicle_id in self.vehicles:
            await self.vehicles[vehicle_id].disconnect()
            del self.vehicles[vehicle_id]
    
    async def send_xcp_command(self, vehicle_id: str, command: bytes) -> bytes:
        """Forward XCP command to vehicle"""
        if vehicle_id not in self.vehicles:
            raise ValueError(f"Vehicle {vehicle_id} not connected")
        
        conn = self.vehicles[vehicle_id]
        response = await conn.send_command(command)
        return response
    
    async def _heartbeat_loop(self, vehicle_id: str):
        """Maintain connection health"""
        while vehicle_id in self.vehicles:
            conn = self.vehicles[vehicle_id]
            if conn.connected:
                success = await conn.heartbeat()
                if not success:
                    # Try reconnect
                    await conn.connect()
            await asyncio.sleep(5)

# Global instance
xcp_gateway = XCPGateway()
```

---

### Step 4: Add FastAPI Endpoints

```python
# Add to backend/app/main.py

from fastapi import WebSocket
from app.services.remote.xcp_gateway import xcp_gateway

class VehicleConnectRequest(BaseModel):
    host: str
    port: int = 5555

@app.post("/remote/vehicles/{vehicle_id}/connect")
async def connect_vehicle(vehicle_id: str, req: VehicleConnectRequest):
    """Connect to remote vehicle"""
    success = await xcp_gateway.connect_vehicle(vehicle_id, req.host, req.port)
    return {"connected": success, "vehicle_id": vehicle_id}

@app.post("/remote/vehicles/{vehicle_id}/disconnect")
async def disconnect_vehicle(vehicle_id: str):
    """Disconnect from vehicle"""
    await xcp_gateway.disconnect_vehicle(vehicle_id)
    return {"disconnected": True}

@app.get("/remote/vehicles/{vehicle_id}/status")
async def get_vehicle_status(vehicle_id: str):
    """Get vehicle connection status"""
    if vehicle_id in xcp_gateway.vehicles:
        conn = xcp_gateway.vehicles[vehicle_id]
        return {
            "vehicle_id": vehicle_id,
            "connected": conn.connected,
            "host": conn.host,
            "port": conn.port,
            "last_heartbeat": conn.last_heartbeat.isoformat()
        }
    return {"vehicle_id": vehicle_id, "connected": False}

@app.post("/remote/vehicles/{vehicle_id}/xcp/command")
async def send_xcp_command(vehicle_id: str, command: bytes):
    """Send XCP command to vehicle"""
    response = await xcp_gateway.send_xcp_command(vehicle_id, command)
    return {"response": response.hex()}

@app.websocket("/remote/vehicles/{vehicle_id}/stream")
async def vehicle_stream(websocket: WebSocket, vehicle_id: str):
    """WebSocket stream for vehicle data"""
    await websocket.accept()
    
    if vehicle_id not in xcp_gateway.vehicles:
        await websocket.close(code=1008, reason="Vehicle not connected")
        return
    
    try:
        while True:
            # Stream data from vehicle
            # This is simplified - implement actual DAQ streaming
            await websocket.send_json({"timestamp": datetime.now().isoformat()})
            await asyncio.sleep(0.1)  # 10 Hz for testing
    except:
        await websocket.close()
```

---

## Week 2: Vehicle Agent

### Step 1: Create Vehicle Agent

```python
# vehicle_agent/agent.py

import asyncio
import socket
from typing import Optional

class VehicleAgent:
    """Vehicle-side agent for remote calibration"""
    
    def __init__(self, config: dict):
        self.config = config
        self.cloud_host = config['cloud_host']
        self.cloud_port = config['cloud_port']
        self.xetk_host = config.get('xetk_host', 'localhost')
        self.xetk_port = config.get('xetk_port', 5555)
        
        self.cloud_reader: Optional[asyncio.StreamReader] = None
        self.cloud_writer: Optional[asyncio.StreamWriter] = None
        self.xetk_reader: Optional[asyncio.StreamReader] = None
        self.xetk_writer: Optional[asyncio.StreamWriter] = None
        
        self.running = False
    
    async def start(self):
        """Start agent"""
        print("Starting vehicle agent...")
        
        # Connect to XETK (local)
        await self.connect_xetk()
        
        # Connect to cloud
        await self.connect_cloud()
        
        # Start command relay
        self.running = True
        await self.command_loop()
    
    async def connect_xetk(self):
        """Connect to XETK locally"""
        try:
            self.xetk_reader, self.xetk_writer = await asyncio.open_connection(
                self.xetk_host, self.xetk_port
            )
            print(f"Connected to XETK at {self.xetk_host}:{self.xetk_port}")
        except Exception as e:
            print(f"Failed to connect to XETK: {e}")
            raise
    
    async def connect_cloud(self):
        """Connect to HELIX cloud"""
        try:
            self.cloud_reader, self.cloud_writer = await asyncio.open_connection(
                self.cloud_host, self.cloud_port
            )
            print(f"Connected to cloud at {self.cloud_host}:{self.cloud_port}")
        except Exception as e:
            print(f"Failed to connect to cloud: {e}")
            raise
    
    async def command_loop(self):
        """Relay commands between cloud and XETK"""
        while self.running:
            try:
                # Read command from cloud
                command = await self.cloud_reader.read(1024)
                if not command:
                    break
                
                # Forward to XETK
                self.xetk_writer.write(command)
                await self.xetk_writer.drain()
                
                # Read response from XETK
                response = await self.xetk_reader.read(1024)
                
                # Send response to cloud
                self.cloud_writer.write(response)
                await self.cloud_writer.drain()
                
            except Exception as e:
                print(f"Error in command loop: {e}")
                await asyncio.sleep(1)
                # Try reconnect
                await self.connect_cloud()
                await self.connect_xetk()

if __name__ == "__main__":
    config = {
        'cloud_host': 'your-helix-server.com',
        'cloud_port': 5555,
        'xetk_host': 'localhost',
        'xetk_port': 5555
    }
    
    agent = VehicleAgent(config)
    try:
        asyncio.run(agent.start())
    except KeyboardInterrupt:
        print("Stopping agent...")
```

---

### Step 2: Agent Configuration

```yaml
# vehicle_agent/config.yaml

cloud:
  host: "your-helix-server.com"
  port: 5555
  vehicle_id: "vehicle-001"

xetk:
  host: "localhost"
  port: 5555

logging:
  level: "INFO"
  file: "agent.log"
```

---

## Week 3: Testing Locally

### Test Setup

1. **Start HELIX backend:**
```bash
cd backend
uvicorn app.main:app --reload
```

2. **Start vehicle agent (simulate):**
```bash
cd vehicle_agent
python agent.py
```

3. **Test connection:**
```bash
curl -X POST http://localhost:8000/remote/vehicles/test-vehicle/connect \
  -H "Content-Type: application/json" \
  -d '{"host": "localhost", "port": 5555}'
```

---

## Week 4: Real Vehicle Setup

### Option 1: Raspberry Pi

1. **Flash Raspberry Pi OS**
2. **Install Python 3.10+**
3. **Copy vehicle agent**
4. **Configure network (4G/5G router)**
5. **Auto-start agent on boot**

### Option 2: Laptop with Router

1. **Connect XETK to laptop**
2. **Connect laptop to 4G/5G router**
3. **Run vehicle agent**
4. **Configure port forwarding (if needed)**

---

## 🎯 Quick Test Checklist

- [ ] Cloud gateway accepts connections
- [ ] Vehicle agent connects to cloud
- [ ] Vehicle agent connects to XETK
- [ ] Commands forward correctly
- [ ] Responses return correctly
- [ ] Connection survives network interruption
- [ ] WebSocket streaming works

---

## 🚀 Next Steps After Quick Start

1. **Add XCP Protocol** (from XCP_IMPLEMENTATION.md)
2. **Add Security** (TLS, authentication)
3. **Add DAQ Streaming** (real-time data)
4. **Add Frontend UI** (browser interface)

---

**This gets you a working remote connection in 4 weeks.**

**Then add XCP protocol on top of it.**
