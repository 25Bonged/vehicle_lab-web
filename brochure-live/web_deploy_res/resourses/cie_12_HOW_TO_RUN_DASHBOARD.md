# 🚀 How to Run the Dashboard - Quick Guide

## ⚡ Quick Start (Recommended)

### Option 1: One-Line Command (Easiest)
```bash
cd /Users/chayan/Documents/project_25/app/app && pkill -f Cie_api_server.py 2>/dev/null; sleep 2 && /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py
```

**Then open:** http://127.0.0.1:5000/

---

### Option 2: Use Startup Script
```bash
cd /Users/chayan/Documents/project_25/app/app
chmod +x start_dashboard.sh
./start_dashboard.sh
```

**Or with custom port:**
```bash
./start_dashboard.sh 5001
```

---

### Option 3: Use Python Startup Script
```bash
cd /Users/chayan/Documents/project_25/app/app
python start_dashboard.py
```
*(This will auto-install dependencies and open browser)*

---

## 📋 Detailed Instructions

### Step 1: Navigate to Project Directory
```bash
cd /Users/chayan/Documents/project_25/app/app
```

### Step 2: Start the Server

**A. Run in Foreground (See logs in terminal):**
```bash
/Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py
```
- Press `Ctrl+C` to stop
- All logs visible in terminal

**B. Run in Background (Keep running after terminal closes):**
```bash
nohup /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py > server.log 2>&1 &
```
- Server keeps running in background
- Logs saved to `server.log`
- Terminal can be closed

### Step 3: Access Dashboard
Open your web browser and go to:
```
http://127.0.0.1:5000/
```

---

## ✅ Verify Dashboard is Running

### Check Health Endpoint
```bash
curl http://127.0.0.1:5000/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "System healthy",
  ...
}
```

### Check Process
```bash
ps aux | grep Cie_api_server
```

### View Logs (if running in background)
```bash
tail -f /Users/chayan/Documents/project_25/app/app/server.log
```

---

## 🛑 Stop the Dashboard

### If Running in Foreground:
Press `Ctrl+C` in the terminal

### If Running in Background:
```bash
pkill -f Cie_api_server.py
```

### Kill Specific Port:
```bash
lsof -ti:5000 | xargs kill -9
```

---

## 🔧 Troubleshooting

### Port 5000 Already in Use

**Solution 1: Kill existing process**
```bash
lsof -ti:5000 | xargs kill -9 2>/dev/null
sleep 2
cd /Users/chayan/Documents/project_25/app/app && /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py
```

**Solution 2: Use different port**
```bash
cd /Users/chayan/Documents/project_25/app/app
CIE_PORT=5001 /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py
```
Then access: http://127.0.0.1:5001/

### macOS AirPlay Using Port 5000

**Disable AirPlay Receiver:**
1. Open **System Preferences** → **General**
2. Find **AirDrop & Handoff**
3. Uncheck **AirPlay Receiver**

### Python Environment Issues

**Check Python:**
```bash
/Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python --version
```

**Install Dependencies:**
```bash
/Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python -m pip install flask flask-cors flask-socketio pandas numpy scikit-learn plotly
```

### View Error Logs
```bash
# Recent logs
tail -50 /Users/chayan/Documents/project_25/app/app/server.log

# Errors only
grep -i error /Users/chayan/Documents/project_25/app/app/server.log | tail -20

# Follow logs in real-time
tail -f /Users/chayan/Documents/project_25/app/app/server.log
```

---

## 📊 Dashboard Features

Once running, you can:
- ✅ Upload data files (CSV, MDF, Excel)
- ✅ View and manage signals
- ✅ Train machine learning models
- ✅ Generate DoE test plans
- ✅ Optimize calibration maps
- ✅ Generate predictions
- ✅ Export calibration maps
- ✅ Run AutoML
- ✅ Complete MBC workflow

---

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `./start_dashboard.sh` | Start dashboard (handles port conflicts) |
| `python start_dashboard.py` | Start with auto-install & browser open |
| `curl http://127.0.0.1:5000/api/health` | Check if running |
| `pkill -f Cie_api_server.py` | Stop server |
| `tail -f server.log` | View logs |

---

## 📝 Environment Variables

You can customize the server with environment variables:

```bash
# Custom port
CIE_PORT=5001 python Cie_api_server.py

# Debug mode
CIE_DEBUG=true python Cie_api_server.py

# Custom host
CIE_HOST=0.0.0.0 python Cie_api_server.py
```

---

## 🌐 Access URLs

- **Dashboard:** http://127.0.0.1:5000/
- **API Health:** http://127.0.0.1:5000/api/health
- **API Info:** http://127.0.0.1:5000/api/system/info

---

## ✅ Success Indicators

When dashboard starts successfully, you should see:
```
🚀 ULTIMATE CALIBRATION INTELLIGENCE ENGINE API SERVER v9.1
   Complete MBC Workflow Integration
================================================================================
   Host: 127.0.0.1
   Port: 5000
   Debug: False
   ...
```

Then open http://127.0.0.1:5000/ in your browser!

---

**Need Help?**
- Check logs: `tail -f server.log`
- Test API: `curl http://127.0.0.1:5000/api/health`
- Check process: `ps aux | grep Cie_api_server`

