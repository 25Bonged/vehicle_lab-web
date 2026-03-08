# Drivability Tab - Signal Usage Documentation

**Date:** 2025-11-30  
**Purpose:** Document exactly which signals are used in the drivability tab and why

---

## 📊 Signals Used in Drivability Analysis

The drivability tab uses **6 primary signals** from your uploaded data files:

### 1. **RPM (Engine Speed)** - REQUIRED
**Why:** Core signal for drivability analysis
- **Used in:**
  - Idle Control Analysis (detects idle speed stability)
  - Speed Limiter Analysis (detects engine speed limiting behavior)
  - RPM Zone Diagnostics (identifies hesitation zones, RPM transitions)
  - Torque Governor Analysis (RPM-torque coordination)
  - Throttle Response Analysis (RPM response to throttle changes)

**How it's found:**
- Uses `find_signal_advanced(channels, 'rpm')` from signal mapping
- Searches through **90+ candidate signal names** including:
  - Generic: `rpm`, `RPM`, `EngineSpeed`, `Engine_Speed`, `nEng`, `Epm_nEng`
  - VW/Audi: `Motordrehzahl`, `n_Mot`, `Drehzahl`
  - BMW: `Motordrehzahl`, `n_Motor`, `MotorDrehzahl`
  - Toyota: `NE`, `NE_ENG`, `Engine_NE`
  - And many more OEM-specific names

**Minimum requirement:** At least RPM must be found, otherwise analysis is skipped

---

### 2. **Torque** - REQUIRED for most analyses
**Why:** Essential for anti-jerk and torque filter analysis
- **Used in:**
  - **Anti-Jerk Analysis** (calculates jerk = d²T/dt², detects oscillations)
  - **Torque Filter Analysis** (evaluates filter smoothness, response time)
  - **Pedal Map Analysis** (throttle vs torque relationship)
  - **Torque Governor Analysis** (torque limiting behavior)

**How it's found:**
- Uses `find_signal_advanced(channels, 'torque')`
- Searches through **60+ candidate signal names** including:
  - Generic: `Torque`, `torque`, `EngineTorque`, `Tq`, `Trq`, `EngineLoad`
  - VW/Audi: `Motormoment`, `Drehmoment`, `T_Mot`, `TqSys_tqCkEngReal`
  - BMW: `Motormoment`, `TorqueMotor`, `M_Motor`
  - ETAS: `TqSys_tqCkEfcReq`, `inTorque`
  - And many more

**Critical for:** Anti-jerk analysis (cannot run without torque)

---

### 3. **Throttle Position** - REQUIRED for pedal map
**Why:** Analyzes driver input and throttle response
- **Used in:**
  - **Pedal Map Analysis** (throttle position vs torque mapping)
  - **Throttle Response Analysis** (response time, rate of change)
  - **Throttle Transitions** (detects abrupt changes, mismatches)

**How it's found:**
- Uses `find_signal_advanced(channels, 'throttle')`
- Searches through **50+ candidate signal names** including:
  - Generic: `throttle`, `Throttle`, `ThrottlePosition`, `Throttle_Pos`, `APP` (Accelerator Pedal Position)
  - VW/Audi: `Drosselklappe`, `DK_Position`, `DK_Stellung`
  - BMW: `Drosselklappe`, `DK_Pos`, `Throttle_Valve`
  - Toyota: `THR`, `Throttle_Position`, `APP`
  - And many more

**Critical for:** Pedal map analysis (cannot create pedal map without throttle)

---

### 4. **Vehicle Speed** - OPTIONAL
**Why:** Context for drivability events
- **Used in:**
  - General context (not directly analyzed, but useful for filtering)
  - Can be used to filter analysis to specific driving conditions

**How it's found:**
- Uses `find_signal_advanced(channels, 'vehicle_speed')`
- Searches through **40+ candidate signal names** including:
  - Generic: `speed`, `Speed`, `VehicleSpeed`, `VSS`, `VehSpd`
  - VW/Audi: `Fahrzeuggeschwindigkeit`, `v_Fzg`, `vFzg`
  - BMW: `Fahrgeschwindigkeit`, `v_Fahrzeug`
  - And many more

**Note:** Not strictly required, but helps provide context

---

### 5. **Gear** - OPTIONAL
**Why:** Context for drivability events (gear-specific analysis)
- **Used in:**
  - Context only (not directly analyzed in current implementation)
  - Could be used for gear-specific drivability analysis

**How it's found:**
- Uses `find_signal_advanced(channels, 'gear')`
- Searches through **30+ candidate signal names** including:
  - Generic: `gear`, `Gear`, `GearPosition`, `CurrentGear`
  - VW/Audi: `Gang`, `Gang_Position`, `Gear_Pos`
  - BMW: `Gang`, `Gear_Position`
  - And many more

**Note:** Currently optional, but useful for future enhancements

---

### 6. **Lambda/AFR** - OPTIONAL
**Why:** Analyzes air-fuel ratio stability (affects drivability)
- **Used in:**
  - **AFR Stability Analysis** (detects lambda spikes, instability)
  - **Idle AFR Stability** (idle-specific lambda analysis)

**How it's found:**
- Uses `find_signal_advanced(channels, 'lambda')`
- Searches through **80+ candidate signal names** including:
  - Generic: `Lambda`, `lambda`, `AFR`, `AirFuelRatio`, `O2Sensor`
  - VW/Audi: `Lambda`, `Lambda_Wert`, `LAM`, `Lam_1`, `Lam_2`
  - BMW: `Lambda`, `LAM`, `Lambda_Wert`
  - ETAS: `ExM_Lam_Estim`, `ExM_Lam_Actual`
  - OBD-II: `PID_14`, `PID_15`, `O2_Sensor_1`, `O2_B1S1`
  - And many more

**Note:** Optional, but enables AFR stability analysis if available

---

## 🔍 Signal Discovery Process

### Step 1: Channel Discovery
```python
from app import list_channels
channels = list_channels(file_path)  # Gets ALL channels from file
```

### Step 2: Signal Mapping
```python
from scripts.signal_mapping import find_signal_advanced

signals['rpm'] = find_signal_advanced(channels, 'rpm')
signals['torque'] = find_signal_advanced(channels, 'torque')
signals['throttle'] = find_signal_advanced(channels, 'throttle')
# ... etc
```

### Step 3: Signal Extraction
```python
from app import read_signal

# For each signal, tries:
# 1. Exact match from signal mapping
# 2. Candidate list (RPM_CANDIDATES, TORQUE_CANDIDATES, etc.)
# 3. Direct signal name
# 4. Signal mapping fallback for CSV/Excel

t_list, v_list, unit = read_signal(file_path, signal_name)
```

### Step 4: Data Alignment
- All signals are aligned to a common time index
- Interpolation is used to match timestamps
- Missing data is forward-filled and back-filled

---

## 📋 Analysis-Specific Signal Requirements

| Analysis Type | Required Signals | Optional Signals | What It Does |
|--------------|------------------|------------------|--------------|
| **Anti-Jerk** | `torque` | `rpm` | Detects torque oscillations, calculates jerk index |
| **Torque Filter** | `torque` | - | Analyzes torque filter smoothness and response |
| **Pedal Map** | `throttle`, `torque` | - | Maps throttle position to torque output |
| **Idle Control** | `rpm` | `lambda` | Analyzes idle speed stability |
| **Speed Limiter** | `rpm` | - | Detects engine speed limiting behavior |
| **Torque Governor** | `torque`, `rpm` | - | Analyzes torque limiting coordination |
| **Throttle Response** | `throttle` | `rpm` | Measures throttle response time and rate |
| **AFR Stability** | `lambda` or `afr` | `rpm` | Detects lambda spikes and instability |
| **RPM Zones** | `rpm` | `throttle` | Identifies hesitation zones, RPM transitions |

---

## 🎯 Why These Signals?

### 1. **RPM (Engine Speed)**
- **Industry Standard:** All drivability calibration requires RPM
- **Use Cases:**
  - Idle stability (target: ~850 RPM)
  - Speed limiting (redline protection)
  - RPM zone analysis (hesitation detection)
  - Torque coordination (RPM-torque relationship)

### 2. **Torque**
- **Industry Standard:** Core of anti-jerk and torque filter calibration
- **Use Cases:**
  - Anti-jerk: Detects unwanted oscillations (jerk = d²T/dt²)
  - Torque filter: Evaluates filter performance (smoothness index)
  - Pedal map: Maps driver input to engine output
  - Torque governor: Analyzes torque limiting behavior

### 3. **Throttle Position**
- **Industry Standard:** Essential for pedal map calibration
- **Use Cases:**
  - Pedal map: Creates throttle-to-torque mapping
  - Response analysis: Measures throttle response time
  - Transition detection: Identifies abrupt throttle changes

### 4. **Lambda/AFR**
- **Industry Standard:** Air-fuel ratio affects drivability
- **Use Cases:**
  - AFR stability: Detects lambda spikes (causes drivability issues)
  - Idle AFR: Analyzes lambda stability at idle
  - Mixture quality: Affects engine smoothness

---

## 🔧 Signal Mapping Strategy

The drivability tab uses a **three-tier signal discovery strategy**:

### Tier 1: Advanced Signal Mapping
- Uses `find_signal_advanced()` which:
  - Searches through comprehensive signal name lists (90+ names for RPM)
  - Handles case-insensitive matching
  - Supports fuzzy matching
  - Works across multiple OEMs (BMW, VW, Toyota, etc.)

### Tier 2: Candidate Lists
- If signal mapping finds a signal, it also tries:
  - `RPM_CANDIDATES` - Additional RPM signal names
  - `TORQUE_CANDIDATES` - Additional torque signal names
  - `THROTTLE_CANDIDATES` - Additional throttle signal names
  - etc.

### Tier 3: Direct Reading
- Uses `app.py`'s `read_signal()` function which:
  - Works for both MDF and CSV/Excel files
  - Handles signal aliasing
  - Supports fuzzy name matching
  - Falls back to database-indexed signals if needed

---

## 📊 Example: What Signals Are Actually Used?

For a typical MDF file, the drivability tab might find:

```
File: example.mf4

Signals Found:
✅ RPM: "Epm_nEng" (ETAS naming convention)
✅ Torque: "CAN-Monitoring:1.COUPLE_REEL" (CAN bus signal)
✅ Throttle: "Ext_APP" (External Accelerator Pedal Position)
⚠️ Vehicle Speed: Not found (optional)
⚠️ Gear: Not found (optional)
✅ Lambda: "ExM_Lam_Estim" (ETAS lambda estimation)

Analyses Enabled:
✅ Anti-Jerk (using: Torque)
✅ Torque Filter (using: Torque)
✅ Pedal Map (using: Throttle, Torque)
✅ Idle Control (using: RPM)
✅ Throttle Response (using: Throttle)
✅ AFR Stability (using: Lambda)
✅ RPM Zones (using: RPM)
```

---

## ⚠️ Minimum Requirements

**Absolute Minimum:**
- **RPM** - Required (analysis cannot run without it)

**For Full Analysis:**
- **RPM** + **Torque** - Enables anti-jerk, torque filter, torque governor
- **RPM** + **Torque** + **Throttle** - Enables pedal map analysis
- **RPM** + **Lambda** - Enables AFR stability analysis

**Current Validation:**
- The `_validate_signals_for_section()` function in `app.py` only requires:
  - `["rpm", "throttle"]` for drivability section
- But in practice, **torque is critical** for most analyses

---

## 🎨 Signal Usage in Plots

### Anti-Jerk Plot
- **X-axis:** Time
- **Y-axis (top):** Torque signal
- **Y-axis (bottom):** Jerk (d²T/dt²)

### Torque Filter Plot
- **X-axis:** Time
- **Y-axis (left):** Torque signal
- **Y-axis (right):** Torque rate (dT/dt)

### Pedal Map Plot
- **X-axis:** Throttle Position (%)
- **Y-axis:** Torque (Nm)
- **Type:** Scatter plot with linear fit

### Idle Control Plot
- **X-axis:** Time
- **Y-axis:** RPM
- **Highlights:** Idle regions (< 1200 RPM)

### Throttle Response Plot
- **X-axis:** Time
- **Y-axis (top):** Throttle Position (%)
- **Y-axis (bottom):** Throttle Rate (%/s)

### AFR Stability Plot
- **X-axis:** Time
- **Y-axis (top):** Lambda/AFR signal
- **Y-axis (bottom):** Rolling statistics (mean, std)

### RPM Zones Plot
- **X-axis:** Time
- **Y-axis (top):** RPM with zone boundaries
- **Y-axis (bottom):** RPM rate of change

---

## 🔍 How to Verify Which Signals Are Being Used

1. **Check the logs:**
   ```
   [DRIVABILITY] Found signals:
     - rpm: Epm_nEng
     - torque: CAN-Monitoring:1.COUPLE_REEL
     - throttle: Ext_APP
   ```

2. **Check the API response:**
   ```json
   {
     "meta": {
       "signals_found": {
         "rpm": true,
         "torque": true,
         "throttle": true
       }
     }
   }
   ```

3. **Check the plots:**
   - Plot titles show which signals are used
   - Missing signals result in placeholder plots

---

## 📝 Summary

**Signals Used:**
1. ✅ **RPM** - Required (engine speed)
2. ✅ **Torque** - Required for anti-jerk, torque filter, pedal map
3. ✅ **Throttle** - Required for pedal map, throttle response
4. ⚠️ **Vehicle Speed** - Optional (context only)
5. ⚠️ **Gear** - Optional (context only)
6. ⚠️ **Lambda/AFR** - Optional (enables AFR stability analysis)

**Why:**
- These signals are **industry-standard** for drivability calibration
- They enable analysis of:
  - Anti-jerk behavior (torque oscillations)
  - Torque filter performance
  - Pedal map calibration
  - Throttle response
  - Idle control
  - AFR stability

**How:**
- Uses robust signal mapping (90+ names per signal)
- Works across multiple OEMs and file formats
- Falls back gracefully if signals are missing

---

**Last Updated:** 2025-11-30  
**Code Location:** `bots/databot/specialized_agents/drivability_agent.py`
