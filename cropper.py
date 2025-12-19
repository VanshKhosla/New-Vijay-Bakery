from PIL import Image
import sys
import os

def crop_center_card(input_path, output_path):
    try:
        print(f"Processing {input_path}...")
        img = Image.open(input_path).convert("RGBA")
        gray = img.convert("L")
        thresholded = gray.point(lambda p: 255 if p > 80 else 0)
        bbox = thresholded.getbbox()
        
        if bbox:
            print(f"Found content at {bbox}")
            cropped = img.crop(bbox)
            cropped.save(output_path)
            print(f"Saved cropped image to {output_path}")
        else:
            print("No significant content found. Saving original.")
            img.save(output_path)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python cropper.py <input> <output>")
    else:
        crop_center_card(sys.argv[1], sys.argv[2])
