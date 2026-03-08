# MDF Analytics Platform  
## Professional Usage Manual for Vehicle Diagnostics Engineers

**Version:** 2025.11  
**Audience:** Customer-facing diagnostics engineering teams, field calibration specialists, and technical support partners.

---

### 1. Executive Overview
- **Purpose:** Accelerate diagnostics workflows on MDF/MF4, CSV, and Excel telemetry with a single, secure analytics surface.
- **Core Outcomes:** Faster root-cause analysis, data-backed calibration decisions, consistent reporting to OEM stakeholders.
- **Primary Interfaces:** Plotly-powered dashboard, REST API, and the Data Bot assistant with 23 ready-to-run analytical tools.

---

### 2. Platform Architecture (High Level)
- **Frontend** (`frontend.html`): Interactive dashboards for uploads, plotting, map generation, reports, and Data Bot.
- **Backend** (`app.py`): Flask service handling ingestion, channel aliasing, analytics computation, and report exports.
- **Analytics Modules** (`custom_modules/`): Domain-specific engines for DFC, IUPR, CC/SL overshoot, misfire, gear hunting, fuel, drive cycle, transmission, braking, dynamometer, and WLTP workflows.
- **AI Copilot** (`bots/databot/`): Tool-execution runtime with optional LLM backends (DeepSeek, LM Studio, Ollama, custom LoRA adapters).
- **Storage**: Uploaded files in `uploads/`, cached plots in `tmp_plots/`, empirical map exports in `maps_outputs/`, DuckDB signal store at `data/vehiclelab.duckdb`.

---

### 3. Onboarding & Setup
1. **Environment Preparation**
   ```bash
   cd /Users/chayan/Documents/project_25/backend_mdf
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Optional GPU Enablement** (Windows/Linux):
   ```bash
   pip install torch --index-url https://download.pytorch.org/whl/cu118
   pip install bitsandbytes
   ```
3. **Launch Dashboard**
   ```bash
   python scripts/launch_dashboard.py
   # Open http://127.0.0.1:8000
   ```
4. **Credentials (Optional Services)**
   - `GEMINI_API_KEY` for Gemini file search
   - `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `OLLAMA_HOST`, or custom endpoints for LLM integrations

---

### 4. Daily Workflow Blueprint
1. **File Intake**
   - Drag-and-drop or upload via API (`POST /smart_merge_upload`)
   - Supported formats: `.mdf`, `.mf4`, `.mf3`, `.csv`, `.xlsx`, `.xls`
   - Verify file presence in **Files** tab or `GET /api/files`
2. **Channel Review**
   - Use **Analyse** tab to inspect channel metadata (aliases, presence count)
   - Switch between union/intersection views for multi-file consistency
3. **Signal Analysis**
   - Plot interactive traces with LTTB downsampling for high-resolution data
   - Toggle FFT, histograms, normalization, multi-Y axes, or subplots as required
4. **Advanced Diagnostics**
   - Navigate to **Report** modules for fault code, IUPR, CC/SL, misfire, gear hunting, fuel, or drive cycle analytics
   - Configure parameters (time windows, bins, thresholds) aligned with OEM standards
5. **Empirical Map Generation**
   - Select preset (e.g., “CI Engine — BSFC”) or custom RPM/Torque bins
   - Export heatmaps, contours, or 3D surfaces to CSV/XLSX/PNG
6. **AI-Augmented Queries**
   - Open **Data Bot** tab for command palette or natural language chat
   - Example: `correlation RPM torque 0-120` or `trip summary demo_trip_001`
7. **Reporting & Handover**
   - Export sections as PDF/PNG/CSV/XLSX
   - Record insights, attach plots, and archive in customer case file

---

### 5. Dashboard Modules at a Glance
- **Upload & Files**: Manage inventory, delete or purge old sessions, validate size/completeness.
- **Analyse**: Time-series plotting, statistics extraction, frequency analysis, distribution review.
- **Playground**: Custom axis selection, 3D/heatmap visualizations, multi-trace overlays, time filters.
- **Report Sections**:
  - *Empirical Map*: BSFC, efficiency, temperature surfaces; DOE recommendations when `cie` module available.
  - *DFC Analysis*: Fault code frequency, timelines, evidence snapshots.
  - *CC/SL Overshoot*: Combined cruise-control plots with event flags and aggregates.
  - *IUPR*: In-use performance ratio dashboards (requires `compute_iupr_plotly`).
  - *Gear Hunting*: Automatic detection of gear oscillations with supporting traces.
  - *Misfire Detection*: Multi-algorithm approach blending crank variance, FFT, statistical anomaly, and angular velocity.
  - *Fuel & Consumption*: Rate trends, cumulative usage, efficiency overlays.
  - *Drive Cycle / Two-Stage / Transmission / Braking / Dynamometer / Signal Processing*: Specialized modules leveraging respective `custom_modules`.

---

### 6. Data Bot Tool Catalog
**Access Methods**
- Dashboard “Data Bot” tab
- REST: `POST /api/databot/chat`, `POST /api/databot/tools/<tool_name>`
- CLI ingestion helper: `python -m bots.databot.ingest_helper <csv> <trip_id> <time_col>`

**Highlighted Tools (23 total)**
- **Foundational**: `list_signals`, `stats`, `get_trips`
- **Comparative & Statistical**: `compare_signals`, `correlation`, `correlation_matrix`, `distribution`, `outliers`
- **Time-Series**: `plot`, `plot_multiple`, `scatter_plot`, `rate_of_change`, `integrate`
- **Frequency & Processing**: `fft_analysis`, `filter_signal`, `smooth_signal`
- **Event Detection**: `detect_events`, `threshold_violations`
- **Diagnostics**: `power_calculation`, `efficiency_metrics`, `trip_summary`, `heatmap`, `export`

**Usage Notes**
- Include time ranges directly in commands (`stats RPM 60-180`) to auto-filter data.
- Combine multiple tools for layered insights (e.g., `compare_signals RPM torque throttle` followed by `correlation RPM torque`).
- Enable external LLMs to interpret free-form questions; without LLM, use explicit command syntax.

---

### 6.1. LLM API Endpoints (OpenAI-Compatible)

The platform integrates with OpenAI-compatible LLM providers (LM Studio, DeepSeek, Ollama) through standardized endpoints. These endpoints enable direct LLM interaction for advanced natural language processing, code generation, and intelligent analysis.

**MDF File Integration:**
- LLM endpoints are used to interpret natural language queries about MDF/MF4 data
- After uploading MDF files via `POST /smart_merge_upload`, signals are indexed and available for LLM-powered queries
- The LLM translates queries like "analyze RPM correlation" into tool calls (`correlation`, `plot`, `stats`) that operate on MDF signal data
- MDF signals are accessible through Data Bot tools, which the LLM can call automatically via function calling
- Example workflow: Upload MDF → LLM interprets "show RPM vs torque" → Calls `plot_multiple` tool → Returns visualization

**Base URL Configuration:**
- **LM Studio (Local)**: `http://localhost:1234` or `http://192.0.0.2:1234` (configurable via `LMSTUDIO_BASE_URL`)
- **DeepSeek (Cloud)**: `https://api.deepseek.com` (requires `DEEPSEEK_API_KEY`)
- **Ollama (Local)**: `http://localhost:11434` (default)

#### 6.1.1. GET /v1/models
**Purpose:** Retrieve list of available language models and their capabilities.

**Request:**
```bash
curl http://localhost:1234/v1/models
```

**Response:**
```json
{
  "data": [
    {
      "id": "deepseek-r1:7b",
      "object": "model",
      "created": 1234567890,
      "owned_by": "lm-studio",
      "permission": [],
      "root": "deepseek-r1:7b",
      "parent": null
    }
  ],
  "object": "list"
}
```

**Use Cases:**
- Verify model availability before making requests
- Check model capabilities and parameters
- Debug LLM connectivity issues
- Programmatically select appropriate model for task

**Integration Notes:**
- Used by `bots/databot/lmstudio_client.py` for model discovery
- Automatically called during LLM client initialization
- Returns both LLM and embedding models (filter by checking `"embed"` in model ID)

---

#### 6.1.2. POST /v1/chat/completions
**Purpose:** Generate conversational responses using chat-based language models. Primary endpoint for natural language queries, tool routing, and multi-turn conversations.

**Request:**
```bash
curl -X POST http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-r1:7b",
    "messages": [
      {"role": "system", "content": "You are an automotive diagnostics expert."},
      {"role": "user", "content": "Analyze the correlation between RPM and torque signals."}
    ],
    "temperature": 0.7,
    "max_tokens": 1000
  }'
```

**Request Parameters:**
- `model` (string, required): Model identifier from `/v1/models` (required when multiple models are loaded)
- `messages` (array, required): Conversation history with roles (`system`, `user`, `assistant`)
- `temperature` (float, optional): Sampling temperature (0.0-2.0), default 0.7 (platform uses 0.7 for balanced responses)
- `max_tokens` (integer, optional): Maximum tokens to generate, default 2000 (platform default)
- `stream` (boolean, optional): Enable streaming responses, default `false`
- `top_p` (float, optional): Nucleus sampling parameter, default 0.9 (platform default)
- `frequency_penalty` (float, optional): Reduce repetition (-2.0 to 2.0), default 0.0
- `presence_penalty` (float, optional): Encourage new topics (-2.0 to 2.0), default 0.0
- `tools` (array, optional): Available tools/functions for function calling (OpenAI-compatible format)
- `tool_choice` (string, optional): Tool selection mode (`auto`, `none`, or specific tool object)
- `stop` (string or array, optional): Stop sequences (note: LM Studio doesn't accept `null` for this parameter)

**Response:**
```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "deepseek-r1:7b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "RPM and torque show a strong positive correlation (r=0.87) during acceleration phases..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 120,
    "total_tokens": 165
  }
}
```

**Use Cases:**
- Natural language queries to Data Bot about MDF/MF4 signal data
- Multi-turn diagnostic conversations (e.g., "What's the RPM?" → "Plot it" → "Show correlation with torque")
- Tool selection and parameter extraction from queries like "analyze misfire in uploaded MDF files"
- Technical report generation from MDF analysis results
- Code generation for custom analysis scripts on MDF data
- Function calling for automated tool execution on MDF signals (plot, stats, correlation, etc.)
- MDF file analysis queries: "What signals are in the uploaded MDF?", "Show RPM statistics", "Detect gear hunting"

**Platform Integration:**
- Used by `bots/databot/agent.py` for query interpretation
- Used by `bots/databot/lmstudio_client.py` with default parameters: `temperature=0.7`, `max_tokens=2000`, `top_p=0.9`
- Supports conversation history for context retention
- Automatically routes to appropriate tool based on LLM response
- Handles retries and fallback logic (5 attempts with exponential backoff: 2s, 4s, 8s, 16s, 32s)
- Timeout: 300 seconds (5 minutes) for first attempt, 180 seconds (3 minutes) for retries
- Integrates with 23 Data Bot tools for automated analysis of MDF/MF4 signals
- Model must be specified when multiple models are loaded to avoid "Multiple models are loaded" error
- **MDF Workflow**: Upload MDF → Signals indexed → LLM queries signals → Tools execute → Results returned

**Best Practices:**
- Include system prompt with automotive domain context
- Provide conversation history for follow-up questions
- Use `temperature=0.7` for balanced creativity/consistency (platform default)
- Set `max_tokens` based on expected response length (must be > 0, platform uses 2000)
- Monitor `usage.total_tokens` for cost/performance tracking
- Use `tools` parameter for function calling capabilities
- Always specify `model` parameter when multiple models are available
- Avoid setting `stop` parameter to `null` (LM Studio doesn't accept it)

---

#### 6.1.3. POST /v1/completions
**Purpose:** Generate text completions using completion-based models (legacy endpoint, primarily for non-chat models).

**Request:**
```bash
curl -X POST http://localhost:1234/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "The correlation coefficient between RPM and torque is",
    "max_tokens": 50,
    "temperature": 0.5
  }'
```

**Request Parameters:**
- `model` (string, required): Model identifier
- `prompt` (string or array, required): Text prompt to complete
- `max_tokens` (integer, optional): Maximum tokens to generate
- `temperature` (float, optional): Sampling temperature (0.0-2.0)
- `top_p` (float, optional): Nucleus sampling (0.0-1.0)
- `n` (integer, optional): Number of completions to generate
- `stream` (boolean, optional): Enable streaming responses
- `stop` (string or array, optional): Stop sequences
- `frequency_penalty` (float, optional): Reduce repetition (-2.0 to 2.0)
- `presence_penalty` (float, optional): Encourage new topics (-2.0 to 2.0)

**Response:**
```json
{
  "id": "cmpl-abc123",
  "object": "text_completion",
  "created": 1234567890,
  "model": "gpt-3.5-turbo-instruct",
  "choices": [
    {
      "text": " 0.87, indicating a strong positive relationship.",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 12,
    "total_tokens": 22
  }
}
```

**Use Cases:**
- Text completion tasks
- Code snippet generation
- Legacy model compatibility
- Simple prompt-completion workflows
- Single-turn text generation

**Note:** Prefer `/v1/chat/completions` for new implementations as it provides better conversation handling, tool integration, and multi-turn context support.

---

#### 6.1.4. POST /v1/embeddings
**Purpose:** Generate vector embeddings for text inputs. Used for semantic search, similarity matching, and RAG (Retrieval-Augmented Generation) systems.

**Request:**
```bash
curl -X POST http://localhost:1234/v1/embeddings \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-ada-002",
    "input": "RPM signal correlation analysis"
  }'
```

**Request Parameters:**
- `model` (string, required): Embedding model identifier (typically contains "embed" in name)
- `input` (string or array, required): Text(s) to embed (supports batching)
- `encoding_format` (string, optional): Format for embeddings (`float` or `base64`)

**Response:**
```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [0.0123, -0.0456, 0.0789, ...],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 5,
    "total_tokens": 5
  }
}
```

**Use Cases:**
- Semantic search for similar queries in conversation history (e.g., "find queries similar to 'analyze RPM in MDF'")
- RAG context retrieval for domain knowledge about MDF signal analysis
- Query similarity matching for learning systems (learns from past MDF analysis queries)
- Signal name fuzzy matching and aliasing (e.g., "RPM" vs "EngineSpeed" in MDF files)
- Document clustering and classification of MDF analysis queries
- Finding similar diagnostic scenarios across different MDF files

**Platform Integration:**
- **Note:** The platform primarily uses local `sentence-transformers` library (`all-MiniLM-L6-v2`) for embeddings via `bots/databot/rag.py`
- The `/v1/embeddings` endpoint can be used as an alternative when LLM server provides embedding models
- Used for query similarity search in RAG system
- Powers the learning system to find similar past queries
- Enables context-aware responses based on historical interactions
- Supports vector database operations (ChromaDB) for efficient retrieval
- Integrates with Gemini File Search for domain knowledge
- Falls back to simple character-level embeddings if sentence-transformers unavailable

**Best Practices:**
- Use embedding models specifically designed for embeddings (not chat models)
- Batch multiple texts in single request for efficiency (up to 2048 texts)
- Normalize embeddings for cosine similarity calculations
- Cache embeddings for frequently accessed content
- Use consistent embedding model for comparison accuracy
- Platform uses `normalize_embeddings=True` for better similarity matching

---

#### 6.1.5. POST /v1/responses (Custom Extension)
**Purpose:** Custom endpoint for structured response generation with tool calling support. May be available in some LLM providers for advanced function calling and structured outputs.

**Request:**
```bash
curl -X POST http://localhost:1234/v1/responses \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-r1:7b",
    "messages": [
      {"role": "user", "content": "Plot RPM signal from 0-120 seconds"}
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "plot",
          "description": "Plot a signal over a time range",
          "parameters": {
            "type": "object",
            "properties": {
              "signal": {
                "type": "string",
                "description": "Signal name to plot"
              },
              "time_range": {
                "type": "string",
                "description": "Time range in format 'start-end'"
              }
            },
            "required": ["signal", "time_range"]
          }
        }
      }
    ],
    "tool_choice": "auto"
  }'
```

**Request Parameters:**
- `model` (string, required): Model identifier
- `messages` (array, required): Conversation messages
- `tools` (array, optional): Available tools/functions for calling
- `tool_choice` (string, optional): Tool selection mode (`auto`, `none`, or specific tool object)
- `temperature` (float, optional): Sampling temperature
- `max_tokens` (integer, optional): Maximum tokens to generate

**Response:**
```json
{
  "id": "resp-abc123",
  "object": "response",
  "created": 1234567890,
  "model": "deepseek-r1:7b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_abc123",
            "type": "function",
            "function": {
              "name": "plot",
              "arguments": "{\"signal\": \"RPM\", \"time_range\": \"0-120\"}"
            }
          }
        ]
      },
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 15,
    "total_tokens": 40
  }
}
```

**Use Cases:**
- Tool/function calling for Data Bot operations
- Structured response generation
- Multi-step reasoning with tool execution
- Advanced agent workflows
- Automated tool selection and parameter extraction

**Note:** 
- Availability depends on LLM provider - this endpoint is not standard OpenAI API
- Most providers support tool calling through `/v1/chat/completions` with `tools` parameter (recommended)
- The platform uses `/v1/chat/completions` for function calling, not `/v1/responses`
- This endpoint may be available in some custom LLM server implementations for structured outputs
- Check your LLM provider documentation for availability

---

### 6.2. LLM Endpoint Integration Guide

**Error Handling:**

Common HTTP status codes and solutions:

- **400 Bad Request**: Invalid parameters or malformed request
  - *Common causes*: Invalid `max_tokens` (must be > 0), malformed JSON, model not loaded
  - *Solution*: Verify request format, check parameter types, ensure model is loaded in LM Studio (Chat tab → Model status: READY)
  - *Platform behavior*: Returns helpful error message suggesting model reload if needed

- **401 Unauthorized**: Missing or invalid API key (for cloud providers)
  - *Solution*: Set `DEEPSEEK_API_KEY` or verify API key validity
  - *Platform behavior*: Falls back to next available LLM client

- **404 Not Found**: Endpoint not available or model not loaded
  - *Common causes*: LLM server not running, wrong base URL, endpoint path incorrect
  - *Solution*: Ensure LLM server is running, model is loaded, endpoint URL is correct
  - *Platform behavior*: Provides curl command to test `/v1/models` endpoint

- **429 Too Many Requests**: Rate limit exceeded
  - *Solution*: Implement exponential backoff, reduce request frequency, check rate limits
  - *Platform behavior*: Automatic retry with exponential backoff (2s, 4s, 8s, 16s, 32s)

- **500 Internal Server Error**: LLM server error
  - *Common causes*: Model crashed, insufficient memory, invalid model parameters
  - *Solution*: Check server logs, verify model compatibility, restart LLM server, reload model
  - *Platform behavior*: Provides specific error message if model crash detected

- **Timeout Errors**: Request exceeds timeout limit
  - *Platform timeout*: 300 seconds (5 min) for first attempt, 180 seconds (3 min) for retries
  - *Solution*: Use faster model, reduce `max_tokens`, check system resources (RAM/CPU)

**Retry Strategy:**
The platform implements exponential backoff retry logic:
- Initial delay: 2 seconds
- Maximum attempts: 5
- Backoff multiplier: 2x per attempt (delays: 2s, 4s, 8s, 16s, 32s)
- Total max wait: ~62 seconds
- Retries on: HTTP errors (400, 429, 500, 502, 503, 504), timeouts, connection errors
- Timeout per attempt: 300s (first), 180s (retries)
- Logs each retry attempt with wait time

**Testing Endpoints:**
```bash
# Test models endpoint
curl http://localhost:1234/v1/models

# Test chat endpoint (minimal)
curl -X POST http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model",
    "messages": [{"role": "user", "content": "test"}]
  }'

# Test chat endpoint with MDF query example
curl -X POST http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model",
    "messages": [
      {"role": "system", "content": "You are an automotive diagnostics expert."},
      {"role": "user", "content": "List all signals in the uploaded MDF files"}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }'

# Test embeddings endpoint
curl -X POST http://localhost:1234/v1/embeddings \
  -H "Content-Type: application/json" \
  -d '{
    "model": "embedding-model",
    "input": "analyze RPM signal correlation in MDF data"
  }'

# Test completions endpoint
curl -X POST http://localhost:1234/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model",
    "prompt": "The correlation coefficient between RPM and torque in the MDF file is",
    "max_tokens": 50
  }'
```

**Monitoring:**
- Check `logs/server.log` for LLM request/response logs
- Monitor token usage for cost optimization (`usage.total_tokens`)
- Track response times for performance tuning
- Review error rates for reliability assessment
- Use `/v1/models` endpoint to verify model availability

**Performance Optimization:**
- Batch embedding requests when possible
- Use streaming for long responses (`stream: true`)
- Cache model responses for repeated queries
- Set appropriate `max_tokens` to avoid unnecessary generation
- Use lower `temperature` for deterministic outputs

**Security Considerations:**
- Never commit API keys to version control
- Use environment variables for sensitive credentials
- Validate and sanitize user inputs before sending to LLM
- Monitor API usage to detect anomalies
- Implement rate limiting for production deployments

---

### 7. Key Use Cases for Diagnostics Engineers
1. **Rapid Fault Isolation**
   - Upload incident MDF, run DFC analysis, inspect correlated signals, export findings.
2. **Calibration Verification**
   - Generate empirical maps, compare with baseline surfaces, validate coverage thresholds.
3. **Drive Cycle Compliance**
   - Execute drive cycle module, review adherence to WLTP/FTP standards, export summary report.
4. **Gear Hunt Investigation**
   - Use gear hunting module with time filters, cross-check throttle and torque behavior.
5. **Fuel Efficiency Studies**
   - Analyze fuel rate trends, overlay environmental conditions, compute efficiency metrics via Data Bot.
6. **Custom Signal Diagnostics**
   - Utilize Playground for bespoke plots, combine with Data Bot filtering commands, archive results.

---

### 8. Best Practices & Recommendations
- Maintain a clean `uploads/` directory; purge obsolete sessions (`POST /api/delete_all`) to reduce clutter.
- Standardize signal naming or update `data/signal_catalog.json` to ensure alias coverage across datasets.
- Adopt agreed bin definitions for empirical maps to align with OEM calibration tables.
- Schedule recurring exports of `data/vehiclelab.duckdb` for backup and cross-team sharing.
- Review `logs/server.log` after each analytics session to confirm successful execution and detect anomalies.
- Integrate manual QA: validate key plots, cross-reference with raw MDF viewer, and document assumptions in reports.

---

### 9. Support & Escalation
- **Self-Service Resources:** `docs/DASHBOARD_USER_GUIDE.md`, `docs/QUICK_REFERENCE.md`, `docs/SUPPORTED_QUERIES_COMPLETE.md`
- **Logs:** `logs/server.log`, `logs/server-8000.log`, `logs/advanced_test_output.log`, `logs/training_*`
- **Data Bot Memory Reset:** Clear `data/conversation_memory.json` if chat context drifts.
- **Contact Workflow:** Route unresolved issues to internal platform SME or vendor support with exported logs and sample files.

---

### 10. Appendix
- **Environment Variables:** `MAX_UPLOAD_SIZE_MB`, `MAX_FILES`, `OVERSHOOT_MARGIN_KMH`, `DFC_CODE_PLOT_MAX`, `BACKEND_DEBUG`, `GEMINI_API_KEY`, LLM keys.
- **Directory Quick Reference:**  
  `blueprints/` (API routes), `core/` (storage utilities), `custom_modules/` (analytics engines), `bots/databot/` (AI assistant), `training/` (LLM pipeline), `docs/` (knowledge base).
- **Sample Data:** `data/samples/` for quick demonstrations; `test_data/` for regression scenarios.
- **Change Logs:** Track updates via `docs/IMPLEMENTATION_COMPLETE.md`, `docs/FINAL_CODE_REVIEW_COMPLETE.md`, `docs/COMPREHENSIVE_IMPROVEMENTS_COMPLETE.md`.

---

**Deliver performance-driven diagnostics with confidence.**  
For questions or enhancement requests, document findings and engage your support liaison or platform owner.

