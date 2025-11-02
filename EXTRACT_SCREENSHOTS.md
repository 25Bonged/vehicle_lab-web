# 📸 Extract Screenshots from PDF

You have dashboard screenshots in `docs/vehiclelab.pdf.pdf`. Here's how to extract them.

## 🔧 Method 1: Automated Extraction (Recommended)

Run the extraction script:

```bash
./extract_pdf_images.sh
```

This will extract all images from the PDF and save them to `docs/screenshots/`.

### Prerequisites

**On macOS:**
```bash
brew install poppler
```

**On Ubuntu/Debian:**
```bash
sudo apt-get install poppler-utils
```

**Or using Python:**
```bash
pip install pdf2image pillow
```

## 🔧 Method 2: Manual Extraction

### Using macOS Preview
1. Open `docs/vehiclelab.pdf.pdf` in Preview
2. For each dashboard page:
   - File → Export As...
   - Choose PNG format
   - Save to `docs/screenshots/` with appropriate name

### Using Online Tools
1. Go to [PDF24](https://tools.pdf24.org/en/pdf-to-png) or similar
2. Upload `docs/vehiclelab.pdf.pdf`
3. Extract all pages as PNG
4. Download and save to `docs/screenshots/`

## 📝 Required Screenshot Names

After extraction, rename images to match README requirements:

- `dashboard-main.png` - Main dashboard interface
- `signal-analysis.png` - Signal selection and plotting
- `empirical-map.png` - 2D heatmap
- `empirical-map-3d.png` - 3D surface plot
- `gear-hunt.png` - Gear hunting detection
- `misfire.png` - Misfire detection results
- `fuel-analysis.png` - Fuel consumption analysis
- `upload-interface.png` - File upload area

## ✅ Verify

After extraction:
```bash
ls -lh docs/screenshots/*.png
```

All screenshots should be present and properly named.

