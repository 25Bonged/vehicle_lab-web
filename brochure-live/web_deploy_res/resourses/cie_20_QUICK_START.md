# 🚀 QUICK START - RUN CIE APPLICATION LOCALLY

## Single Command to Start:

```bash
cd /Users/chayan/Documents/project_25/app/app && pkill -f Cie_api_server.py 2>/dev/null; sleep 2 && /Users/chayan/Documents/project_25/app/app/miniforge3/envs/cie311/bin/python Cie_api_server.py
```

## Then Open Browser:

```
http://127.0.0.1:5000
```

## Or Use the Script:

```bash
cd /Users/chayan/Documents/project_25/app/app
./run_local.sh
```

## Check Server Status:

```bash
curl http://127.0.0.1:5000/api/health | python3 -m json.tool
```

## Stop Server:

Press `CTRL+C` or run:
```bash
pkill -f Cie_api_server.py
```
