# 🏗️ VEHICLE-LAB - System Architecture

**Version:** 1.0  
**Last Updated:** January 2025  
**Repository:** [VEHICLE-LAB](https://github.com/25Bonged/VEHICLE-LAB)

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Layers](#architecture-layers)
3. [Core Components](#core-components)
4. [Data Flow](#data-flow)
5. [Database Architecture](#database-architecture)
6. [API Architecture](#api-architecture)
7. [DiagAI System Architecture](#diagai-system-architecture)
8. [Deployment Architecture](#deployment-architecture)
9. [Security Architecture](#security-architecture)
10. [Technology Stack](#technology-stack)

---

## 🎯 System Overview

**VEHICLE-LAB** is a comprehensive vehicle diagnostic and analysis platform designed for automotive engineers, calibration specialists, and fleet managers. The system processes automotive data files (MDF/MF4/CSV/Excel) and provides advanced analytical capabilities through a web-based interface.

### Key Characteristics

- **Web-Based**: No installation required, runs in modern browsers
- **Real-Time Processing**: Interactive visualizations with efficient data handling
- **AI-Powered**: Natural language diagnostics through DiagAI
- **Enterprise-Ready**: Multi-tenant architecture with OEM-specific data isolation
- **Scalable**: Handles files up to 1GB with optimized processing

---

## 🏛️ Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Web Client  │  │  REST API    │  │  WebSocket    │     │
│  │  (HTML/JS)   │  │  Endpoints   │  │  (Future)     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────┬────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Flask Application Core                                │  │
│  │  - Request Routing & Validation                       │  │
│  │  - Error Handling & Security                          │  │
│  │  - Response Serialization                             │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Blueprints (Modular Routes)                          │  │
│  │  - File Management                                     │  │
│  │  - Analytics Endpoints                                 │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  DiagAI System                                         │  │
│  │  - LLM Orchestration                                   │  │
│  │  - Multi-Agent Diagnostics                             │  │
│  │  - RAG System (OEM-Specific)                           │  │
│  │  - Signal Discovery                                    │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Analysis Modules                                      │  │
│  │  - Misfire Detection (9 algorithms)                   │  │
│  │  - Empirical Map Generation                            │  │
│  │  - Fuel Analysis                                       │  │
│  │  - Gear Hunting Detection                              │  │
│  │  - 12+ Specialized Modules                             │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│                    DATA PROCESSING LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   asammdf    │  │   pandas     │  │   numpy      │    │
│  │  (MDF/MF4)   │  │ (DataFrames) │  │  (Arrays)    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    scipy     │  │ scikit-learn │  │  cantools    │    │
│  │(Interpolation)│  │   (ML)      │  │  (DBC)       │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└────────────────────────────┬────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│                    DATA PERSISTENCE LAYER                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  DuckDB (Time-Series Storage)                        │  │
│  │  - Signal time-series data                            │  │
│  │  - Fast columnar queries                              │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Supabase PostgreSQL (Metadata)                        │  │
│  │  - User sessions                                       │  │
│  │  - Conversation history                               │  │
│  │  - Feedback & analytics                               │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Vector Stores (RAG Embeddings)                      │  │
│  │  - OEM-specific knowledge bases                       │  │
│  │  - Document embeddings                                 │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Core Components

### 1. Flask Application Core

**Responsibilities:**
- HTTP request handling and routing
- File upload management (up to 1GB)
- Signal extraction and caching
- API endpoint definitions
- Security headers and error handling

**Key Features:**
- RESTful API design
- Memory-mapped file I/O for large files
- Intelligent signal alias resolution
- LTTB downsampling for visualization
- Comprehensive error handling

### 2. DiagAI System

**Architecture:**
```
DiagAI System
├── LLM Orchestration
│   ├── Multi-LLM Support (DeepSeek, LM Studio, Ollama)
│   ├── Smart Query Routing
│   └── Fallback Mechanisms
├── RAG System
│   ├── OEM-Specific Knowledge Bases
│   ├── Document Embeddings
│   └── Context Retrieval
├── Signal Discovery
│   ├── Natural Language Processing
│   ├── Signal Alias Matching (155 patterns)
│   └── Database Query Generation
└── Multi-Agent System
    ├── 9 Specialized Diagnostic Agents
    ├── Agent Orchestration
    └── Result Aggregation
```

**LLM Routing Strategy:**
- **Complex Queries** → DeepSeek (8B-67B models, 32K+ context)
- **Simple Queries** → LM Studio (7B-13B models, local)
- **Automotive-Specific** → Trained Model (specialized knowledge)
- **Fallback Chain** → Automatic failover between providers

### 3. Analysis Modules

**12+ Specialized Analysis Modules:**

| Module | Purpose | Key Algorithms |
|--------|---------|----------------|
| **Misfire Detection** | Engine misfire analysis | 9 algorithms (CSVA, FFT, ML-based, statistical) |
| **Empirical Maps** | BSFC, efficiency maps | Kriging, RBF, cubic spline interpolation |
| **Fuel Analysis** | Fuel consumption metrics | BSFC calculation, efficiency analysis |
| **Gear Hunting** | Transmission analysis | Speed-RPM correlation, event detection |
| **DFC Analysis** | Diagnostic fault codes | Code frequency, evidence analysis |
| **IUPR** | OBD-II compliance | In-Use Performance Ratio calculation |
| **WLTP** | Emissions testing | Cycle validation, emissions analysis |
| **Transmission** | Shift pattern analysis | Gear ratio analysis |
| **Braking** | Deceleration analysis | ABS event detection |
| **Drive Cycle** | Cycle recognition | Pattern matching, validation |
| **Signal Processing** | Data filtering | Smoothing, FFT, filtering |
| **CC/SL** | Cruise control analysis | Overshoot detection |

### 4. Signal Management System

**Capabilities:**
- **1,817+ signals** automatically indexed
- **155 alias patterns** for intelligent matching
- **330+ DBC files** integrated from multiple OEMs
- **Smart pattern recognition**: Case-insensitive, fuzzy matching
- **Cross-OEM compatibility**: Intelligent signal aliasing

---

## 🔄 Data Flow

### File Upload & Processing Flow

```
┌─────────────┐
│ User Upload │
│ (MDF/MF4)   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ File Validation     │
│ - Format check      │
│ - Size validation   │
│ - Security scan     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Signal Extraction   │
│ - Parse MDF/MF4     │
│ - Extract channels  │
│ - Generate aliases  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Database Storage    │
│ - Time-series data  │
│ - Signal catalog    │
│ - Metadata          │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Ready for Analysis  │
└─────────────────────┘
```

### DiagAI Query Processing Flow

```
┌─────────────┐
│ User Query  │
│ (Natural    │
│ Language)   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Query Analysis      │
│ - Extract keywords  │
│ - Identify intent   │
│ - Detect signals    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Signal Discovery     │
│ - Match aliases      │
│ - Query database     │
│ - Fetch time-series  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ RAG Context         │
│ - Retrieve docs     │
│ - OEM-specific KB   │
│ - Enhance prompt    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ LLM Processing      │
│ - Route to model    │
│ - Generate response │
│ - Agent coordination │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Response Generation │
│ - Format output     │
│ - Add visualizations│
│ - Include metadata  │
└──────┬──────────────┘
       │
       ▼
┌─────────────┐
│ JSON Response│
└─────────────┘
```

### Signal Extraction Flow

```
┌─────────────┐
│ API Request │
│ (signal IDs)│
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Alias Resolution    │
│ - Try exact match   │
│ - Try aliases       │
│ - Fuzzy matching    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Data Retrieval      │
│ - Check cache       │
│ - Open MDF file     │
│ - Extract signal    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Downsampling        │
│ - LTTB algorithm    │
│ - Target: 20K pts   │
│ - Preserve features │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Response            │
│ - Time series       │
│ - Statistics        │
│ - Metadata          │
└─────────────────────┘
```

---

## 🗄️ Database Architecture

### DuckDB (Time-Series Signal Storage)

**Schema:**
```sql
CREATE TABLE signals (
    trip_id TEXT,           -- File identifier
    t DOUBLE,               -- Timestamp (seconds)
    name TEXT,              -- Canonical signal name
    value DOUBLE,           -- Signal value
    unit TEXT,              -- Unit of measurement
    ecu TEXT,               -- ECU source
    bus TEXT,               -- Bus type (CAN, LIN, FlexRay)
    meta JSON               -- Additional metadata
);

-- Indexes for performance
CREATE INDEX idx_signals_trip ON signals(trip_id);
CREATE INDEX idx_signals_name ON signals(name);
CREATE INDEX idx_signals_t ON signals(t);
```

**Characteristics:**
- Columnar storage for fast queries
- Supports millions of data points
- Time-range filtering optimized
- Automatic indexing

### Supabase PostgreSQL (Metadata & Sessions)

**Tables:**
- **sessions**: User session management
- **conversations**: DiagAI chat history
- **feedback**: User feedback and ratings
- **files**: File metadata and tracking

**Features:**
- Row-level security (optional)
- Automatic backups
- Real-time subscriptions (future)
- RESTful API access

### Vector Stores (RAG Embeddings)

**Structure:**
- **OEM-specific collections**: Complete data isolation
- **Document embeddings**: PDFs, calibration data, procedures
- **Metadata filtering**: Filter by OEM, document type
- **Similarity search**: Semantic search for context

**Isolation Model:**
```
Collection: oem_a_knowledge_base
  ├── Documents: OEM A calibration data
  └── Access: OEM A users only

Collection: oem_b_knowledge_base
  ├── Documents: OEM B diagnostic procedures
  └── Access: OEM B users only
```

---

## 🌐 API Architecture

### RESTful Endpoints

**File Management:**
```
POST   /api/upload                    # Upload files
GET    /api/files                     # List files
DELETE /api/files/{filename}          # Delete file
GET    /api/files/{filename}/channels  # Get signal list
```

**Signal Extraction:**
```
POST   /api/analytics                 # Extract signals
GET    /api/histogram                 # Signal histogram
POST   /api/empirical_map             # Generate map
```

**Analysis Endpoints:**
```
POST   /api/misfire                   # Misfire detection
POST   /api/gear_hunt                 # Gear hunting
POST   /api/fuel_analysis              # Fuel analysis
POST   /api/dfc_analysis               # DFC analysis
POST   /api/iupr                       # IUPR analysis
POST   /api/wltp                       # WLTP analysis
```

**DiagAI Endpoints:**
```
POST   /api/diagai/query               # Natural language query
POST   /api/diagai/export/pdf           # Export to PDF
POST   /api/diagai/export/ppt           # Export to PowerPoint
GET    /api/diagai/feedback/stats       # Feedback statistics
```

**Report Endpoints:**
```
POST   /api/report_section             # Generate report section
POST   /api/report                      # Full diagnostic report
```

### Request/Response Patterns

**Example: Signal Extraction**
```json
// Request
{
  "filename": "example.mf4",
  "ids": ["EngineRPM", "VehicleSpeed"],
  "tmin": 0,
  "tmax": 1000,
  "downsample": 20000,
  "algo": "lttb"
}

// Response
{
  "success": true,
  "signals": {
    "EngineRPM": {
      "timestamps": [0.0, 0.1, ...],
      "values": [800, 850, ...],
      "unit": "rpm",
      "stats": {
        "mean": 2450.5,
        "std": 125.3,
        "min": 800,
        "max": 4500
      }
    }
  }
}
```

**Example: DiagAI Query**
```json
// Request
{
  "query": "What's the average RPM during acceleration?",
  "session_id": "session_123",
  "filename": "example.mf4"
}

// Response
{
  "response": "The average RPM during acceleration is 2,450 RPM...",
  "signals_used": ["EngineRPM", "VehicleSpeed"],
  "analysis_type": "statistical",
  "visualizations": [...]
}
```

---

## 🤖 DiagAI System Architecture

### Multi-LLM System

**Supported Providers:**

1. **DeepSeek** (Primary)
   - Models: 8B, 32B, 67B
   - Context: 32K+ tokens
   - Use case: Complex queries, reasoning
   - Deployment: Cloud API or private instance

2. **LM Studio** (Secondary)
   - Models: 7B-13B (local)
   - Context: 4K-8K tokens
   - Use case: Fast responses, simple queries
   - Deployment: Local HTTP server

3. **Ollama** (Fallback)
   - Models: Varies (Llama, Mistral, etc.)
   - Context: Varies
   - Use case: Fallback when others unavailable
   - Deployment: Local

4. **Trained Model** (Specialized)
   - Model: Fine-tuned automotive model
   - Context: 1K tokens
   - Use case: Automotive-specific queries only
   - Deployment: Local (transformers)

### Smart Routing Logic

```
Query Analysis
    │
    ├─ File search query? → DeepSeek (always)
    │
    ├─ Complex query (>500 chars)? → DeepSeek
    │
    ├─ Automotive-specific? → Trained Model (if others unavailable)
    │                         DeepSeek (if available)
    │
    └─ Simple query? → LM Studio → DeepSeek → Ollama
```

### RAG System

**Components:**
1. **Document Loaders**: PDF, DOCX, PPTX support
2. **Embeddings**: Sentence transformers
3. **Vector Store**: ChromaDB with OEM isolation
4. **Retrieval**: Top-K retrieval with reranking

**OEM Isolation:**
- Each OEM has isolated collection
- Strict metadata filtering
- Zero cross-contamination
- Enterprise-grade security

### Multi-Agent System

**9 Specialized Agents:**

| Agent | Purpose | Capabilities |
|-------|---------|--------------|
| **MisfireAgent** | Engine misfire detection | 9 algorithms, severity analysis |
| **DFCAgent** | Diagnostic fault codes | Code frequency, evidence |
| **IUPRAgent** | OBD-II compliance | In-Use Performance Ratio |
| **GearAgent** | Transmission analysis | Gear hunting, shift patterns |
| **DrivabilityAgent** | Drivability metrics | Anti-jerk, torque filtering |
| **StartWarmupAgent** | Engine start analysis | Cold start, warmup curves |
| **WLTPAgent** | WLTP testing | Cycle validation, emissions |
| **FuelAgent** | Fuel analysis | BSFC, consumption metrics |
| **CANBusOffAgent** | CAN bus diagnostics | Bus-off events, errors |

**Orchestration:**
- Automatic agent selection based on query
- Multi-agent coordination for complex queries
- Result aggregation and formatting

---

## 🚀 Deployment Architecture

### Production Deployment

```
┌─────────────────────────────────────────┐
│         Load Balancer / CDN             │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Flask Application Server            │
│  ┌────────────────────────────────────┐  │
│  │  Gunicorn/uWSGI                  │  │
│  │  - Port: 8000                    │  │
│  │  - Workers: 2-4                   │  │
│  └────────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴───────┐
       │               │
┌──────▼──────┐ ┌──────▼──────┐
│   DuckDB    │ │  Supabase   │
│  (Local FS) │ │ (PostgreSQL)│
└─────────────┘ └─────────────┘
       │               │
┌──────▼───────────────▼──────┐
│   File Storage               │
│  - /uploads (MDF files)     │
│  - /dbc_repo_cache (DBC)    │
│  - /tmp (exports)           │
└──────────────────────────────┘
```

### Supported Platforms

- **Render**: Auto-deploy from GitHub
- **Heroku**: Procfile-based deployment
- **Railway**: Automatic Python detection
- **Docker**: Containerized deployment (future)
- **On-Premise**: Self-hosted deployment

### Environment Configuration

```bash
# Server
PORT=8000
FLASK_HOST=0.0.0.0
FLASK_DEBUG=0

# Database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=xxx

# LLM APIs
DEEPSEEK_API_KEY=xxx
GEMINI_API_KEY=xxx
LMSTUDIO_BASE_URL=http://localhost:1234

# File Limits
MAX_UPLOAD_SIZE_MB=1000
```

---

## 🔒 Security Architecture

### Security Headers

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`
- `Referrer-Policy: strict-origin-when-cross-origin`

### File Upload Security

- Path validation (prevents directory traversal)
- File type validation (whitelist approach)
- Size limits (1GB maximum)
- Filename sanitization
- Secure storage (outside web root)

### Data Isolation

- **OEM-specific RAG collections**: Complete isolation
- **Session-based access**: User sessions tracked
- **Row-level security**: Supabase RLS (optional)
- **API key management**: Environment variables only

### LLM Security

- **Private deployment**: LLMs can run on-premise
- **No data sharing**: Queries never leave infrastructure
- **API key encryption**: Stored in environment variables
- **Rate limiting**: (Future implementation)

---

## 🛠️ Technology Stack

### Backend Framework
- **Flask 2.3.3**: Web framework
- **Werkzeug 2.3.7**: WSGI utilities
- **Flask-CORS**: Cross-origin resource sharing

### Data Processing
- **asammdf**: MDF/MF4 file reading
- **pandas 2.0+**: Data manipulation
- **numpy 1.24+**: Numerical computing
- **scipy 1.10+**: Scientific computing
- **scikit-learn**: Machine learning

### Visualization
- **Plotly 5.17+**: Interactive charts
- **matplotlib 3.7+**: Static plots
- **seaborn 0.12+**: Statistical visualization
- **kaleido**: Static image export

### Database
- **DuckDB**: Time-series signal storage
- **Supabase (PostgreSQL)**: Metadata and sessions
- **ChromaDB**: Vector embeddings for RAG
- **psycopg2-binary**: PostgreSQL driver

### LLM & AI
- **langchain 0.1+**: LLM orchestration
- **transformers 4.35+**: Model loading
- **sentence-transformers**: Embeddings
- **google-genai**: Gemini API
- **Custom clients**: DeepSeek, LM Studio, Ollama

### File Processing
- **PyPDF2 / pdfplumber / pymupdf**: PDF processing
- **python-docx**: Word documents
- **python-pptx**: PowerPoint
- **cantools**: DBC file parsing

### Utilities
- **python-dotenv**: Environment variables
- **requests**: HTTP client
- **reportlab**: PDF generation

---

## 📊 Performance Characteristics

### File Processing
- **Upload**: Up to 1GB files supported
- **Signal extraction**: Memory-mapped I/O
- **Indexing**: Automatic background indexing
- **Caching**: LRU cache for frequently accessed signals

### Query Performance
- **Signal queries**: <100ms (indexed DuckDB)
- **LLM responses**: 2-10s (depending on model)
- **Map generation**: 5-30s (depending on data size)
- **Report generation**: 10-60s (comprehensive reports)

### Scalability
- **Concurrent requests**: Gunicorn with 2-4 workers
- **Database**: DuckDB handles millions of data points
- **File storage**: Filesystem-based (can migrate to S3)
- **LLM**: Stateless, horizontally scalable

---

## 📚 Related Documentation

- **[README.md](README.md)**: Project overview and features
- **[DASHBOARD_USER_GUIDE.md](DASHBOARD_USER_GUIDE.md)**: Complete API documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**: Technical overview
- **[WORKFLOW.md](WORKFLOW.md)**: User workflow guide
- **[docs/](docs/)**: Additional technical documentation

---

## 🔄 Development Workflow

### Code Organization
```
backend_mdf/
├── app.py                    # Main Flask application
├── config.py                 # Configuration constants
├── requirements.txt          # Dependencies
├── blueprints/               # Modular routes
├── bots/databot/             # DiagAI system
├── custom_modules/           # Analysis modules
├── core/                     # Core services
├── database/                 # Database schemas
├── scripts/                  # Utility scripts
└── docs/                     # Documentation
```

### Testing
- Unit tests: `test_*.py` files
- Integration tests: Full workflow tests
- LLM tests: DiagAI response quality tests
- Performance tests: Large file handling

---

## 📝 Architecture Decisions

### Why DuckDB?
- **Fast columnar queries**: Optimized for time-series data
- **Lightweight**: No separate server required
- **SQL compatibility**: Standard SQL interface
- **Performance**: Handles millions of data points efficiently

### Why Multi-LLM?
- **Flexibility**: Support different deployment scenarios
- **Cost optimization**: Use local models when possible
- **Reliability**: Automatic failover between providers
- **Specialization**: Trained models for automotive domain

### Why OEM-Specific RAG?
- **Data isolation**: Complete separation between OEMs
- **Security**: Enterprise-grade data protection
- **Customization**: OEM-specific knowledge bases
- **Compliance**: Meets enterprise security requirements

---

## 🚧 Future Enhancements

### Planned Features
- **WebSocket support**: Real-time updates
- **Docker deployment**: Containerized architecture
- **S3 integration**: Cloud file storage
- **Rate limiting**: API throttling
- **GraphQL API**: Alternative to REST
- **Mobile app**: Native mobile support

### Performance Improvements
- **Caching layer**: Redis integration
- **CDN integration**: Static asset delivery
- **Database sharding**: Horizontal scaling
- **Async processing**: Background job queue

---

## 📞 Support & Contributions

For questions, issues, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/25Bonged/VEHICLE-LAB/issues)
- **Documentation**: See [docs/](docs/) directory
- **Business Inquiries**: Use GitHub Discussions

---

**Last Updated:** January 2025  
**Maintainer:** VEHICLE-LAB Development Team  
**License:** MIT (see LICENSE file)

---

**Made with ❤️ for the automotive engineering community**

⭐ **Star this repo if you find it useful!**

