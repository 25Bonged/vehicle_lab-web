# 🚀 HELIX - Web-Based ECU Calibration Platform

**Version:** 2.0.0  
**Status:** Foundation Complete | Real-time Layer In Development

---

## 📋 Overview

HELIX is a **modern, web-based ECU calibration platform** designed to replace expensive desktop tools like Vector INCA, ETAS, and CANape. Built with FastAPI and Next.js, HELIX provides a cloud-native solution for automotive calibration teams.

### 🎯 Vision

> Enable remote, collaborative ECU calibration from any browser, without expensive desktop software or hardware dongles.

---

## ✨ Current Features

### ✅ Implemented

- **Data Management**
  - A2L file parsing (basic)
  - HEX file parsing and generation
  - DCM import/export
  - Project lifecycle management

- **Workflow Management**
  - Variant tree with full workflow
  - Work package system (vCDM-compliant)
  - Role-based access control (RBAC)
  - Project phases and timelines

- **Validation & Reporting**
  - Test suite management
  - Parameter validation
  - Report generation (HTML/CSV/JSON)
  - Compliance tracking

- **Web Interface**
  - Modern Next.js dashboard
  - Real-time widgets
  - Responsive design
  - Dark theme

---

## ❌ Missing Critical Features

### 🔴 Priority 1 (CRITICAL)

- **XCP Master Layer** - Cannot connect to ECU
- **Real-time Streaming** - No DAQ capability
- **ECU Connection** - No hardware interface
- **Calibration Engine** - Cannot write to ECU

**Impact:** HELIX currently functions as a **data management dashboard**, not a calibration tool.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         HELIX Platform                  │
├─────────────────────────────────────────┤
│                                         │
│  Frontend (Next.js)                     │
│         ↕ REST API                      │
│  Backend (FastAPI)                      │
│         ↕                               │
│  Database (SQLAlchemy)                  │
│                                         │
│  ┌──────────────────────────────┐       │
│  │   MISSING REAL-TIME LAYER   │       │
│  │                              │       │
│  │  XCP Master      [❌]        │       │
│  │  WebSocket       [❌]        │       │
│  │  ECU Connection  [❌]        │       │
│  └──────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture.

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- SQLite (or PostgreSQL for production)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 📁 Project Structure

```
HELIX/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── database.py           # Database models
│   │   ├── models/              # Data models
│   │   ├── routers/             # API routes
│   │   └── services/            # Business logic
│   │       ├── a2l_parser.py    # A2L parsing
│   │       ├── hex_parser.py    # HEX parsing
│   │       ├── variant_manager.py
│   │       └── ...
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js pages
│   │   ├── components/          # React components
│   │   └── api/                 # API client
│   └── package.json
│
├── res/                          # Sample files
│   ├── *.a2l                    # A2L files
│   └── *.hex                    # HEX files
│
├── ARCHITECTURE.md              # System architecture
├── VISION.md                    # Product vision
├── XCP_IMPLEMENTATION.md         # XCP implementation plan
├── ROADMAP.md                   # Development roadmap
└── README.md                    # This file
```

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design
- **[VISION.md](./VISION.md)** - Product vision and goals
- **[XCP_IMPLEMENTATION.md](./XCP_IMPLEMENTATION.md)** - XCP implementation plan
- **[ROADMAP.md](./ROADMAP.md)** - Development roadmap

---

## 🔌 API Endpoints

### Data Management

- `POST /ingest/a2l` - Upload A2L file
- `GET /a2l/{filename}/characteristics` - Get characteristics
- `POST /ingest/hex` - Upload HEX file
- `POST /generate/hex` - Generate HEX file

### Variants & Work Packages

- `GET /variants/tree` - Get variant tree
- `POST /variants` - Create variant
- `POST /workpackages` - Create work package
- `PUT /workpackages/{id}/transition` - Transition status

### Project Lifecycle

- `GET /lifecycle/projects` - Get all projects
- `POST /lifecycle/projects` - Create project
- `POST /lifecycle/projects/{id}/a2l` - Upload A2L to project

### Validation

- `GET /validation/suites` - Get test suites
- `POST /validation/suites/{id}/run` - Run test suite

### ❌ Missing (Critical)

- `POST /xcp/connect` - Connect to ECU
- `POST /xcp/read` - Read parameter
- `POST /xcp/write` - Write parameter
- `WS /stream/daq` - WebSocket for real-time data

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

**Note:** Comprehensive test coverage needed for XCP layer (when implemented).

---

## 🛠️ Technology Stack

### Backend

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database
- **Pydantic** - Data validation
- **Pandas** - Data processing

### Frontend

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Three.js** - 3D visualizations

### Database

- **SQLite** - Development
- **PostgreSQL** - Production (planned)

---

## 🎯 Roadmap

### Q1 2026: Real-time Calibration

- [ ] XCP Master Layer
- [ ] ECU Connection
- [ ] Real-time Streaming
- [ ] Calibration Engine

**Milestone:** Can calibrate ECU via browser

### Q2 2026: Enhanced Features

- [ ] Enhanced A2L Parser
- [ ] Advanced Calibration Features
- [ ] Performance Optimization

**Milestone:** Professional-grade tools

### Q3 2026: Enterprise Scale

- [ ] Multi-ECU Support
- [ ] CAN Bus Integration
- [ ] Enterprise Features

**Milestone:** Enterprise-ready platform

See [ROADMAP.md](./ROADMAP.md) for detailed roadmap.

---

## ⚠️ Current Limitations

### Critical Gaps

1. **No ECU Connection**
   - Cannot connect to real ECUs
   - No XCP implementation
   - No hardware interface

2. **No Real-time Data**
   - No DAQ capability
   - No live streaming
   - No real-time visualization

3. **Limited A2L Support**
   - Basic parsing only
   - Missing complex structures
   - Not full ASAM compliant

**Impact:** HELIX is currently a **data management tool**, not a calibration tool.

---

## 🤝 Contributing

**Status:** Not open for contributions yet (pre-alpha)

**Future:** Will open for contributions after Priority 1 completion.

---

## 📄 License

**Status:** To be determined

---

## 📞 Contact

**Project Status:** Active Development  
**Current Phase:** Foundation Complete → Real-time Layer

---

## 🙏 Acknowledgments

Built with:
- FastAPI
- Next.js
- ASAM Standards (MCD-2 MC, XCP)

---

**Last Updated:** 2026-02-06  
**Version:** 2.0.0
