# Programmer = Muhammad Abubakr

# Import the required Libraries and Mudules
from tkinter import ttk
from tkinter import *
from tkinter import messagebox
from tkinter import filedialog
from PIL import ImageTk, Image
from  instaloader import Instaloader , Post
import threading
import os

def new_window(Username , Password):
  # created a new tkinter gui window frame
  new_window = Toplevel(root)
  # Define the geometry
  new_window.geometry('600x600')
  new_window.resizable(False , False)
  # Set the title of tkinter frame
  new_window.title('Instagram Downloader')
  # Set the background of tkinter frame
  new_window.config(background = 'grey')
  Icon = PhotoImage(file='img\\Icon.png')
  new_window.iconphoto(False, Icon)

  # Load an image
  load_img = Image.open('img\image.jpg')
  # Resize the image using resize method
  resize_img = load_img.resize((150 , 150) , Image.Resampling.LANCZOS)
  # Create an object of tkinter ImageTk and pass the resized image to it
  img = ImageTk.PhotoImage(resize_img)
  # Create a Label Widget to display the Image
  label_img = ttk.Label(new_window , image = img)
  label_img.place(x = 30 , y = 20)

  # Create a Label Widget to display the text next to the img
  label_img_text = Label(new_window , text = 'Instagram' , bg = 'grey' , fg = 'white' , font = ('Calibri' , 50 , 'bold'))
  label_img_text.place(x = 230 , y = 45)
  # Creat a Label Widget to display the hint text
  hint_text=Label(new_window , text = '* Enter the Username of your desired account in below to download profile picture *' , bg = 'grey' , fg = 'yellow' , font = ('Calibri' , 10))
  hint_text.place(x = 60 , y = 220)
  hint_text2=Label(new_window , text = '* Enter the Link of your desire Image from instagram in below to download it *' , bg = 'grey' , fg = 'yellow' , font = ('Calibri' , 10))
  hint_text2.place(x = 70 , y = 360)

  # Set the current value of the input with a StringVar object
  Current_value = StringVar()
  # Set input to receive username and download the profile picture
  profile_pic_input = ttk.Entry(new_window , textvariable = Current_value , width = 35)
  # the Entry widget has focus, it’s ready to accept the user input
  profile_pic_input.focus()
  profile_pic_input.place(x = 190 , y = 260)

  # Set the current value of the input with a StringVar object
  Current_value2 = StringVar()
  # Set input to recieve instagram image or video URL
  post_input = ttk.Entry(new_window , textvariable = Current_value2 , width = 35)
  # the Entry widget has focus, it’s ready to accept the user input
  post_input.focus()
  post_input.place(x = 190 , y = 400)

  # function for downloading User profile picture
  def download_profile():
    def download_image():
      try:
        location = filedialog.askdirectory()
        os.chdir(location)
        # Start download Profile Picture
        obj = Instaloader()
        profile = profile_pic_input.get()
        obj.download_profile(profile , profile_pic_only = True)
        messagebox.showinfo('STATUS','Profile Image Downloaded Successfully')
      except:
        messagebox.showerror('ERROR','Username Is Incorrect or Does Not Exist')
    # thread is a separate flow of execution. This means that our program will have two things happening at once
    threading.Thread(target = download_image).start()

  # Function for downloadin image by URL
  def download_post():
    # Get url from user by GUI input (Entry)
    link = post_input.get()
    def media():
      if 'https://www.instagram.com/p/' in link :
        location = filedialog.askdirectory()
        os.chdir(location)
        L = Instaloader()
        try :
            L.login(Username , Password)
        except :
            messagebox.showerror('ERROR' , 'Username or Password is Wrong')
        try :
            short_link = link[28:39]
            post = Post.from_shortcode(L.context , short_link)
            L.download_post(post , target = short_link)
            messagebox.showinfo('STATUS','Download Completed !')
        except :
            messagebox.showerror('ERROR' , 'Link Not Found , please enter the link of the image')
      else :
        messagebox.showerror('ERROR','URL Is Incorrect')
    # thread is a separate flow of execution. This means that our program will have two things happening at once
    threading.Thread(target = media).start()

  # Create style Object
  style_button=ttk.Style()
  # configure style, and naming that , style TButtton is used for ttk.button
  style_button.configure('TButton' , font = ('calibri' , 10 , 'bold' , UNDERLINE) , foreground = 'red')
  button1=ttk.Button(new_window , text = 'Download' , style = 'TButton' , command = download_profile)
  button1.place(x = 260 , y = 300)
  button1=ttk.Button(new_window , text = 'Download' , style = 'TButton' , command = download_post)
  button1.place(x=260,y=440)
  button2=ttk.Button(new_window , text = 'Exit' , style = 'TButton' , command = root.destroy)
  button2.place(x = 260 , y = 500)
  # Start the GUI fram of our app
  new_window.mainloop()

# created a tkinter gui window frame
root = Tk()
# Define the geometry
root.geometry('300x300')
root.resizable(False , False)
# Set the title of tkinter frame
root.title('Instagram Downloader')
# Set the background of tkinter frame
root.config(background = 'grey')
Icon = PhotoImage(file='img\\Icon.png')
root.iconphoto(False, Icon)

# this function takes the Username and Password and pass them to the new_window function
def caller():
  Username = username_entry.get()
  Password = password_entry.get()
  if Username and Password :
    new_window(Username , Password)
  else :
    messagebox.showerror('Error' , 'You have to enter your Username and Password')
message = Label(root , text = 'Enter Username and Password of your Account' ,
bg = 'grey' , fg = 'yellow' , font = ('Calibri',11))
message.place(x = 0 , y = 10)

# Set the current value of the input with a StringVar object
Current_value = StringVar()
username_entry = ttk.Entry(root , textvariable = Current_value , width = 30)
# # the Entry widget has focus, it’s ready to accept the user input
username_entry.focus()
username_entry.place(x = 80 , y = 60)
username_text = Label(root , text = 'Username :' , bg = 'grey' , fg = 'yellow' , font = ('Calibri' , 8))
username_text.place(x=20,y=60)

# Set the current value of the input with a StringVar object
Current_value2 = StringVar()
password_entry = ttk.Entry(root , textvariable = Current_value2 , width = 30)
# # the Entry widget has focus, it’s ready to accept the user input
password_entry.focus()
password_entry.place(x = 80 , y = 100)
password_text = Label(root , text = 'Password : ', bg = 'grey' , fg = 'yellow' , font = ('Calibri' , 8))
password_text.place(x = 20 , y = 100)

# # Create style Object
style_button=ttk.Style()
# # configure style, and naming that , style TButtton is used for ttk.button
style_button.configure('TButton' , font = ('calibri' , 10 , 'bold' , UNDERLINE) , foreground = 'red')
ok_button = ttk.Button(root , text = 'OK' , style = 'TButton' , command = caller)
ok_button.place(x = 110 , y = 160)
exit_button = ttk.Button(root , text = 'Exit' , style = 'TButton' , command = root.destroy)
exit_button.place(x = 110 , y = 220)

root.mainloop()