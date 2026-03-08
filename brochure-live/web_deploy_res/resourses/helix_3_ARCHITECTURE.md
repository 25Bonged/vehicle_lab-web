# 🏗️ HELIX Architecture Documentation

**Version:** 2.0.0  
**Last Updated:** 2026-02-06  
**Status:** Foundation Complete | Real-time Layer Missing

---

## 📋 Executive Summary

HELIX is a **web-based ECU calibration platform** designed to compete with Vector INCA, ETAS, and CANape. The current implementation provides a **solid data management foundation** but is **missing critical real-time calibration capabilities**.

### Current State: ✅ vs ❌

| Component | Status | Notes |
|-----------|--------|-------|
| **Backend API (FastAPI)** | ✅ Complete | RESTful API with full vCDM feature set |
| **A2L Parser** | ⚠️ Basic | Regex-based, not full ASAM MCD-2 MC compliant |
| **HEX Parser/Generator** | ✅ Complete | Intel HEX format support |
| **Variant Management | ✅ Complete | Full variant tree with workflow |
| **Work Package System** | ✅ Complete | Full vCDM workflow |
| **RBAC** | ✅ Complete | Role-based access control |
| **DCM Import/Export** | ✅ Complete | DCM file handling |
| **Project Lifecycle** | ✅ Complete | Phase-based calibration projects |
| **Validation Engine** | ✅ Complete | Test suites and validation |
| **Frontend UI** | ✅ Complete | Next.js dashboard with widgets |
| **XCP Master Layer** | ⚠️ Partial | TCP/UDP implemented, CAN missing |
| **Real-time Streaming** | ❌ **MISSING** | **CRITICAL - No WebSocket router found** |
| **ECU Connection** | ⚠️ Partial | TCP/UDP transport exists, Hardware abstraction missing |
| **Full A2L Engine** | ⚠️ Partial | Regex-based, needs full ASAM compliance |

---

## 🎯 System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    HELIX Platform                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   Frontend   │◄────────►│   Backend    │                │
│  │  (Next.js)   │  REST    │  (FastAPI)   │                │
│  └──────────────┘          └──────────────┘                │
│                                    │                        │
│                                    ▼                        │
│                          ┌──────────────┐                  │
│                          │   Database   │                  │
│                          │ (SQLAlchemy) │                  │
│                          └──────────────┘                  │
│                                                              │
│  ┌──────────────────────────────────────────────┐          │
│  │         REAL-TIME LAYER (PARTIAL)            │          │
│  │                                              │          │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │          │
│  │  │   XCP    │  │ WebSocket│  │   ECU    │  │          │
│  │  │  Master  │  │ Streaming│  │ Connect  │  │          │
│  │  │ [TCP/UDP]│  │   [❌]   │  │ [Partial]│  │          │
│  │  └──────────┘  └──────────┘  └──────────┘  │          │
│  └──────────────────────────────────────────────┘          │

│                                    │                        │
│                                    ▼                        │
│                          ┌──────────────┐                  │
│                          │     ECU      │                  │
│                          │  (Vehicle)   │                  │
│                          └──────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Current Implementation

### 1. Backend Services (`backend/app/services/`)

#### ✅ Implemented Services

**`a2l_parser.py`**
- Basic A2L file parsing using regex
- Extracts characteristics, measurements, compu_methods
- **Limitation:** Not full ASAM MCD-2 MC compliant
- **Missing:** Full axis parsing, complex structures, memory segments

**`hex_parser.py` / `HexGenerator`**
- Intel HEX format parser
- Memory map generation
- HEX file generation from calibration data
- **Status:** Production-ready

**`variant_manager.py`**
- Full variant tree management
- Workflow state transitions
- Variant comparison
- Freeze/unfreeze functionality

**`workpackage_manager.py`**
- Work package creation and management
- Parameter change tracking
- Status transitions
- Comments and permissions

**`rbac.py`**
- Role-based access control
- User management
- Permission checking
- Department-based access

**`dcm_handler.py`**
- DCM file import/export
- Parameter extraction
- Format conversion

**`project_lifecycle.py`**
- Phase-based calibration projects
- Timeline tracking
- DCM generation per phase
- HEX merging

**`validation_service.py`**
- Test suite management
- Parameter validation
- Compliance checking

**`report_generator.py`**
- HTML/CSV/JSON report generation
- Parameter reports
- Work package reports
- Compliance reports

---

### 2. Frontend (`frontend/`)

**Technology Stack:**
- Next.js 14+ (React)
- TypeScript
- Tailwind CSS
- Three.js (for 3D visualizations)

**Components:**
- `XCPVisualizerWidget.tsx` - **MOCK DATA ONLY** (no real XCP)
- `CalibrationMapWidget.tsx` - Map visualization (static data)
- `AIPilotWidget.tsx` - AI suggestions (placeholder)
- `VariantTreeWidget.tsx` - Variant tree UI
- `ComplianceWidget.tsx` - Standards compliance
- `HistoryWidget.tsx` - Project history

**Status:** UI is complete but **not connected to real ECU data**.

---

### 3. Database (`backend/app/database.py`)

- SQLAlchemy ORM
- SQLite (development)
- Models for variants, work packages, users, projects

---

## ❌ Missing Critical Components

### 1. XCP Master Layer ⚠️ **CRITICAL**

**What's Missing:**
- No XCP protocol implementation
- No ECU memory read/write
- No DAQ (Data Acquisition) capability
- No calibration parameter writing

**Required Implementation:**

```
backend/app/services/xcp/
├── __init__.py
├── xcp_master.py          # XCP master implementation
├── xcp_protocol.py         # XCP packet encoding/decoding
├── xcp_transport.py        # Transport layer (TCP/UDP/CAN)
├── xcp_daq.py              # Data acquisition
└── xcp_calibration.py      # Calibration read/write
```

**Dependencies Needed:**
- `pyxcp` or custom XCP stack
- ASAM XCP 1.5.0 protocol implementation

**Functionality Required:**
- Connect to ECU via XCP
- Read calibration parameters from ECU memory
- Write calibration parameters to ECU
- Start/stop DAQ lists
- Handle XCP errors and timeouts

---

### 2. Real-time Streaming Engine ⚠️ **CRITICAL**

**What's Missing:**
- No WebSocket server
- No real-time data streaming
- No DAQ data buffering
- No live graph updates

**Required Implementation:**

```
backend/app/services/streaming/
├── __init__.py
├── websocket_server.py     # FastAPI WebSocket endpoint
├── daq_manager.py          # DAQ list management
├── stream_buffer.py        # Circular buffer for DAQ data
└── signal_processor.py    # Signal scaling/conversion
```

**Dependencies Needed:**
- `websockets` or FastAPI WebSocket support
- Async data processing

**Functionality Required:**
- WebSocket endpoint for frontend connection
- Stream DAQ data at 50-100 Hz
- Buffer management for high-frequency data
- Signal scaling using A2L conversion methods
- Multiple client support

---

### 3. ECU Connection Layer ⚠️ **CRITICAL**

**What's Missing:**
- No XETK (Vector hardware) connection
- No TCP/UDP transport to ECU
- No connection management
- No hardware abstraction

**Required Implementation:**

```
backend/app/services/ecu/
├── __init__.py
├── ecu_connection.py       # Connection manager
├── xetk_adapter.py         # Vector XETK interface
├── transport_tcp.py         # TCP transport
├── transport_udp.py         # UDP transport
└── transport_can.py         # CAN transport (future)
```

**Dependencies Needed:**
- Vector XETK SDK (if using Vector hardware)
- Or custom TCP/UDP stack for direct ECU connection

**Functionality Required:**
- Connect to ECU via XETK or direct TCP
- Handle connection lifecycle
- Reconnection logic
- Connection status monitoring
- Multiple ECU support

---

### 4. Enhanced A2L Parser ⚠️ **IMPORTANT**

**Current Limitations:**
- Basic regex parsing (not robust)
- Missing axis definitions
- Missing memory segments
- Missing complex structures
- No full ASAM compliance

**Required Enhancement:**
- Full ASAM MCD-2 MC parser
- Parse all A2L blocks:
  - CHARACTERISTIC (with full axis support)
  - MEASUREMENT
  - COMPU_METHOD
  - MEMORY_SEGMENT
  - MODULE
  - PROJECT
- Support for MAP, CURVE, CUBOID structures
- Proper conversion method evaluation

**Options:**
1. Use `pya2l` library (commented in requirements.txt)
2. Build custom full parser
3. Use ASAM-compliant parser library

---

### 5. Calibration Engine ⚠️ **IMPORTANT**

**What's Missing:**
- No direct ECU memory writing
- No calibration map editing with live preview
- No parameter validation before write
- No rollback capability

**Required Implementation:**

```
backend/app/services/calibration/
├── __init__.py
├── calibration_engine.py   # Main calibration logic
├── map_editor.py            # Map editing with validation
├── parameter_writer.py      # Write to ECU via XCP
└── rollback_manager.py      # Undo/redo capability
```

**Functionality Required:**
- Edit calibration maps in browser
- Validate parameter ranges (from A2L)
- Write to ECU memory via XCP
- Read back for verification
- Support undo/redo
- Version control integration

---

## 🔌 Integration Points

### Current Flow (Data Management Only)

```
User → Frontend → FastAPI → Database
                    ↓
              A2L/HEX Parser
                    ↓
              Variant Manager
```

### Required Flow (Full Calibration)

```
User → Frontend → FastAPI → Database
                    ↓
              A2L Parser (enhanced)
                    ↓
              XCP Master ←→ ECU Connection
                    ↓
              Real-time Streaming → WebSocket → Frontend
                    ↓
              Calibration Engine → XCP Write → ECU
```

---

## 🗄️ Data Flow

### 1. A2L Ingestion Flow

```
A2L File Upload
    ↓
A2L Parser (basic)
    ↓
Extract Characteristics/Measurements
    ↓
Store in Database
    ↓
Frontend Display
```

**Missing:** Full axis parsing, memory segments, complex structures

---

### 2. Calibration Read Flow (NOT IMPLEMENTED)

```
User Request Parameter
    ↓
XCP Master (MISSING)
    ↓
ECU Connection (MISSING)
    ↓
Read from ECU Memory
    ↓
Apply A2L Conversion
    ↓
Stream via WebSocket (MISSING)
    ↓
Frontend Display
```

---

### 3. Calibration Write Flow (NOT IMPLEMENTED)

```
User Edits Map
    ↓
Validate (A2L limits)
    ↓
Calibration Engine (MISSING)
    ↓
XCP Master Write (MISSING)
    ↓
ECU Connection (MISSING)
    ↓
Write to ECU Memory
    ↓
Verify Write
    ↓
Update Database
```

---

## 🔐 Security & Access Control

**Current Implementation:**
- ✅ RBAC system
- ✅ User roles (Admin, Calibrator, Viewer)
- ✅ Work package permissions
- ✅ Parameter-level access control

**Missing:**
- ECU connection authentication
- Secure XCP session management
- Audit logging for calibration writes
- Encryption for calibration data in transit

---

## 📊 Performance Requirements

### Current System
- REST API: ✅ Handles file uploads, database queries
- Frontend: ✅ Responsive UI

### Required for Real-time
- **DAQ Streaming:** 50-100 Hz signals
- **WebSocket:** Low latency (< 10ms)
- **XCP Communication:** < 5ms per command
- **Buffer Management:** Handle 1000+ signals simultaneously

---

## 🧪 Testing Strategy

### Current
- Manual testing via API endpoints
- Frontend component testing

### Required
- XCP protocol unit tests
- ECU connection integration tests
- Real-time streaming stress tests
- Calibration write/read verification tests

---

## 🚀 Deployment Architecture

### Current
- Development: SQLite, local FastAPI server
- Frontend: Next.js dev server

### Production Requirements
- PostgreSQL for production database
- Redis for WebSocket session management
- Message queue (RabbitMQ/Kafka) for DAQ data
- Load balancer for multiple ECU connections
- Docker containerization

---

## 📝 API Endpoints

### ✅ Implemented

- `POST /ingest/a2l` - A2L file upload
- `GET /a2l/{filename}/characteristics` - Get characteristics
- `POST /ingest/hex` - HEX file upload
- `POST /generate/hex` - Generate HEX file
- `GET /variants/tree` - Variant tree
- `POST /workpackages` - Create work package
- `GET /lifecycle/projects` - Project lifecycle
- `POST /validation/suites` - Validation suites

### ❌ Missing (Critical)

- `POST /xcp/connect` - Connect to ECU
- `GET /xcp/status` - ECU connection status
- `POST /xcp/read` - Read parameter from ECU
- `POST /xcp/write` - Write parameter to ECU
- `POST /daq/start` - Start DAQ list
- `POST /daq/stop` - Stop DAQ list
- `WS /stream/daq` - WebSocket for real-time data
- `GET /calibration/maps/{map_name}` - Get calibration map
- `PUT /calibration/maps/{map_name}` - Update calibration map

---

## 🎯 Next Steps

See `ROADMAP.md` for detailed implementation plan.

**Priority 1 (Critical):**
1. Implement XCP Master layer
2. Implement ECU connection
3. Implement WebSocket streaming

**Priority 2 (Important):**
4. Enhance A2L parser
5. Implement calibration engine
6. Add real-time map editing

**Priority 3 (Enhancement):**
7. Performance optimization
8. Security hardening
9. Production deployment

---

## 📚 References

- ASAM MCD-2 MC (A2L) Specification
- ASAM XCP 1.5.0 Protocol Specification
- Vector XETK Documentation
- Intel HEX Format Specification

---

**Document Status:** Current as of 2026-02-06  
**Next Review:** After XCP implementation
