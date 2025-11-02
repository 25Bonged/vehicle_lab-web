#!/bin/bash
# Extract images from vehiclelab.pdf.pdf for dashboard screenshots

PDF_FILE="docs/vehiclelab.pdf.pdf"
OUTPUT_DIR="docs/screenshots"
TEMP_DIR="/tmp/pdf_extract_$$"

# Check if PDF exists
if [ ! -f "$PDF_FILE" ]; then
    echo "❌ PDF file not found: $PDF_FILE"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "📄 Extracting images from PDF..."
echo "📁 Source: $PDF_FILE"
echo "📁 Destination: $OUTPUT_DIR"
echo ""

# Method 1: Using pdftoppm (poppler-utils) - Recommended
if command -v pdftoppm &> /dev/null; then
    echo "✅ Using pdftoppm (poppler-utils)..."
    pdftoppm -png -r 150 "$PDF_FILE" "$TEMP_DIR/page"
    
    # Rename and move to screenshots
    count=1
    for img in "$TEMP_DIR"/*.png; do
        if [ -f "$img" ]; then
            mv "$img" "$OUTPUT_DIR/dashboard-page-$count.png"
            echo "  ✓ Extracted page $count"
            ((count++))
        fi
    done
    
# Method 2: Using pdfimages (poppler-utils)
elif command -v pdfimages &> /dev/null; then
    echo "✅ Using pdfimages..."
    pdfimages -png "$PDF_FILE" "$TEMP_DIR/image"
    
    count=1
    for img in "$TEMP_DIR"/*.png; do
        if [ -f "$img" ]; then
            mv "$img" "$OUTPUT_DIR/dashboard-image-$count.png"
            echo "  ✓ Extracted image $count"
            ((count++))
        fi
    done

# Method 3: Using Python (pdf2image)
elif command -v python3 &> /dev/null && python3 -c "import pdf2image" 2>/dev/null; then
    echo "✅ Using Python pdf2image..."
    python3 << EOF
from pdf2image import convert_from_path
images = convert_from_path('$PDF_FILE', dpi=150)
for i, image in enumerate(images, 1):
    filename = f'$OUTPUT_DIR/dashboard-page-{i}.png'
    image.save(filename, 'PNG')
    print(f'  ✓ Extracted page {i}')
EOF

else
    echo "❌ No PDF extraction tool found!"
    echo ""
    echo "💡 Install one of these:"
    echo "   macOS: brew install poppler"
    echo "   Ubuntu: sudo apt-get install poppler-utils"
    echo "   Or: pip install pdf2image pillow"
    echo ""
    echo "📝 Manual option:"
    echo "   1. Open $PDF_FILE in a PDF viewer"
    echo "   2. Take screenshots of dashboard pages"
    echo "   3. Save to $OUTPUT_DIR/"
    exit 1
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Image extraction complete!"
echo "📁 Images saved to: $OUTPUT_DIR"
echo ""
echo "📝 Next steps:"
echo "   1. Review extracted images"
echo "   2. Rename them to match README requirements:"
echo "      - dashboard-main.png"
echo "      - signal-analysis.png"
echo "      - empirical-map.png"
echo "      - etc."
echo "   3. Update README.md with correct image paths"

