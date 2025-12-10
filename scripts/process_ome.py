import tifffile
import numpy as np
from PIL import Image, ImageOps

def analyze_and_process(file_path, output_path):
    print(f"Reading {file_path}...")
    with tifffile.TiffFile(file_path) as tif:
        print(f"Pages: {len(tif.pages)}")
        print(f"Series: {len(tif.series)}")
        
        # Get OME metadata if available
        ome_metadata = tif.ome_metadata
        if ome_metadata:
             print("OME Metadata found (first 500 chars):")
             print(ome_metadata[:500])

        # Assume series 0 is the main image
        series0 = tif.series[0]
        print(f"Shape: {series0.shape}")
        print(f"Dtype: {series0.dtype}")
        
        # Determine dimensions (C, Y, X) or (Y, X)
        data = series0.asarray()
        
        if data.ndim == 2:
            print("2D image detected - treating as DAPI/Grayscale")
            img_data = data
            channels = ['Grayscale']
        elif data.ndim == 3:
            # Check if (C, Y, X) or (Y, X, C) - standard OME-TIFF is usually C is first dim if < 100
            if data.shape[0] < data.shape[1] and data.shape[0] < data.shape[2]:
                print(f"Assumed (C, Y, X): {data.shape}")
                channels_count = data.shape[0]
                img_data = data
            else:
               # Handle other cases if needed
               print(f"Unexpected 3D shape: {data.shape}, proceeding with dim 0 as channels")
               img_data = data
               channels_count = data.shape[0]
        
        # Generate Composite
        # Simple Logic: Map first 3 channels to R, G, B or specialized mapping
        # Ideally we want: DAPI (Blue), CD3 (Green/Cyan), CD20 (Red/Magenta)
        # Without explicit channel names, we'll make a montage or use first few.
        
        print("Generating preview...")
        # Normalize to 0-255
        def normalize(arr):
            p1, p99 = np.percentile(arr, (1, 99))
            arr = np.clip(arr, p1, p99)
            arr = (arr - p1) / (p99 - p1)
            return (arr * 255).astype(np.uint8)

        if data.ndim == 2:
             preview = normalize(img_data)
             img = Image.fromarray(preview, mode='L')
        else:
            # Create RGB composite from first 3 channels or specific indices if we knew them
            # Let's try to mix: 0->Blue (DAPI), 1->Green, 2->Red
            c0 = normalize(img_data[0]) # Blue
            if channels_count > 1:
                c1 = normalize(img_data[1]) # Green
            else:
                c1 = np.zeros_like(c0)
            
            if channels_count > 2:
                c2 = normalize(img_data[2]) # Red
            else:
                c2 = np.zeros_like(c0)

            rgb = np.dstack((c2, c1, c0)) # RGB
            img = Image.fromarray(rgb, mode='RGB')

        # Resize
        target_width = 1000
        w, h = img.size
        ratio = target_width / w
        new_size = (int(w * ratio), int(h * ratio))
        img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        print(f"Saving to {output_path}...")
        img.save(output_path, quality=85)
        print("Done.")

if __name__ == "__main__":
    analyze_and_process('data/slide21_FOV2.ome.tiff', 'docs/public/slide21_FOV2_preview.jpg')
