# Generate a QR Code with Python
import qrcode

# URL to be converted to QR Code
website_link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

# Create a QR code object
qr = qrcode.QRCode(version=1, box_size=10, border=4)  # Increased box size for better scanning
qr.add_data(website_link)
qr.make()

# Create an image from the QR code instance
img = qr.make_image(fill_color='black', back_color='white')

# Save the image in the current working directory or specify a full path
img.save('youtube_qr.png')

print("QR Code generated and saved as 'youtube_qr.png'.")
