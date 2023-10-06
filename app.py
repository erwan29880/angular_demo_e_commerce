import cv2 
import numpy as np 
from PIL import Image
path = './src/assets/cart.png'


im = cv2.imread(path)
im = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
new_im = np.zeros(shape=(225, 225, 3), dtype="uint8")
new_im[new_im[:,:,:] == 0] = 255
val = 189   
new_im[im[:,:,0] == 0] = [val, val, val]
p = Image.fromarray(new_im)
p.save("test.png")
         