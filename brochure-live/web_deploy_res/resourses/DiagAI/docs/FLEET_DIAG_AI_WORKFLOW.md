# 🚀 Complete Fleet Diagnostics AI Workflow

## ✅ Complete Implementation - Automotive Fleet Data Analysis Tool

### 🎯 Overview
This is now the **most advanced automotive fleet diagnostics AI tool** that automatically indexes signals on upload and uses LLM to generate comprehensive insights for both CI (Compression Ignition/Diesel) and SI (Spark Ignition/Gasoline) engines.

## 🔄 Complete Workflow

### 1. **File Upload & Automatic Signal Indexing** ✅

**When user uploads MDF/MF4 files:**
1. Files are saved to `uploads/` directory
2. **Automatic signal extraction** happens immediately:
   - All signals are extracted from MDF files using `asammdf`
   - Signals are stored in DuckDB database with metadata:
     - `trip_id`: File identifier
     - `t`: Time in seconds
     - `name`: Signal name (canonical)
     - `value`: Signal value
     - `unit`: Unit of measurement
     - `ecu`: ECU source (ECM, TCM, ABS, etc.)
     - `bus`: CAN bus (CAN, LIN, FlexRay)
     - `meta`: Additional metadata
3. **Signal catalog is updated** with all discovered signals
4. **Signals are immediately available** for LLM analysis

**Code Location:**
- `bots/databot/auto_index.py` - Automatic indexing functions
- `app.py` (line ~3990) - Hooked into `smart_merge_upload` endpoint

### 2. **Intelligent Signal Matching** ✅

**Problem Solved:** Case-insensitive and fuzzy matching
- "Throttle", "THROTTLE", "throttle" all work
- Partial matches work: "throttle" matches "ThrottlePosition"
- Word boundary matching for complex names

**Implementation:**
- `_find_signal_name()` in `bots/databot/tools.py`
- Used by all analysis functions automatically

### 3. **LLM-Powered Analysis** ✅

**The LLM can now:**
1. **Discover signals** using `list_signals()`
2. **Get statistics** using `stats()`
3. **Analyze relationships** using `correlation()`, `compare_signals()`
4. **Filter data** using `filter_by_condition_complex()` for multi-signal queries
5. **Generate insights** using `generate_insights()` for comprehensive analysis
6. **Create visualizations** using `plot()`, `analyze_map()`, `analyze_bsfc()`

**LLM Capabilities:**
- Understands automotive terminology (CI/SI engines, BSFC, AFR, lambda, etc.)
- Applies MATLAB-style analysis patterns
- Generates engineering insights
- Identifies anomalies and optimization opportunities
- Compares fleet vehicles
- Suggests further analysis

### 4. **Comprehensive Analysis Functions** ✅

#### Basic Operations
- `list_signals()` - Discover available signals
- `get_trips()` - List all trips
- `stats()` - Comprehensive statistics

#### Advanced Analysis
- `compare_signals()` - Side-by-side comparison
- `correlation()` - Pearson/Spearman correlation
- `correlation_matrix()` - Multi-signal correlation heatmap
- `distribution()` - Histograms and distributions
- `outliers()` - Anomaly detection

#### Complex Conditional Queries
- `filter_by_condition()` - Single signal filtering
- `filter_by_condition_complex()` - Multi-signal with AND/OR operators
  - Example: `"rpm<2000 & torque>150"`
  - Automatically generates instant plots

#### Engine Analysis
- `analyze_map()` - Engine map (RPM vs Torque) with power visualization
- `analyze_bsfc()` - BSFC efficiency analysis
- `power_calculation()` - Engine power from RPM and torque
- `efficiency_metrics()` - Fuel efficiency analysis

#### LLM-Powered Insights
- `generate_insights()` - Comprehensive data collection for LLM analysis
  - Collects statistics, correlations, time series data
  - Prepares data for deep LLM analysis
  - Supports: comprehensive, fleet, performance, efficiency, anomaly analysis

#### Visualization
- `plot()` - Single signal plots
- `plot_multiple()` - Multi-signal plots with subplots
- `scatter_plot()` - Correlation visualization
- `heatmap()` - 3D signal relationships

## 📊 Example Queries & Responses

### Basic Queries
```
"list signals"
→ Returns all available signals with units and ECU info

"stats for throttle"
→ Returns comprehensive statistics (mean, min, max, std, percentiles)

"plot RPM"
→ Generates time series plot
```

### Complex Conditional Queries
```
"rpm<2000 & torque>150"
→ Filters data where RPM < 2000 AND Torque > 150
→ Returns statistics and instant plot

"rpm>=1500 & rpm<=3000 & torque>100"
→ Multiple conditions with instant visualization
```

### Advanced Analysis
```
"analyze engine map"
→ Creates 4-panel dashboard: Engine map, Power map, BSFC/torque distribution, Operating points

"show me BSFC map"
→ Detailed BSFC efficiency analysis with contour plots

"generate insights for RPM, Torque, Throttle"
→ LLM analyzes patterns, correlations, anomalies, and provides engineering insights
```

### Fleet Analysis
```
"compare vehicles in my fleet"
→ Uses get_trips() to find all vehicles
→ Compares statistics across trips
→ LLM identifies patterns and differences

"analyze fuel efficiency across fleet"
→ Uses generate_insights() with analysis_type="fleet"
→ LLM provides fleet-wide efficiency analysis
```

## 🔧 Technical Architecture

### Signal Storage
- **Database:** DuckDB (`data/vehiclelab.duckdb`)
- **Schema:** Optimized for analytics with indexes on trip_id, name, and time
- **Format:** Long format (time-series friendly)

### Signal Catalog
- **Location:** `data/signal_catalog.json`
- **Purpose:** Metadata about signals (units, descriptions, aliases)
- **Auto-updated:** When files are indexed

### LLM Integration
- **Clients:** DeepSeek, LM Studio, Ollama (priority order)
- **Function Calling:** 28 registered tool functions
- **Context:** Enhanced prompts with automotive knowledge
- **Memory:** Conversation history and RAG for similar queries

## 🎯 Key Features

### ✅ Automatic Signal Indexing
- **No manual ingestion needed** - signals are indexed automatically on upload
- **Immediate availability** - signals ready for analysis right after upload
- **Complete metadata** - units, ECU, bus information preserved

### ✅ Intelligent Signal Matching
- **Case-insensitive** - "Throttle" = "THROTTLE" = "throttle"
- **Fuzzy matching** - finds signals even with partial names
- **Word boundary matching** - handles complex signal names

### ✅ Complex Conditional Queries
- **Multi-signal filtering** - "rpm<2000 & torque>150"
- **AND/OR operators** - supports complex logic
- **Instant plots** - automatic visualization

### ✅ LLM-Powered Insights
- **Engineering interpretation** - understands automotive context
- **Pattern recognition** - identifies anomalies and trends
- **Optimization suggestions** - recommends improvements
- **Fleet comparison** - compares multiple vehicles

### ✅ Comprehensive Analysis
- **CI Engine Support** - Compression ignition specific metrics
- **SI Engine Support** - Spark ignition specific metrics
- **BSFC Analysis** - Fuel efficiency evaluation
- **Engine Maps** - Operating point visualization

## 🚀 Usage Flow

1. **Upload Files**
   - User uploads MDF/MF4 files via web interface
   - Signals automatically extracted and indexed
   - Available immediately for analysis

2. **Query Diag AI**
   - User asks questions in natural language
   - LLM identifies relevant signals
   - Tools are called to get actual data
   - LLM generates insights from data

3. **Get Insights**
   - Statistics, correlations, visualizations
   - Engineering interpretation
   - Anomaly detection
   - Optimization recommendations

## 📈 Example LLM Response

**User:** "What can you tell me about my fleet data?"

**Diag AI:**
1. Calls `list_signals()` → Finds 4 signals: RPM, Torque, Throttle, VehicleSpeed
2. Calls `stats()` for each signal → Gets statistics
3. Calls `correlation()` for related pairs → Gets relationships
4. Calls `generate_insights()` → Comprehensive analysis
5. **LLM generates response:**
   ```
   Based on your uploaded fleet data, I've analyzed 4 signals across your vehicle:
   
   **Engine Performance:**
   - RPM ranges from 800-6000 RPM with mean of 2450 RPM
   - Torque shows strong correlation (0.85) with RPM, indicating good engine response
   - Throttle position correlates well (0.78) with both RPM and Torque
   
   **Operating Patterns:**
   - Vehicle spends 35% of time at RPM < 2000 (idle/low load)
   - High torque (>150 Nm) occurs primarily at 2000-4000 RPM range
   - This suggests efficient low-end torque characteristics
   
   **Recommendations:**
   - Consider analyzing BSFC at different operating points for efficiency optimization
   - The strong RPM-Torque correlation indicates healthy engine operation
   - Monitor throttle response for any anomalies in high-load conditions
   ```

## ✅ Complete Feature List

- ✅ Automatic signal indexing on upload
- ✅ Case-insensitive signal matching
- ✅ Complex conditional queries (multi-signal with AND/OR)
- ✅ Engine map analysis (RPM vs Torque)
- ✅ BSFC efficiency analysis
- ✅ LLM-powered insight generation
- ✅ Fleet comparison capabilities
- ✅ CI/SI engine specific analysis
- ✅ Comprehensive visualization
- ✅ Anomaly detection
- ✅ Optimization recommendations

## 🎉 Result

**The Diag AI is now a complete automotive fleet diagnostics tool that:**
1. **Automatically indexes** all signals when files are uploaded
2. **Intelligently matches** signal names (case-insensitive, fuzzy)
3. **Analyzes data** using comprehensive tools
4. **Generates insights** using LLM-powered analysis
5. **Supports both CI and SI engines** with specialized analysis
6. **Provides actionable recommendations** based on actual data

**No manual ingestion needed - just upload and ask questions!**

