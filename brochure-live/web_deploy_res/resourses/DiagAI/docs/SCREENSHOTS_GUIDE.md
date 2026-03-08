# 📸 Screenshots Guide for VEHICLE-LAB

This guide will help you capture professional screenshots for the README and documentation.

## 📁 Directory Structure

Screenshots should be saved in: `docs/screenshots/`

```
docs/screenshots/
├── dashboard-main.png          # Main dashboard interface
├── signal-analysis.png          # Signal selection and plotting
├── empirical-map.png           # Empirical map generation (2D heatmap)
├── empirical-map-3d.png        # Empirical map 3D surface
├── gear-hunt.png               # Gear hunting detection
├── misfire.png                 # Misfire detection results
├── fuel-analysis.png           # Fuel consumption analysis
└── upload-interface.png        # File upload interface
```

## 📋 Required Screenshots

### 1. Dashboard Main (`dashboard-main.png`)
**What to capture:**
- Full dashboard interface
- Navigation tabs visible
- File upload area
- Sample file list if available

**Tips:**
- Use browser zoom at 80-90% to show more content
- Hide browser bookmarks bar
- Use dark theme for professional look
- Window size: 1920x1080 or 1440x900

### 2. Signal Analysis (`signal-analysis.png`)
**What to capture:**
- Signal selection interface
- Multiple signals selected
- Interactive plot with Plotly controls
- Time-series data visible

**Tips:**
- Show clear signal names
- Include zoom/pan controls visible
- Show multiple signals on same plot if possible

### 3. Empirical Map 2D (`empirical-map.png`)
**What to capture:**
- 2D heatmap with color scale
- Axis labels visible (RPM, Load, etc.)
- Contour lines if available
- Color legend visible

**Tips:**
- Use good color scheme (not default)
- Ensure labels are readable
- Include quality metrics if displayed

### 4. Empirical Map 3D (`empirical-map-3d.png`)
**What to capture:**
- 3D surface plot
- Interactive controls visible
- Good viewing angle
- Axis labels

**Tips:**
- Rotate to best viewing angle
- Show smooth surface features
- Include color scale

### 5. Gear Hunt Detection (`gear-hunt.png`)
**What to capture:**
- Time-series plot with multiple signals
- Event markers showing hunting events
- Speed and RPM signals overlaid
- Clear event annotations

**Tips:**
- Show clear event markers
- Include legend
- Show time axis with readable timestamps

### 6. Misfire Detection (`misfire.png`)
**What to capture:**
- Misfire event list or timeline
- Severity visualization
- Algorithm results if shown
- Clear event markers

**Tips:**
- Highlight detected events
- Show severity scale
- Include confidence indicators

### 7. Fuel Consumption (`fuel-analysis.png`)
**What to capture:**
- BSFC map or consumption plot
- Efficiency regions highlighted
- Fuel metrics displayed
- Operating points visible

**Tips:**
- Show efficiency contours
- Include metrics table if available
- Clear axis labels

### 8. Upload Interface (`upload-interface.png`)
**What to capture:**
- Drag & drop upload area
- File selection interface
- Upload progress if available
- Supported formats visible

**Tips:**
- Show upload zone clearly
- Include format indicators
- Clean, uncluttered view

## 🎨 Screenshot Best Practices

### Before Taking Screenshots

1. **Clean Browser**
   - Close unnecessary tabs
   - Clear notifications
   - Hide extensions UI

2. **Use Dark Theme**
   - Looks more professional
   - Better for documentation

3. **Browser Window**
   - Standard size: 1440x900 or 1920x1080
   - Consistent window size across all screenshots

4. **Data Quality**
   - Use realistic test data
   - Ensure plots are readable
   - Check all labels are visible

### Taking Screenshots

#### On macOS
```bash
# Full screen: Cmd + Shift + 3
# Selection: Cmd + Shift + 4
# Window: Cmd + Shift + 4, then Space, then click window
```

#### On Windows
```bash
# Snipping Tool: Win + Shift + S
# Or use Print Screen
```

#### On Linux
```bash
# Use GNOME Screenshot or Shutter
# Command: gnome-screenshot -a
```

### Editing Screenshots

1. **Crop Unnecessary Areas**
   - Remove browser UI if not needed
   - Focus on dashboard content

2. **Add Annotations** (Optional)
   - Use arrows to highlight features
   - Add text labels if helpful
   - Tools: Preview (macOS), GIMP, Photoshop

3. **Optimize File Size**
   - Compress images for web
   - Use PNG format for clarity
   - Target: < 500KB per image

4. **Consistent Styling**
   - Same border/padding if cropping
   - Consistent color theme
   - Same font sizes for annotations

## 📐 Recommended Dimensions

- **Main Screenshots**: 1920x1080 or 1440x900 (16:9 or 16:10)
- **Thumbnails**: 800x450 (if creating thumbnails)
- **Format**: PNG for clarity, optimized for web

## ✅ Checklist

Before finalizing screenshots:

- [ ] All 8 required screenshots captured
- [ ] Images saved in `docs/screenshots/`
- [ ] File names match README references
- [ ] Images are readable and clear
- [ ] Consistent styling across all images
- [ ] File sizes optimized (< 500KB each)
- [ ] README.md updated with correct paths

## 🔧 Tools for Screenshot Editing

- **macOS**: Preview (built-in), Skitch, CleanShot X
- **Windows**: Snipping Tool, Greenshot, ShareX
- **Linux**: GNOME Screenshot, Shutter, GIMP
- **Online**: Canva, Photopea (free Photoshop alternative)

## 📝 Example Screenshot Workflow

1. **Start Dashboard**
   ```bash
   python3 launch_dashboard.py
   ```

2. **Load Test Data**
   - Upload sample MDF file
   - Wait for processing

3. **Navigate to Feature**
   - Click appropriate tab
   - Configure analysis
   - Generate results

4. **Take Screenshot**
   - Clean browser view
   - Capture window
   - Save as PNG

5. **Edit & Optimize**
   - Crop if needed
   - Optimize file size
   - Save to `docs/screenshots/`

6. **Update README**
   - Verify image paths
   - Test image display
   - Commit changes

---

**Need Help?** Open an issue on GitHub or check the main README.md

