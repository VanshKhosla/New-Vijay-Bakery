import os
import json
import re
import shutil
from PIL import Image

# Configuration
IMAGES_DIR = 'public/Images'
BACKUP_DIR = 'public/Images/_backup'
DATA_FILE = 'public/data/All.json'
JSX_FILE = 'src/components/RestaurantMenu.jsx'
MAX_WIDTH = 800
QUALITY = 80

def setup_backup():
    if not os.path.exists(BACKUP_DIR):
        os.makedirs(BACKUP_DIR)
        print(f"Created backup directory: {BACKUP_DIR}")

def optimize_image(filename):
    file_path = os.path.join(IMAGES_DIR, filename)
    
    # Skip directories or non-images
    if not os.path.isfile(file_path):
        return None
    
    name, ext = os.path.splitext(filename)
    if ext.lower() not in ['.jpg', '.jpeg', '.png']:
        return None
        
    # Skip already backup/optimized files if script runs twice (naive check)
    if filename.endswith('.webp'):
        return None

    try:
        with Image.open(file_path) as img:
            # Determine new size
            width, height = img.size
            if width > MAX_WIDTH and "qr" not in name.lower(): # Don't resize QR codes
                ratio = MAX_WIDTH / width
                new_height = int(height * ratio)
                img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                print(f"Resized {filename}: {width}x{height} -> {MAX_WIDTH}x{new_height}")
            
            # Save as WebP
            new_filename = f"{name}.webp"
            new_file_path = os.path.join(IMAGES_DIR, new_filename)
            
            # Special handling for QR codes (lossless)
            if "qr" in name.lower():
                img.save(new_file_path, 'WEBP', lossless=True)
            else:
                img.save(new_file_path, 'WEBP', quality=QUALITY)
            
            # Backup original
            shutil.move(file_path, os.path.join(BACKUP_DIR, filename))
            
            return (filename, new_filename)
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")
        return None

def update_json_references(mapping):
    try:
        with open(DATA_FILE, 'r') as f:
            content = f.read()
        
        original_content = content
        for old_name, new_name in mapping.items():
            # Replace /Images/Old.jpg with /Images/New.webp
            # JSON paths are usually /Images/...
            content = content.replace(f"/Images/{old_name}", f"/Images/{new_name}")
            
        if content != original_content:
            with open(DATA_FILE, 'w') as f:
                f.write(content)
            print("Updated All.json references.")
        else:
            print("No changes needed in All.json.")
            
    except Exception as e:
        print(f"Error updating JSON: {e}")

def update_jsx_references(mapping):
    try:
        with open(JSX_FILE, 'r') as f:
            content = f.read()
            
        original_content = content
        for old_name, new_name in mapping.items():
            # Simple string replacement for imports or src strings
            # Be careful with partial matches? The filenames are fairly unique here.
            # Using exact string /Images/filename matches
            content = content.replace(f"/Images/{old_name}", f"/Images/{new_name}")
            
        if content != original_content:
            with open(JSX_FILE, 'w') as f:
                f.write(content)
            print("Updated RestaurantMenu.jsx references.")
        else:
            print("No changes needed in RestaurantMenu.jsx.")

    except Exception as e:
        print(f"Error updating JSX: {e}")

def main():
    setup_backup()
    
    files = os.listdir(IMAGES_DIR)
    mapping = {} # old_filename -> new_filename
    
    print(f"Found {len(files)} files in {IMAGES_DIR}...")
    
    for filename in files:
        result = optimize_image(filename)
        if result:
            old_name, new_name = result
            mapping[old_name] = new_name
            
    print(f"Optimized {len(mapping)} images.")
    
    if mapping:
        update_json_references(mapping)
        update_jsx_references(mapping)
        
    print("Optimization complete.")

if __name__ == "__main__":
    main()
