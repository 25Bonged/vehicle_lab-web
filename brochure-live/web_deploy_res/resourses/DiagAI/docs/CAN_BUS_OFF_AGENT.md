# CAN Bus-Off Agent

## Overview

`CANBusOffAgent` provides advanced detection, prediction, and mitigation guidance for Controller Area Network (CAN) bus-off incidents. It fuses multiple evidence streams to catch both traditional counter-driven faults and stealthy attacks such as WeepingCAN.

## Detection Strategy

- **State Flags:** Uses explicit bus-off status channels when exposed by the ECU.
- **Error Counters:** Tracks TEC and REC escalation, projects time-to-threshold with trend analysis, and gauges escalation rate.
- **Error Frame Bursts:** Detects abnormal surges in error frames that precede a bus-off.
- **Message Rate Collapse:** Identifies silent disruptions where traffic collapses without counter growth.
- **Recovery Monitoring:** Records ECU recovery counters to assess resilience or repeated failures.

The agent derives a severity score combining the above signals with weighted heuristics. Scores yield tiers (`normal`, `low`, `medium`, `high`, `critical`) and trigger recommendations.

## Outputs

- Per-file event timelines with start/end timestamps and durations
- Pre bus-off diagnostics (counter snapshots, burst metrics, message gaps)
- Severity assessment with driver explanations and remediation guidance
- Optional Plotly-based visualization overlaying counters and status flags
- Global summary for multi-file batches

## Usage

```python
from bots.databot.tools import analyze_with_can_bus_off_agent

response = analyze_with_can_bus_off_agent(files=["/path/to/capture.mf4"])
```

- `response["analysis"]["files"][file_name]` holds detailed analysis.
- `response["insights"]` lists human-readable findings.
- `response.get("plots", {})` contains Plotly JSON payloads per file.

## Signal Discovery

The agent scans channels for canonical fragments (e.g., `busoff`, `tec`, `msg_rate`). To support new naming conventions, extend `SIGNAL_CANDIDATES` in `can_bus_off_agent.py`.

## Testing

`tests/test_can_bus_off_agent.py` validates core analytics for:

- Bus-off window detection
- TEC trending and projection
- Message collapse-induced silent attack detection

## Future Enhancements

- Ingest raw CAN frames for per-ID coverage ratios.
- Integrate spectral analysis of physical layer traces when available.
- Export alerts into centralized incident management pipelines.


