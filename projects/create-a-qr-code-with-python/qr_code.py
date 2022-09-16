import qrcode

link_to_qrcode = "https://codedex.io"
qr = qrcode.QRCode(version = 1, box_size = 5, border = 5)
qr.add_data(link_to_qrcode)
qr.make()

img = qr.make_image(fill_color = "black", back_color = "white")
img.save('qrcode_codedex.png')
