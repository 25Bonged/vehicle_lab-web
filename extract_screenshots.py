#!/usr/bin/env python3
"""
Extract screenshots from PDF and create beautiful dashboard previews
"""
import os
import sys
from pathlib import Path

try:
    from pdf2image import convert_from_path
    import PIL
except ImportError:
    print("Installing required packages...")
    os.system(f"{sys.executable} -m pip install pdf2image pillow -q")
    from pdf2image import convert_from_path
    import PIL

def extract_from_pdf(pdf_path, output_dir):
    """Extract images from PDF"""
    print(f"📄 Extracting images from: {pdf_path}")
    
    try:
        # Convert PDF pages to images
        images = convert_from_path(pdf_path, dpi=150, fmt='png')
        
        os.makedirs(output_dir, exist_ok=True)
        
        # Save each page
        for i, image in enumerate(images, 1):
            filename = os.path.join(output_dir, f"page-{i:02d}.png")
            image.save(filename, 'PNG')
            print(f"  ✓ Extracted page {i}: {filename}")
        
        return len(images)
    except Exception as e:
        print(f"❌ Error extracting from PDF: {e}")
        return None

def create_placeholder(output_dir):
    """Create beautiful placeholder screenshots if PDF extraction fails"""
    try:
        from PIL import Image, ImageDraw, ImageFont
        
        placeholders = {
            'dashboard-main.png': {
                'title': 'VEHICLE-LAB Dashboard',
                'subtitle': 'Main Interface',
                'bg_color': (26, 32, 44),
                'text_color': (255, 255, 255),
                'size': (1920, 1080)
            },
            'signal-analysis.png': {
                'title': 'Signal Analysis',
                'subtitle': 'Interactive Plotly Visualizations',
                'bg_color': (30, 41, 59),
                'text_color': (148, 163, 184),
                'size': (1920, 1080)
            },
            'empirical-map.png': {
                'title': 'Empirical Map Generation',
                'subtitle': '2D Heatmap - BSFC Analysis',
                'bg_color': (15, 23, 42),
                'text_color': (34, 197, 94),
                'size': (1920, 1080)
            },
            'empirical-map-3d.png': {
                'title': '3D Surface Map',
                'subtitle': 'Interactive 3D Visualization',
                'bg_color': (15, 23, 42),
                'text_color': (59, 130, 246),
                'size': (1920, 1080)
            },
            'gear-hunt.png': {
                'title': 'Gear Hunting Detection',
                'subtitle': 'Multi-Signal Correlation Analysis',
                'bg_color': (30, 41, 59),
                'text_color': (251, 191, 36),
                'size': (1920, 1080)
            },
            'misfire.png': {
                'title': 'Misfire Detection',
                'subtitle': '9 Detection Algorithms',
                'bg_color': (30, 41, 59),
                'text_color': (239, 68, 68),
                'size': (1920, 1080)
            },
            'fuel-analysis.png': {
                'title': 'Fuel Consumption Analysis',
                'subtitle': 'BSFC & Efficiency Metrics',
                'bg_color': (26, 32, 44),
                'text_color': (34, 197, 94),
                'size': (1920, 1080)
            },
            'upload-interface.png': {
                'title': 'File Upload Interface',
                'subtitle': 'Drag & Drop MDF/MF4 Files',
                'bg_color': (30, 41, 59),
                'text_color': (148, 163, 184),
                'size': (1920, 1080)
            }
        }
        
        os.makedirs(output_dir, exist_ok=True)
        
        for filename, config in placeholders.items():
            img = Image.new('RGB', config['size'], config['bg_color'])
            draw = ImageDraw.Draw(img)
            
            # Try to use a nice font
            try:
                font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 72)
                font_medium = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
            except:
                try:
                    font_large = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 72)
                    font_medium = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 48)
                except:
                    font_large = ImageFont.load_default()
                    font_medium = ImageFont.load_default()
            
            # Center text
            w, h = config['size']
            
            # Title
            bbox = draw.textbbox((0, 0), config['title'], font=font_large)
            title_w = bbox[2] - bbox[0]
            title_h = bbox[3] - bbox[1]
            draw.text(((w - title_w) / 2, h/2 - 60), config['title'], 
                     fill=config['text_color'], font=font_large)
            
            # Subtitle
            bbox = draw.textbbox((0, 0), config['subtitle'], font=font_medium)
            subtitle_w = bbox[2] - bbox[0]
            draw.text(((w - subtitle_w) / 2, h/2 + 40), config['subtitle'], 
                     fill=config['text_color'], font=font_medium)
            
            # Add decorative line
            draw.rectangle([w//2 - 200, h//2 + 100, w//2 + 200, h//2 + 105], 
                          fill=config['text_color'])
            
            filepath = os.path.join(output_dir, filename)
            img.save(filepath, 'PNG', quality=95)
            print(f"  ✓ Created placeholder: {filename}")
        
        return len(placeholders)
    except Exception as e:
        print(f"❌ Error creating placeholders: {e}")
        return None

if __name__ == '__main__':
    pdf_path = 'docs/vehiclelab.pdf.pdf'
    output_dir = 'docs/screenshots'
    
    # Try to extract from PDF first
    if os.path.exists(pdf_path):
        print("Attempting PDF extraction...")
        result = extract_from_pdf(pdf_path, output_dir)
        
        if result and result > 0:
            print(f"\n✅ Successfully extracted {result} pages from PDF!")
            print("📝 Next: Rename files to match README requirements:")
            print("   - dashboard-main.png")
            print("   - signal-analysis.png")
            print("   - etc.")
        else:
            print("\n⚠️  PDF extraction failed or PDF is empty")
            print("Creating beautiful placeholders instead...")
            create_placeholder(output_dir)
    else:
        print(f"⚠️  PDF not found: {pdf_path}")
        print("Creating beautiful placeholders...")
        create_placeholder(output_dir)
    
    print(f"\n✅ Screenshots ready in: {output_dir}")

