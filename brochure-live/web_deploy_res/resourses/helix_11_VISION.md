# 🎯 HELIX Vision & Product Goals

**Version:** 2.0.0  
**Last Updated:** 2026-02-06

---

## 🌟 Product Vision

**HELIX is a web-based ECU calibration platform that enables remote, collaborative calibration work without requiring expensive desktop software or hardware dongles.**

### The Problem We're Solving

**Current State of ECU Calibration:**
- ❌ Expensive desktop software (INCA: €10k+, CANape: €15k+)
- ❌ Hardware dongles required (Vector XETK, ETAS hardware)
- ❌ Desktop-only, no remote collaboration
- ❌ Complex installation and licensing
- ❌ Limited cloud integration
- ❌ Poor version control and collaboration

**HELIX Solution:**
- ✅ Browser-based (no installation)
- ✅ Cloud-hosted (accessible anywhere)
- ✅ Real-time collaboration
- ✅ Modern web UI (better UX than legacy tools)
- ✅ Integrated version control
- ✅ Lower cost (SaaS model)

---

## 🎯 Target Market

### Primary Customers

1. **Automotive OEMs**
   - Calibration teams
   - Powertrain development
   - Emissions compliance

2. **Tier 1 Suppliers**
   - ECU calibration services
   - Component development
   - Testing and validation

3. **Aftermarket Tuners**
   - Performance tuning
   - Custom calibration
   - Remote tuning services

4. **Research Institutions**
   - Academic research
   - Prototype development
   - Student training

---

## 🏆 Competitive Positioning

### vs. Vector INCA

| Feature | INCA | HELIX |
|---------|------|-------|
| **Platform** | Windows Desktop | Web Browser |
| **Cost** | €10,000+ license | SaaS (lower cost) |
| **Remote Access** | VPN required | Native cloud |
| **Collaboration** | Limited | Real-time |
| **UI/UX** | Legacy (1990s) | Modern (2020s) |
| **Version Control** | External tools | Integrated |
| **Hardware** | XETK required | XETK or direct TCP |

**HELIX Advantage:** Modern, cloud-native, collaborative

---

### vs. ETAS INCA

| Feature | ETAS | HELIX |
|---------|------|-------|
| **Deployment** | On-premise | Cloud |
| **Scalability** | Limited | Auto-scaling |
| **Integration** | Proprietary | Open APIs |
| **Mobile** | No | Yes (responsive) |

**HELIX Advantage:** Cloud-native, scalable, mobile-friendly

---

### vs. CANape

| Feature | CANape | HELIX |
|---------|--------|-------|
| **Focus** | Measurement | Calibration + Measurement |
| **Web** | No | Yes |
| **Cost** | €15,000+ | SaaS |
| **Learning Curve** | Steep | Modern UI |

**HELIX Advantage:** Web-based, integrated calibration + measurement

---

## 🚀 Product Goals

### Phase 1: Foundation (Current) ✅

- ✅ Data management (A2L, HEX, DCM)
- ✅ Variant management
- ✅ Work package workflow
- ✅ RBAC system
- ✅ Project lifecycle
- ✅ Web UI

**Status:** Complete

---

### Phase 2: Real-time Calibration (Next) 🚧

**Goal:** Enable actual ECU calibration via web browser

**Requirements:**
- XCP Master implementation
- ECU connection (XETK or direct TCP)
- Real-time DAQ streaming
- WebSocket data pipeline
- Calibration parameter read/write

**Timeline:** 3-6 months

**Success Metrics:**
- Connect to real ECU
- Read calibration parameters
- Write calibration parameters
- Stream DAQ data at 50+ Hz
- Zero data loss in streaming

---

### Phase 3: Advanced Features 🎯

**Goal:** Match and exceed desktop tool capabilities

**Features:**
- Multi-ECU support
- CAN bus integration
- Advanced map editing (3D visualization)
- AI-powered calibration suggestions
- Automated test execution
- Compliance reporting
- Data analytics and insights

**Timeline:** 6-12 months

---

### Phase 4: Enterprise Scale 🏢

**Goal:** Support large OEM deployments

**Features:**
- Multi-tenant architecture
- Enterprise SSO (SAML, OAuth)
- Advanced audit logging
- High availability (99.9% uptime)
- Global CDN for low latency
- On-premise deployment option
- API for third-party integration

**Timeline:** 12-18 months

---

## 💰 Business Model

### Pricing Strategy

**Tier 1: Starter**
- €99/month
- 1 ECU connection
- 10 projects
- Basic calibration features

**Tier 2: Professional**
- €499/month
- 5 ECU connections
- Unlimited projects
- Advanced features
- Priority support

**Tier 3: Enterprise**
- Custom pricing
- Unlimited connections
- On-premise option
- Dedicated support
- SLA guarantees

---

## 🎨 User Experience Vision

### The Ideal Calibration Session

1. **Login** → Browser (no installation)
2. **Connect ECU** → One-click connection
3. **Load A2L** → Automatic parameter discovery
4. **Edit Map** → Drag-and-drop, live preview
5. **Write to ECU** → Instant feedback
6. **Monitor** → Real-time graphs, no lag
7. **Collaborate** → Team sees changes in real-time
8. **Version Control** → Git-like history
9. **Export** → DCM/HEX generation

**All in the browser. No desktop software.**

---

## 🔬 Technical Vision

### Architecture Principles

1. **Web-First**
   - Everything works in browser
   - Progressive Web App (PWA) support
   - Mobile-responsive

2. **Real-time**
   - WebSocket for low-latency streaming
   - Sub-10ms data pipeline
   - 50-100 Hz DAQ support

3. **Scalable**
   - Cloud-native architecture
   - Auto-scaling
   - Multi-region support

4. **Open Standards**
   - ASAM MCD-2 MC (A2L)
   - ASAM XCP protocol
   - RESTful APIs
   - WebSocket for streaming

5. **Secure**
   - End-to-end encryption
   - Role-based access
   - Audit logging
   - SOC 2 compliance (future)

---

## 🎯 Success Metrics

### Technical Metrics

- **Connection Time:** < 2 seconds
- **DAQ Latency:** < 10ms
- **Write Success Rate:** > 99.9%
- **Uptime:** > 99.9%
- **API Response Time:** < 100ms (p95)

### Business Metrics

- **Customer Acquisition:** 100 customers in Year 1
- **Revenue:** €500k ARR in Year 1
- **Customer Satisfaction:** NPS > 50
- **Churn Rate:** < 5% monthly

---

## 🚧 Current Gaps

### What's Missing (Brutal Honesty)

1. **XCP Layer** ❌
   - Cannot connect to ECU
   - Cannot read/write parameters
   - **Impact:** Product doesn't work for calibration

2. **Real-time Streaming** ❌
   - No DAQ capability
   - No live data visualization
   - **Impact:** Cannot monitor ECU in real-time

3. **ECU Connection** ❌
   - No hardware interface
   - No XETK integration
   - **Impact:** Cannot communicate with vehicle

4. **Full A2L Parser** ⚠️
   - Basic implementation only
   - Missing complex structures
   - **Impact:** Limited parameter support

---

## 🎯 Path to Product-Market Fit

### Minimum Viable Product (MVP)

**Must Have:**
1. ✅ Data management (DONE)
2. ❌ ECU connection (MISSING)
3. ❌ Real-time calibration (MISSING)
4. ❌ Parameter read/write (MISSING)

**Without these, HELIX is a dashboard, not a calibration tool.**

---

### Go-to-Market Strategy

**Phase 1: Beta (3 months)**
- Target: 10 friendly customers
- Focus: Validate core calibration workflow
- Pricing: Free for beta users

**Phase 2: Launch (6 months)**
- Target: 50 paying customers
- Focus: Reliability and performance
- Pricing: Tier 1-2 available

**Phase 3: Scale (12 months)**
- Target: 200+ customers
- Focus: Enterprise features
- Pricing: All tiers available

---

## 🏁 Long-term Vision

**HELIX becomes the standard platform for ECU calibration, replacing desktop tools for 80% of use cases.**

**By 2028:**
- 1,000+ customers
- €10M+ ARR
- Industry standard for web-based calibration
- Integration with major OEM workflows
- AI-powered calibration optimization

---

## 📝 Notes

**This vision document is a living document. Update as product evolves.**

**Current Reality Check:**
- Foundation is solid ✅
- Real-time layer is missing ❌
- Cannot yet compete with INCA/CANape ❌
- **But:** Architecture is correct, path is clear

**Next Step:** Implement XCP layer (see `XCP_IMPLEMENTATION.md`)

---

**Document Owner:** Product Team  
**Review Frequency:** Quarterly
