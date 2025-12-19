import qrcode
import os

# Data for the QR code
data = "https://www.instagram.com/newvijaybakery/"

# Create QR code instance
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

# Add data to the instance
qr.add_data(data)
qr.make(fit=True)

# Create an image from the QR Code instance
img = qr.make_image(fill_color="black", back_color="white")

# Define the output path
output_path = os.path.join("public", "Images", "insta-qr.png")

# Ensure the directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Save the image
img.save(output_path)

print(f"QR code successfully generated and saved to {output_path}")
