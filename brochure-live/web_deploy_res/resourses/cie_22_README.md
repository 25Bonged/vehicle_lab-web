# Calibration Intelligence Engine (CIE) Pro

A comprehensive Model-Based Calibration (MBC) system for engine calibration optimization.

## 🚀 Features

- **Complete MBC Workflow**: Design of Experiments (DoE) → Modeling → Optimization → ECU Export
- **Multi-format Data Import**: CSV, MDF, MF4, MATLAB, HDF5
- **Real-time Training Monitoring**: WebSocket-based progress tracking
- **Advanced Machine Learning**: Random Forest, Neural Networks, Gaussian Processes
- **Multi-objective Optimization**: Pareto front generation, robust optimization
- **ECU Export Formats**: ASAM CDF, A2L/HEX, INCA formats
- **Professional Dashboard**: Modern web interface with real-time updates

## 📁 Current Status

### ✅ What's Working
- **Demo Dashboard**: `dashboard_demo.html` - Shows the interface without backend
- **Core Engine**: `cie.py` - Complete calibration intelligence engine
- **API Server**: `Cie_api_server.py` - Flask-based REST API (requires Python)

### ⚠️ Requires Python Installation
The full dashboard requires Python 3.11+ and dependencies to run the backend API server.

## 🛠️ Installation & Setup

### 1. Install Python
Download and install Python 3.11+ from [python.org](https://python.org)

### 2. Install Dependencies
```bash
pip install flask flask-cors flask-socketio pandas numpy scikit-learn plotly matplotlib seaborn joblib scipy
```

### 3. Run the Dashboard
```bash
# Start the API server
python Cie_api_server.py

# Open dashboard in browser
# Navigate to http://127.0.0.1:5000 or open cie_frontend.html
```

## 📊 Demo Mode

For immediate demonstration, open `dashboard_demo.html` in your browser to see the interface layout and features.

## 🎯 Key Components

- **cie.py**: Core calibration engine with all MBC functionality
- **Cie_api_server.py**: Flask API server with WebSocket support
- **cie_frontend.html**: Professional web dashboard
- **dashboard_demo.html**: Standalone demo version

## 🔧 System Requirements

- Python 3.11+
- Flask ecosystem
- Scientific Python stack (NumPy, Pandas, Scikit-learn)
- Modern web browser with JavaScript enabled

## 📈 MBC Workflow

1. **Data Import**: Load calibration datasets
2. **Design of Experiments**: Generate test plans
3. **Model Training**: Train surrogate models
4. **Optimization**: Multi-objective calibration
5. **Map Generation**: Create ECU calibration maps
6. **Export**: Generate production-ready files

## 🤝 Contributing

This is a demonstration of a professional calibration intelligence system. The full implementation requires Python runtime environment.

