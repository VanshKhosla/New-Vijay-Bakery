import json
import os

def audit_assets():
    try:
        with open('public/data/All.json', 'r') as f:
            data = json.load(f)
        
        total_size = 0
        file_stats = []
        missing_files = []

        print(f"Total items in menu: {len(data)}")

        for item in data:
            img_path = item.get('img')
            if img_path:
                # Remove leading slash for local path
                local_path = os.path.join('public', img_path.lstrip('/'))
                
                if os.path.exists(local_path):
                    size = os.path.getsize(local_path)
                    total_size += size
                    file_stats.append((img_path, size))
                else:
                    missing_files.append(img_path)
        
        # Sort by size descending
        file_stats.sort(key=lambda x: x[1], reverse=True)
        
        print(f"Total size of referenced images: {total_size / (1024*1024):.2f} MB")
        print(f"Number of unique images: {len(set(x[0] for x in file_stats))}")
        print("\nTop 10 Largest Files:")
        for name, size in file_stats[:10]:
            print(f"{name}: {size / 1024:.2f} KB")
            
        if missing_files:
            print(f"\nMissing Files ({len(missing_files)}):")
            print(missing_files[:5])

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    audit_assets()
