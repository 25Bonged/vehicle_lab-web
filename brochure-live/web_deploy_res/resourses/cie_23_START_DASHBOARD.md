# CIE Pro Dashboard - Complete Startup Guide

## Quick Start

### Option 1: Run in Foreground (Recommended for Testing)
```bash
cd /Users/chayan/Documents/project_25/app/app && /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py
```

**Press `Ctrl+C` to stop**

### Option 2: Run in Background (Recommended for Production)
```bash
cd /Users/chayan/Documents/project_25/app/app && nohup /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py > server.log 2>&1 &
```

**To stop:** `pkill -f Cie_api_server.py`

### Option 3: Use Startup Script
```bash
cd /Users/chayan/Documents/project_25/app/app && ./start_dashboard.sh
```

## Access Dashboard

Once running, open your browser:
```
http://127.0.0.1:5000/
```

## Check Status

```bash
# Check if server is running
curl http://127.0.0.1:5000/api/health

# View logs
tail -f /Users/chayan/Documents/project_25/app/app/server.log

# Check process
ps aux | grep Cie_api_server
```

## Stop Dashboard

```bash
# Stop server
pkill -f Cie_api_server.py

# Or if running in foreground, press Ctrl+C
```

## Troubleshooting

### Port Already in Use
```bash
# Kill existing process on port 5000
lsof -ti:5000 | xargs kill -9

# Then restart
cd /Users/chayan/Documents/project_25/app/app && /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py
```

### Check Logs
```bash
# View recent logs
tail -50 /Users/chayan/Documents/project_25/app/app/server.log

# View errors only
grep -i error /Users/chayan/Documents/project_25/app/app/server.log | tail -20
```

## Features Available

Once dashboard is running:
- ✅ Data Upload (CSV/Excel)
- ✅ Model Training
- ✅ Predictions
- ✅ Optimization
- ✅ Map Generation
- ✅ DoE Generation
- ✅ AutoML
- ✅ Complete MBC Workflow

---

**Dashboard URL:** http://127.0.0.1:5000/  
**Version:** 9.1.0  
**Status:** Production Ready ✅

