# 🚀 Vehicle Lab - Complete Deployment Package

**Full-stack MDF Analytics Platform - Production Ready**

---

## 📦 What's Included

This is a complete, standalone deployment package containing all files needed to run the Vehicle Lab application.

### Core Application Files
- ✅ `app.py` - Main Flask backend server
- ✅ `config.py` - Configuration settings
- ✅ `shared_state.py` - Shared state management
- ✅ `frontend.html` - Web interface
- ✅ `requirements.txt` - Python dependencies
- ✅ `runtime.txt` - Python version specification
- ✅ `Procfile` - Process configuration (for Render/Heroku)
- ✅ `render.yaml` - Render deployment configuration
- ✅ `.gitignore` - Git ignore rules

### Essential Directories
- ✅ `blueprints/` - Flask blueprints (modular routes)
- ✅ `bots/` - AI/LLM functionality (DiagAI, DataBot)
- ✅ `core/` - Core functionality modules
- ✅ `custom_modules/` - Analysis modules (DFC, IUPR, Misfire, etc.)
- ✅ `utils/` - Utility functions
- ✅ `config/` - Configuration files and OEM profiles
- ✅ `database/` - Database schemas and migrations
- ✅ `scripts/` - Helper scripts
- ✅ `data/` - Data files and signal catalogs
- ✅ `Wltp/` - WLTP analysis module

### Deployment Files
- ✅ `render_deployment/` - Complete Render deployment package
  - Deployment guide
  - Environment variables template
  - All configuration files

### Empty Directories (Created at Runtime)
- `uploads/` - User uploaded files
- `logs/` - Application logs
- `tmp_plots/` - Temporary plot files
- `maps_outputs/` - Generated map outputs
- `models/` - ML models
- `posters/` - Generated posters

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd /Users/chayan/Documents/project_25/vehicle_lab_deployment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Set Environment Variables

Create a `.env` file (see `render_deployment/ENV_TEMPLATE.md` for template):

```bash
# Required
FLASK_ENV=production
FLASK_DEBUG=0
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Database (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key

# Optional: API Keys
DEEPSEEK_API_KEY=your-key-here
GEMINI_API_KEY=your-key-here
```

### 3. Run the Application

```bash
# Development mode
python app.py

# Or using Gunicorn (production)
gunicorn app:app --bind 0.0.0.0:8000 --workers 2 --threads 2 --timeout 120
```

### 4. Access the Application

Open your browser:
- Frontend: `http://localhost:8000`
- API: `http://localhost:8000/api/files`

---

## 📋 Features

### Core Capabilities
- ✅ **File Upload & Management** - MDF, MF4, CSV, Excel support
- ✅ **Signal Analysis** - Multi-signal extraction with statistics
- ✅ **Interactive Plotting** - Plotly-powered visualizations
- ✅ **Report Generation** - PDF, PPT, CSV exports
- ✅ **Empirical Maps** - MATLAB-level map generation
- ✅ **AI Assistant** - DiagAI with LLM integration
- ✅ **OEM Analysis** - Stellantis, BMW, TKM profiles

### Security Features
- ✅ **CORS Protection** - Environment-based origin restrictions
- ✅ **Rate Limiting** - Applied to all critical endpoints
- ✅ **Security Headers** - XSS, clickjacking protection
- ✅ **File Upload Security** - Path traversal protection
- ✅ **Input Validation** - Comprehensive validation throughout

---

## 🔒 Security

All security measures are implemented and verified:
- Security Score: **8.5/10** 🟢
- Production Ready: **YES** ✅

See `SECURITY_AUDIT_COMPLETE.md` for detailed security audit.

---

## 🚀 Deployment

### Render Deployment

Complete deployment package included in `render_deployment/` folder.

**Quick Deploy:**
1. Copy `render.yaml` and `Procfile` to root (if not already there)
2. Push to GitHub
3. Connect to Render
4. Set environment variables
5. Deploy!

See `render_deployment/DEPLOYMENT_GUIDE.md` for complete instructions.

---

## 📚 Documentation

- `README.md` - This file
- `SECURITY_AUDIT_COMPLETE.md` - Complete security audit
- `SECURITY_AND_DEPLOYMENT_COMPLETE.md` - Deployment summary
- `QUICK_START_RENDER.md` - Quick Render deployment guide
- `render_deployment/DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `render_deployment/ENV_TEMPLATE.md` - Environment variables template

---

## 🛠️ Configuration

### Environment Variables

See `render_deployment/ENV_TEMPLATE.md` for complete list.

**Required:**
- `ALLOWED_ORIGINS` - CORS origins
- `SUPABASE_URL` - Database URL
- `SUPABASE_KEY` - Database key

**Optional:**
- `DEEPSEEK_API_KEY` - For DiagAI
- `GEMINI_API_KEY` - For Gemini File Search
- `MAX_UPLOAD_SIZE_MB` - File size limit (default: 1000)

### File Limits

- Max upload size: 1000 MB (configurable)
- Max files: 400 (configurable)

---

## 📁 Directory Structure

```
vehicle_lab_deployment/
├── app.py                    # Main Flask application
├── config.py                 # Configuration
├── frontend.html             # Web interface
├── requirements.txt          # Dependencies
├── runtime.txt               # Python version
├── Procfile                  # Process config
├── render.yaml               # Render config
├── blueprints/               # Flask blueprints
├── bots/                     # AI/LLM modules
├── core/                     # Core modules
├── custom_modules/           # Analysis modules
├── utils/                    # Utilities
├── config/                   # Configuration files
├── database/                 # Database schemas
├── scripts/                  # Helper scripts
├── data/                     # Data files
├── Wltp/                     # WLTP module
├── render_deployment/        # Deployment package
├── uploads/                  # (empty - runtime)
├── logs/                     # (empty - runtime)
├── tmp_plots/                # (empty - runtime)
├── maps_outputs/             # (empty - runtime)
├── models/                   # (empty - runtime)
└── posters/                  # (empty - runtime)
```

---

## ✅ Production Readiness

**Status:** ✅ **PRODUCTION READY**

- ✅ All security measures implemented
- ✅ Rate limiting active
- ✅ Error handling sanitized
- ✅ Input validation complete
- ✅ Deployment files included
- ✅ Documentation complete

---

## 🆘 Troubleshooting

### Common Issues

1. **Import Errors**
   - Ensure all dependencies installed: `pip install -r requirements.txt`
   - Check Python version matches `runtime.txt`

2. **Database Connection**
   - Verify `SUPABASE_URL` and `SUPABASE_KEY` are set
   - Check Supabase project is active

3. **CORS Errors**
   - Set `ALLOWED_ORIGINS` environment variable
   - Include your frontend domain

4. **File Upload Fails**
   - Check `MAX_UPLOAD_SIZE_MB` setting
   - Verify disk space available
   - Check file permissions

See `render_deployment/DEPLOYMENT_GUIDE.md` for more troubleshooting.

---

## 📞 Support

- **Documentation:** See `render_deployment/DEPLOYMENT_GUIDE.md`
- **Security:** See `SECURITY_AUDIT_COMPLETE.md`
- **Deployment:** See `render_deployment/` folder

---

## 📝 License

See original project license.

---

**Made with ❤️ for VEHICLE-LAB**

*Last Updated: 2025-01-27*
