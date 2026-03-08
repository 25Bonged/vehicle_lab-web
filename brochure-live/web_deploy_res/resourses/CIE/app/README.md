# Calibration Intelligence Engine (CIE) Pro

<div align="center">

**Production-Grade Model-Based Calibration System for Engine Calibration Optimization**

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

[Features](#-features) • [Installation](#️-installation--setup) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Installation & Setup](#️-installation--setup)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Testing](#-testing)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## Overview

**CIE Pro** is a comprehensive Model-Based Calibration (MBC) system designed for professional engine calibration workflows. It provides a complete end-to-end solution from Design of Experiments (DoE) through surrogate modeling, optimization, and ECU export in industry-standard formats.

### Key Capabilities

- **Complete MBC Workflow**: DoE → Modeling → Optimization → ECU Export
- **Multi-format Data Import**: CSV, MDF, MF4, MATLAB, HDF5
- **Real-time Training Monitoring**: WebSocket-based progress tracking
- **Advanced Machine Learning**: Random Forest, Neural Networks, Gaussian Processes, RBF Surrogate Models
- **Multi-objective Optimization**: NSGA-II, CMA-ES, Pareto front generation
- **AutoML Integration**: Optuna-based hyperparameter optimization
- **ECU Export Formats**: ASAM CDF, A2L/HEX, INCA formats
- **Professional Dashboard**: Modern web interface with real-time updates
- **Interactive Map Editor**: 2D/3D map editing with validation
- **Comprehensive Reporting**: HTML and PDF report generation

---

## 🚀 Features

### Core Features

- ✅ **Complete MBC Workflow**: Design of Experiments (DoE) → Modeling → Optimization → ECU Export
- ✅ **Multi-format Data Import**: CSV, MDF, MF4, MATLAB, HDF5
- ✅ **Real-time Training Monitoring**: WebSocket-based progress tracking
- ✅ **Advanced Machine Learning**: Random Forest, Neural Networks, Gaussian Processes, RBF Surrogate Models
- ✅ **Multi-objective Optimization**: NSGA-II, CMA-ES, Pareto front generation
- ✅ **AutoML Integration**: Optuna-based hyperparameter optimization
- ✅ **ECU Export Formats**: ASAM CDF, A2L/HEX, INCA formats
- ✅ **Professional Dashboard**: Modern web interface with real-time updates
- ✅ **Interactive Map Editor**: 2D/3D map editing with validation
- ✅ **Comprehensive Reporting**: HTML and PDF report generation

### Advanced Features

- **RBF Surrogate Models**: Multiple kernel types with uncertainty quantification
- **PCE Surrogate Models**: Polynomial Chaos Expansion for uncertainty propagation
- **NSGA-II Optimizer**: Non-dominated Sorting Genetic Algorithm with Pareto front generation
- **CMA-ES Optimizer**: Covariance Matrix Adaptation Evolution Strategy for high-dimensional optimization
- **Interactive Map Editor**: Gaussian smoothing, monotonicity enforcement, advanced interpolation
- **Visualization Suite**: Residual heatmaps, uncertainty visualization, Pareto front explorer

---

## 🛠️ Installation & Setup

### Prerequisites

- **Python**: 3.11 or higher (Python 3.13 recommended)
- **Package Manager**: pip or conda
- **Operating System**: macOS, Linux, or Windows

### Step 1: Clone the Repository

```bash
git clone https://github.com/25Bonged/Calibration-Intelligence-.git
cd Calibration-Intelligence-/app
```

### Step 2: Create Virtual Environment

**Using venv (Recommended):**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**Using conda:**
```bash
conda create -n cie311 python=3.11
conda activate cie311
```

### Step 3: Install Dependencies

```bash
# Install core dependencies
pip install -r requirements.txt

# Optional: Install advanced ML libraries
pip install -r config/requirements_advanced_ml.txt
```

### Step 4: Verify Installation

```bash
python -c "import flask, pandas, numpy, sklearn; print('✓ Core dependencies installed')"
```

---

## 🚀 Quick Start

### Start the API Server

**Option 1: Direct Python execution**
```bash
python Cie_api_server.py
```

**Option 2: Using startup script**
```bash
./scripts/start_server.sh
```

**Option 3: Using Python starter (auto-installs dependencies)**
```bash
python start_dashboard.py
```

### Access the Dashboard

Once the server is running, open your browser and navigate to:

```
http://127.0.0.1:5000/
```

### Verify Server Status

```bash
curl http://127.0.0.1:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "System healthy",
  "version": "9.1.0",
  "data": {
    "engine_version": "9.2.0 (Next-Level AI/ML)",
    "api_uptime": "2025-11-04T23:54:02",
    "dependencies": {
      "scikit_learn": true,
      "optuna": true,
      "h5py": true
    }
  }
}
```

---

## 📖 Usage Examples

### Example 1: Upload Data

**Using cURL:**
```bash
curl -X POST http://127.0.0.1:5000/api/data/upload \
  -F "file=@/path/to/your/data.csv" \
  -F "format=csv"
```

**Using Python:**
```python
import requests

url = "http://127.0.0.1:5000/api/data/upload"
files = {"file": open("data.csv", "rb")}
data = {"format": "csv"}

response = requests.post(url, files=files, data=data)
result = response.json()

if result["success"]:
    print(f"✓ Upload successful: {result['data']['signals']} signals")
    print(f"  Samples: {result['data']['samples']}")
else:
    print(f"✗ Upload failed: {result['message']}")
```

**Response:**
```json
{
  "success": true,
  "message": "Data uploaded successfully",
  "data": {
    "signals": 36,
    "samples": 1000,
    "filename": "data.csv",
    "signals_list": ["Speed", "Load", "Torque", "BSFC", ...]
  }
}
```

### Example 2: Train a Model

**Using cURL:**
```bash
curl -X POST http://127.0.0.1:5000/api/train \
  -H "Content-Type: application/json" \
  -d '{
    "model_id": "torque_model",
    "features": ["Speed", "Load", "Spark_Advance"],
    "targets": ["Torque"],
    "training_params": {
      "model_type": "random_forest",
      "n_estimators": 100,
      "max_depth": 10
    }
  }'
```

**Using Python:**
```python
import requests

url = "http://127.0.0.1:5000/api/train"
payload = {
    "model_id": "torque_model",
    "features": ["Speed", "Load", "Spark_Advance"],
    "targets": ["Torque"],
    "training_params": {
        "model_type": "random_forest",
        "n_estimators": 100,
        "max_depth": 10,
        "test_split": 0.2
    }
}

response = requests.post(url, json=payload)
result = response.json()

if result["success"]:
    metrics = result["data"]["metrics"]
    print(f"✓ Model trained successfully")
    print(f"  R² Score: {metrics['r2_score']:.4f}")
    print(f"  RMSE: {metrics['rmse']:.4f}")
    print(f"  Training Time: {result['data']['training_time']:.2f}s")
else:
    print(f"✗ Training failed: {result['message']}")
```

**Response:**
```json
{
  "success": true,
  "message": "Model trained successfully",
  "data": {
    "model_id": "torque_model",
    "metrics": {
      "r2_score": 0.9432,
      "rmse": 12.45,
      "mae": 8.32
    },
    "training_time": 45.2,
    "info": {
      "model_type": "random_forest",
      "features": ["Speed", "Load", "Spark_Advance"],
      "targets": ["Torque"]
    }
  }
}
```

### Example 3: Generate DoE Test Plan

**Using cURL:**
```bash
curl -X POST http://127.0.0.1:5000/api/doe/advanced \
  -H "Content-Type: application/json" \
  -d '{
    "method": "lhs",
    "variables": {
      "Speed": {"min": 1000, "max": 6000},
      "Load": {"min": 0.2, "max": 1.0},
      "Spark_Advance": {"min": 0, "max": 30}
    },
    "num_samples": 100
  }'
```

**Using Python:**
```python
import requests

url = "http://127.0.0.1:5000/api/doe/advanced"
payload = {
    "method": "lhs",  # Options: lhs, sobol, d_optimal, full_factorial, ccd, box_behnken
    "variables": {
        "Speed": {"min": 1000, "max": 6000},
        "Load": {"min": 0.2, "max": 1.0},
        "Spark_Advance": {"min": 0, "max": 30}
    },
    "num_samples": 100,
    "constraints": {
        "Speed": {"min": 1500, "max": 5500}  # Operating envelope
    }
}

response = requests.post(url, json=payload)
result = response.json()

if result["success"]:
    test_plan = result["data"]["test_plan"]
    print(f"✓ DoE generated: {len(test_plan)} test points")
    print(f"  Method: {result['data']['method']}")
    print(f"  Variables: {result['data']['variables']}")
    
    # Export to CSV
    import pandas as pd
    df = pd.DataFrame(test_plan)
    df.to_csv("doe_test_plan.csv", index=False)
    print("  ✓ Exported to doe_test_plan.csv")
```

**Response:**
```json
{
  "success": true,
  "message": "DoE generated successfully",
  "data": {
    "method": "lhs",
    "num_samples": 100,
    "test_plan": [
      {"Speed": 3245.2, "Load": 0.65, "Spark_Advance": 12.3},
      {"Speed": 1892.7, "Load": 0.42, "Spark_Advance": 8.9},
      ...
    ],
    "variables": ["Speed", "Load", "Spark_Advance"],
    "validation": {
      "coverage": 0.95,
      "spacing": "good"
    }
  }
}
```

### Example 4: Optimize Calibration

**Using cURL:**
```bash
curl -X POST http://127.0.0.1:5000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "model_id": "torque_model",
    "method": "single_objective",
    "targets": {"Torque": "maximize"},
    "constraints": {
      "Speed": {"min": 2000, "max": 4000},
      "Load": {"min": 0.5, "max": 0.9}
    },
    "initial_guess": {"Speed": 3000, "Load": 0.7}
  }'
```

**Using Python:**
```python
import requests

url = "http://127.0.0.1:5000/api/optimize"
payload = {
    "model_id": "torque_model",
    "method": "single_objective",  # Options: single_objective, multi_objective, nsga2
    "targets": {
        "Torque": "maximize",  # or "minimize"
        "BSFC": "minimize"
    },
    "constraints": {
        "Speed": {"min": 2000, "max": 4000},
        "Load": {"min": 0.5, "max": 0.9},
        "Spark_Advance": {"min": 5, "max": 25}
    },
    "initial_guess": {
        "Speed": 3000,
        "Load": 0.7,
        "Spark_Advance": 15
    }
}

response = requests.post(url, json=payload)
result = response.json()

if result["success"]:
    solution = result["data"]["solution"]
    print(f"✓ Optimization completed")
    print(f"  Optimal Speed: {solution['Speed']:.2f} RPM")
    print(f"  Optimal Load: {solution['Load']:.3f}")
    print(f"  Predicted Torque: {solution['Torque']:.2f} Nm")
    print(f"  Objective Value: {result['data']['objective_value']:.4f}")
```

**Response:**
```json
{
  "success": true,
  "message": "Optimization completed",
  "data": {
    "method": "single_objective",
    "solution": {
      "Speed": 3250.5,
      "Load": 0.782,
      "Spark_Advance": 18.3,
      "Torque": 245.6
    },
    "objective_value": 245.6,
    "convergence": true,
    "iterations": 45
  }
}
```

### Example 5: Generate Calibration Maps

**Using cURL:**
```bash
curl -X POST http://127.0.0.1:5000/api/maps/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model_id": "torque_model",
    "x_axis": {"variable": "Speed", "min": 1000, "max": 6000, "points": 20},
    "y_axis": {"variable": "Load", "min": 0.2, "max": 1.0, "points": 15},
    "fixed_values": {"Spark_Advance": 15}
  }'
```

**Using Python:**
```python
import requests

url = "http://127.0.0.1:5000/api/maps/generate"
payload = {
    "model_id": "torque_model",
    "x_axis": {
        "variable": "Speed",
        "min": 1000,
        "max": 6000,
        "points": 20
    },
    "y_axis": {
        "variable": "Load",
        "min": 0.2,
        "max": 1.0,
        "points": 15
    },
    "fixed_values": {
        "Spark_Advance": 15
    }
}

response = requests.post(url, json=payload)
result = response.json()

if result["success"]:
    map_data = result["data"]["map"]
    print(f"✓ Map generated: {len(map_data)} points")
    
    # Export map data
    import pandas as pd
    df = pd.DataFrame(map_data)
    df.to_csv("torque_map.csv", index=False)
    print("  ✓ Exported to torque_map.csv")
```

**Response:**
```json
{
  "success": true,
  "message": "Map generated successfully",
  "data": {
    "map": [
      {"Speed": 1000, "Load": 0.2, "Torque": 45.2},
      {"Speed": 1000, "Load": 0.3, "Torque": 67.8},
      ...
    ],
    "x_axis": {"variable": "Speed", "points": 20},
    "y_axis": {"variable": "Load", "points": 15},
    "shape": [20, 15]
  }
}
```

### Example 6: Export to ASAM Format

**Using cURL:**
```bash
curl -X POST http://127.0.0.1:5000/api/export/asam \
  -H "Content-Type: application/json" \
  -d '{
    "model_id": "torque_model",
    "format": "a2l",
    "map_name": "TorqueMap",
    "characteristic_name": "Torque_Map",
    "axis_names": ["Speed", "Load"]
  }'
```

**Using Python:**
```python
import requests

url = "http://127.0.0.1:5000/api/export/asam"
payload = {
    "model_id": "torque_model",
    "format": "a2l",  # Options: a2l, cdf, hex
    "map_name": "TorqueMap",
    "characteristic_name": "Torque_Map",
    "axis_names": ["Speed", "Load"],
    "output_file": "torque_map.a2l"
}

response = requests.post(url, json=payload)
result = response.json()

if result["success"]:
    file_path = result["data"]["file_path"]
    print(f"✓ Export successful: {file_path}")
```

---

## 📡 API Reference

### Core Endpoints

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "System healthy",
  "version": "9.1.0"
}
```

#### System Information
```http
GET /api/system/info
```

**Response:**
```json
{
  "success": true,
  "data": {
    "engine_version": "9.2.0",
    "python_version": "3.11.5",
    "dependencies": {...},
    "system_resources": {...}
  }
}
```

### Data Management

#### Upload Data
```http
POST /api/data/upload
Content-Type: multipart/form-data

file: <file>
format: csv|excel|mdf|mf4
```

#### Get Data Info
```http
GET /api/data/info
```

#### Clean Data
```http
POST /api/data/clean
Content-Type: application/json

{
  "remove_outliers": true,
  "fill_method": "forward"
}
```

### Model Training

#### Train Model
```http
POST /api/train
Content-Type: application/json

{
  "model_id": "string",
  "features": ["string"],
  "targets": ["string"],
  "training_params": {
    "model_type": "random_forest|neural_network|gaussian_process",
    "n_estimators": 100,
    "max_depth": 10,
    "test_split": 0.2
  }
}
```

#### Get Training Status
```http
GET /api/train/status/<session_id>
```

#### List Models
```http
GET /api/models
```

#### Get Model Details
```http
GET /api/models/<model_id>
```

#### Delete Model
```http
DELETE /api/models/<model_id>
```

### Predictions

#### Single Prediction
```http
POST /api/predict
Content-Type: application/json

{
  "model_id": "string",
  "inputs": [{"feature": value}]
}
```

#### Batch Prediction
```http
POST /api/predict
Content-Type: application/json

{
  "model_id": "string",
  "inputs": [
    {"feature1": value1, "feature2": value2},
    {"feature1": value3, "feature2": value4}
  ]
}
```

#### Prediction with Uncertainty
```http
POST /api/predict/uncertainty
Content-Type: application/json

{
  "model_id": "string",
  "inputs": [{"feature": value}],
  "confidence_level": 0.95
}
```

### Optimization

#### Single Objective Optimization
```http
POST /api/optimize
Content-Type: application/json

{
  "model_id": "string",
  "method": "single_objective",
  "targets": {"target": "maximize|minimize"},
  "constraints": {"variable": {"min": 0, "max": 100}},
  "initial_guess": {"variable": value}
}
```

#### Multi-objective Optimization (NSGA-II)
```http
POST /api/optimize
Content-Type: application/json

{
  "model_id": "string",
  "method": "nsga2",
  "targets": {
    "target1": "maximize",
    "target2": "minimize"
  },
  "constraints": {"variable": {"min": 0, "max": 100}},
  "population_size": 50,
  "generations": 100
}
```

#### Get Optimization History
```http
GET /api/optimize/history
```

### Design of Experiments

#### Generate DoE
```http
POST /api/doe/advanced
Content-Type: application/json

{
  "method": "lhs|sobol|d_optimal|full_factorial|ccd|box_behnken",
  "variables": {
    "variable": {"min": 0, "max": 100}
  },
  "num_samples": 100,
  "constraints": {}
}
```

### Map Generation

#### Generate Map
```http
POST /api/maps/generate
Content-Type: application/json

{
  "model_id": "string",
  "x_axis": {"variable": "string", "min": 0, "max": 100, "points": 20},
  "y_axis": {"variable": "string", "min": 0, "max": 100, "points": 15},
  "fixed_values": {"variable": value}
}
```

### Export

#### Export to ASAM Format
```http
POST /api/export/asam
Content-Type: application/json

{
  "model_id": "string",
  "format": "a2l|cdf|hex",
  "map_name": "string",
  "characteristic_name": "string",
  "axis_names": ["string"]
}
```

### AutoML

#### Run AutoML
```http
POST /api/automl
Content-Type: application/json

{
  "model_id": "string",
  "features": ["string"],
  "targets": ["string"],
  "optimization_time": 300,
  "n_trials": 50
}
```

---

## 📁 Project Structure

```
app/
├── README.md                      # This file
├── requirements.txt               # Python dependencies
├── .gitignore                     # Git ignore rules
│
├── Cie_api_server.py             # Main Flask API server
├── cie.py                        # Core calibration engine
│
├── docs/                         # Documentation
│   ├── README.md                 # Original README
│   ├── QUICK_START.md           # Quick start guide
│   ├── ADVANCED_FEATURES.md     # Advanced features documentation
│   ├── CALIBRATION_ENGINEER_GUIDE.md  # User guide
│   └── *.md                     # Additional documentation
│
├── tests/                        # Test suite
│   ├── test_*.py               # Unit and integration tests
│   └── ...
│
├── scripts/                      # Utility scripts
│   ├── start_server.sh         # Start API server
│   ├── run_dashboard.bat       # Windows dashboard launcher
│   └── ...
│
├── web/                         # Frontend files
│   ├── cie_frontend.html       # Main dashboard
│   └── dashboard_demo.html     # Demo version
│
├── data/                        # Data files
│   └── samples/                # Sample/test data
│
├── config/                      # Configuration files
│   ├── requirements_advanced_ml.txt
│   └── *.json                  # Configuration JSON files
│
├── models/                      # Trained models (gitignored)
├── exports/                     # Export outputs (gitignored)
├── uploads/                     # Uploaded files (gitignored)
├── projects/                    # Project files (gitignored)
├── logs/                        # Log files (gitignored)
├── audit_logs/                  # Audit logs (gitignored)
└── report_templates/            # Report templates
```

### Key Components

- **`cie.py`**: Core calibration engine with all MBC functionality
- **`Cie_api_server.py`**: Flask API server with WebSocket support
- **`advanced_models.py`**: RBF and PCE surrogate models
- **`advanced_optimization.py`**: NSGA-II, CMA-ES optimizers
- **`automl_optuna.py`**: Automated hyperparameter optimization
- **`asam_export.py`**: ASAM format export (A2L, CDF, HEX)
- **`map_editor.py`**: Interactive map editing and validation
- **`visualization_suite.py`**: Comprehensive visualization tools
- **`workflow_qa.py`**: Workflow management and QA tools
- **`toolchain_integration.py`**: MATLAB/INCA integration

---

## 🔧 Configuration

### Environment Variables

```bash
# Server Configuration
export CIE_HOST=127.0.0.1
export CIE_PORT=5000
export CIE_DEBUG=false

# Paths
export CIE_MODEL_DIR=models
export CIE_UPLOAD_DIR=uploads
export CIE_EXPORT_DIR=exports
```

### Configuration Files

Configuration files are located in `config/`. Modify JSON configuration files as needed for your environment.

**Example configuration:**
```json
{
  "server": {
    "host": "127.0.0.1",
    "port": 5000,
    "debug": false
  },
  "models": {
    "default_model_type": "random_forest",
    "auto_save": true
  },
  "optimization": {
    "default_method": "single_objective",
    "max_iterations": 1000
  }
}
```

---

## 🧪 Testing

### Run All Tests

```bash
python -m pytest tests/ -v
```

### Run Specific Test Suite

```bash
# Test DoE functionality
python -m pytest tests/test_doe.py -v

# Test advanced ML features
python -m pytest tests/test_advanced_ml_features.py -v

# Test full workflow
python -m pytest tests/test_full_workflow.py -v

# Test production readiness
python -m pytest tests/test_production_readiness.py -v
```

### Run Individual Test File

```bash
python tests/test_doe.py
python tests/test_training_doe_comprehensive.py
```

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Quick Start Guide](docs/QUICK_START.md)**: Get up and running quickly
- **[Advanced Features](docs/ADVANCED_FEATURES.md)**: Complete feature documentation
- **[Calibration Engineer Guide](docs/CALIBRATION_ENGINEER_GUIDE.md)**: Step-by-step user guide
- **[API Documentation](docs/ADVANCED_FEATURES.md)**: Complete API reference
- **Inline Documentation**: See docstrings in source files for detailed API documentation

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Follow the existing code structure**
2. **Write tests for new features**
3. **Update documentation**
4. **Ensure all tests pass before submitting**
5. **Follow PEP 8 style guidelines**

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Run tests (`pytest tests/`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

---

## 📄 License

[Specify your license here]

---

## 🙏 Acknowledgments

Built for professional engine calibration workflows with integration support for:

- **MATLAB**: Model-Based Calibration Toolbox integration
- **INCA**: ETAS INCA integration (file-based)
- **AVL CAMEO**: CAMEO integration (file-based)
- **ASAM Standards**: A2L, CDF, HEX export formats

---

## 📧 Support

For issues and questions:

- **Documentation**: Check the `docs/` directory for detailed guides
- **Issues**: Open an issue in the [GitHub repository](https://github.com/25Bonged/Calibration-Intelligence-)
- **API Documentation**: See inline docstrings in source files

---

<div align="center">

**Made with ❤️ for the Automotive Calibration Community**

[Back to Top](#calibration-intelligence-engine-cie-pro)

</div>
