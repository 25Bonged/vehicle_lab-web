# 🔄 VEHICLE-LAB Complete Workflow Guide

This document provides detailed workflows for using VEHICLE-LAB for vehicle diagnostic analysis.

---

## 📋 Table of Contents

1. [Quick Start Workflow](#quick-start-workflow)
2. [File Upload Workflow](#file-upload-workflow)
3. [Empirical Map Generation Workflow](#empirical-map-generation-workflow)
4. [Misfire Detection Workflow](#misfire-detection-workflow)
5. [Gear Hunting Analysis Workflow](#gear-hunting-analysis-workflow)
6. [Fuel Consumption Analysis Workflow](#fuel-consumption-analysis-workflow)
7. [Signal Analysis Workflow](#signal-analysis-workflow)
8. [Report Generation Workflow](#report-generation-workflow)

---

## 🚀 Quick Start Workflow

### Step 1: Launch Dashboard
```bash
cd backend_mdf
python3 launch_dashboard.py
```

**Expected Output:**
```
🚀 Starting MDF Analytics Dashboard...
📁 Working directory: /path/to/backend_mdf
✅ App imported successfully
🌐 Starting server on http://localhost:8000
📊 Dashboard will be available at: http://localhost:8000
```

### Step 2: Access Dashboard
- Open browser: **http://localhost:8000**
- You should see the main dashboard interface

### Step 3: First Analysis
1. **Upload File** → Drag & drop MDF file
2. **Select Signals** → Choose signals to analyze
3. **Run Analysis** → Click analysis button
4. **View Results** → Interactive plots appear

---

## 📤 File Upload Workflow

### Supported Formats
- ✅ **MDF/MF4**: ASAM MDF v3.x and v4.x
- ✅ **CSV**: Comma-separated values
- ✅ **Excel**: .xlsx, .xls files

### Upload Steps

```
┌─────────────────────────────────────┐
│  1. Navigate to Dashboard           │
│     http://localhost:8000           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Locate Upload Area              │
│     - Drag & drop zone visible      │
│     - Or click "Choose File"        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. Select File(s)                  │
│     - Single file or multiple        │
│     - Max size: 200MB per file      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  4. Upload Progress                 │
│     - Progress bar shows status     │
│     - Chunked upload for large files│
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  5. File Processing                 │
│     - Auto signal detection         │
│     - DBC file matching             │
│     - Channel list generation       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  6. Ready for Analysis              │
│     - File appears in "Files" tab    │
│     - Channels available            │
└─────────────────────────────────────┘
```

### Upload Best Practices
- ✅ Use compressed MDF files when possible
- ✅ Ensure files are valid ASAM MDF format
- ✅ Check file size before upload (200MB limit)
- ✅ Wait for upload completion before proceeding

---

## 📊 Empirical Map Generation Workflow

### Complete Workflow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│            Empirical Map Generation Workflow                  │
└──────────────────────────────────────────────────────────────┘

STEP 1: SELECT MAP TEMPLATE
   ┌──────────────────────────┐
   │ Choose from:              │
   │ • BSFC Map                │
   │ • Thermal Efficiency      │
   │ • BMEP Map                │
   │ • Volumetric Efficiency   │
   │ • Emission Maps            │
   └───────────┬──────────────┘
               │
               ▼
STEP 2: CONFIGURE SIGNALS
   ┌──────────────────────────┐
   │ X-Axis Signal:            │
   │ [Select: Engine RPM]      │
   │                           │
   │ Y-Axis Signal:            │
   │ [Select: Engine Load]     │
   │                           │
   │ Z-Axis/Output Signal:     │
   │ [Auto-selected by template│
   └───────────┬────────────────
               │
               ▼
STEP 3: SET INTERPOLATION METHOD
   ┌──────────────────────────┐
   │ • Kriging (Recommended)  │
   │   - Gaussian Process      │
   │   - Uncertainty quant.    │
   │                           │
   │ • RBF (Radial Basis)      │
   │   - Thin-plate spline     │
   │                           │
   │ • Cubic Spline            │
   │   - High-order polynomial │
   │                           │
   │ • Linear                  │
   │   - Fast basic interp.    │
   └───────────┬───────────────┘
               │
               ▼
STEP 4: DATA QUALITY FILTERING
   ┌──────────────────────────┐
   │ • Steady-State Detection │
   │   - Filters transients   │
   │                           │
   │ • Outlier Removal        │
   │   - Modified Z-score     │
   │   - IQR method           │
   │                           │
   │ • Data Validation        │
   │   - Statistical checks    │
   └───────────┬───────────────┘
               │
               ▼
STEP 5: MAP GENERATION
   ┌──────────────────────────┐
   │ Processing...             │
   │ • Data binning           │
   │ • Interpolation          │
   │ • Quality metrics calc. │
   └───────────┬───────────────┘
               │
               ▼
STEP 6: VISUALIZATION
   ┌──────────────────────────┐
   │ • 2D Heatmap             │
   │ • 3D Surface Plot        │
   │ • Auto-zoom enabled     │
   │ • Interactive Plotly      │
   └───────────┬──────────────┘
               │
               ▼
STEP 7: EXPORT RESULTS
   ┌──────────────────────────┐
   │ Export Formats:           │
   │ • JSON                    │
   │ • CSV                     │
   │ • Excel                   │
   │ • MATLAB (.mat)           │
   └───────────────────────────┘
```

### Detailed Step-by-Step

#### Step 1: Navigate to Empirical Map Section
1. Open dashboard: `http://localhost:8000`
2. Click **"Empirical Map"** tab in navigation

#### Step 2: Select File
1. Choose uploaded MDF file from dropdown
2. System auto-detects available signals

#### Step 3: Choose Map Template
```
BSFC Map (Brake Specific Fuel Consumption)
├─ X-axis: Engine RPM
├─ Y-axis: Engine Load (BMEP)
└─ Z-axis: Fuel Consumption Rate

Thermal Efficiency Map
├─ X-axis: Engine RPM
├─ Y-axis: Engine Load
└─ Z-axis: Thermal Efficiency (calculated)
```

#### Step 4: Select Signals
- **X-Axis Signal**: Usually `EngineRPM`, `RPM`, or similar
- **Y-Axis Signal**: Usually `EngineLoad`, `BMEP`, `Torque`, or similar
- System suggests signals based on template

#### Step 5: Configure Interpolation
- **Kriging** (Recommended): Best for sparse data, includes uncertainty
- **RBF**: Smooth surfaces, good for dense data
- **Cubic Spline**: High accuracy, may overshoot
- **Linear**: Fast, basic interpolation

#### Step 6: Set Parameters
- **Grid Resolution**: 50x50 (default), 100x100 (high-res)
- **Steady-State Threshold**: Filter transients
- **Outlier Sensitivity**: Z-score threshold

#### Step 7: Generate Map
- Click **"Generate Map"** button
- Progress bar shows processing status
- Processing time: 10-60 seconds depending on data size

#### Step 8: View Results
- **2D Heatmap**: Color-coded map with contours
- **3D Surface**: Interactive 3D visualization
- **Quality Metrics**: R², RMSE, MAE displayed
- **Validation Plots**: Observed vs predicted, residuals

#### Step 9: Export
- Click **"Export"** button
- Choose format: JSON/CSV/Excel/MATLAB
- File downloads automatically

---

## ⚡ Misfire Detection Workflow

### Complete Workflow

```
┌─────────────────────────────────────────────────┐
│         Misfire Detection Workflow               │
└─────────────────────────────────────────────────┘

1. UPLOAD MDF FILE
   ┌────────────────────┐
   │ Contains:          │
   │ • Crankshaft data  │
   │ • Camshaft data   │
   │ • RPM signals     │
   └───────┬────────────┘
           │
           ▼
2. NAVIGATE TO MISFIRE SECTION
   ┌────────────────────┐
   │ Select "Misfire    │
   │ Detection" tab     │
   └───────┬────────────┘
           │
           ▼
3. AUTO-SELECT SIGNALS
   ┌────────────────────┐
   │ System detects:    │
   │ • Crankshaft pos.  │
   │ • Angular velocity │
   │ • Engine RPM       │
   └───────┬────────────┘
           │
           ▼
4. RUN 9 DETECTION ALGORITHMS
   ┌────────────────────┐
   │ Algorithm 1:       │
   │ Crankshaft Variance│
   │                    │
   │ Algorithm 2:       │
   │ FFT Analysis       │
   │                    │
   │ Algorithm 3:       │
   │ Statistical Anomaly│
   │ ... (6 more)       │
   └───────┬────────────┘
           │
           ▼
5. COMBINE RESULTS
   ┌────────────────────┐
   │ • Event detection  │
   │ • Severity scoring │
   │ • Confidence levels│
   └───────┬────────────┘
           │
           ▼
6. VISUALIZE RESULTS
   ┌────────────────────┐
   │ • Misfire events    │
   │ • Time-series plots │
   │ • Frequency analysis│
   │ • Severity heatmap  │
   └─────────────────────┘
```

### Detailed Steps

#### Step 1: Prepare MDF File
- Ensure file contains crankshaft/camshaft signals
- Typical signals: `CrankshaftPosition`, `AngularVelocity`, `EngineRPM`

#### Step 2: Upload and Navigate
1. Upload MDF file (see File Upload Workflow)
2. Click **"Misfire Detection"** tab

#### Step 3: Signal Selection
- System auto-detects required signals
- If missing, manually select:
  - Crankshaft position signal
  - Angular velocity signal
  - Engine RPM signal

#### Step 4: Configure Detection
- **Sensitivity**: Low/Medium/High
- **Time Window**: Analysis window size
- **Min Event Duration**: Filter short events

#### Step 5: Run Detection
- Click **"Detect Misfires"**
- All 9 algorithms run in parallel
- Processing time: 30-120 seconds

#### Step 6: Review Results
- **Event List**: Timestamps of misfire events
- **Severity Plot**: Color-coded severity over time
- **Frequency Plot**: Misfire frequency analysis
- **Algorithm Consensus**: Which algorithms detected what

#### Step 7: Export
- Export event list as CSV
- Export plots as images
- Generate PDF report

---

## 🔄 Gear Hunting Analysis Workflow

### Workflow Steps

```
1. UPLOAD TRANSMISSION DATA
   ↓
2. SELECT SIGNALS
   • Vehicle Speed
   • Engine RPM
   • Gear Position (if available)
   ↓
3. RUN CORRELATION ANALYSIS
   • Speed-RPM correlation
   • Frequency analysis
   • Event detection
   ↓
4. VISUALIZE HUNTING EVENTS
   • Multi-signal plots
   • Event markers
   • Frequency spectrograms
```

### Detailed Steps

1. **Upload File** with transmission signals
2. **Select Signals**: Speed, RPM, Gear Position
3. **Configure Analysis**:
   - Correlation threshold
   - Hunting frequency range
   - Event duration filter
4. **Run Analysis**: Click "Analyze Gear Hunt"
5. **View Results**:
   - Time-series with event markers
   - Correlation plots
   - Frequency analysis
6. **Export**: CSV report with events

---

## ⛽ Fuel Consumption Analysis Workflow

### Workflow Steps

```
1. UPLOAD MDF WITH FUEL DATA
   ↓
2. SELECT FUEL SIGNALS
   • Fuel Flow Rate
   • Engine Load
   • Engine RPM
   ↓
3. CALCULATE BSFC
   • Brake Specific Fuel Consumption
   • Operating point mapping
   ↓
4. GENERATE EFFICIENCY MAPS
   • BSFC contour maps
   • Efficiency regions
   ↓
5. ANALYZE CONSUMPTION PATTERNS
   • Fuel economy metrics
   • Consumption vs speed
   • Efficiency trends
```

---

## 📈 Signal Analysis Workflow

### Basic Signal Plotting

```
1. SELECT FILE
   ↓
2. CHOOSE SIGNALS
   • Multi-select signals
   • Time range selection
   ↓
3. CONFIGURE PLOTTING
   • Downsampling method (LTTB/Stride)
   • Downsample factor
   • Plot style
   ↓
4. GENERATE PLOTS
   • Interactive Plotly plots
   • Zoom, pan, hover
   • Export options
```

### Advanced Analysis

- **FFT Analysis**: Frequency domain analysis
- **Statistics**: Mean, std, min, max, percentiles
- **Histograms**: Distribution analysis
- **Normalization**: Signal scaling
- **Filtering**: Low-pass, high-pass filters

---

## 📄 Report Generation Workflow

### Step-by-Step

1. **Complete Analysis**: Run all desired analyses
2. **Navigate to Reports**: Click "Reports" tab
3. **Select Sections**: Choose sections to include
4. **Customize**: Add notes, select format
5. **Generate**: Click "Generate Report"
6. **Download**: PDF/HTML report downloads

### Report Sections Available

- ✅ Executive Summary
- ✅ File Information
- ✅ Signal Analysis
- ✅ Empirical Maps
- ✅ Misfire Detection Results
- ✅ Gear Hunt Analysis
- ✅ Fuel Consumption
- ✅ Appendices (raw data, plots)

---

## 🎯 Best Practices

### General
- ✅ Always verify file format before upload
- ✅ Check signal availability before analysis
- ✅ Use appropriate time ranges for analysis
- ✅ Review data quality metrics

### Empirical Maps
- ✅ Use Kriging for sparse data
- ✅ Enable steady-state filtering
- ✅ Review quality metrics (R², RMSE)
- ✅ Validate with observed vs predicted plots

### Misfire Detection
- ✅ Ensure crankshaft data is present
- ✅ Review all algorithm results
- ✅ Check confidence levels
- ✅ Validate with visual inspection

### Performance
- ✅ Use downsampling for large files
- ✅ Select specific time ranges when possible
- ✅ Close unused browser tabs
- ✅ Monitor system resources

---

## 🐛 Troubleshooting

### Upload Issues
- **File too large**: Use file compression or split files
- **Format error**: Verify ASAM MDF format
- **Upload timeout**: Check network connection

### Analysis Issues
- **Missing signals**: Check signal names, use fuzzy matching
- **Slow processing**: Reduce time range, increase downsampling
- **Memory errors**: Process smaller file chunks

### Visualization Issues
- **Plots not loading**: Clear browser cache, check console
- **Missing data**: Verify signal selection and time range

---

## 📞 Support

For additional help:
- See [DASHBOARD_USER_GUIDE.md](DASHBOARD_USER_GUIDE.md)
- Check [README.md](README.md)
- Open GitHub issue for bugs

---

**Last Updated:** 2025

