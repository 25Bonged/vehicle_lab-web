# Specialized Diagnostic Agents for DiagAI

## Overview

This directory contains a multi-agent system for specialized vehicle diagnostics. Each agent is an expert in a specific diagnostic domain, and they can work independently or be coordinated by the orchestrator.

## Architecture

```
DiagnosticOrchestrator
    ├── MisfireAgent (Engine misfire detection)
    ├── DFCAgent (Diagnostic Trouble Code analysis)
    ├── IUPRAgent (In-Use Performance Ratio monitoring)
    └── GearAgent (Gear hunting & transmission analysis)
```

## Agents

### MisfireAgent
**Purpose**: Advanced engine misfire detection and analysis

**Capabilities**:
- Crankshaft Speed Variance Analysis (CSVA)
- Frequency Domain Analysis (FFT-based)
- Per-cylinder detection
- Signal fusion (RPM + Lambda + Load + Temp)
- Statistical anomaly detection
- ML-based anomaly detection
- Pattern matching

**Keywords**: misfire, misfiring, cylinder misfire, combustion, ignition failure, engine skip

**Usage**:
```python
from bots.databot.specialized_agents.misfire_agent import MisfireAgent

agent = MisfireAgent()
result = agent.analyze(files, query="detect misfires")
insights = agent.get_insights(result)
```

### DFCAgent
**Purpose**: Diagnostic Trouble Code (DTC/DFC) analysis

**Capabilities**:
- DTC code parsing (P0/P1/P2/P3, B, C, U codes)
- Status byte decoding
- Severity classification
- Temporal analysis with event segments
- Correlation analysis
- Freeze frame detection
- Priority assessment

**Keywords**: dtc, dfc, diagnostic code, trouble code, error code, fault code, check engine, mil

**Usage**:
```python
from bots.databot.specialized_agents.dfc_agent import DFCAgent

agent = DFCAgent()
result = agent.analyze(files, query="analyze DTCs")
insights = agent.get_insights(result)
```

### IUPRAgent
**Purpose**: In-Use Performance Ratio (IUPR) monitoring and OBD-II compliance

**Capabilities**:
- IUPR ratio calculation
- Monitor status tracking
- OBD-II compliance checking
- Emissions monitoring
- Catalyst monitoring
- Oxygen sensor monitoring
- EGR monitoring

**Keywords**: iupr, in-use performance, monitor, monitoring, obd, obd-ii, emissions, catalyst, oxygen sensor, egr, compliance, ratio

**Usage**:
```python
from bots.databot.specialized_agents.iupr_agent import IUPRAgent

agent = IUPRAgent()
result = agent.analyze(files, query="check IUPR compliance")
insights = agent.get_insights(result)
```

### GearAgent
**Purpose**: Gear hunting and transmission behavior analysis

**Capabilities**:
- Gear hunting detection
- Rapid shift detection
- Oscillating pattern detection
- Inefficient shift detection
- Severity scoring
- Transmission efficiency analysis
- Multi-signal correlation

**Keywords**: gear, gearbox, transmission, hunting, gear hunting, shift, shifting, gear change, transmission behavior, gear oscillation, rapid shift

**Usage**:
```python
from bots.databot.specialized_agents.gear_agent import GearAgent

agent = GearAgent()
result = agent.analyze(files, query="detect gear hunting")
insights = agent.get_insights(result)
```

## Orchestrator

### DiagnosticOrchestrator
**Purpose**: Coordinates multiple agents for complex diagnostic scenarios

**Features**:
- Intelligent query routing
- Multi-agent coordination
- Cross-domain correlation
- Context sharing between agents

**Usage**:
```python
from bots.databot.specialized_agents.orchestrator import DiagnosticOrchestrator

orchestrator = DiagnosticOrchestrator()

# Route query to appropriate agent(s)
result = orchestrator.route_query("check for misfires and DTCs", files)

# Run all agents for comprehensive analysis
comprehensive = orchestrator.analyze_all(files, query="full diagnostic")
```

## Integration with DiagAI

The agents are fully integrated with the existing DiagAI system:

### Tools Available
- `analyze_with_misfire_agent(query, cylinder_count)`
- `analyze_with_dfc_agent(query)`
- `analyze_with_iupr_agent(query)`
- `analyze_with_gear_agent(query)`
- `analyze_with_orchestrator(query, agent_preference)`
- `comprehensive_diagnostic_analysis(query)`

### LLM Function Calling
All agents are available as functions that the LLM can call automatically based on user queries.

### Example Queries
- "Check for misfires" → Uses MisfireAgent
- "What DTCs are present?" → Uses DFCAgent
- "Check IUPR compliance" → Uses IUPRAgent
- "Is there gear hunting?" → Uses GearAgent
- "Run comprehensive diagnostics" → Uses all agents
- "Analyze misfires and DTCs together" → Uses Orchestrator for multi-agent coordination

## Agent Communication

Agents can communicate with each other for cross-domain analysis:

```python
# Agent-to-agent communication
misfire_agent = MisfireAgent()
dfc_agent = DFCAgent()

context = {"misfire_events": misfire_result}
dfc_response = misfire_agent.communicate_with(dfc_agent, context)
```

## Benefits

1. **Specialized Expertise**: Each agent is optimized for its domain
2. **Scalability**: Easy to add new agents
3. **Parallel Execution**: Agents can run simultaneously
4. **Cross-Correlation**: Orchestrator finds relationships between different diagnostic areas
5. **Intelligent Routing**: Automatically selects the right agent(s) for queries
6. **Comprehensive Analysis**: Can run all agents for complete vehicle health check

## Extending the System

To add a new agent:

1. Create a new agent class inheriting from `DiagnosticAgent`
2. Implement required methods: `analyze()`, `get_insights()`, `get_keywords()`
3. Add the agent to `DiagnosticOrchestrator.__init__()`
4. Add tool function to `tools.py`
5. Add function definition to `agent.py` FUNCTIONS list
6. Update prompts in `prompts.py`

## File Structure

```
specialized_agents/
├── __init__.py              # Exports all agents
├── base_agent.py            # Base class for all agents
├── misfire_agent.py         # Misfire detection agent
├── dfc_agent.py            # DTC/DFC analysis agent
├── iupr_agent.py           # IUPR monitoring agent
├── gear_agent.py           # Gear hunting agent
├── orchestrator.py         # Multi-agent coordinator
└── README.md               # This file
```

## Dependencies

- `custom_modules.custom_misfire` - Misfire detection algorithms
- `custom_modules.custom_dfc` - DTC/DFC analysis
- `custom_modules.custom_iupr` - IUPR analysis
- `custom_modules.custom_gear` - Gear hunting analysis

All agents gracefully handle missing dependencies and return appropriate error messages.

