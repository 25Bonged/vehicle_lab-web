

';# Complete Dashboard Tools Guide for Diagnostics Engineers

**Version:** 2.0  
**Last Updated:** 2025  
**Target Audience:** Diagnostics Engineers, Calibration Engineers, Vehicle Test Engineers

---

## Table of Contents

1. [Overview](#overview)
2. [File Management Tools](#file-management-tools)
3. [Signal Analysis Tools](#signal-analysis-tools)
4. [Diagnostic Analysis Tools](#diagnostic-analysis-tools)
5. [Advanced Analytics Tools](#advanced-analytics-tools)
6. [Visualization Tools](#visualization-tools)
7. [Report Generation Tools](#report-generation-tools)
8. [Data Bot (AI Assistant) Tools](#data-bot-ai-assistant-tools)
9. [Specialized Diagnostic Agents](#specialized-diagnostic-agents)
10. [Export & Integration Tools](#export--integration-tools)

---

## Overview

The MDF Analytics Dashboard provides a comprehensive suite of tools for vehicle diagnostics engineers to analyze MDF/MF4 files, CSV, and Excel data. The dashboard includes:

- **50+ analysis tools** for signal processing and diagnostics
- **5 specialized diagnostic agents** for automated fault detection
- **Natural language AI assistant** (Data Bot) for intelligent queries
- **Multi-format support**: MDF, MF4, CSV, Excel
- **Real-time visualization** with interactive plots
- **Automated report generation** for compliance and documentation

---

## File Management Tools

### 1. File Upload
**Purpose**: Upload diagnostic data files for analysis

**Supported Formats**:
- MDF v3/v4 (`.mdf`, `.mf4`) - Primary format for vehicle diagnostics
- CSV (`.csv`) - Flexible comma-separated values
- Excel (`.xlsx`, `.xls`) - Microsoft Excel workbooks

**Features**:
- Drag & drop interface
- Multiple file selection
- Automatic format detection
- File size limit: 500 MB per file
- Automatic channel/signal discovery
- Multi-file merging support

**Usage**:
1. Navigate to "Files" tab
2. Drag files or click to browse
3. Files are automatically processed and signals extracted

---

### 2. Channel Discovery
**Purpose**: Automatically discover and list all available signals/channels in uploaded files

**Features**:
- Automatic signal name normalization
- Fuzzy matching for signal aliases
- Presence tracking (which files contain each signal)
- Search and filter functionality
- Signal metadata (units, descriptions)

**Information Displayed**:
- Channel ID (original name)
- Clean name (normalized)
- Presence count (X/Y files)
- File-specific channel lists

---

### 3. File Management
**Purpose**: Manage uploaded files and data

**Features**:
- View all uploaded files with metadata
- Delete individual files
- Delete all files (clear workspace)
- File size and format information
- Upload timestamp tracking

---

## Signal Analysis Tools

### 4. Signal Selection & Plotting
**Purpose**: Select and visualize signals from uploaded data

**Features**:
- Multi-signal selection with checkboxes
- Batch selection (Select All, Clear Selected)
- Search and filter signals
- Persistent selection across searches

**Plot Options**:
- **Include Time**: Use original timestamps (recommended)
- **Exclude Time**: Use sample index as X-axis
- **Normalize**: Scale all signals to 0-1 range
- **Raw Values**: Use original signal values
- **Max Points**: Limit points for performance (default: 10,000)
- **Downsampling Algorithms**:
  - LTTB (Largest-Triangle-Three-Buckets): Best visual quality
  - Stride: Simple decimation (faster)

**Plot Modes**:
- **Standard**: All signals on same plot
- **Subplots**: Each signal in separate subplot
- **Multi-Y**: Multiple Y-axes for different scales

---

### 5. Statistics Tool
**Purpose**: Calculate comprehensive statistics for selected signals

**Statistics Provided**:
- **Basic**: Min, Max, Mean, Median, Std Dev
- **Percentiles**: 25th, 50th, 75th, 90th, 95th, 99th
- **Sample Count**: Number of data points
- **Range**: Min to Max span
- **Variance**: Statistical variance

**Features**:
- Per-signal statistics
- Copy to clipboard functionality
- Time range filtering support
- Export to CSV/Excel

---

### 6. FFT Analysis
**Purpose**: Frequency domain analysis of signals

**Features**:
- Fast Fourier Transform (FFT) computation
- Frequency spectrum visualization
- Amplitude vs frequency plots
- Identification of periodic patterns
- Frequency component analysis

**Use Cases**:
- Vibration analysis
- Periodic fault detection
- Signal quality assessment
- Frequency-based filtering

---

### 7. Histogram Analysis
**Purpose**: Distribution analysis of signal values

**Features**:
- Distribution visualization
- Configurable bin count (default: 50)
- Probability density estimation
- Outlier identification
- Value range analysis

**Use Cases**:
- Understanding signal distributions
- Identifying operating ranges
- Detecting abnormal value clusters
- Statistical quality checks

---

### 8. Correlation Analysis
**Purpose**: Analyze relationships between signals

**Features**:
- **Pearson Correlation**: Linear relationships
- **Spearman Correlation**: Monotonic relationships
- **Correlation Matrix**: Multi-signal correlation heatmap
- **Pairwise Analysis**: Signal-to-signal correlation

**Use Cases**:
- Finding related signals
- Identifying dependencies
- Root cause analysis
- System behavior understanding

---

### 9. Signal Comparison
**Purpose**: Compare multiple signals side-by-side

**Features**:
- Multi-signal overlay plots
- Synchronized time axis
- Statistical comparison
- Visual pattern matching
- Difference analysis

**Use Cases**:
- Before/after comparison
- Multi-sensor validation
- Calibration verification
- Anomaly detection

---

## Diagnostic Analysis Tools

### 10. Misfire Detection
**Purpose**: Advanced engine misfire detection and analysis

**Algorithms**:
1. **Crankshaft Speed Variance Analysis (CSVA)**
   - Detects speed variations indicating misfires
   - Per-cylinder analysis
   - Statistical threshold-based detection

2. **Frequency Domain Analysis (FFT-based)**
   - FFT analysis of RPM signal
   - Frequency component identification
   - Pattern matching for misfire signatures

3. **Signal Fusion**
   - Combines RPM, Lambda, Load, Temperature
   - Multi-signal correlation
   - Enhanced detection accuracy

4. **Statistical Anomaly Detection**
   - Z-score based detection
   - IQR (Interquartile Range) method
   - Hampel filter for outliers

5. **ML-based Detection**
   - Machine learning pattern recognition
   - Trained on misfire patterns
   - Adaptive threshold adjustment

**Outputs**:
- Misfire event list with timestamps
- Per-cylinder misfire count
- Severity classification
- Visualization plots
- Statistical summary

**Usage**: Available via Data Bot: `"detect misfires"` or `"check for misfires"`

---

### 11. DFC (Diagnostic Fault Code) Analysis
**Purpose**: Analyze Diagnostic Trouble Codes (DTCs/DFCs) from vehicle data

**Features**:
- **DTC Code Parsing**:
  - P0/P1/P2/P3 codes (Powertrain)
  - B codes (Body)
  - C codes (Chassis)
  - U codes (Network)
- **Status Byte Decoding**: Freeze frame data, pending/confirmed status
- **Severity Classification**: Critical, High, Medium, Low
- **Temporal Analysis**: Event segments, occurrence patterns
- **Correlation Analysis**: DFC correlation with signals
- **Priority Assessment**: Risk-based prioritization

**Outputs**:
- DFC summary table
- Frequency analysis
- Time-series plots
- Evidence channels (associated signals)
- Severity classification
- Recommendations

**Usage**: Available via Data Bot: `"analyze DTCs"` or `"check fault codes"`

---

### 12. IUPR (In-Use Performance Ratio) Analysis
**Purpose**: Monitor OBD-II compliance and emissions system performance

**Features**:
- **IUPR Ratio Calculation**: Monitor completion ratios
- **Monitor Status Tracking**:
  - Catalyst monitoring
  - Oxygen sensor monitoring
  - EGR monitoring
  - Evaporative system monitoring
  - Misfire monitoring
- **OBD-II Compliance Checking**: Pass/fail status
- **Emissions Monitoring**: Compliance verification
- **Threshold Analysis**: Compare against regulatory limits

**Outputs**:
- IUPR summary table
- Monitor ratios
- Compliance status
- Visualization plots
- Regulatory compliance report

**Usage**: Available via Data Bot: `"check IUPR compliance"` or `"IUPR analysis"`

---

### 13. Gear Hunting Detection
**Purpose**: Detect transmission gear hunting and inefficient shifting

**Features**:
- **Gear Hunting Detection**: Rapid gear oscillations
- **Rapid Shift Detection**: Excessive shift frequency
- **Oscillating Pattern Detection**: Back-and-forth shifting
- **Inefficient Shift Detection**: Suboptimal gear selection
- **Severity Scoring**: Quantify hunting severity
- **Transmission Efficiency Analysis**: Impact on efficiency
- **Multi-signal Correlation**: RPM, Torque, Speed correlation

**Outputs**:
- Hunting event list
- Severity scores
- Shift pattern analysis
- Visualization plots
- Recommendations

**Usage**: Available via Data Bot: `"detect gear hunting"` or `"transmission analysis"`

---

### 14. Cruise Control / Speed Limiter (CC/SL) Analysis
**Purpose**: Analyze cruise control and speed limiter behavior

**Features**:
- **Overshoot Detection**: When vehicle exceeds set speed
- **Response Time Analysis**: Time to reach set speed
- **Stability Analysis**: Speed regulation quality
- **Oscillation Detection**: Speed fluctuations
- **Flag-based Detection**: Uses DFC flags when available
- **Fallback Mode**: Works without flags

**Configuration**:
- Overshoot margin (km/h)
- Flag value threshold
- Fallback mode settings

**Outputs**:
- Overshoot events
- Response time statistics
- Stability metrics
- Visualization plots

---

### 15. Fuel Consumption Analysis
**Purpose**: Comprehensive fuel consumption and efficiency analysis

**Features**:
- **Fuel Flow Rate Analysis**: Real-time fuel consumption
- **BSFC Calculation**: Brake-Specific Fuel Consumption (g/kWh)
- **Efficiency Metrics**: Fuel efficiency calculations
- **Consumption Patterns**: Operating condition analysis
- **Emission Correlation**: Fuel vs emissions relationship

**Outputs**:
- Fuel consumption statistics
- BSFC maps
- Efficiency plots
- Consumption patterns
- Recommendations

**Usage**: Available via Data Bot: `"analyze fuel consumption"` or `"fuel efficiency"`

---

## Advanced Analytics Tools

### 16. Empirical Map Generation
**Purpose**: Generate 2D/3D calibration maps (BSFC, efficiency, etc.)

**Features**:
- **2D Heatmaps**: Color-coded maps
- **3D Surface Plots**: Interactive 3D visualization
- **Contour Plots**: Gradient visualization
- **Preset Configurations**:
  - CI Engine — BSFC
  - SI Engine — Efficiency/AFR
  - Electric Motor — Efficiency
- **Custom Configuration**: Manual signal selection
- **Bin Configuration**: Flexible binning (range or custom values)
- **Interpolation Methods**:
  - Linear (fast)
  - Cubic (smooth)
  - RBF (radial basis function, smoothest)
- **Smoothing**: Noise reduction (0.0-2.0)
- **Min Samples Per Bin**: Quality control

**Workflow**:
1. Select files to include
2. Choose preset or configure manually
3. Set X-axis (typically RPM)
4. Set Y-axis (typically Torque)
5. Set Z-axis (target parameter: BSFC, efficiency, etc.)
6. Configure bins (e.g., `100:6000:500` for RPM)
7. Set quality parameters
8. Generate map

**Outputs**:
- Heatmap visualization
- 3D surface plot
- Map statistics table
- Coverage percentage
- Exportable data (CSV, XLSX)

**Use Cases**:
- Engine calibration
- Efficiency optimization
- Operating point analysis
- Calibration table generation

---

### 17. Engine Map Analysis
**Purpose**: Analyze engine operating maps (RPM vs Torque)

**Features**:
- **RPM vs Torque Visualization**: 2D scatter with power coloring
- **Power Map**: Shows power across RPM range
- **BSFC Map**: When fuel signal provided
- **4-Panel Dashboard**:
  - Engine map
  - Power map
  - BSFC/torque distribution
  - Operating points histogram

**Usage**: Available via Data Bot: `"analyze engine map"` or `"RPM vs torque map"`

---

### 18. BSFC Analysis
**Purpose**: Detailed Brake-Specific Fuel Consumption analysis

**Features**:
- BSFC calculation and visualization
- Contour plots across operating conditions
- Multi-panel plots with statistics
- Efficiency optimization insights

**Usage**: Available via Data Bot: `"analyze BSFC"` or `"fuel efficiency map"`

---

### 19. Gear Analysis
**Purpose**: Analyze transmission gear usage and behavior

**Features**:
- **Gear Usage Statistics**: Time in each gear
- **Gear Change Detection**: Shift events
- **By-Gear Filtering**: Analyze signals per gear
- **Gear-Specific Analysis**: Statistics per gear
- **Shift Quality Analysis**: Shift smoothness

**Usage**: Available via Data Bot:
- `"analyze by gear"` - Gear-specific analysis
- `"gear changes"` - Detect shifts
- `"gear usage"` - Usage statistics

---

### 20. Signal Processing Tools
**Purpose**: Advanced signal processing and filtering

**Filtering**:
- **Lowpass Filter**: Remove high-frequency noise
- **Highpass Filter**: Remove low-frequency drift
- **Bandpass Filter**: Keep specific frequency range
- **Configurable Cutoff**: Adjustable frequency thresholds

**Smoothing**:
- **Moving Average**: Simple smoothing
- **Exponential Smoothing**: Weighted smoothing
- **Configurable Window**: Adjustable window size

**Other Operations**:
- **Rate of Change**: Derivative calculation
- **Integration**: Cumulative sum
- **Peak Detection**: Find local maxima/minima
- **Cross-Correlation**: Signal alignment

**Usage**: Available via Data Bot:
- `"filter signal RPM lowpass cutoff 1.0"`
- `"smooth signal RPM window 10"`
- `"rate of change RPM"`

---

### 21. Outlier Detection
**Purpose**: Identify anomalous data points

**Methods**:
- **IQR Method**: Interquartile Range based
- **Z-Score Method**: Statistical outlier detection
- **Hampel Filter**: Robust outlier detection

**Features**:
- Automatic threshold calculation
- Configurable sensitivity
- Outlier visualization
- Statistical summary

**Usage**: Available via Data Bot: `"outliers RPM"` or `"detect anomalies"`

---

### 22. Distribution Analysis
**Purpose**: Statistical distribution analysis

**Features**:
- Histogram plots
- Box plots
- Violin plots (density + box)
- Statistical measures
- Percentile analysis

**Usage**: Available via Data Bot: `"distribution RPM"` or `"signal distribution"`

---

### 23. Power Calculation
**Purpose**: Calculate engine power from RPM and Torque

**Formula**: Power (kW) = (RPM × Torque) / 9549

**Features**:
- Real-time power calculation
- Power vs RPM plots
- Power statistics
- Efficiency correlation

**Usage**: Available via Data Bot: `"power calculation RPM torque"`

---

### 24. Complex Conditional Filtering
**Purpose**: Filter data using complex multi-signal conditions

**Features**:
- **AND/OR Operators**: `&` (AND), `|` (OR)
- **Multi-Signal Conditions**: Combine multiple conditions
- **Comparison Operators**: `<`, `>`, `<=`, `>=`, `==`, `!=`
- **Automatic Plotting**: Visualizes filtered data

**Examples**:
- `"rpm<2000 & torque>150"` - Low RPM and high torque
- `"rpm<2000 | speed>100"` - Low RPM OR high speed
- `"rpm>=1500 & rpm<=3000 & torque>100"` - Multiple conditions

**Usage**: Available via Data Bot: `"filter rpm<2000 & torque>150"`

---

## Visualization Tools

### 25. Interactive Plotting (Playground)
**Purpose**: Advanced interactive plotting with full control

**Features**:
- **X-Axis Selection**: Choose any signal as X-axis
- **Y-Axis Selection**: One or more signals
- **Z-Axis (3D)**: 3D scatter/surface plots
- **Plot Types**:
  - `scatter`: Line plot
  - `scatter3d`: 3D scatter
  - `surface`: 3D surface
  - `heatmap`: 2D heatmap
  - `histogram`: Distribution
  - `violin`: Distribution with density
  - `box`: Box plot
  - `bar`: Bar chart
- **Time Range Filtering**: `tmin` and `tmax` parameters
- **Downsampling**: LTTB or Stride algorithm
- **Add Mode**: Add traces to existing plot
- **Replace Mode**: Replace all traces

**Use Cases**:
- Custom visualizations
- Multi-signal analysis
- 3D relationship exploration
- Time-filtered analysis

---

### 26. Multi-Signal Plots
**Purpose**: Visualize multiple signals simultaneously

**Features**:
- Overlay plots
- Subplot mode
- Multi-Y axis support
- Synchronized time axis
- Color-coded signals

---

### 27. Scatter Plots
**Purpose**: Analyze relationships between two signals

**Features**:
- X-Y scatter visualization
- Regression line overlay
- Correlation coefficient display
- Density coloring
- Trend analysis

**Usage**: Available via Data Bot: `"scatter plot RPM torque"`

---

### 28. Heatmaps
**Purpose**: 2D color-coded data visualization

**Features**:
- Color-coded intensity
- Configurable color scales
- Interactive zoom/pan
- Value tooltips

**Usage**: Available via Data Bot: `"heatmap RPM torque power"`

---

## Report Generation Tools

### 29. Report Sections
**Purpose**: Generate comprehensive diagnostic reports

**Available Sections**:
1. **Empirical Map**: Calibration maps (BSFC, efficiency, etc.)
2. **DFC Analysis**: Diagnostic trouble code frequency analysis
3. **CC/SL Analysis**: Cruise control / speed limiter behavior
4. **IUPR Analysis**: In-use performance tracking
5. **Gear Hunting**: Transmission gear hunting detection
6. **Custom Analysis**: User-defined analysis

**Features**:
- Section-based report generation
- Multiple plot types per section
- Statistical tables
- Export capabilities

**Usage**: Available via Data Bot:
- `"get fuel consumption report"`
- `"get IUPR report"`
- `"get DFC report"`
- `"get misfire report"`

---

### 30. PDF Export
**Purpose**: Export diagnostic reports to PDF format

**Features**:
- Professional PDF formatting
- Includes all plots and tables
- Analysis summaries
- Downloadable files

**Usage**: Available via Data Bot:
- `"export to PDF"`
- `"generate PDF report"`
- `"save as PDF"`

---

## Data Bot (AI Assistant) Tools

### 31. Natural Language Queries
**Purpose**: Query data using natural language

**Capabilities**:
- Understands technical terminology
- Signal name fuzzy matching
- Complex query parsing
- Multi-step analysis
- Context-aware responses

**Example Queries**:
- `"What's the average RPM?"`
- `"Plot torque vs RPM"`
- `"Find anomalies in speed"`
- `"Analyze engine performance"`
- `"Max torque in each gear"`

---

### 32. Signal Search
**Purpose**: Find signals using natural language

**Features**:
- Case-insensitive matching
- Fuzzy matching (partial names)
- Word boundary matching
- Automatic canonical name resolution

**Usage**: `"list signals"` or `"find RPM signal"`

---

### 33. Comprehensive Analysis
**Purpose**: Deep multi-signal analysis with insights

**Features**:
- Multi-signal correlation
- Pattern identification
- Anomaly detection
- Engineering insights
- Recommendations

**Usage**: `"comprehensive analysis RPM torque throttle"`

---

### 34. Trip Summary
**Purpose**: Generate trip-level summaries

**Features**:
- Trip statistics
- Distance traveled
- Duration
- Key metrics
- Visualization

**Usage**: `"trip summary demo_trip_001"`

---

### 35. Fleet Distance Analysis
**Purpose**: Analyze fleet-level distance metrics

**Features**:
- Total fleet distance
- Average distance rate
- Breakdown by signal
- Visualization

**Usage**: `"fleet distance analysis"`

---

## Specialized Diagnostic Agents

### 36. Misfire Agent
**Purpose**: Advanced misfire detection using multiple algorithms

**Capabilities**:
- CSVA (Crankshaft Speed Variance Analysis)
- FFT-based frequency analysis
- Per-cylinder detection
- Signal fusion (RPM + Lambda + Load + Temp)
- Statistical and ML-based detection

**Usage**: `"analyze with misfire agent"` or `"check for misfires"`

---

### 37. DFC Agent
**Purpose**: Diagnostic Trouble Code analysis with severity classification

**Capabilities**:
- DTC code parsing (P0/P1/P2/P3, B, C, U codes)
- Status byte decoding
- Severity classification
- Temporal analysis
- Correlation analysis

**Usage**: `"analyze with DFC agent"` or `"check DTCs"`

---

### 38. IUPR Agent
**Purpose**: IUPR monitoring and OBD-II compliance analysis

**Capabilities**:
- IUPR ratio calculation
- Monitor status tracking
- OBD-II compliance checking
- Emissions monitoring

**Usage**: `"analyze with IUPR agent"` or `"check IUPR compliance"`

---

### 39. Gear Agent
**Purpose**: Gear hunting and transmission behavior analysis

**Capabilities**:
- Gear hunting detection
- Rapid shift detection
- Oscillating pattern detection
- Transmission efficiency analysis

**Usage**: `"analyze with gear agent"` or `"detect gear hunting"`

---

### 40. WLTP Agent
**Purpose**: WLTP cycle analysis, emissions testing, and fuel consumption

**Capabilities**:
- WLTP cycle classification (Class 1/2/3)
- Phase analysis (Urban, Rural, Motorway)
- CO2 emissions calculation
- Fuel consumption metrics
- RDE compliance checking
- Emissions compliance verification

**Usage**: `"analyze with WLTP agent"` or `"WLTP cycle analysis"`

---

### 41. Diagnostic Orchestrator
**Purpose**: Intelligent multi-agent coordination

**Capabilities**:
- Intelligent query routing
- Multi-agent coordination
- Cross-domain correlation
- Context sharing between agents
- Comprehensive diagnostic analysis

**Usage**: 
- `"analyze with orchestrator"` - Route to appropriate agent(s)
- `"comprehensive diagnostic analysis"` - Run all agents

---

## Export & Integration Tools

### 42. Data Export
**Purpose**: Export analysis results to various formats

**Formats**:
- **CSV**: Tabular data
- **XLSX**: Excel workbook with multiple sheets
- **PNG**: Plot images
- **JSON**: Raw data export
- **PDF**: Professional reports

**Features**:
- Export individual plots
- Export full reports
- Export map data
- Batch export

---

### 43. API Endpoints
**Purpose**: Programmatic access to dashboard functionality

**Key Endpoints**:
- `POST /smart_merge_upload` - Upload files
- `GET /api/channels` - List channels
- `POST /analytics` - Plot signals
- `POST /api/compute_map` - Generate maps
- `POST /api/databot/chat` - Natural language chat
- `GET /api/databot/tools/list` - List all tools

**Use Cases**:
- Automation
- Integration with other tools
- Batch processing
- Custom workflows

---

## Quick Reference: Tool Categories

### Basic Operations
- File Upload
- Channel Discovery
- Signal Selection
- Statistics

### Signal Processing
- FFT Analysis
- Filtering (Lowpass, Highpass, Bandpass)
- Smoothing (Moving Average, Exponential)
- Rate of Change
- Integration
- Peak Detection

### Diagnostic Tools
- Misfire Detection
- DFC Analysis
- IUPR Analysis
- Gear Hunting Detection
- CC/SL Analysis
- Fuel Consumption Analysis

### Advanced Analytics
- Empirical Map Generation
- Engine Map Analysis
- BSFC Analysis
- Gear Analysis
- Correlation Analysis
- Outlier Detection
- Distribution Analysis

### Visualization
- Interactive Plotting
- Multi-Signal Plots
- Scatter Plots
- Heatmaps
- 3D Surface Plots

### AI & Automation
- Natural Language Queries (Data Bot)
- Specialized Diagnostic Agents
- Diagnostic Orchestrator
- Comprehensive Analysis

### Export & Reports
- PDF Export
- CSV/Excel Export
- Report Generation
- API Access

---

## Best Practices for Diagnostics Engineers

### 1. Initial Data Review
- Upload files and verify channel discovery
- Check signal presence across files
- Verify time columns and data quality
- Plot key signals to validate data

### 2. Diagnostic Workflow
1. **Quick Check**: Use Data Bot for initial queries
2. **Signal Analysis**: Plot and analyze relevant signals
3. **Diagnostic Tools**: Run specialized agents (misfire, DFC, etc.)
4. **Correlation**: Find relationships between signals
5. **Report Generation**: Generate comprehensive reports
6. **Export**: Save results for documentation

### 3. Fault Investigation
- Start with DFC analysis to identify codes
- Correlate DFCs with signal anomalies
- Use time filtering to focus on fault windows
- Run specialized agents for detailed analysis
- Generate reports for documentation

### 4. Map Generation
- Use presets for common maps (BSFC, efficiency)
- Ensure good data coverage (>70% map coverage)
- Match bin resolution to calibration tables
- Export maps for ECU calibration import

### 5. Performance Optimization
- Use downsampling for large files
- Limit signal selection to essentials
- Use time filtering to reduce data volume
- Clear cache when switching file sets

---

## Tool Availability Summary

| Tool Category | Count | Access Method |
|--------------|-------|---------------|
| File Management | 3 | Dashboard UI |
| Signal Analysis | 10 | Dashboard UI + Data Bot |
| Diagnostic Analysis | 6 | Data Bot + Specialized Agents |
| Advanced Analytics | 9 | Dashboard UI + Data Bot |
| Visualization | 4 | Dashboard UI + Data Bot |
| Report Generation | 2 | Dashboard UI + Data Bot |
| Data Bot Tools | 5 | Natural Language |
| Specialized Agents | 6 | Data Bot Commands |
| Export & Integration | 2 | Dashboard UI + API |

**Total: 50+ Tools Available**

---

## Getting Started

1. **Start Dashboard**: `python3 launch_dashboard.py`
2. **Access**: Open `http://localhost:8000` in browser
3. **Upload Files**: Drag & drop MDF/CSV/Excel files
4. **Explore Signals**: Browse channels in "Files" tab
5. **Analyze**: Use "Analyse" tab or Data Bot for queries
6. **Generate Reports**: Use "Report" tab for comprehensive analysis

---

## Support & Resources

- **User Guide**: `DASHBOARD_USER_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE.md`
- **API Documentation**: See API endpoints section
- **Troubleshooting**: See user guide troubleshooting section

---

**End of Guide**

For detailed usage instructions, see `DASHBOARD_USER_GUIDE.md`.  
For quick commands, see `QUICK_REFERENCE.md`.

