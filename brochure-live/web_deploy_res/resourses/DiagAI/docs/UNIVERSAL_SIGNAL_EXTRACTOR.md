# Universal Signal Extractor - GPT-Level Databot Enhancement

## Overview

The databot has been upgraded with **GPT-level intelligence** for signal discovery and extraction. It can now automatically discover and extract ALL signals from uploaded files without requiring manual ingestion.

## Key Features

### 1. **Universal Signal Finder** (`list_signals`)
- **Automatically discovers signals from BOTH database AND uploaded files**
- No need to ingest first - reads directly from MDF/MF4/CSV/Excel files
- GPT-level smart - intelligently merges results from both sources
- Returns comprehensive metadata including units, ECU, bus, presence info

### 2. **Universal Signal Extractor** (`extract_signals_from_active_files`)
- Extracts ALL signals from uploaded files into database for faster analysis
- Automatically discovers every signal from user's active files
- Smart deduplication - only extracts signals not already in database
- Bulk insertion for performance

### 3. **Enhanced Stats Function**
- Reads from database first (fast)
- Falls back to reading directly from files if signal not in database
- GPT-level smart - works seamlessly whether data is ingested or not

## Architecture

### File Bridge Pattern
A bridge pattern was implemented to allow `tools.py` to access app.py functions without circular imports:

```python
# In tools.py
_app_discover_channels = None
_app_list_channels = None
_app_extract_series = None
_app_read_signal = None
_app_active_files_getter = None

def init_file_bridge(...):
    """Initialize bridge to app.py file functions."""
    # Set global references
```

### Initialization
In `app.py`, the bridge is initialized when databot modules are loaded:

```python
databot_tools.init_file_bridge(
    discover_channels_func=discover_channels,
    list_channels_func=list_channels,
    extract_series_func=extract_series,
    read_signal_func=read_signal,
    active_files_getter=lambda: ACTIVE_FILES
)
```

## Usage

### Automatic Discovery
When a user asks "list all signals" or "what signals are available", the databot now:
1. Checks the database first (fast)
2. Also discovers signals directly from uploaded files
3. Merges results intelligently
4. Returns comprehensive list with metadata

### Manual Extraction
Users can also explicitly extract signals:
- "extract all signals from uploaded files"
- "ingest signals into database"

The tool will:
1. Discover all signals from ACTIVE_FILES
2. Check what's already in database
3. Extract only new signals (unless force=True)
4. Bulk insert for performance

## Benefits

1. **No Manual Steps**: Users don't need to know about ingestion - it just works
2. **Comprehensive Coverage**: Discovers ALL signals, not just what's in database
3. **Performance**: Uses database when available, falls back to files when needed
4. **GPT-Level Intelligence**: Automatically chooses the best data source
5. **Robust**: Handles edge cases like NaN/Inf values, missing files, etc.

## Technical Details

### Signal Discovery Flow
```
User Query → list_signals()
    ├─→ Query Database (fast path)
    └─→ Discover from Files (if bridge initialized)
        ├─→ Get ACTIVE_FILES
        ├─→ Call discover_channels()
        └─→ Merge and deduplicate results
```

### Signal Extraction Flow
```
extract_signals_from_active_files()
    ├─→ Get ACTIVE_FILES
    ├─→ Discover all channels
    ├─→ Check existing signals in database
    ├─→ Extract data using extract_series()
    ├─→ Filter NaN/Inf values
    └─→ Bulk insert into database
```

## Example Interactions

**Before (Limited):**
```
User: "list all signals"
Bot: "Found 4 signals" (only from database)
```

**After (Comprehensive):**
```
User: "list all signals"
Bot: "Found 600+ signals" (from database + files)
```

**New Capability:**
```
User: "analyze RPM signal"
Bot: *Automatically reads from files if not in database*
     "RPM Statistics: min=800, max=6000, mean=2500..."
```

## Files Modified

1. **bots/databot/tools.py**
   - Added `_discover_signals_from_files()` - Universal Signal Extractor
   - Enhanced `list_signals()` - Now checks both database and files
   - Enhanced `stats()` - Falls back to files if not in database
   - Added `extract_signals_from_active_files()` - Bulk extraction tool
   - Added `init_file_bridge()` - Bridge initialization

2. **bots/databot/agent.py**
   - Updated `list_signals` function description to mention Universal Signal Finder
   - Added `extract_signals_from_active_files` to FUNCTIONS list

3. **app.py**
   - Added bridge initialization in databot import section
   - Passes app.py functions to tools.py safely

## Testing

To test the Universal Signal Extractor:

1. Upload a file (MDF/MF4/CSV/Excel)
2. Ask databot: "list all signals"
3. Should see signals from both database AND files
4. Ask: "stats for RPM" (even if not in database)
5. Should automatically read from files

## Future Enhancements

- Auto-extraction on file upload
- Parallel extraction for large files
- Incremental extraction (only new signals)
- Caching of file discovery results
- Signal metadata enrichment (units, descriptions, etc.)

