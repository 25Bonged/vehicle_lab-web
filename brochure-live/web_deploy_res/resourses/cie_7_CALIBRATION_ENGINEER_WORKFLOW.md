# Calibration Engineer Workflow Guide
## Complete Step-by-Step Approach for Engine Dyno Data

### System Status: ✅ Fully Ready

The Calibration Intelligence Engine (CIE) platform is fully operational and ready for production use with all core features implemented and tested.

---

## 🎯 Complete Workflow for Calibration Engineers

### Phase 1: Data Upload & Preparation

#### Step 1: Prepare Your Dyno Data
Before uploading, ensure your data files contain:
- **Engine operating parameters**: Speed (RPM), Load (Torque/BMEP), Manifold Pressure (MAP)
- **Control variables**: Spark timing, Fuel injection, VVT positions
- **Response variables**: Torque, Power, BSFC, Emissions (NOx, CO, HC, PM)
- **Boundary conditions**: Air temperature, Coolant temperature, Fuel properties

**Supported Formats:**
- CSV files (comma, semicolon, or tab delimited)
- Excel files (.xlsx, .xlsm, .xls)
- MDF files (ASAM MDF format - native dyno data)
- MATLAB files (.mat)
- HDF5 files
- INCA DAT files

#### Step 2: Upload Data
1. Navigate to **Data Management** tab
2. Click **"Choose Files"** or drag & drop your data files
3. Wait for processing (automatic format detection)
4. Verify signals appear in the signal list
5. Check data preview to ensure correct parsing

**Pro Tips:**
- Upload multiple files to merge datasets
- System automatically handles different sampling rates
- TML (Test Measurement List) files are automatically decoded
- FEV nomenclature files (.pdf) automatically decode signal names

#### Step 3: Validate Data Quality
1. Check **Data Info** section:
   - Verify sample count
   - Check missing values (should be minimal)
   - Review data types (should be numeric)
   - Inspect summary statistics

2. **Data Preview** shows:
   - First 10 rows of data
   - Column types and missing counts
   - Memory usage

**⚠️ Common Issues:**
- **No signals visible**: Check if columns are numeric (text columns excluded from training)
- **Missing values**: Consider data quality or sensor issues
- **Constant features**: System will auto-remove, but check your sensors

---

### Phase 2: Model Training & Validation

#### Step 4: Select Features & Targets

**Feature Selection (Inputs):**
- **Operating Conditions**: Engine speed, Load, MAP, Air temp, Coolant temp
- **Control Variables**: Spark timing, Fuel injection timing/quantity, VVT positions
- **Boundary Conditions**: Fuel properties, Ambient conditions

**Target Selection (Outputs):**
- **Performance**: Torque, Power, BSFC
- **Emissions**: NOx, CO, HC, PM, CO2
- **Combustion**: CA50, IMEP, Combustion efficiency

**Best Practices:**
- Select 3-7 features for best model performance
- Ensure features and targets don't overlap
- Include key operating parameters (Speed, Load)
- Consider interaction effects (Speed × Load)

#### Step 5: Configure Training Parameters

**Basic Settings:**
- **Model Type**: 
  - `Random Forest` - Fast, robust, good for most cases (recommended start)
  - `Gradient Boosting` - Better accuracy, slower
  - `Neural Network` - Complex relationships, requires more data
  - `Gaussian Process` - Uncertainty quantification, slower
- **Test Split**: 20-30% for validation (default 20%)
- **Cross-Validation**: Enable for robust metrics (5-fold default)

**Advanced Options:**
- **Outlier Removal**: 
  - `IQR` method - Recommended for engine data
  - `Z-score` - For normally distributed data
  - `Isolation Forest` - For complex outlier patterns
- **Feature Engineering**: Enable to create interactions and polynomials
- **Feature Selection**: Enable if you have >10 features
- **Hyperparameter Optimization**: Enable for best performance (slower)

#### Step 6: Train Model
1. Click **"Train Model"**
2. Monitor progress in real-time:
   - Data preprocessing (10%)
   - Model training (30-70%)
   - Validation (80%)
   - Completed (100%)
3. Review metrics:
   - **R² Score**: >0.95 excellent, >0.90 good, >0.85 acceptable
   - **RMSE**: Should be small relative to target range
   - **MAE**: Average prediction error

**Expected Training Times:**
- Random Forest (100 samples): 5-15 seconds
- Gradient Boosting: 10-30 seconds
- Neural Network: 30-60 seconds
- With hyperparameter optimization: 2-10 minutes

#### Step 7: Validate Model Quality

**Check Metrics:**
- R² > 0.90 for calibration work (target: >0.95)
- RMSE < 5% of target range (e.g., if torque range is 200-500 Nm, RMSE < 15 Nm)
- Feature importance shows expected variables (Speed, Load should be high)

**Visual Validation:**
- Navigate to **Analytics** tab
- Review feature importance chart
- Check model comparison (if multiple models trained)
- Analyze error distribution

**If Model Quality is Poor:**
1. Check data quality (outliers, missing values)
2. Try different model types
3. Enable feature engineering
4. Increase test data size
5. Review feature selection

---

### Phase 3: Design of Experiments (DoE)

#### Step 8: Generate Static DoE (For Steady-State Mapping)

**Use Case**: Generate optimal test points for steady-state calibration maps

1. Navigate to **Advanced DoE** tab
2. Add factors:
   - **Speed**: Range (e.g., 1000-6000 RPM)
   - **Load**: Range (e.g., 0.2-1.0 normalized)
   - **Spark Timing**: Range (e.g., -10 to 30° CA)
3. Select DoE Method:
   - **Latin Hypercube Sampling (LHS)**: Good coverage, random
   - **Sobol Sequence**: Optimal space-filling
   - **D-Optimal**: Best for regression models (recommended)
   - **Full Factorial**: Exhaustive (use for <3 factors)
   - **Central Composite**: Response surface methodology
   - **Box-Behnken**: Efficient for 3-level designs
4. Set sample size (typically 50-200 points)
5. Click **"Generate DoE"**
6. Review test plan table
7. Export to CSV/Excel for dyno test execution

**Pro Tips:**
- Use D-Optimal for models with interactions
- LHS is fastest and good for exploration
- Consider constraints (e.g., safe operating limits)
- Review coverage plot to ensure space is well-covered

#### Step 9: Generate Dynamic DoE (For Transient Testing)

**Use Case**: Generate time-based test sequences for transient calibration

1. Navigate to **Dynamic DoE** tab
2. Add dynamic factors:
   - **Factor Name**: e.g., "Speed"
   - **Nominal Value**: Operating point (e.g., 3000 RPM)
   - **Amplitude**: Variation range (e.g., ±800 RPM)
   - **Min Frequency**: 0.1 Hz (slow variations)
   - **Max Frequency**: 2.0 Hz (faster variations)
3. Repeat for each factor (Speed, Load, Spark, etc.)
4. Set **Duration**: 60-300 seconds typical
5. Configure:
   - **Operating Envelope**: Safe limits for each variable
   - **Safety Limits**: Hard boundaries (includes rate limits)
   - **Convex Hull**: Enable to stay within valid operating region
6. Click **"Generate Dynamic Test Plan"**
7. Review:
   - Coverage plot (trajectory visualization)
   - Test plan table (time-series data)
   - Validation summary (constraint violations)

**Pro Tips:**
- Use frequency sweeps for system identification
- Lower frequencies for steady-state mapping
- Higher frequencies for transient response
- Enable convex hull to avoid invalid operating points
- Set realistic safety limits (including rate limits)

---

### Phase 4: Calibration Map Generation

#### Step 10: Generate Calibration Maps

**Use Case**: Create 2D calibration maps (lookup tables) for ECU

1. Navigate to **Calibration Maps** tab
2. Ensure a model is trained (select from dropdown)
3. Configure map:
   - **Map Name**: Descriptive (e.g., "Spark_Advance_Map")
   - **X-Axis**: Primary independent variable (e.g., "Speed")
   - **Y-Axis**: Secondary independent variable (e.g., "Load")
   - **Target**: Dependent variable from model (e.g., "Optimal_Spark")
   - **Resolution**: 20-50 points per axis (trade-off: detail vs. size)
4. Set quality settings:
   - **Enforce Monotonicity**: Ensure map is monotonic (if physically required)
   - **Apply Smoothing**: Reduce noise in map
   - **Max Gradient**: Limit rate of change between cells
5. Click **"Generate Map"**
6. Review:
   - **3D Surface Plot**: Visual inspection
   - **Heatmap**: 2D view with color coding
   - **Contour Plot**: Level curves
   - **Lookup Table**: Exact values
7. Check recommendations:
   - Monotonicity violations
   - Extreme gradients
   - Value range issues
8. **Export**:
   - **CSV**: For Excel/MATLAB import
   - **JSON**: For programmatic use
   - **ASAM CDF**: Standard calibration format
   - **A2L/HEX**: For ECU import
   - **INCA**: For ETAS INCA import

**Pro Tips:**
- Use interpolation to increase resolution without re-training
- Apply quality constraints to ensure physical validity
- Review map against physical expectations
- Validate monotonicity if required by physics
- Smooth maps to reduce ECU interpolation errors

---

### Phase 5: Optimization & Analysis

#### Step 11: Multi-Objective Optimization

**Use Case**: Find optimal calibration settings considering multiple objectives

1. Navigate to **Optimization** tab
2. Select trained model
3. Define objectives:
   - **Minimize**: BSFC, Emissions (NOx, CO, PM)
   - **Maximize**: Torque, Power, Efficiency
   - **Target**: Specific value (e.g., NOx = 0.5 g/kWh)
4. Set constraints:
   - Operating limits (Speed, Load ranges)
   - Boundary conditions (Air temp, Coolant temp)
   - Safety limits (Max spark advance, Min lambda)
5. Configure optimization:
   - **Method**: 
     - `L-BFGS-B` - Fast, local optimization
     - `Multi-objective` - Pareto frontier
     - `Robust` - Considers uncertainty
   - **Max Iterations**: 100-500 (more = better but slower)
6. Click **"Run Optimization"**
7. Review results:
   - **Optimal Parameters**: Best settings found
   - **Predicted Outcomes**: Expected performance
   - **Objective History**: Convergence plot
   - **Trade-offs**: If multi-objective

**Pro Tips:**
- Start with single objective to validate
- Use multi-objective for conflicting goals (e.g., Power vs. Emissions)
- Review convergence to ensure optimization completed
- Validate predictions against physical expectations
- Use robust optimization if uncertain about model accuracy

#### Step 12: Prediction & Validation

**Use Case**: Predict engine response for new operating conditions

1. Navigate to **Prediction** tab
2. Select trained model
3. Enter input values:
   - Operating conditions
   - Control variables
   - Boundary conditions
4. Click **"Run Prediction"**
5. Review:
   - Predicted outputs
   - Uncertainty estimates (if available)
   - Confidence intervals

**Batch Prediction:**
- Upload CSV with multiple input combinations
- System predicts all rows
- Export results

---

### Phase 6: Advanced Features

#### Step 13: AutoML (Automated Model Selection)

**Use Case**: Automatically find best model type and hyperparameters

1. Navigate to **Model Training** tab
2. Select **"Run AutoML"**
3. Configure:
   - Time budget: 5-30 minutes
   - Model types to test: All or selected
4. System will:
   - Test multiple model types
   - Optimize hyperparameters
   - Compare cross-validation scores
   - Select best model
5. Review:
   - Best model type and ID
   - Comparison of all tested models
   - Hyperparameters used

**When to Use:**
- Unsure which model type to use
- Have time to wait for optimization
- Want best possible accuracy
- Comparing multiple approaches

#### Step 14: Analytics & Reporting

1. Navigate to **Analytics** tab
2. Review:
   - **Model Comparison**: R² and RMSE across models
   - **Feature Importance**: Which variables matter most
   - **Data Statistics**: Dataset overview
   - **Error Analysis**: Model performance details

3. **Export Reports**:
   - Model performance reports
   - Data quality reports
   - Calibration recommendations

---

## 📋 Typical Calibration Engineer Workflow Summary

### New Engine Development:
1. ✅ Upload dyno data from initial test campaign
2. ✅ Train model(s) for key responses (Torque, BSFC, Emissions)
3. ✅ Generate DoE for next test campaign
4. ✅ Export test plans and execute on dyno
5. ✅ Upload new data, retrain models
6. ✅ Generate calibration maps for ECU
7. ✅ Optimize for multi-objective targets
8. ✅ Validate predictions on test bench
9. ✅ Iterate until calibration complete

### Calibration Optimization:
1. ✅ Upload existing calibration data
2. ✅ Train high-accuracy model
3. ✅ Use optimization to find better settings
4. ✅ Generate updated maps
5. ✅ Validate improvements

### Troubleshooting:
1. ✅ Upload problem data
2. ✅ Analyze feature importance
3. ✅ Identify key variables
4. ✅ Generate targeted DoE
5. ✅ Test specific hypotheses

---

## 🎓 Best Practices

### Data Quality:
- **Minimum samples**: 50+ for basic models, 100+ for complex models
- **Coverage**: Ensure operating space is well-covered
- **Quality**: Remove bad data, outliers, or sensor failures
- **Consistency**: Use same measurement conditions

### Model Selection:
- **Start simple**: Random Forest works well for most cases
- **Complex models**: Use Neural Networks only with large datasets (>500 samples)
- **Uncertainty**: Use Gaussian Process if uncertainty quantification needed
- **Speed**: Gradient Boosting is good balance of accuracy and speed

### DoE Generation:
- **Static**: Use for steady-state mapping, 50-200 points
- **Dynamic**: Use for transient analysis, 60-300 seconds
- **Constraints**: Always set realistic safety limits
- **Coverage**: Review plots to ensure space is covered

### Map Generation:
- **Resolution**: 30×30 typical, higher for critical maps
- **Quality**: Enable monotonicity if physically required
- **Smoothing**: Apply to reduce noise, but preserve trends
- **Validation**: Check against physical expectations

### Optimization:
- **Objectives**: Start with single objective
- **Constraints**: Always include safety limits
- **Validation**: Check predictions make physical sense
- **Iteration**: May need multiple runs with different weights

---

## ⚠️ Common Pitfalls & Solutions

| Issue | Solution |
|-------|----------|
| Low R² score | Check data quality, try feature engineering, increase samples |
| Constant features error | System auto-removes, but check sensors |
| Outlier removal removes too much | Reduce threshold or disable, check data quality |
| Map has unexpected values | Review model predictions, check training data coverage |
| Optimization doesn't converge | Increase iterations, check constraints, simplify objectives |
| DoE violates constraints | Adjust safety limits, enable convex hull |
| Model predicts outside range | Check training data range, validate inputs |

---

## 🚀 Quick Start Checklist

For a calibration engineer starting with new dyno data:

1. ☐ Upload data files (CSV, Excel, MDF)
2. ☐ Verify signals appear correctly
3. ☐ Select 3-7 features (Speed, Load, Spark, etc.)
4. ☐ Select 1-3 targets (Torque, BSFC, NOx, etc.)
5. ☐ Train Random Forest model (default settings)
6. ☐ Check R² > 0.90
7. ☐ Generate DoE for next test campaign
8. ☐ Generate calibration maps
9. ☐ Optimize for target objectives
10. ☐ Export results for ECU import

---

## 📞 System Capabilities Summary

✅ **Data Import**: CSV, Excel, MDF, MATLAB, HDF5, INCA  
✅ **Model Training**: 7 model types with AutoML  
✅ **Static DoE**: 6 advanced methods (LHS, Sobol, D-Optimal, etc.)  
✅ **Dynamic DoE**: Frequency sweeps with constraints  
✅ **Map Generation**: 2D/3D maps with quality enforcement  
✅ **Optimization**: Single & multi-objective  
✅ **Prediction**: Single & batch with uncertainty  
✅ **Analytics**: Feature importance, model comparison  
✅ **Export**: CSV, JSON, ASAM CDF, A2L/HEX, INCA  

---

**Status: Production Ready** ✅  
**Version: 9.1.0 (Complete MBC Workflow)**  
**Last Updated: 2025-10-30**

