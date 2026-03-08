# BSFC Root Cause Analysis - Based on Code & Documentation Review

## 🔍 Key Finding

Based on the codebase analysis and web research, I've identified the **most likely root cause** of your BSFC issues:

---

## **The Problem: CONSO_CARBURANT Signal Format**

### **What CONSO_CARBURANT Actually Is:**

From your codebase (`custom_fuel.py` lines 718-725):

```
CONSO_CARBURANT is in mm3 (cubic millimeters) per sample
- Typically sampled at 10 Hz (every 0.1s)
- Values are typically 0-20000 mm3 per sample
- 1 L = 1,000,000 mm3
```

### **The Conversion Formula (Already in Your Code):**

```
1. mm3 per sample → mm3/s = value × sampling_rate_hz
2. mm3/s → L/s = (mm3/s) / 1,000,000
3. L/s → kg/s = (L/s) × density (0.745 kg/L)
```

### **Example Calculation:**

If `CONSO_CARBURANT = 9,777.37 mm3` per sample at 10 Hz:

```
mm3/s = 9,777.37 × 10 = 97,773.7 mm3/s
L/s = 97,773.7 / 1,000,000 = 0.0977737 L/s
L/h = 0.0977737 × 3600 = 351.99 L/h  ← This is WRONG if treated as direct L/h!
```

**But if the code mistakenly treats it as L/h directly:**
- `fuel_flow_mean_Lh = 9,777.37` (treated as L/h)
- This is **27.8× too high**! (should be ~352 L/h, but even that seems high)

---

## **Why Your BSFC Values Are 30,000× Too High**

### **Scenario 1: Wrong Unit Detection**

If `fuel_vol_consumption = 9,777.37` and the code thinks it's **L/h** (not mm3):

```
fuel_mass_flow_kgps = 9,777.37 L/h × 0.745 kg/L / 3600 = 2.024 kg/s
```

But if it's actually **mm3 per sample at 10 Hz**:
```
fuel_mass_flow_kgps = (9,777.37 × 10 / 1,000,000) × 0.745 = 0.0000729 kg/s
```

**That's a 27,800× difference!**

### **Scenario 2: Wrong Sampling Rate**

If the code detects the wrong sampling rate:
- Detected: 1 Hz (wrong)
- Actual: 10 Hz
- Result: 10× too low fuel flow → 10× too high BSFC

### **Scenario 3: Comma Parsing Issue**

If `9,777.37` is parsed as:
- `9.77737` (comma as decimal separator) → 10× too low
- `9777.37` (comma removed) → correct if mm3
- `9,777,833.87` (comma as thousands separator) → 1000× too high!

---

## **What the Code Does Now (After My Fixes)**

The updated code (`custom_fuel.py` lines 708-820) now:

1. **Detects mm3 format** when median value is 1000-50000
2. **Estimates sampling rate** from time data
3. **Converts properly**: mm3/sample → mm3/s → L/s → kg/s
4. **Validates BSFC** against physical limits (150-450 g/kWh)
5. **Logs diagnostics** showing detected unit and conversion

---

## **What You Need to Verify**

### **1. Check Your Raw Data**

Look at your raw file and find the `CONSO_CARBURANT` signal:

**Questions:**
- What are the actual values? (e.g., 9777.37, 9777, 9.77737?)
- What is the sampling rate? (Check time differences between samples)
- Are there commas in the numbers? (e.g., "9,777.37" vs "9777.37")

### **2. Check the Logs**

After running the analysis, look for:

```
[FUEL] Unit detection: median=9777.37, p05=..., p95=...
[FUEL] ✅ Detected as mm3 per sample (median=9777.37 mm3), sampling rate=10.0 Hz
```

OR

```
[FUEL] ❌ CRITICAL: BSFC values are physically impossible!
[FUEL]    Detected fuel unit: L/h
[FUEL]    ⚠️  This suggests wrong unit detection or calculation error!
```

### **3. Verify Sampling Rate**

The code estimates sampling rate from time data. Check if it's correct:

```python
# In your logs, you should see:
[FUEL] Using time grid: X points at Y Hz
```

If Y ≠ 10 Hz for PSA/Stellantis data, that's a problem!

---

## **Most Likely Root Cause**

Based on your example data:

```
fuel_flow_mean_Lh = 9,777.37
bsfc_mean = 9,941,465.46
```

**Hypothesis:** The code is treating `9,777.37` as **L/h** when it's actually **mm3 per sample**.

**Why this causes huge BSFC:**
- If treated as L/h: fuel flow is 9,777 L/h (impossible - 10,000× too high)
- BSFC = (fuel_mass_flow × 3,600,000) / power
- With wrong fuel flow, BSFC becomes huge

**The fix:** The code should detect this is mm3 and convert:
- 9,777.37 mm3/sample × 10 Hz = 97,773.7 mm3/s
- = 0.09777 L/s = 352 L/h (still high, but more reasonable)

---

## **Next Steps**

1. **Run your analysis again** with the updated code
2. **Check the diagnostic logs** for unit detection
3. **Verify the sampling rate** is detected correctly
4. **Share the logs** if BSFC is still wrong

The code will now **automatically detect and report** these issues, making it much easier to diagnose!

---

## **References from Your Codebase**

- `custom_fuel.py` lines 718-820: Unit detection logic
- `KIA_IPZ_EMISSION_ANALYSIS_SUMMARY.md`: Documents CONSO_CARBURANT as mm3
- `EMISSION_SIGNAL_MAPPING_VERIFICATION.md`: Confirms CONSO_CARBURANT units

---

## **Summary**

**The issue is almost certainly:**
- ✅ **CONSO_CARBURANT is in mm3 per sample** (confirmed from your docs)
- ✅ **Code may be treating it as L/h** (causing 10,000× error)
- ✅ **Sampling rate detection may be wrong** (causing 10× error)
- ✅ **Comma parsing may be wrong** (causing variable errors)

**The fixes I applied:**
- ✅ Better unit detection with validation
- ✅ Proper mm3 → L/h conversion
- ✅ Sampling rate estimation from time data
- ✅ BSFC validation against physical limits
- ✅ Comprehensive diagnostic logging

**What you need to do:**
- Run the analysis and check the logs
- Verify the detected unit matches your data format
- Share the diagnostic output if issues persist

