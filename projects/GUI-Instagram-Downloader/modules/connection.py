import requests
from tkinter import messagebox

# Function to check the internet connection
def connection(url = 'http://www.google.com/' , timeout = 5):
    try:
        req = requests.get(url , timeout = timeout)
        req.raise_for_status()
        return True
    
    except requests.HTTPError as error:
        messagebox.showerror(
            'Error',f'Checking Internet Connection Failed, Status Code: {error.response.status_code}')
        return False
    
    except requests.ConnectionError:
        messagebox.showerror('Error','No Internet Connection Available.')
        return False