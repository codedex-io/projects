# Create a GIF with Python 🎬
# Sonny Li

import imageio

filenames = ["team-pic1.png", "team-pic2.png"]
images = [ ]

for filename in filenames:
  images.append(imageio.imread(filename))

imageio.mimsave('team.gif', images, 'GIF', duration = 1)
