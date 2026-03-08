# Automatic Knowledge Document Upload

## Overview

The system now **automatically uploads knowledge documents** to Gemini File Search stores when the server starts. No manual intervention required!

## How It Works

### Automatic Upload on Startup

When the Flask application starts (`app.py`), it automatically:

1. **Scans `docs/` directory** for knowledge documents (`.md` and `.pdf` files)
2. **Categorizes documents** based on filename and content keywords
3. **Uploads to appropriate stores** based on category
4. **Tracks uploaded files** to avoid duplicates

### File Tracking

The system maintains a tracking file at `data/knowledge_upload_tracking.json` that records:
- Which files have been uploaded
- File modification times
- Upload timestamps

This prevents duplicate uploads unless files are modified.

## Document Categorization

Documents are automatically categorized based on keywords in filename and path:

| Category | Keywords | Target Store |
|----------|----------|-------------|
| **Vehicle Analysis** | diagnostic, drivability, vehicle, fleet, analysis, agent | `GEMINI_FILE_SEARCH_STORE_VEHICLE` |
| **MATLAB** | plot, visualization, matlab, function, plotting, graph | `GEMINI_FILE_SEARCH_STORE_MATLAB` |
| **Calibration** | calibration, tuning, map, cal | `GEMINI_FILE_SEARCH_STORE` (main store) |
| **SI/CI Engine** | si, ci, engine, spark, ignition, diesel, gasoline | `GEMINI_FILE_SEARCH_STORE_SI_CI_ENGINE` |

## Adding New Knowledge Documents

### Step 1: Create Document

Create a new markdown (`.md`) or PDF (`.pdf`) file in the `docs/` directory:

```bash
# Example: Create a new diagnostics guide
touch docs/MY_NEW_DIAGNOSTICS_GUIDE.md
```

### Step 2: Use Descriptive Filename

Use descriptive filenames with relevant keywords for automatic categorization:

**Good Examples**:
- `ADVANCED_VEHICLE_DIAGNOSTICS_ANALYSIS.md` → Vehicle Analysis store
- `PLOTTING_STRATEGIES_AND_VISUALIZATION.md` → MATLAB store
- `ENGINE_CALIBRATION_METHODS.md` → Calibration store
- `SI_ENGINE_ANALYSIS.md` → SI/CI Engine store

**Bad Examples**:
- `guide.md` → May not categorize correctly
- `notes.txt` → Not supported (only `.md` and `.pdf`)

### Step 3: Restart Server (or wait for next startup)

The document will be automatically uploaded on next server startup.

**That's it!** No manual upload needed.

## Manual Upload (Optional)

If you want to manually trigger upload or force re-upload:

### Using Python Script

```python
from bots.databot.auto_upload_knowledge import auto_upload_knowledge_documents
from pathlib import Path

# Upload all documents
results = auto_upload_knowledge_documents(force=False)  # force=True to re-upload all

# Upload specific file
from bots.databot.auto_upload_knowledge import upload_knowledge_document
result = upload_knowledge_document(Path("docs/MY_NEW_DOC.md"), force=True)
```

### Using Command Line Script

```bash
python scripts/upload_diagnostics_plotting_knowledge.py
```

## Configuration

### Environment Variables

Set these environment variables to configure stores:

```bash
# Required: Gemini API Key
export GEMINI_API_KEY='your-api-key-here'

# Optional: Store names (defaults to config file if not set)
export GEMINI_FILE_SEARCH_STORE_VEHICLE='projects/.../fileSearchStores/vehicle-analysis'
export GEMINI_FILE_SEARCH_STORE_MATLAB='projects/.../fileSearchStores/matlab-methodology'
export GEMINI_FILE_SEARCH_STORE_SI_CI_ENGINE='projects/.../fileSearchStores/si-ci-engine'
export GEMINI_FILE_SEARCH_STORE='projects/.../fileSearchStores/main-store'
```

### Store Configuration File

The system also reads from `data/gemini_stores_config.json`:

```json
{
  "stores": {
    "Vehicle": "projects/.../fileSearchStores/vehicle-analysis",
    "MATLAB": "projects/.../fileSearchStores/matlab-methodology",
    "SI_CI_Engine": "projects/.../fileSearchStores/si-ci-engine"
  }
}
```

## File Requirements

### Supported Formats
- **Markdown** (`.md`) - Recommended for documentation
- **PDF** (`.pdf`) - For existing PDF documents

### File Size Limits
- Maximum file size: **50 MB**
- Larger files are automatically skipped

### File Naming
- Use descriptive filenames with keywords
- Avoid temporary files (starting with `~$` or `.`)
- Use consistent naming conventions

## Troubleshooting

### Documents Not Uploading

1. **Check Gemini File Search is enabled**:
   ```python
   from bots.databot.gemini_file_search import GEMINI_FILE_SEARCH_ENABLED
   print(GEMINI_FILE_SEARCH_ENABLED)  # Should be True
   ```

2. **Check environment variables**:
   ```bash
   echo $GEMINI_API_KEY
   echo $GEMINI_FILE_SEARCH_STORE_VEHICLE
   ```

3. **Check file format**: Only `.md` and `.pdf` files are supported

4. **Check file size**: Files > 50 MB are skipped

5. **Check logs**: Look for upload messages in server logs

### Force Re-upload

To force re-upload of all documents:

```python
from bots.databot.auto_upload_knowledge import auto_upload_knowledge_documents
results = auto_upload_knowledge_documents(force=True)
```

### Clear Upload Tracking

To clear upload tracking and re-upload everything:

```bash
rm data/knowledge_upload_tracking.json
# Restart server
```

## Logging

Upload activity is logged at INFO level:

```
INFO: Auto-uploading knowledge documents on startup...
INFO: Found 15 knowledge documents to process
INFO: Uploading knowledge document: ADVANCED_VEHICLE_DIAGNOSTICS_ANALYSIS.md to Vehicle_Analysis store
INFO: ✅ Auto-uploaded 3 knowledge documents
```

Check server logs for detailed upload information.

## Benefits

✅ **Zero Manual Work**: Just add files to `docs/` directory  
✅ **Automatic Categorization**: Documents sorted by content  
✅ **Duplicate Prevention**: Tracks uploaded files  
✅ **Startup Integration**: Works automatically on server start  
✅ **Error Handling**: Gracefully handles failures without breaking server  

## Example Workflow

1. **Create new document**:
   ```bash
   echo "# My New Diagnostics Guide" > docs/MY_NEW_GUIDE.md
   ```

2. **Add content**:
   ```markdown
   # My New Diagnostics Guide
   
   This guide covers advanced diagnostics techniques...
   ```

3. **Restart server** (or wait for next startup):
   ```bash
   python app.py
   ```

4. **Check logs**:
   ```
   INFO: Uploading knowledge document: MY_NEW_GUIDE.md to Vehicle_Analysis store
   INFO: ✅ Auto-uploaded 1 knowledge documents
   ```

5. **Document is now available** in Gemini File Search for AI queries!

---

**No manual upload needed - it's all automatic!** 🚀

