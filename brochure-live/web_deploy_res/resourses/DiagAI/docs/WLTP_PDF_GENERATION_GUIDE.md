# WLTP PDF Generation Guide

## Overview

DiagAI can now generate comprehensive WLTP (Worldwide Harmonized Light Vehicles Test Procedure) PDF reports. This guide explains how to use this feature.

## Prerequisites

1. **Install reportlab** (required for PDF generation):
   ```bash
   pip install reportlab
   ```

2. **MDF files** with vehicle data uploaded to the system

## How to Generate WLTP PDF Reports

### Method 1: Through DiagAI Chat Interface

Simply ask DiagAI to generate a WLTP PDF report using any of these queries:

- **"Generate WLTP PDF report"**
- **"Export WLTP analysis to PDF"**
- **"Create PDF for WLTP"**
- **"Save WLTP report as PDF"**
- **"Generate PDF of WLTP cycle analysis"**

DiagAI will:
1. Run WLTP analysis using the `analyze_with_wltp_agent` tool
2. Generate a comprehensive PDF report with:
   - WLTP cycle classification (Class 1, 2, or 3)
   - Compliance status and score
   - Phase analysis (Low, Medium, High, Extra High)
   - Emissions data (CO₂, NOx, CO, HC)
   - Fuel consumption metrics
   - Visualizations and plots
   - Detailed tables

### Method 2: Direct Python Script

Use the provided script:

```bash
python generate_wltp_pdf_direct.py --file path/to/file.mdf --fuel-type gasoline --output wltp_report.pdf
```

**Parameters:**
- `--file`: Path to MDF file (optional, uses active files if not provided)
- `--fuel-type`: "gasoline" or "diesel" (default: "gasoline")
- `--output`: Output PDF path (optional, generates temp file if not provided)

### Method 3: Programmatic API

```python
from bots.databot.tools import analyze_with_wltp_agent, export_to_pdf
from pathlib import Path

# Step 1: Run WLTP analysis
wltp_result = analyze_with_wltp_agent(
    files=["path/to/file.mdf"],
    query="WLTP cycle analysis",
    fuel_type="gasoline"
)

# Step 2: Format for PDF export
response_data = {
    "text": "WLTP Analysis Summary...",
    "tool_result": wltp_result,
    "has_data": True
}

# Step 3: Generate PDF
pdf_result = export_to_pdf(
    response_data=response_data,
    output_path="wltp_report.pdf"
)

print(f"PDF generated: {pdf_result['file_path']}")
```

## PDF Report Contents

The generated PDF includes:

### 1. **Cover Page**
- Report title: "WLTP Cycle Analysis Report"
- Generation timestamp
- Vehicle/file information

### 2. **Executive Summary**
- WLTP Class (1, 2, or 3)
- Compliance status (Pass/Fail)
- Compliance score (0-100)
- Key metrics overview

### 3. **WLTP Summary Table**
- WLTP Class
- Compliance Score
- Files Processed
- Total Samples

### 4. **Phase Analysis Table**
- Phase name (Low, Medium, High, Extra High)
- Duration (seconds)
- Distance (km)
- Average velocity (km/h)
- Maximum velocity (km/h)
- Fuel consumption (L/100km)

### 5. **Emissions Table**
- CO₂ (g/km)
- NOx (g/km)
- CO (g/km)
- HC (g/km)

### 6. **Fuel Consumption Table**
- Fuel consumption (L/100km)
- Total fuel (L)
- Distance (km)

### 7. **Visualizations**
- WLTP velocity profile with phase classification
- Phase distribution charts
- Emissions charts
- Fuel consumption plots

## Example Queries

### Basic WLTP PDF
```
User: "Generate WLTP PDF report"
DiagAI: "I've generated a WLTP PDF report with comprehensive analysis, tables, and visualizations. Download link: ..."
```

### With Specific Fuel Type
```
User: "Create PDF for WLTP diesel analysis"
DiagAI: "I've created a PDF report for WLTP diesel analysis. The document contains all analysis results, tables, and plots."
```

### Export Existing Analysis
```
User: "Export WLTP analysis to PDF"
DiagAI: "I've exported the WLTP analysis to PDF format. The report includes cycle classification, emissions data, fuel consumption metrics, and compliance status."
```

## Troubleshooting

### Issue: "reportlab not available"
**Solution:** Install reportlab:
```bash
pip install reportlab
```

### Issue: "No MDF files found"
**Solution:** Upload MDF files to the `uploads/` directory or specify file path

### Issue: "WLTP analysis module not available"
**Solution:** Ensure `custom_modules/custom_wltp.py` is available and properly configured

### Issue: PDF generation fails
**Solution:** 
1. Check that reportlab is installed: `pip list | grep reportlab`
2. Check file permissions for output directory
3. Verify MDF files contain required signals (velocity, fuel consumption, etc.)

## Output Location

- **Default:** Temporary files in `/tmp/` directory
- **Custom:** Specify with `--output` parameter or `output_path` in API call
- **Download:** PDFs can be downloaded via the download URL provided in the response

## File Naming

Generated PDFs follow this naming convention:
- `diagai_wltp_report_YYYYMMDD_HHMMSS.pdf` (default)
- Custom name if `output_path` is specified

## Integration with DiagAI

The WLTP PDF generation is fully integrated with DiagAI's natural language interface. The system automatically:

1. **Detects WLTP PDF requests** from user queries
2. **Routes to WLTP agent** for analysis
3. **Formats results** for PDF export
4. **Generates PDF** with all analysis data
5. **Provides download link** to user

## Advanced Usage

### Custom PDF Styling
The PDF uses professional styling with:
- Custom colors (blue for titles, green for headings)
- Proper table formatting
- High-quality plot rendering
- Professional layout

### Batch Processing
To generate PDFs for multiple files:

```python
from pathlib import Path

mdf_files = list(Path("uploads").glob("*.mdf"))
for mdf_file in mdf_files:
    result = generate_wltp_pdf(files=[mdf_file], output_path=f"wltp_{mdf_file.stem}.pdf")
    print(f"Generated: {result['file_path']}")
```

## Support

For issues or questions:
1. Check the logs in `logs/` directory
2. Verify all dependencies are installed
3. Ensure MDF files are properly formatted
4. Check that required signals are present in the data

---

**Status:** ✅ WLTP PDF Generation Available  
**Last Updated:** Current  
**Version:** 1.0

