# Flask Blueprint Migration Guide

**Status:** ⚠️ Partially Complete - Foundation Created

---

## ✅ What's Been Done

1. **Created Blueprint Structure:**
   - `blueprints/__init__.py` - Package initialization
   - `blueprints/file_management.py` - File management endpoints (partially complete)
   - `shared_state.py` - Shared application state module

2. **File Management Blueprint:**
   - Created blueprint with 10 endpoints
   - Uses shared_state for global variables
   - Ready for registration

---

## 📋 Next Steps to Complete Migration

### Step 1: Initialize Shared State in app.py

Add this near the top of `app.py` (after imports and before app creation):

```python
# Initialize shared state for blueprints
from shared_state import init_shared_state

# After creating app, directories, and helper functions:
init_shared_state(
    active_files=ACTIVE_FILES,
    channels_cache=CHANNELS_CACHE,
    series_cache=SERIES_CACHE,
    app_dir=APP_DIR,
    upload_dir=UPLOAD_DIR,
    tmp_plots=TMP_PLOTS,
    maps_dir=MAPS_DIR,
    mdf_module=MDF,
    pd_module=pd,
    np_module=np,
    go_module=go,
    logger=app.logger,
    list_mdf_files=list_mdf_files,
    purge_mdf_files_only=purge_mdf_files_only,
    purge_all=purge_all,
    discover_channels=discover_channels,
    list_channels=list_channels,
    read_signal=read_signal,
    extract_series=extract_series
)
```

### Step 2: Register File Management Blueprint

Add this in `app.py` after creating the app (around line 183):

```python
# Register blueprints
from blueprints.file_management import bp as file_management_bp
app.register_blueprint(file_management_bp)
```

### Step 3: Remove Old Endpoints from app.py

After registering the blueprint, you can remove these endpoints from app.py:
- `@app.get("/")` - root()
- `@app.get("/favicon.ico")` - favicon()
- `@app.get("/api/ping")` - ping()
- `@app.get("/api/files")` - api_files()
- `@app.get("/api/list_uploaded_files")` - api_list_uploaded_files()
- `@app.post("/api/delete_file")` - api_delete_file()
- `@app.get("/api/active_files")` - api_active_files()
- `@app.post("/api/reset_files")` - reset_files()
- `@app.post("/api/delete_all")` - api_delete_all()
- `@app.post("/api/purge_all")` - api_purge_all()
- `@app.get("/api/channels")` - api_channels()

### Step 4: Create Additional Blueprints

Create these blueprints following the same pattern:

#### A. `blueprints/system.py`
- `/api/version` - version()
- `/api/log_error` - api_log_error()

#### B. `blueprints/analytics.py`
- `/analytics` - analytics()
- `/api/histogram` - api_histogram()
- `/api/dash_plot` - api_dash_plot()

#### C. `blueprints/reporting.py`
- `/api/report_section` - api_report_section()
- `/api/report` - api_report()
- `/api/custom_analysis` - api_custom_analysis()
- `/api/dfc_analysis` - api_dfc_analysis()
- `/api/file_header` - api_file_header()

#### D. `blueprints/map_generation.py`
- `/api/compute_map` - api_compute_map()
- `/api/export_map` - api_export_map()
- `/api/download_map` - api_download_map()
- `/api/map_runs` - api_map_runs()
- `/api/map_vars` - api_map_vars()
- `/api/get_map_data` - api_get_map_data()
- `/api/map_generation_progress` - api_map_generation_progress()
- `/api/test_map_module` - api_test_map_module()
- `/api/signal_suggestions` - api_signal_suggestions()

#### E. `blueprints/cie_endpoints.py`
- `/api/train_model` - api_train_model()
- `/api/optimize` - api_optimize()
- `/api/predict` - api_predict()
- `/api/train_map_model` - api_train_map_model()
- `/api/generate_map` - api_generate_map()
- `/api/export_map/<model_id>` - api_export_map_model()
- `/api/list_models` - api_list_models()
- `/api/delete_model/<model_id>` - api_delete_model()
- `/api/bayesian_optimize` - api_bayesian_optimize()
- `/api/predict_with_uncertainty` - api_predict_with_uncertainty()
- `/api/build_interpolation_map` - api_build_interpolation_map()
- `/api/get_recommendations` - api_get_recommendations()
- `/api/generate_doe` - api_generate_doe()

#### F. `blueprints/databot.py`
- `/api/databot/chat` - api_databot_chat()
- `/api/databot/tools/list` - api_databot_tools_list()
- `/api/databot/tools/<tool_name>` - api_databot_tool_call()
- `/api/databot/signals` - api_databot_signals()
- `/api/databot/trips` - api_databot_trips()
- `/api/databot/catalog` - api_databot_catalog()
- `/api/databot/ingest` - api_databot_ingest()

#### G. `blueprints/debug.py`
- `/api/debug_signal_map` - debug_signal_map()
- `/api/debug_ccsl` - debug_ccsl()
- `/api/debug_dfc` - debug_dfc()
- `/api/ccsl_config` - api_ccsl_config()

#### H. `blueprints/upload.py`
- `/smart_merge_upload` - smart_merge_upload()
- `/api/validate_files` - api_validate_files()

---

## 🔧 Blueprint Template

Use this template for creating new blueprints:

```python
"""
[Blueprint Name] Blueprint.

[Description of what this blueprint handles]
"""

from pathlib import Path
from flask import Blueprint, request
from utils import safe_jsonify, json_error
from shared_state import (
    ACTIVE_FILES, UPLOAD_DIR, APP_DIR,
    # Add other needed imports
)

bp = Blueprint('blueprint_name', __name__)


@bp.get("/api/endpoint")
def endpoint_handler():
    """Endpoint description."""
    try:
        # Implementation
        return safe_jsonify({"ok": True})
    except Exception as e:
        return json_error("error_message", 500, exc=e)
```

---

## ⚠️ Important Notes

1. **Shared State:** All blueprints should import from `shared_state` for global variables
2. **Helper Functions:** Helper functions are also stored in `shared_state` and accessed via underscore prefix (e.g., `_list_mdf_files`)
3. **Testing:** Test each blueprint after migration before removing old endpoints
4. **Incremental Migration:** Migrate one blueprint at a time to minimize risk

---

## 📊 Migration Progress

- [x] Blueprint structure created
- [x] Shared state module created
- [x] File management blueprint created (10 endpoints)
- [ ] File management blueprint registered
- [ ] System blueprint
- [ ] Analytics blueprint
- [ ] Reporting blueprint
- [ ] Map generation blueprint
- [ ] CIE endpoints blueprint
- [ ] Databot blueprint
- [ ] Debug blueprint
- [ ] Upload blueprint

**Total Endpoints:** 57  
**Migrated:** 10  
**Remaining:** 47

---

## 🎯 Benefits After Migration

1. **Better Organization:** Each blueprint is ~200-500 lines vs 5,000+ line app.py
2. **Easier Testing:** Test blueprints independently
3. **Team Collaboration:** Multiple developers can work on different blueprints
4. **Maintainability:** Easier to find and modify specific endpoints
5. **Scalability:** Easy to add new blueprints or split existing ones

---

**Created:** 2025-01-28  
**Last Updated:** 2025-01-28

