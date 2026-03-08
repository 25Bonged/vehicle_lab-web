# 🗺️ HELIX Development Roadmap

**Last Updated:** 2026-02-06  
**Current Phase:** Foundation Complete → Real-time Layer

---

## 📊 Current Status

### ✅ Completed (Phase 1)

- [x] Backend API (FastAPI)
- [x] A2L parser (basic)
- [x] HEX parser/generator
- [x] Variant management
- [x] Work package system
- [x] RBAC system
- [x] DCM import/export
- [x] Project lifecycle
- [x] Validation engine
- [x] Frontend UI (Next.js)
- [x] Database layer

**Status:** Foundation is solid ✅

---

## 🚧 In Progress

**Nothing currently in progress.**

**Next:** XCP Master Layer (Priority 1)

---

## 🎯 Roadmap by Priority

### 🔴 Priority 1: Real-time Calibration (CRITICAL)

**Goal:** Enable actual ECU calibration via web browser

**Timeline:** 3-4 months

#### 1.1 XCP Master Layer (Month 1-2)

- [ ] **Week 1-2: Protocol Foundation**
  - [ ] Implement XCP packet encoding/decoding
  - [ ] Implement basic commands (CONNECT, DISCONNECT, GET_STATUS)
  - [ ] Error handling and validation
  - [ ] Unit tests

- [ ] **Week 3: Transport Layer**
  - [ ] TCP transport implementation
  - [ ] Connection management
  - [ ] Timeout handling
  - [ ] Unit tests

- [ ] **Week 4-5: Basic Operations**
  - [ ] Memory read/write
  - [ ] SHORT_UPLOAD/SHORT_DOWNLOAD
  - [ ] A2L integration
  - [ ] End-to-end tests

- [ ] **Week 6-8: Data Acquisition**
  - [ ] DAQ list allocation
  - [ ] ODT allocation
  - [ ] DAQ start/stop
  - [ ] DAQ data reading
  - [ ] Integration tests

**Deliverable:** XCP Master can connect to ECU and read/write parameters

---

#### 1.2 ECU Connection Layer (Month 2)

- [ ] **Week 1: XETK Adapter (Optional)**
  - [ ] Vector XETK SDK integration
  - [ ] XETK connection management
  - [ ] Hardware abstraction layer

- [ ] **Week 2: Direct TCP Connection**
  - [ ] Direct TCP to ECU
  - [ ] Connection pooling
  - [ ] Reconnection logic

- [ ] **Week 3-4: Integration**
  - [ ] FastAPI endpoints for connection
  - [ ] Connection status monitoring
  - [ ] Multi-ECU support (basic)

**Deliverable:** HELIX can connect to real ECUs

---

#### 1.3 Real-time Streaming (Month 3)

- [ ] **Week 1-2: WebSocket Server**
  - [ ] FastAPI WebSocket endpoint
  - [ ] Connection management
  - [ ] Message protocol

- [ ] **Week 2-3: DAQ Streaming**
  - [ ] DAQ data buffering
  - [ ] Signal processing
  - [ ] A2L conversion application
  - [ ] Stream to WebSocket

- [ ] **Week 3-4: Frontend Integration**
  - [ ] WebSocket client
  - [ ] Real-time graph updates
  - [ ] Signal visualization
  - [ ] Performance optimization

**Deliverable:** Real-time DAQ streaming at 50-100 Hz

---

#### 1.4 Calibration Engine (Month 4)

- [ ] **Week 1-2: Parameter Read/Write**
  - [ ] High-level calibration interface
  - [ ] A2L-based parameter lookup
  - [ ] Validation (limits, ranges)
  - [ ] Write verification

- [ ] **Week 2-3: Map Editing**
  - [ ] Map data structure
  - [ ] Map read from ECU
  - [ ] Map write to ECU
  - [ ] Map validation

- [ ] **Week 3-4: Frontend Integration**
  - [ ] Map editor UI
  - [ ] Live preview
  - [ ] Write confirmation
  - [ ] Undo/redo

**Deliverable:** Full calibration read/write capability

---

### 🟡 Priority 2: Enhanced Features (IMPORTANT)

**Timeline:** 2-3 months after Priority 1

#### 2.1 Enhanced A2L Parser (Month 5)

- [ ] **Full ASAM MCD-2 MC Compliance**
  - [ ] Complete CHARACTERISTIC parsing (with axes)
  - [ ] MEMORY_SEGMENT parsing
  - [ ] Complex structure support (MAP, CURVE, CUBOID)
  - [ ] Full COMPU_METHOD evaluation
  - [ ] MODULE and PROJECT parsing

- [ ] **Options:**
  - [ ] Option A: Integrate `pya2l` library
  - [ ] Option B: Build custom full parser
  - [ ] Option C: Use ASAM-compliant parser library

**Deliverable:** Full A2L file support

---

#### 2.2 Advanced Calibration Features (Month 6)

- [ ] **Map Editor Enhancements**
  - [ ] 3D map visualization
  - [ ] Interpolation tools
  - [ ] Copy/paste between maps
  - [ ] Map comparison

- [ ] **Batch Operations**
  - [ ] Batch parameter read
  - [ ] Batch parameter write
  - [ ] Parameter import/export

- [ ] **Calibration Templates**
  - [ ] Save calibration sets
  - [ ] Apply templates
  - [ ] Template library

**Deliverable:** Professional-grade calibration tools

---

#### 2.3 Performance & Reliability (Month 7)

- [ ] **Optimization**
  - [ ] XCP command batching
  - [ ] DAQ buffer optimization
  - [ ] WebSocket performance tuning
  - [ ] Database query optimization

- [ ] **Reliability**
  - [ ] Automatic reconnection
  - [ ] Error recovery
  - [ ] Connection health monitoring
  - [ ] Graceful degradation

- [ ] **Testing**
  - [ ] Load testing
  - [ ] Stress testing
  - [ ] Long-running session tests

**Deliverable:** Production-ready performance

---

### 🟢 Priority 3: Enterprise Features (ENHANCEMENT)

**Timeline:** 6-12 months after Priority 1

#### 3.1 Multi-ECU Support (Month 8-9)

- [ ] **Multiple ECU Connections**
  - [ ] Connection pool management
  - [ ] ECU selection UI
  - [ ] Simultaneous calibration

- [ ] **ECU Groups**
  - [ ] Group management
  - [ ] Batch operations across ECUs
  - [ ] Synchronized calibration

**Deliverable:** Support for multiple ECUs simultaneously

---

#### 3.2 CAN Bus Integration (Month 10-11)

- [ ] **CAN Transport for XCP**
  - [ ] CAN bus interface
  - [ ] XCP over CAN
  - [ ] CAN message filtering

- [ ] **CAN Signal Monitoring**
  - [ ] CAN message capture
  - [ ] Signal extraction
  - [ ] CAN database (DBC) support

**Deliverable:** CAN bus support for XCP

---

#### 3.3 AI & Automation (Month 12+)

- [ ] **AI Calibration Suggestions**
  - [ ] Machine learning model
  - [ ] Parameter optimization
  - [ ] Anomaly detection

- [ ] **Automated Testing**
  - [ ] Test script execution
  - [ ] Automated validation
  - [ ] Regression testing

**Deliverable:** AI-powered calibration assistance

---

## 📅 Timeline Summary

### Q1 2026 (Months 1-3)

**Focus:** Real-time Calibration

- Month 1-2: XCP Master Layer
- Month 2: ECU Connection
- Month 3: Real-time Streaming

**Milestone:** Can calibrate ECU via browser ✅

---

### Q2 2026 (Months 4-6)

**Focus:** Enhanced Features

- Month 4: Calibration Engine
- Month 5: Enhanced A2L Parser
- Month 6: Advanced Calibration Features

**Milestone:** Professional-grade calibration tools ✅

---

### Q3 2026 (Months 7-9)

**Focus:** Performance & Scale

- Month 7: Performance & Reliability
- Month 8-9: Multi-ECU Support

**Milestone:** Production-ready, scalable platform ✅

---

### Q4 2026 (Months 10-12)

**Focus:** Enterprise Features

- Month 10-11: CAN Bus Integration
- Month 12+: AI & Automation

**Milestone:** Enterprise-ready platform ✅

---

## 🎯 Success Criteria

### Phase 1 Complete (Priority 1)

**Must Have:**
- ✅ Connect to real ECU
- ✅ Read calibration parameters
- ✅ Write calibration parameters
- ✅ Stream DAQ data at 50+ Hz
- ✅ Real-time visualization

**Success Metric:** Can replace basic INCA workflow

---

### Phase 2 Complete (Priority 2)

**Must Have:**
- ✅ Full A2L support
- ✅ Advanced map editing
- ✅ Batch operations
- ✅ Production performance

**Success Metric:** Can replace most INCA workflows

---

### Phase 3 Complete (Priority 3)

**Must Have:**
- ✅ Multi-ECU support
- ✅ CAN bus integration
- ✅ Enterprise features
- ✅ AI assistance

**Success Metric:** Can compete with INCA/CANape for 80% of use cases

---

## 🚧 Risks & Mitigation

### Risk 1: XCP Implementation Complexity

**Risk:** XCP protocol is complex, may take longer than estimated

**Mitigation:**
- Start with basic commands
- Use XCP simulator for testing
- Incremental implementation
- **Contingency:** +1 month buffer

---

### Risk 2: ECU Compatibility

**Risk:** Different ECUs may have XCP variations

**Mitigation:**
- Test with multiple ECU types
- Abstract protocol differences
- Document ECU-specific requirements
- **Contingency:** ECU-specific adapters

---

### Risk 3: Performance Requirements

**Risk:** Real-time streaming may not meet latency requirements

**Mitigation:**
- Early performance testing
- Optimize WebSocket pipeline
- Use efficient data structures
- **Contingency:** Reduce DAQ frequency if needed

---

### Risk 4: Hardware Dependencies

**Risk:** XETK hardware may be required, limiting accessibility

**Mitigation:**
- Support direct TCP connection (no hardware)
- Make XETK optional
- Document hardware requirements
- **Contingency:** Cloud-based XETK gateway

---

## 📝 Notes

**This roadmap is a living document. Update as progress is made.**

**Current Focus:** Priority 1 (Real-time Calibration)

**Next Milestone:** XCP Master Layer (Month 1-2)

---

**Document Owner:** Engineering Team  
**Review Frequency:** Monthly
