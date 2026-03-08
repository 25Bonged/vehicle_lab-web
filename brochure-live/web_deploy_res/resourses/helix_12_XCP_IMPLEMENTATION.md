# 🔌 XCP Implementation Plan

**Status:** Not Started  
**Priority:** CRITICAL  
**Estimated Time:** 3-4 months

---

## 🎯 Objective

Implement a complete XCP (Universal Calibration Protocol) master layer to enable HELIX to communicate with ECUs for calibration and measurement.

---

## 📚 XCP Protocol Overview

**XCP (ASAM MCD-1 XCP)** is the standard protocol for:
- Reading/writing ECU memory
- Data acquisition (DAQ)
- Calibration parameter access
- Flash programming

**Transport Layers:**
- TCP/IP (Ethernet)
- UDP/IP
- CAN
- FlexRay

**For HELIX:** Start with **TCP/IP** (most common for modern ECUs).

---

## 🏗️ Architecture Design

### Component Structure

```
backend/app/services/xcp/
├── __init__.py
├── xcp_master.py          # Main XCP master class
├── xcp_protocol.py         # Protocol encoding/decoding
├── xcp_transport.py        # Transport layer abstraction
├── xcp_daq.py              # Data acquisition
├── xcp_calibration.py      # Calibration read/write
├── xcp_errors.py           # Error handling
└── xcp_types.py            # Type definitions
```

---

## 📦 Implementation Details

### 1. XCP Protocol Layer (`xcp_protocol.py`)

**Responsibilities:**
- Encode XCP commands
- Decode XCP responses
- Handle protocol-level errors
- Validate packet structure

**Key Functions:**
```python
def encode_command(cmd: XCPCommand) -> bytes
def decode_response(data: bytes) -> XCPResponse
def calculate_checksum(packet: bytes) -> int
def validate_packet(packet: bytes) -> bool
```

**XCP Commands to Implement:**
- `CONNECT` - Connect to ECU
- `DISCONNECT` - Disconnect from ECU
- `GET_STATUS` - Get ECU status
- `SYNCH` - Synchronize
- `GET_COMM_MODE_INFO` - Get communication info
- `GET_ID` - Get ECU identification
- `SET_REQUEST` - Set DAQ list
- `GET_DAQ_PROCESSOR_INFO` - Get DAQ info
- `GET_DAQ_RESOLUTION_INFO` - Get DAQ resolution
- `GET_DAQ_LIST_INFO` - Get DAQ list info
- `FREE_DAQ` - Free DAQ list
- `ALLOC_DAQ` - Allocate DAQ list
- `ALLOC_ODT` - Allocate ODT
- `ALLOC_ODT_ENTRY` - Allocate ODT entry
- `WRITE_DAQ` - Write DAQ list
- `SET_DAQ_PTR` - Set DAQ pointer
- `WRITE_DAQ_MULTIPLE` - Write multiple DAQ entries
- `READ_DAQ` - Read DAQ data
- `GET_DAQ_CLOCK` - Get DAQ clock
- `READ_DAQ` - Read DAQ data
- `START_STOP_DAQ_LIST` - Start/stop DAQ
- `START_STOP_SYNCH` - Start/stop synchronized
- `DOWNLOAD` - Download data to ECU
- `DOWNLOAD_NEXT` - Download next block
- `DOWNLOAD_MAX` - Get max download size
- `SHORT_UP` - Short upload
- `UPLOAD` - Upload data from ECU
- `BUILD_CHECKSUM` - Build checksum
- `SHORT_DOWNLOAD` - Short download
- `MODIFY_BITS` - Modify bits
- `SET_CAL_PAGE` - Set calibration page
- `GET_CAL_PAGE` - Get calibration page
- `GET_PAG_PROCESSOR_INFO` - Get page processor info
- `GET_SEGMENT_INFO` - Get segment info
- `GET_PAGE_INFO` - Get page info
- `SET_SEGMENT_MODE` - Set segment mode
- `GET_SEGMENT_MODE` - Get segment mode
- `COPY_CAL_PAGE` - Copy calibration page
- `CLEAR_DAQ_LIST` - Clear DAQ list
- `GET_DAQ_EVENT_INFO` - Get DAQ event info
- `FREE_DAQ_LIST` - Free DAQ list
- `GET_DAQ_LIST_INFO` - Get DAQ list info
- `GET_DAQ_LIST_MODE` - Get DAQ list mode
- `SET_DAQ_LIST_MODE` - Set DAQ list mode
```

---

### 2. Transport Layer (`xcp_transport.py`)

**Responsibilities:**
- TCP/IP connection management
- Packet sending/receiving
- Connection state management
- Timeout handling

**Implementation:**
```python
class XCPTransport:
    def connect(self, host: str, port: int) -> bool
    def disconnect(self) -> None
    def send(self, data: bytes) -> None
    def receive(self, timeout: float = 1.0) -> bytes
    def is_connected(self) -> bool
```

**TCP Transport:**
- Default port: 5555 (XCP standard)
- Connection timeout: 5 seconds
- Read timeout: 1 second
- Keep-alive: Enabled

---

### 3. XCP Master (`xcp_master.py`)

**Main Interface for XCP Operations**

```python
class XCPMaster:
    def __init__(self, transport: XCPTransport):
        self.transport = transport
        self.session_id = None
        self.connected = False
    
    async def connect(self, host: str, port: int = 5555) -> bool:
        """Connect to ECU via XCP"""
        pass
    
    async def disconnect(self) -> None:
        """Disconnect from ECU"""
        pass
    
    async def get_status(self) -> dict:
        """Get ECU status"""
        pass
    
    async def read_memory(self, address: int, size: int) -> bytes:
        """Read memory from ECU"""
        pass
    
    async def write_memory(self, address: int, data: bytes) -> bool:
        """Write memory to ECU"""
        pass
    
    async def short_upload(self, address: int, size: int) -> bytes:
        """Short upload (1-8 bytes)"""
        pass
    
    async def short_download(self, address: int, data: bytes) -> bool:
        """Short download (1-8 bytes)"""
        pass
```

---

### 4. Data Acquisition (`xcp_daq.py`)

**DAQ Implementation for Real-time Measurement**

```python
class XCPDAQ:
    def __init__(self, master: XCPMaster):
        self.master = master
        self.daq_lists = {}
        self.running = False
    
    async def allocate_daq_list(self, event_channel: int) -> int:
        """Allocate DAQ list"""
        pass
    
    async def allocate_odt(self, daq_list: int, odt_count: int) -> list:
        """Allocate ODTs"""
        pass
    
    async def allocate_odt_entry(self, odt: int, address: int, size: int) -> int:
        """Allocate ODT entry"""
        pass
    
    async def write_daq_list(self, daq_list: int) -> bool:
        """Write DAQ list configuration"""
        pass
    
    async def start_daq(self, daq_list: int) -> bool:
        """Start DAQ list"""
        pass
    
    async def stop_daq(self, daq_list: int) -> bool:
        """Stop DAQ list"""
        pass
    
    async def read_daq_data(self, daq_list: int) -> bytes:
        """Read DAQ data"""
        pass
```

---

### 5. Calibration Interface (`xcp_calibration.py`)

**High-level Calibration Operations**

```python
class XCPCalibration:
    def __init__(self, master: XCPMaster, a2l_parser: A2LParser):
        self.master = master
        self.a2l = a2l_parser
    
    async def read_parameter(self, name: str) -> float:
        """Read calibration parameter by name"""
        # 1. Look up parameter in A2L
        # 2. Get address from A2L
        # 3. Read memory via XCP
        # 4. Apply conversion from A2L
        # 5. Return physical value
        pass
    
    async def write_parameter(self, name: str, value: float) -> bool:
        """Write calibration parameter by name"""
        # 1. Look up parameter in A2L
        # 2. Get address and conversion
        # 3. Convert physical value to raw
        # 4. Write memory via XCP
        # 5. Verify write
        pass
    
    async def read_map(self, name: str) -> np.ndarray:
        """Read calibration map"""
        pass
    
    async def write_map(self, name: str, data: np.ndarray) -> bool:
        """Write calibration map"""
        pass
```

---

## 🔌 ECU Connection Integration

### XETK Adapter (Vector Hardware)

**If using Vector XETK hardware:**

```python
class XETKAdapter:
    """Adapter for Vector XETK hardware"""
    
    def __init__(self):
        # Load Vector XETK DLL/SO
        pass
    
    def connect(self, device_name: str) -> bool:
        """Connect to XETK device"""
        pass
    
    def send_xcp(self, data: bytes) -> bytes:
        """Send XCP via XETK"""
        pass
```

**Dependencies:**
- Vector XETK SDK
- Vector CANoe/CANape (for XETK driver)

---

### Direct TCP Connection

**For ECUs with direct TCP support:**

```python
class DirectTCPTransport(XCPTransport):
    """Direct TCP connection to ECU"""
    
    def connect(self, host: str, port: int = 5555) -> bool:
        """Connect directly to ECU"""
        # Most modern ECUs support XCP over TCP
        pass
```

**Common ECU TCP Ports:**
- 5555 (XCP standard)
- 5556 (alternate)
- 5557 (alternate)

---

## 🧪 Testing Strategy

### Unit Tests

1. **Protocol Tests**
   - Command encoding/decoding
   - Checksum calculation
   - Error handling

2. **Transport Tests**
   - Connection/disconnection
   - Timeout handling
   - Packet fragmentation

### Integration Tests

1. **ECU Simulator**
   - Use XCP simulator (Vector CANoe, ETAS INCA)
   - Test against real ECU (if available)

2. **End-to-End Tests**
   - Connect → Read → Write → Verify
   - DAQ start → Stream → Stop

---

## 📋 Implementation Checklist

### Phase 1: Protocol Foundation (2 weeks)

- [ ] Implement XCP packet encoding/decoding
- [ ] Implement basic commands (CONNECT, DISCONNECT, GET_STATUS)
- [ ] Implement error handling
- [ ] Unit tests for protocol layer

### Phase 2: Transport Layer (1 week)

- [ ] Implement TCP transport
- [ ] Connection management
- [ ] Timeout handling
- [ ] Unit tests for transport

### Phase 3: Basic Operations (2 weeks)

- [ ] Implement memory read/write
- [ ] Implement SHORT_UPLOAD/SHORT_DOWNLOAD
- [ ] Integration with A2L parser
- [ ] End-to-end read/write tests

### Phase 4: Data Acquisition (3 weeks)

- [ ] Implement DAQ list allocation
- [ ] Implement ODT allocation
- [ ] Implement DAQ start/stop
- [ ] Implement DAQ data reading
- [ ] Integration tests with simulator

### Phase 5: Calibration Interface (2 weeks)

- [ ] High-level parameter read/write
- [ ] Map read/write
- [ ] A2L integration
- [ ] Validation and error handling

### Phase 6: Integration (1 week)

- [ ] FastAPI endpoints
- [ ] WebSocket streaming integration
- [ ] Frontend integration
- [ ] Documentation

---

## 📚 Resources

### Documentation

- ASAM XCP 1.5.0 Specification
- Vector XETK Documentation
- ETAS INCA XCP Guide

### Libraries (Consider)

- `pyxcp` - Python XCP library (if available)
- Custom implementation (recommended for full control)

### Tools

- Vector CANoe (XCP simulator)
- ETAS INCA (XCP simulator)
- Wireshark (packet capture for debugging)

---

## ⚠️ Challenges

1. **ECU Compatibility**
   - Different ECUs may have XCP variations
   - Need to handle protocol differences

2. **Performance**
   - XCP commands must be fast (< 5ms)
   - DAQ streaming must handle high frequency

3. **Error Handling**
   - Network errors
   - ECU errors
   - Timeout handling

4. **Hardware Requirements**
   - XETK hardware (if using Vector)
   - Or direct TCP access to ECU

---

## 🚀 Next Steps

1. **Research XCP Protocol**
   - Read ASAM XCP specification
   - Study existing implementations

2. **Set Up Test Environment**
   - Get XCP simulator (CANoe/INCA)
   - Or access to test ECU

3. **Start Implementation**
   - Begin with protocol layer
   - Test incrementally

4. **Integrate with HELIX**
   - Add FastAPI endpoints
   - Connect to WebSocket streaming
   - Update frontend

---

**Status:** Ready to implement  
**Blockers:** None (if test ECU/simulator available)  
**Estimated Completion:** 3-4 months
