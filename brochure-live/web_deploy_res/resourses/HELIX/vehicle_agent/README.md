# HELIX Vehicle Agent

Vehicle-side agent for remote ECU calibration.

## Overview

The vehicle agent runs on the vehicle (or nearby router/laptop) and relays XCP commands between the HELIX cloud server and the XETK hardware.

## Architecture

```
HELIX Cloud Server
    ↓ TCP
Vehicle Agent (this script)
    ↓ TCP
XETK → ECU
```

## Installation

### Requirements

- Python 3.10+
- Network access to HELIX cloud server
- XETK hardware (or XCP-compatible device)

### Setup

1. **Install dependencies:**
```bash
pip install pyyaml  # Optional, for YAML config
```

2. **Configure:**
```bash
cp config.yaml.example config.yaml
# Edit config.yaml with your settings
```

3. **Or use environment variables:**
```bash
export HELIX_CLOUD_HOST="your-helix-server.com"
export HELIX_CLOUD_PORT="5555"
export XETK_HOST="localhost"
export XETK_PORT="5555"
export VEHICLE_ID="vehicle-001"
```

## Usage

### Run Agent

```bash
python agent.py
```

### Run as Service (Linux)

Create systemd service:

```ini
# /etc/systemd/system/helix-agent.service
[Unit]
Description=HELIX Vehicle Agent
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/opt/helix-agent
ExecStart=/usr/bin/python3 /opt/helix-agent/agent.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable helix-agent
sudo systemctl start helix-agent
```

## Configuration

### Cloud Connection

- `cloud_host`: HELIX server hostname or IP
- `cloud_port`: HELIX server port (default: 5555)

### XETK Connection

- `xetk_host`: XETK hostname or IP (usually localhost)
- `xetk_port`: XETK port (default: 5555)

### Vehicle ID

- `vehicle_id`: Unique identifier for this vehicle

## Network Setup

### Option 1: Direct Connection

If HELIX server has public IP:
- Vehicle agent connects directly
- Requires firewall rules

### Option 2: VPN

If using VPN:
- Connect vehicle to VPN
- Use VPN IP for cloud_host

### Option 3: Port Forwarding

If behind NAT:
- Forward port 5555 to vehicle
- Use public IP for cloud_host

## Troubleshooting

### Connection Issues

1. **Cannot connect to cloud:**
   - Check network connectivity
   - Verify HELIX server is running
   - Check firewall rules
   - Verify cloud_host and cloud_port

2. **Cannot connect to XETK:**
   - Verify XETK is running
   - Check XETK host/port
   - Verify XETK is on same network

### Debug Mode

Run with debug logging:
```bash
export HELIX_LOG_LEVEL=DEBUG
python agent.py
```

## Security Notes

- Currently uses plain TCP (no encryption)
- For production, use TLS/SSL
- Consider VPN for additional security
- Authenticate vehicle with API keys

## Next Steps

- Add TLS/SSL support
- Add vehicle authentication
- Add health monitoring
- Add automatic updates
