# 🌐 Remote Calibration Architecture for HELIX

**Status:** Design Phase  
**Priority:** CRITICAL  
**Goal:** Enable remote ECU calibration from any browser

---

## ✅ Reality Check

**Remote calibration WORKS. Period.**

Already proven by:
- OEMs (Germany → India track tuning)
- Racing teams (remote dyno operation)
- Test fleets (fleet vehicle tuning)
- EV startups (US → China vehicle tuning)

**HELIX can do this. Here's how.**

---

## 🏗️ Remote Calibration Architecture

### Current Setup (Local)

```
INCA → Ethernet → XETK → ECU
```

### HELIX Remote Setup

```
Engineer Browser (Anywhere)
    ↓ HTTPS/WSS
Cloud Server (HELIX)
    ↓ VPN/TCP
Vehicle Router (4G/5G)
    ↓ Ethernet
XETK → ECU
```

**Key:** HELIX acts as **XCP Master Proxy** in the cloud.

---

## 🔌 Architecture Components

### 1. Cloud XCP Gateway

**Location:** HELIX backend server

**Function:**
- Accepts XCP commands from browser
- Forwards to vehicle via TCP
- Manages multiple vehicle connections
- Handles reconnection logic

```
backend/app/services/remote/
├── __init__.py
├── xcp_gateway.py          # Main gateway service
├── vehicle_connection.py    # Per-vehicle connection manager
├── connection_pool.py       # Connection pool management
├── vpn_manager.py           # VPN tunnel management (optional)
└── security.py              # Security & authentication
```

---

### 2. Vehicle-Side Agent

**Location:** Vehicle (runs on router/edge device)

**Function:**
- Connects to XETK locally
- Maintains connection to HELIX cloud
- Forwards XCP traffic
- Handles local network issues

**Options:**
1. **Lightweight Python agent** (recommended)
2. **Docker container** (for edge devices)
3. **Raspberry Pi image** (pre-configured)

```
vehicle_agent/
├── agent.py                 # Main agent
├── xetk_adapter.py          # XETK interface
├── cloud_connector.py       # Connection to HELIX
└── config.yaml              # Configuration
```

---

### 3. WebSocket Streaming

**Function:**
- Real-time DAQ data from vehicle
- Low-latency bidirectional communication
- Handles network interruptions

**Implementation:**
- FastAPI WebSocket endpoint
- Vehicle agent → Cloud → Browser
- Buffer management for network jitter

---

## 📦 Implementation Plan

### Phase 1: Cloud XCP Gateway (Month 1)

#### Week 1-2: Core Gateway

```python
# backend/app/services/remote/xcp_gateway.py

class XCPGateway:
    """Cloud-based XCP gateway for remote calibration"""
    
    def __init__(self):
        self.vehicle_connections = {}  # vehicle_id -> VehicleConnection
        self.xcp_master = XCPMaster()  # From XCP implementation
    
    async def connect_vehicle(self, vehicle_id: str, config: dict) -> bool:
        """Connect to vehicle via TCP/VPN"""
        # 1. Establish TCP connection to vehicle agent
        # 2. Authenticate vehicle
        # 3. Create VehicleConnection
        # 4. Start heartbeat
        pass
    
    async def send_xcp_command(self, vehicle_id: str, command: XCPCommand) -> XCPResponse:
        """Forward XCP command to vehicle"""
        # 1. Get vehicle connection
        # 2. Send command via TCP
        # 3. Wait for response
        # 4. Return response
        pass
    
    async def start_daq_stream(self, vehicle_id: str, daq_config: dict):
        """Start DAQ streaming from vehicle"""
        # 1. Configure DAQ on vehicle
        # 2. Start streaming
        # 3. Forward to WebSocket clients
        pass
```

**Key Features:**
- TCP connection management
- Command forwarding
- Response handling
- Connection health monitoring

---

#### Week 3: Vehicle Connection Manager

```python
# backend/app/services/remote/vehicle_connection.py

class VehicleConnection:
    """Manages connection to single vehicle"""
    
    def __init__(self, vehicle_id: str, host: str, port: int):
        self.vehicle_id = vehicle_id
        self.host = host
        self.port = port
        self.tcp_conn = None
        self.connected = False
        self.last_heartbeat = None
        self.xcp_session = None
    
    async def connect(self) -> bool:
        """Establish TCP connection to vehicle"""
        # Connect to vehicle agent
        pass
    
    async def send_command(self, command: bytes) -> bytes:
        """Send XCP command and get response"""
        # Send command, wait for response
        pass
    
    async def heartbeat(self):
        """Maintain connection health"""
        # Periodic ping to vehicle
        pass
    
    async def reconnect(self):
        """Reconnect on failure"""
        # Automatic reconnection logic
        pass
```

---

#### Week 4: FastAPI Integration

```python
# backend/app/main.py (add these endpoints)

@app.post("/remote/vehicles/{vehicle_id}/connect")
async def connect_vehicle(vehicle_id: str, config: VehicleConfig):
    """Connect to remote vehicle"""
    success = await xcp_gateway.connect_vehicle(vehicle_id, config.dict())
    return {"connected": success}

@app.post("/remote/vehicles/{vehicle_id}/xcp/read")
async def remote_read_parameter(vehicle_id: str, req: ReadRequest):
    """Read parameter from remote vehicle"""
    result = await xcp_gateway.send_xcp_command(
        vehicle_id, 
        XCPCommand.read_memory(req.address, req.size)
    )
    return result

@app.post("/remote/vehicles/{vehicle_id}/xcp/write")
async def remote_write_parameter(vehicle_id: str, req: WriteRequest):
    """Write parameter to remote vehicle"""
    result = await xcp_gateway.send_xcp_command(
        vehicle_id,
        XCPCommand.write_memory(req.address, req.data)
    )
    return result

@app.websocket("/remote/vehicles/{vehicle_id}/stream")
async def remote_daq_stream(websocket: WebSocket, vehicle_id: str):
    """WebSocket stream for remote DAQ data"""
    await websocket.accept()
    await xcp_gateway.start_daq_stream(vehicle_id, websocket)
```

---

### Phase 2: Vehicle Agent (Month 2)

#### Week 1-2: Basic Agent

```python
# vehicle_agent/agent.py

import asyncio
import socket
from xetk_adapter import XETKAdapter

class VehicleAgent:
    """Vehicle-side agent for remote calibration"""
    
    def __init__(self, config):
        self.config = config
        self.xetk = XETKAdapter()
        self.cloud_conn = None
        self.running = False
    
    async def start(self):
        """Start agent"""
        # 1. Connect to XETK
        # 2. Connect to HELIX cloud
        # 3. Start command loop
        await self.xetk.connect()
        await self.connect_to_cloud()
        await self.command_loop()
    
    async def connect_to_cloud(self):
        """Connect to HELIX cloud server"""
        # TCP connection to HELIX backend
        self.cloud_conn = await asyncio.open_connection(
            self.config['cloud_host'],
            self.config['cloud_port']
        )
    
    async def command_loop(self):
        """Process commands from cloud"""
        while self.running:
            # 1. Receive command from cloud
            # 2. Forward to XETK
            # 3. Get response from XETK
            # 4. Send response to cloud
            pass
```

---

#### Week 3: XETK Integration

```python
# vehicle_agent/xetk_adapter.py

class XETKAdapter:
    """Interface to Vector XETK hardware"""
    
    def __init__(self):
        # Load Vector XETK library
        # Or use direct TCP to XETK
        pass
    
    async def connect(self):
        """Connect to XETK"""
        # Connect to XETK via local network
        pass
    
    async def send_xcp(self, command: bytes) -> bytes:
        """Send XCP command via XETK"""
        # Forward to XETK, get response
        pass
```

**Alternative:** If XETK supports TCP, connect directly:
```python
# XETK on vehicle network (e.g., 192.168.1.100:5555)
xetk_conn = await asyncio.open_connection('192.168.1.100', 5555)
```

---

#### Week 4: Deployment

**Option 1: Raspberry Pi Image**
- Pre-configured OS image
- Auto-connects to HELIX on boot
- Web UI for configuration

**Option 2: Docker Container**
- Run on any Linux device
- Easy deployment
- Auto-updates

**Option 3: Python Script**
- Simple Python script
- Run on laptop/router
- Manual start

---

### Phase 3: Security & VPN (Month 2-3)

#### Security Requirements

1. **Authentication**
   - Vehicle authentication (API keys)
   - User authentication (JWT)
   - Vehicle-user pairing

2. **Encryption**
   - TLS for cloud connection
   - Encrypted XCP commands (optional)
   - Secure WebSocket (WSS)

3. **Authorization**
   - RBAC for remote access
   - Vehicle access control
   - Audit logging

---

#### VPN Integration (Optional)

**For extra security:**

```python
# backend/app/services/remote/vpn_manager.py

class VPNManager:
    """Manage VPN tunnels to vehicles"""
    
    async def create_tunnel(self, vehicle_id: str) -> str:
        """Create VPN tunnel to vehicle"""
        # Use WireGuard, OpenVPN, or cloud VPN
        pass
```

**Options:**
- WireGuard (lightweight, fast)
- Cloud VPN (AWS/Azure)
- Tailscale (easy setup)

---

### Phase 4: Frontend Integration (Month 3)

#### Remote Vehicle Connection UI

```typescript
// frontend/src/components/RemoteVehicleConnection.tsx

export default function RemoteVehicleConnection() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    
    const connectVehicle = async (vehicleId: string) => {
        const response = await fetch(`/api/remote/vehicles/${vehicleId}/connect`, {
            method: 'POST',
            body: JSON.stringify({
                host: 'vehicle.example.com',
                port: 5555
            })
        });
        // Handle connection
    };
    
    return (
        <div>
            <VehicleList vehicles={vehicles} onSelect={setSelectedVehicle} />
            <ConnectionStatus vehicleId={selectedVehicle} />
            <CalibrationControls vehicleId={selectedVehicle} />
        </div>
    );
}
```

---

#### Real-time Streaming UI

```typescript
// frontend/src/components/RemoteDAQStream.tsx

export default function RemoteDAQStream({ vehicleId }: { vehicleId: string }) {
    const [data, setData] = useState<DAQData[]>([]);
    
    useEffect(() => {
        const ws = new WebSocket(`wss://api.helix.com/remote/vehicles/${vehicleId}/stream`);
        
        ws.onmessage = (event) => {
            const daqData = JSON.parse(event.data);
            setData(prev => [...prev, daqData]);
        };
        
        return () => ws.close();
    }, [vehicleId]);
    
    return <RealTimeGraph data={data} />;
}
```

---

## 🔧 Technical Implementation Details

### Network Architecture

```
┌─────────────────────────────────────────┐
│         HELIX Cloud Server              │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │      XCP Gateway                 │  │
│  │  - Connection Pool              │  │
│  │  - Command Forwarding           │  │
│  │  - WebSocket Streaming          │  │
│  └──────────────────────────────────┘  │
│              ↕ TCP/TLS                  │
└─────────────────────────────────────────┘
              ↕ Internet
┌─────────────────────────────────────────┐
│      Vehicle Router (4G/5G)             │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │      Vehicle Agent              │  │
│  │  - Cloud Connection             │  │
│  │  - XETK Interface               │  │
│  │  - Command Relay                │  │
│  └──────────────────────────────────┘  │
│              ↕ Ethernet                 │
└─────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────┐
│         XETK → ECU                     │
└─────────────────────────────────────────┘
```

---

### Latency Handling

**Typical Latencies:**
- Local network: 1-5ms
- 4G: 30-80ms
- 5G: 10-30ms
- Internet: 50-150ms
- **Total: 80-250ms**

**Impact on Calibration:**
- ✅ Parameter read/write: Works fine
- ✅ Map tuning: Works fine
- ✅ DAQ streaming: Works fine (with buffering)
- ⚠️ Flashing: Careful (use confirmation)
- ⚠️ Bypass control: Latency sensitive

**Solution:**
- Command batching
- Async operations
- Progress indicators
- Confirmation dialogs for critical operations

---

### Connection Resilience

**Challenges:**
- Network interruptions
- Vehicle power cycles
- Router reboots
- Internet outages

**Solutions:**

```python
class VehicleConnection:
    async def maintain_connection(self):
        """Maintain connection with auto-reconnect"""
        while True:
            try:
                if not self.connected:
                    await self.connect()
                await self.heartbeat()
                await asyncio.sleep(5)
            except Exception as e:
                logger.error(f"Connection error: {e}")
                await self.reconnect()
                await asyncio.sleep(10)
```

---

## 🚀 Deployment Options

### Option 1: Cloud-Only (SaaS)

**Setup:**
- HELIX runs in cloud (AWS/Azure/GCP)
- Vehicle agent connects to cloud
- No VPN needed (TLS encryption)

**Pros:**
- Easy setup
- No infrastructure
- Auto-scaling

**Cons:**
- Requires public IP or port forwarding
- Latency depends on internet

---

### Option 2: Hybrid (Cloud + VPN)

**Setup:**
- HELIX in cloud
- VPN tunnel to vehicle
- More secure

**Pros:**
- More secure
- Lower latency (if VPN optimized)
- Private network

**Cons:**
- More complex setup
- VPN management overhead

---

### Option 3: On-Premise Gateway

**Setup:**
- HELIX gateway on customer network
- Vehicle connects locally
- Cloud for management only

**Pros:**
- Lowest latency
- Most secure
- No internet dependency

**Cons:**
- Requires on-premise infrastructure
- More complex deployment

---

## 📋 Implementation Checklist

### Phase 1: Cloud Gateway (Month 1)

- [ ] XCP Gateway service
- [ ] Vehicle connection manager
- [ ] TCP connection handling
- [ ] Command forwarding
- [ ] FastAPI endpoints
- [ ] Unit tests

### Phase 2: Vehicle Agent (Month 2)

- [ ] Vehicle agent core
- [ ] XETK adapter
- [ ] Cloud connector
- [ ] Command relay
- [ ] Deployment package
- [ ] Documentation

### Phase 3: Security (Month 2-3)

- [ ] Authentication
- [ ] Encryption (TLS)
- [ ] Authorization
- [ ] Audit logging
- [ ] VPN integration (optional)

### Phase 4: Frontend (Month 3)

- [ ] Vehicle connection UI
- [ ] Connection status
- [ ] Remote calibration controls
- [ ] Real-time streaming UI
- [ ] Error handling

---

## 🧪 Testing Strategy

### Unit Tests

- XCP Gateway command forwarding
- Vehicle connection management
- Reconnection logic
- Error handling

### Integration Tests

- End-to-end: Browser → Cloud → Vehicle → ECU
- Network interruption simulation
- Latency simulation
- Multiple vehicle connections

### Real-World Tests

- Test with real vehicle
- Test with 4G/5G router
- Test from different locations
- Test with various network conditions

---

## ⚠️ Challenges & Solutions

### Challenge 1: Network Latency

**Problem:** 80-250ms latency affects UX

**Solution:**
- Async operations with progress indicators
- Command batching
- Optimistic UI updates
- Clear feedback on operations

---

### Challenge 2: Connection Stability

**Problem:** Network interruptions break connection

**Solution:**
- Auto-reconnection
- Connection health monitoring
- Command queuing during disconnection
- Graceful degradation

---

### Challenge 3: Security

**Problem:** Exposing ECU to internet

**Solution:**
- TLS encryption
- Authentication & authorization
- VPN option
- Audit logging
- Rate limiting

---

### Challenge 4: Vehicle Setup

**Problem:** Need router/agent on vehicle

**Solution:**
- Pre-configured Raspberry Pi image
- Docker container
- Simple Python script
- Auto-connect on boot

---

## 🎯 Success Criteria

### Phase 1 Complete

- ✅ Can connect to remote vehicle
- ✅ Can read parameters remotely
- ✅ Can write parameters remotely
- ✅ Connection is stable

### Phase 2 Complete

- ✅ Real-time DAQ streaming works
- ✅ Multiple vehicles supported
- ✅ Security implemented
- ✅ Production-ready

---

## 📚 Next Steps

1. **Start with Cloud Gateway** (Week 1)
   - Implement XCP Gateway service
   - Test with local vehicle first

2. **Build Vehicle Agent** (Week 3)
   - Simple Python agent
   - Test with XETK

3. **Integrate** (Week 5)
   - Connect cloud to vehicle
   - Test end-to-end

4. **Deploy** (Week 6+)
   - Deploy to production
   - Test with real vehicle

---

**Status:** Ready to implement  
**Estimated Time:** 2-3 months  
**Priority:** CRITICAL (enables core value proposition)

---

## 💡 Key Insight

**Remote calibration is NOT the hard part.**

The hard part is:
1. ✅ XCP Master (already planned)
2. ✅ Real-time streaming (already planned)
3. ✅ Cloud gateway (this document)

**Once you have XCP working locally, remote is just adding a TCP proxy.**

**You're closer than you think. 🚀**
