# DBC (CAN Database) Workflow Implementation

## Overview

A comprehensive DBC file management system has been implemented to enable users to upload DBC files and use them for signal mapping with MDF files. The system supports parsing DBC files, associating them with MDF files, and automatically including DBC signals in the signal discovery process.

## Features

1. **DBC File Upload**: Upload `.dbc` files through the standard file upload interface
2. **DBC File Management**: List, view, and manage uploaded DBC files
3. **File Association**: Associate DBC files with specific MDF files
4. **Signal Discovery**: DBC signals are automatically included in channel discovery when associated with MDF files
5. **Signal Mapping**: DBC signals are available for signal mapping and analysis

## Architecture

### Backend Components

#### 1. DBC Manager Module (`utils/dbc_manager.py`)
- **DBCManager Class**: Main class for managing DBC files
  - Parses DBC files using `cantools` (preferred) or a simple fallback parser
  - Stores DBC files in `uploads/dbc_files/`
  - Manages associations between DBC and MDF files (stored in `data/dbc_associations.json`)
  - Provides signal extraction and CAN message decoding capabilities

#### 2. API Endpoints (`app.py`)
- `POST /api/upload_dbc`: Upload a DBC file
- `GET /api/list_dbc_files`: List all uploaded DBC files
- `POST /api/associate_dbc`: Associate a DBC file with an MDF file
- `GET /api/get_dbc_for_file`: Get DBC files associated with an MDF file
- `GET /api/dbc_signals`: Get all signals from a DBC file
- `POST /api/decode_can_with_dbc`: Decode CAN messages from MDF using DBC files
- `GET /api/dbc_signal_mapping`: Get signal mapping for an MDF file using associated DBC files

#### 3. File Upload Integration
- Updated `POST /smart_merge_upload` to handle `.dbc` files
- DBC files are automatically parsed and validated on upload
- Upload response includes information about uploaded DBC files

#### 4. Signal Discovery Integration
- Updated `discover_channels()` function to include DBC signals
- DBC signals are automatically added to the channel list when associated with MDF files
- Channels include metadata indicating if they're from DBC files

### Frontend Components

#### 1. File Upload
- Updated file input to accept `.dbc` files
- Upload handler displays information about uploaded DBC files

#### 2. DBC Management UI
- New DBC management section in the Upload & Discover tab
- Buttons for:
  - **List DBC Files**: Display all uploaded DBC files with statistics
  - **Associate DBC with File**: Associate a DBC file with an MDF file
  - **Refresh DBC Signals**: Refresh the channel list to include DBC signals

#### 3. JavaScript Functions
- `initDBCManagement()`: Initializes DBC management UI
- `displayDBCFiles()`: Displays DBC files in a table
- `setDBCStatus()`: Updates status messages

## Usage Workflow

### Step 1: Upload DBC File
1. Go to the **Upload & Discover** tab
2. Drag and drop a `.dbc` file or click to browse
3. The DBC file will be uploaded and automatically parsed
4. You'll see a notification showing the number of signals found

### Step 2: Upload MDF File
1. Upload your MDF/MF4 file using the same upload interface
2. The file will be processed and channels will be discovered

### Step 3: Associate DBC with MDF File
1. Click **"Associate DBC with File"** in the DBC management section
2. The system will associate the first available DBC file with the first available MDF file
3. (Note: This can be enhanced with a UI to select specific files)

### Step 4: View DBC Signals
1. Click **"Refresh DBC Signals"** to refresh the channel list
2. DBC signals will now appear in the channels table
3. DBC signals are marked with metadata indicating their source

### Step 5: Use DBC Signals
- DBC signals can be selected and used like any other signal
- They appear in analytics, maps, and all other analysis features
- Signal names follow the format: `MessageName.SignalName`

## DBC File Format Support

The system supports standard DBC file format with:
- Message definitions (BO_)
- Signal definitions (SG_)
- Signal attributes (scale, offset, units, min/max values)
- Byte order (little-endian/big-endian)
- Signed/unsigned signals

### Parsers

1. **cantools** (Preferred): Full-featured DBC parser
   - Supports all DBC features
   - Better error handling
   - More accurate parsing

2. **Simple Parser** (Fallback): Custom regex-based parser
   - Used when cantools is not available
   - Supports basic DBC features
   - Handles common DBC file variations

## File Storage

- **DBC Files**: Stored in `uploads/dbc_files/`
- **Associations**: Stored in `data/dbc_associations.json`
- **Format**: JSON mapping of MDF file paths to DBC file paths

## API Examples

### Upload DBC File
```bash
curl -X POST http://localhost:8000/api/upload_dbc \
  -F "dbc_file=@my_file.dbc"
```

### List DBC Files
```bash
curl http://localhost:8000/api/list_dbc_files
```

### Associate DBC with MDF
```bash
curl -X POST http://localhost:8000/api/associate_dbc \
  -H "Content-Type: application/json" \
  -d '{
    "mdf_file": "/path/to/file.mf4",
    "dbc_file": "/path/to/file.dbc"
  }'
```

### Get DBC Signals
```bash
curl "http://localhost:8000/api/dbc_signals?dbc_file=/path/to/file.dbc"
```

## Dependencies

- **cantools** (>=39.0.0): DBC file parsing library
- **asammdf**: For MDF file handling (already in requirements)

## Future Enhancements

1. **UI for File Selection**: Add a UI to select specific MDF and DBC files for association
2. **Multiple DBC Support**: Support multiple DBC files per MDF file
3. **CAN Message Decoding**: Implement actual CAN message decoding from MDF files
4. **Signal Validation**: Validate that DBC signals match actual CAN messages in MDF files
5. **DBC Signal Preview**: Show signal details (units, min/max, etc.) in the UI
6. **Auto-Association**: Automatically associate DBC files based on file naming conventions

## Troubleshooting

### DBC File Not Parsing
- Check that the DBC file is in valid DBC format
- Verify file encoding (should be Latin-1 or UTF-8)
- Check server logs for parsing errors

### DBC Signals Not Appearing
- Ensure DBC file is associated with the MDF file
- Click "Refresh DBC Signals" after association
- Check that the MDF file has CAN channels

### cantools Not Available
- Install cantools: `pip install cantools>=39.0.0`
- The system will fall back to the simple parser if cantools is not available

## Notes

- DBC files are stored separately from MDF files
- Associations persist across server restarts
- DBC signals are included in channel discovery but may not have actual data until CAN decoding is implemented
- The current implementation focuses on signal discovery and mapping; full CAN message decoding is a future enhancement

