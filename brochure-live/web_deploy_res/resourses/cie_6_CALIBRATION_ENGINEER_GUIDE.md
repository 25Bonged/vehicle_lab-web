# Calibration Intelligence Engine (CIE)
## Complete User Guide for Calibration Engineers

**Version 9.1.0** | **Last Updated: 2025-10-31**

---

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Quick Start Tutorial](#quick-start-tutorial)
3. [Complete Workflows](#complete-workflows)
4. [Feature Details](#feature-details)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)
7. [Common Use Cases](#common-use-cases)
8. [Reference](#reference)

---

## 🚀 Getting Started

### System Requirements

- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Internet**: Local network connection (server runs on localhost)
- **Data Files**: CSV, Excel, MDF, MATLAB, HDF5, or INCA files

### Starting the System

1. **Navigate to the application directory**:
   ```bash
   cd /path/to/project_25/app/app
   ```

2. **Start the server**:
   ```bash
   python app.py
   ```
   Or using the conda environment:
   ```bash
   miniforge3/envs/cie311/bin/python app.py
   ```

3. **Open your browser**:
   ```
   http://127.0.0.1:5000
   ```

4. **You should see**:
   - Dashboard overview
   - Navigation tabs on the left
   - System status indicators

### First Time Setup

1. **Prepare your data files**:
   - Ensure files are in a supported format
   - Check that data contains numeric columns
   - Verify operating point coverage

2. **Understand the workflow**:
   - Upload data → Train model → Generate DoE → Create maps → Optimize

---

## 🎓 Quick Start Tutorial

### Tutorial: Complete Calibration Workflow in 5 Steps

#### Step 1: Upload Your Dyno Data (2 minutes)

1. Click **"Data Management"** tab (left sidebar)
2. Click **"Choose Files"** button
3. Select your data file(s):
   - Single file: `engine_test_data.csv`
   - Multiple files: Select all to merge
4. Wait for upload (progress bar shows status)
5. **Verify signals appear** in the signal list below

**What to check:**
- ✅ Signal count > 0
- ✅ Sample count reasonable (50+ recommended)
- ✅ Signals have numeric values (not all text)

**Example:**
```
✅ Upload successful
   Signals: 36
   Samples: 100
```

#### Step 2: Train a Model (3-5 minutes)

1. Click **"Model Training"** tab
2. **Select Features** (inputs):
   - Check boxes for: `Speed`, `Load`, `Spark_Advance`
   - Typically select 3-7 features
3. **Select Targets** (outputs):
   - Check boxes for: `Torque`, `BSFC`, `NOx`
   - Select what you want to predict
4. **Configure Training**:
   - Model Type: `Random Forest` (recommended start)
   - Test Split: `20%` (default)
   - Enable: `Feature Engineering`, `Remove Outliers`
5. Click **"Train Model"**
6. **Wait for completion** (progress shown in real-time)

**What to look for:**
- ✅ R² Score > 0.90 (good), > 0.95 (excellent)
- ✅ RMSE reasonable (check units)
- ✅ Training time acceptable (< 2 minutes)

**Example Results:**
```
✅ Model trained successfully
   R² Score: 0.94
   RMSE: 12.5 Nm
   Training Time: 45 seconds
```

#### Step 3: Generate DoE Test Plan (1-2 minutes)

**Option A: Static DoE (for steady-state mapping)**

1. Click **"Advanced DoE"** tab
2. **Add Factors**:
   - Click **"Add Factor"** button
   - Enter factor name: `Speed`
   - Set Min: `1000`, Max: `6000`
   - Repeat for other factors
3. **Select Method**:
   - `Latin Hypercube Sampling` (LHS) - Fast, good coverage
   - `D-Optimal` - Best for regression models
   - `Sobol Sequence` - Optimal space filling
4. **Set Sample Size**: `100` (adjust based on test time)
5. Click **"Generate DoE"**
6. **Review test plan** in the table
7. **Export to CSV** for dyno execution

**Option B: Dynamic DoE (for transient testing)**

1. Click **"Dynamic DoE"** tab
2. **Add Dynamic Factors**:
   - Click **"Add Dynamic Factor"**
   - Factor: `Speed`
   - Nominal: `3000` RPM
   - Amplitude: `±800` RPM
   - Frequency: `0.1 - 2.0` Hz
3. **Set Duration**: `60` seconds
4. **Configure Constraints**:
   - Operating Envelope: Min/Max limits
   - Safety Limits: Hard boundaries
5. Click **"Generate Dynamic Test Plan"**
6. **Review trajectory plot** and test plan table

**Example Output:**
```
✅ DoE Generated
   Samples: 100
   Variables: Speed, Load, Spark
   Export: Ready for dyno
```

#### Step 4: Generate Calibration Maps (2-3 minutes)

1. Click **"Calibration Maps"** tab
2. **Select Trained Model** (dropdown at top)
3. **Configure Map**:
   - Map Name: `Spark_Advance_Map`
   - X-Axis: `Speed` (engine speed)
   - Y-Axis: `Load` (engine load)
   - Target: `Optimal_Spark` (from model prediction)
   - Resolution: `30×30` (900 points)
4. **Quality Settings**:
   - ☑ Enforce Monotonicity (if required)
   - ☑ Apply Smoothing
   - Max Gradient: `0.5`
5. Click **"Generate Map"**
6. **Review in 3 views**:
   - Heatmap (2D view)
   - 3D Surface (interactive)
   - Contour Plot (level curves)
7. **Check Lookup Table** for exact values
8. **Export**:
   - CSV (for Excel)
   - ASAM CDF (standard format)
   - A2L/HEX (for ECU)

**What to verify:**
- ✅ Map values in expected range
- ✅ No discontinuities or spikes
- ✅ Monotonicity (if required)
- ✅ Smooth transitions

#### Step 5: Optimize Calibration (2-5 minutes)

1. Click **"Optimization"** tab
2. **Select Model** (trained model from Step 2)
3. **Define Objective**:
   - Minimize: `BSFC` (fuel consumption)
   - Or Maximize: `Torque` (power)
   - Or Target: `NOx = 0.5` g/kWh
4. **Set Constraints**:
   - Speed: `1500 - 6000` RPM
   - Load: `0.3 - 1.0`
   - Spark: `-10 - 30`° CA
5. **Optimization Method**:
   - `Single Objective` - One target
   - `Multi-Objective` - Multiple targets (trade-offs)
6. Click **"Run Optimization"**
7. **Review Results**:
   - Optimal Parameters
   - Predicted Outcomes
   - Convergence Plot

**Example Output:**
```
✅ Optimization Complete
   Optimal Spark: 18.5° CA
   Optimal Speed: 3000 RPM
   Optimal Load: 0.75
   Predicted BSFC: 245 g/kWh (minimized)
   Predicted NOx: 0.48 g/kWh (within limit)
```

---

## 📋 Complete Workflows

### Workflow 1: New Engine Calibration (Initial Setup)

**Goal**: Create initial calibration maps for a new engine

**Steps**:

1. **Upload Initial Test Data**
   - Upload data from first test campaign
   - Verify data quality (signals, samples)
   - Check for missing values

2. **Train Multiple Models**
   - Train model for Torque prediction
   - Train model for BSFC prediction
   - Train model for NOx prediction
   - Compare model accuracies (Analytics tab)

3. **Generate DoE for Next Campaign**
   - Use D-Optimal or LHS
   - Cover operating space efficiently
   - Export test plan

4. **Execute Tests on Dyno**
   - Follow exported DoE plan
   - Collect measured data

5. **Update Models**
   - Upload new test data
   - Retrain models with expanded dataset
   - Validate improved accuracy

6. **Generate Initial Maps**
   - Create Spark Advance map (Speed × Load)
   - Create Fuel Injection map
   - Create VVT maps

7. **Optimize Maps**
   - Optimize for BSFC
   - Constrain NOx emissions
   - Validate against targets

8. **Export to ECU**
   - Export maps in A2L/HEX format
   - Import into calibration tool (INCA, etc.)

**Timeline**: 1-2 days for initial setup

---

### Workflow 2: Calibration Optimization (Existing Engine)

**Goal**: Improve existing calibration for better performance

**Steps**:

1. **Upload Current Calibration Data**
   - Upload dyno data from current calibration
   - Include operating points and responses

2. **Train High-Accuracy Model**
   - Use Gradient Boosting or Neural Network
   - Enable hyperparameter optimization
   - Target R² > 0.95

3. **Analyze Current Performance**
   - Use Prediction tab to evaluate current settings
   - Identify inefficient operating points
   - Find improvement opportunities

4. **Run Multi-Objective Optimization**
   - Objectives: Minimize BSFC, Minimize NOx
   - Constraints: Operating limits, safety margins
   - Review Pareto frontier (trade-offs)

5. **Generate Optimized Maps**
   - Create updated maps from optimization
   - Compare with original maps
   - Validate improvements

6. **Validate Predictions**
   - Use Prediction tab to verify new settings
   - Check all operating points
   - Ensure physical validity

7. **Export and Test**
   - Export updated maps
   - Test on dyno bench
   - Validate improvements

**Timeline**: 4-8 hours for optimization cycle

---

### Workflow 3: Troubleshooting (Problem Investigation)

**Goal**: Identify and fix calibration issues

**Steps**:

1. **Upload Problem Data**
   - Upload data showing issues (high emissions, poor efficiency)
   - Include related operating points

2. **Train Diagnostic Model**
   - Train model with all available signals
   - Enable feature engineering
   - Review feature importance

3. **Analyze Feature Importance**
   - Go to Analytics tab
   - Review which variables matter most
   - Identify unexpected relationships

4. **Generate Targeted DoE**
   - Focus on problematic region
   - Use higher resolution in critical area
   - Generate specific test points

5. **Test Hypotheses**
   - Use Prediction tab to test different settings
   - Compare predicted vs. actual results
   - Identify root causes

6. **Create Fix Strategy**
   - Generate new maps for problem area
   - Optimize specifically for issue
   - Validate fix predictions

7. **Implement and Validate**
   - Export fixed maps
   - Test on dyno
   - Confirm resolution

**Timeline**: 2-4 hours per issue

---

## 🔧 Feature Details

### Data Management

**Supported Formats**:
- CSV (comma, semicolon, tab separated)
- Excel (.xlsx, .xlsm, .xls)
- MDF (ASAM MDF format)
- MATLAB (.mat)
- HDF5 (.h5)
- INCA DAT files

**Upload Options**:
- Single file upload
- Multiple file upload (auto-merge)
- Drag and drop

**Data Requirements**:
- Minimum 10 samples
- At least 1 numeric signal
- Consistent sampling rate (for time-series)

**Signal Types**:
- Numeric signals (for training/DoE)
- Text columns (for reference, not used in models)

---

### Model Training

**Available Model Types**:

1. **Random Forest** (Recommended Start)
   - Fast training
   - Good accuracy
   - Handles non-linearity
   - Feature importance available

2. **Gradient Boosting**
   - Higher accuracy
   - Slower training
   - Good for complex relationships

3. **Neural Network**
   - Best for large datasets (>500 samples)
   - Complex non-linear relationships
   - Longer training time

4. **Gaussian Process**
   - Uncertainty quantification
   - Good for small datasets
   - Provides confidence intervals

5. **Ensemble**
   - Combines multiple models
   - Most robust
   - Best accuracy

**Training Options**:
- Test Split: 20-30% for validation
- Cross-Validation: 5-fold (recommended)
- Outlier Removal: IQR, Z-score, or Isolation Forest
- Feature Engineering: Polynomials, interactions
- Feature Selection: Automatic (if >10 features)
- Hyperparameter Optimization: Optional (slower, better)

**Success Criteria**:
- R² > 0.90 (acceptable)
- R² > 0.95 (good)
- R² > 0.98 (excellent)
- RMSE < 5% of target range

---

### Design of Experiments (DoE)

**Static DoE Methods**:

1. **Latin Hypercube Sampling (LHS)**
   - Fast generation
   - Good space coverage
   - Random sampling
   - **Use for**: Exploration, initial mapping

2. **Sobol Sequence**
   - Optimal space-filling
   - Deterministic
   - Better coverage than LHS
   - **Use for**: When coverage is critical

3. **D-Optimal**
   - Best for regression models
   - Minimizes prediction variance
   - Slower generation
   - **Use for**: When model is known

4. **Full Factorial**
   - Exhaustive
   - All combinations
   - **Use for**: <3 factors only

5. **Central Composite Design (CCD)**
   - Response surface methodology
   - Efficient for quadratic models
   - **Use for**: Response surface fitting

6. **Box-Behnken**
   - Efficient 3-level design
   - No corner points
   - **Use for**: 3-7 factors, avoid extremes

**Sample Size Guidelines**:
- 50-100: Quick mapping
- 100-200: Standard mapping
- 200-500: High-resolution mapping
- 500+: Full characterization

**Dynamic DoE**:
- Frequency Sweeps: 0.1 - 2.0 Hz typical
- Duration: 30-300 seconds
- Convex Hull: Stay within valid region
- Safety Limits: Hard boundaries + rate limits

---

### Calibration Maps

**Map Types**:
- 2D Maps: Speed × Load (most common)
- 2D Maps: Speed × Temperature
- Custom: Any two variables

**Resolution Guidelines**:
- 20×20: Quick preview (400 points)
- 30×30: Standard (900 points) **Recommended**
- 50×50: High resolution (2500 points)
- Higher: For final calibration only

**Quality Settings**:

1. **Monotonicity**
   - Enforce increasing/decreasing
   - Required for some physical relationships
   - Example: Spark advance should increase with speed

2. **Smoothing**
   - Reduce noise in map
   - Smooth transitions between cells
   - Preserve trends

3. **Gradient Limits**
   - Limit rate of change
   - Prevent sudden jumps
   - Typical: 0.5-1.0 per cell

**Export Formats**:
- CSV: For Excel/MATLAB import
- JSON: For programmatic use
- ASAM CDF: Standard calibration format
- A2L/HEX: Direct ECU import
- INCA: ETAS INCA format

---

### Optimization

**Objective Types**:

1. **Minimize**
   - BSFC (fuel consumption)
   - Emissions (NOx, CO, PM)
   - Cost function

2. **Maximize**
   - Torque
   - Power
   - Efficiency
   - Performance metrics

3. **Target**
   - Specific value (e.g., NOx = 0.5 g/kWh)
   - Constraint satisfaction

**Optimization Methods**:

1. **Single Objective**
   - One target
   - Fast
   - Clear solution
   - **Use for**: Primary optimization

2. **Multi-Objective**
   - Multiple targets
   - Pareto frontier
   - Trade-off analysis
   - **Use for**: Conflicting objectives

3. **Robust Optimization**
   - Considers uncertainty
   - More conservative
   - **Use for**: Production calibration

**Constraint Types**:
- Operating limits: Min/Max values
- Safety limits: Hard boundaries
- Rate limits: Change rates
- Physical constraints: Monotonicity, etc.

---

## 💡 Best Practices

### Data Preparation

✅ **Do**:
- Clean data before upload (remove obvious errors)
- Ensure consistent units across files
- Include all relevant operating conditions
- Label signals clearly

❌ **Don't**:
- Mix different test conditions without noting
- Include corrupted or invalid data
- Use inconsistent signal naming

### Model Training

✅ **Do**:
- Start with Random Forest
- Use 50+ samples minimum
- Enable feature engineering for complex relationships
- Validate with cross-validation

❌ **Don't**:
- Train with <10 samples
- Use too many features (>10 without selection)
- Ignore low R² scores (<0.85)
- Skip outlier removal

### DoE Generation

✅ **Do**:
- Use D-Optimal when model is trained
- Set realistic constraints
- Review coverage plots
- Export in usable format

❌ **Don't**:
- Generate too many points (waste time)
- Ignore safety limits
- Forget to export for dyno
- Skip validation checks

### Map Generation

✅ **Do**:
- Use 30×30 resolution for standard work
- Enable monotonicity when required
- Review in multiple views (2D, 3D)
- Validate against physical expectations

❌ **Don't**:
- Use excessive resolution (>50×50)
- Disable smoothing without reason
- Ignore gradient violations
- Export without validation

### Optimization

✅ **Do**:
- Start with single objective
- Set realistic constraints
- Review convergence plots
- Validate predictions

❌ **Don't**:
- Optimize without constraints
- Ignore convergence issues
- Trust results without validation
- Skip safety margin checks

---

## 🔍 Troubleshooting

### Problem: No Signals Appear After Upload

**Causes**:
- File contains only text columns
- File format not recognized
- Upload failed silently

**Solutions**:
1. Check file format (use CSV or Excel)
2. Verify file has numeric columns
3. Check browser console for errors
4. Try different file format
5. Check server logs

---

### Problem: Training Fails or Low R² Score

**Causes**:
- Insufficient data (<10 samples)
- Poor feature selection
- Data quality issues
- Model type mismatch

**Solutions**:
1. Check sample count (need 50+)
2. Review feature importance
3. Enable feature engineering
4. Try different model type
5. Check for outliers/missing data
6. Increase test data coverage

---

### Problem: DoE Generation Fails

**Causes**:
- Invalid variable ranges
- Missing variable_config
- Method not available

**Solutions**:
1. Check variable ranges (min < max)
2. Verify variable_config format
3. Try different DoE method
4. Check server logs for details

---

### Problem: Map Generation Requires 3+ Signals

**Causes**:
- Map needs: X-axis, Y-axis, Target
- Data has only 2 signals

**Solutions**:
1. Upload data with more signals
2. Use feature engineering to create more features
3. Train model with multiple targets
4. Use interpolation if data is sparse

---

### Problem: Optimization Doesn't Converge

**Causes**:
- Too many constraints
- Conflicting objectives
- Poor initial guess

**Solutions**:
1. Reduce number of constraints
2. Simplify objectives
3. Increase max iterations
4. Try different optimization method
5. Check model accuracy first

---

### Problem: Predictions Seem Wrong

**Causes**:
- Model trained on different data
- Inputs outside training range
- Model accuracy low

**Solutions**:
1. Check model R² score
2. Verify inputs are within training range
3. Retrain with more data
4. Check feature importance
5. Validate with known points

---

## 📚 Common Use Cases

### Use Case 1: Spark Advance Calibration

**Goal**: Optimize spark advance for best efficiency

**Workflow**:
1. Upload dyno data (Speed, Load, Spark, BSFC, NOx)
2. Train model: Features=[Speed, Load], Target=[BSFC]
3. Generate map: X=Speed, Y=Load, Target=Optimal_Spark
4. Optimize: Minimize BSFC, Constrain NOx < 0.5
5. Export map for ECU

**Expected Results**:
- Map showing optimal spark at each operating point
- BSFC reduction: 2-5%
- NOx within limits

---

### Use Case 2: VVT Calibration

**Goal**: Optimize valve timing for performance

**Workflow**:
1. Upload data with VVT signals
2. Train models for Torque and Emissions
3. Generate multiple maps (IVO, EVC, overlap)
4. Multi-objective optimization
5. Export VVT maps

**Expected Results**:
- Optimized valve timing maps
- Balanced performance/emissions
- Validated across operating range

---

### Use Case 3: Fuel Injection Calibration

**Goal**: Optimize injection timing and quantity

**Workflow**:
1. Upload fuel system data
2. Train models (Torque, Emissions, Efficiency)
3. Generate injection maps
4. Optimize for emissions targets
5. Validate and export

**Expected Results**:
- Optimized injection maps
- Emissions compliance
- Efficiency maintained

---

### Use Case 4: Transient Calibration

**Goal**: Optimize for transient response

**Workflow**:
1. Upload transient dyno data
2. Generate Dynamic DoE test plan
3. Execute transient tests
4. Train models with transient features
5. Optimize for response time

**Expected Results**:
- Transient test plan
- Improved response characteristics
- Validated transient maps

---

## 📖 Reference

### Keyboard Shortcuts

- `Ctrl/Cmd + U`: Upload data
- `Ctrl/Cmd + T`: Train model
- `Ctrl/Cmd + G`: Generate DoE
- `Ctrl/Cmd + M`: Generate map
- `Ctrl/Cmd + O`: Optimize

### Signal Naming Conventions

**Recommended Names**:
- `Speed` or `Engine_Speed` (RPM)
- `Load` or `Engine_Load` (normalized)
- `Torque` or `BMEP` (Nm or bar)
- `BSFC` (g/kWh)
- `NOx`, `CO`, `HC`, `PM` (emissions)
- `Spark_Advance` or `SA` (°CA)
- `Lambda` or `AFR` (air-fuel ratio)

### Typical Data Sizes

- **Initial Campaign**: 50-100 samples
- **Standard Mapping**: 100-200 samples
- **High Resolution**: 200-500 samples
- **Full Characterization**: 500+ samples

### Model Performance Targets

- **R² Score**: >0.90 acceptable, >0.95 good
- **RMSE**: <5% of target range
- **Training Time**: <2 minutes (Random Forest)
- **Prediction Time**: <1 second per point

### Map Resolutions

- **Preview**: 20×20 (400 points)
- **Standard**: 30×30 (900 points) **Recommended**
- **High Resolution**: 50×50 (2500 points)
- **Production**: 50×50 or higher

---

## 🆘 Support & Resources

### Getting Help

1. **Check Troubleshooting Section** (above)
2. **Review Test Results**: `COMPLETE_WORKFLOW_TEST_RESULTS.md`
3. **Check System Logs**: Server console output
4. **Verify Data Quality**: Use Data Info tab

### System Information

- **Version**: 9.1.0 (Complete MBC Workflow)
- **Server**: Flask + Socket.IO
- **Models**: scikit-learn, XGBoost, Neural Networks
- **DoE**: Advanced methods (LHS, D-Optimal, Sobol, etc.)

### File Locations

- **Uploads**: `uploads/` directory
- **Models**: `models/` directory (saved as .joblib)
- **Exports**: `exports/` directory
- **Logs**: Server console or log files

---

## ✅ Quick Checklist

Before starting a calibration task:

- [ ] Server is running
- [ ] Data files prepared
- [ ] Browser opened to dashboard
- [ ] Data uploaded and verified
- [ ] Signals visible and correct
- [ ] Model trained successfully (R² > 0.90)
- [ ] DoE plan generated
- [ ] Maps created and validated
- [ ] Optimization completed
- [ ] Results exported

---

**End of Guide**

*For technical support or questions, refer to system logs and error messages for detailed information.*

**Happy Calibrating!** 🚀

