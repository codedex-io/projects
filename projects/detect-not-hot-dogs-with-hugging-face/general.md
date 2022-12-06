---
title: Detect Not Hot Dogs with Hugging Face API
author: Dev-Docs
datePublished: 2022-09-17
description: Create your own "Not Hotdog" classifier to help Jian Yang from Silicon Valley.
header: URL
tags:
  - intermediate
  - python
---

# Detect "Not Hot Dogs" with hugging face API.

![jian-yang](https://raw.githubusercontent.com/avb-is-me/projects/main/projects/detect-not-hot-dogs-with-hugging-face/dev-docs-assets/dev-docs-VGh1LCAxNyBOb3YgMjAyMiAxOToyMjowNyBHTVQ=.png?raw=true)

**Prerequisites:** Hugging Face account, HTML, Python 

\-Hugging Face

\-Python 3

\-Python Fundamentals


**Read Time:** 30 Minutes

## Introduction

Unlock the power of innovation around detecting if an image is a hot dog or a "not hot dog" just like Jian Yang from Silicon Valley using machine learning models on hugging face.  

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ACmydtFDTGs/0.jpg)](https://www.youtube.com/watch?v=ACmydtFDTGs)

To do this we will be using [Hugging Face](https://huggingface.co/), a community and platform that hosts a bunch of open source machine learning models, datasets, and more.

Let's get started! 🌭


## Setting Up

Create a new directory named nothotdog. This is where our project will live.

Next, enter your directory in the terminal, so we can start getting ready for our code:

```shell
cd nothotdog
```

## Create the Virtual Environment

Let's create a virtual environment or `venv`, which is an isolated environment that contains a Python installation in addition to other packages.  If you want to learn more check out this [Link](https://link-url-here.org](https://docs.python.org/3/tutorial/venv.html).

```shell
python3 -m venv .venv
```

Now, let's activate the virtual environment:

```
source .venv/bin/activate
```

## Install Flask

Now we are going to install Flask, which is a web framework in Python that makes it easy create to web applications and APIs. You can read more about it [here](https://flask.palletsprojects.com/en/2.2.x/).

```shell
python -m pip install flask
```

## Install Dotenv

We also have install `dotenv` which we use to load environment variables.  You can find the packlage link [here](https://pypi.org/project/python-dotenv/).

```shell
pip install python-dotenv
```

## Install Requests

The last package we have to add is `requests` which is a libary to handle http requests.  You can find the packlage link [here](https://pypi.org/project/requests/).

```shell
pip install python-dotenv
```


## Lets create a templates folder for out html

In flask, if we are going to have html files we typically store them in a folder called templates so flask can find it.  Create a folder called templates.  It should look like below.

```
├── root folder
│   ├── templates
```



## Create a file called index.html.

In the templates folder create an **index.html** file.

## Add the html code

Go into the index html code and copy and paste the code below. It is just a simple form that will post to an API route on our flask server.

```php-template
<!-- templates/index.html -->
<html>
    <head>
    </head>
    <body>
        <h1>Hot dog or Not Hot dog?</h1>
        <form method="post" action="{{ url_for('upload') }}" enctype="multipart/form-data">
            <input type="file" name="file1">
            <input type="submit" value="Submit">
        </form>
    </body>
</html>
```

It is important to note `method="post" action="{{ url_for('upload') }}"` in our form.  This tells our form two things, what action we want to do which is `POST` and what API route to send our data which is going `/upload`.

## Create an .env file

Create an `.env` file at the root of the project. This is where we will place our Hugging Face variables.

## Add variables to the .env file

Open the .env file and add `HUGGING_FACE_API_URL= `and `HUGGING_FACE_API_KEY=`, ading in your API key and URL. This is where we place the hugging face information. We can actually fill the url with the prefilled model we are using.

```shell
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/julien-c/hotdog-not-hotdog
HUGGING_FACE_API_KEY=
```

## Create a hugging face token:

Then go to https://huggingface.co/settings/tokens and create a token.

![hugging face](https://raw.githubusercontent.com/avb-is-me/projects/main/projects/detect-not-hot-dogs-with-hugging-face/dev-docs-assets/dev-docs-VGh1LCAxNyBOb3YgMjAyMiAyMTowMDozMSBHTVQ=.png?raw=true)

Now fill your `HUGGING_FACE_API_KEY` with that value.

## Create the server file

```shell
touch web.py
```

## Import the necessary libaries

We are using Flask, and a couple of built in libaries to handle file types like JSON.

```python
#web.py

from flask import Flask, render_template, request, jsonify
import requests
import json
import os
from dotenv import load_dotenv
```

## Load and use the environment variables and initialize flask

Here we will load the enviroment variables that we will get from Hugging face later including the URL and the API\_KEY.

```python
#web.py

from flask import Flask, render_template, request, jsonify
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()
API_URL = os.getenv("HUGGING_FACE_API_URL")
headers = {'Authorization': f'Bearer {os.getenv("HUGGING_FACE_API_KEY")}'}

app = Flask(__name__)
```

Here we load our environment variables.  First we store our url as `API_URL` and then we will load `API_KEY` as a Authorization header variable that will be used as request later to prove to Hugging Face we have access.  The specific code that loads from our environment is `os.getenv("Our Variable")`.

## Lets add a query method

This will be the method that actually queries the hugging face model via API with an image upload from the html form.

```python
#web.py

from flask import Flask, render_template, request, jsonify
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("HUGGING_FACE_API_URL")
headers = {'Authorization': f'Bearer {os.getenv("HUGGING_FACE_API_KEY")}'}

app = Flask(__name__)

def query(data):
    response = requests.request('POST', API_URL, headers=headers, data=data)
    return json.loads(response.content.decode('utf-8'))
```
Essentially the query method will take incoming image data that will be coming in from our form and then use the `requests` package to make a `POST` call to the Hugging Face API.  We can observe this in this specific code example below.

```python
def query(data):
    response = requests.request('POST', API_URL, headers=headers, data=data)
    return json.loads(response.content.decode('utf-8'))
```

## Now lets add the necessary routes

Now the two things that are missing are the API routes in flask to host our web form and to handle the posting of image data to our server.  So to fix this we will add one route to serve our index.html template and the other will handle the form post that will receive the image file and send it to our query function.

```python
#web.py

#web.py

from flask import Flask, render_template, request, jsonify
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("HUGGING_FACE_API_URL")
headers = {'Authorization': f'Bearer {os.getenv("HUGGING_FACE_API_KEY")}'}

app = Flask(__name__)

def query(data):
    response = requests.request('POST', API_URL, headers=headers, data=data)
    return json.loads(response.content.decode('utf-8'))

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file1']
    modeldata = query(file)
    return jsonify(modeldata)


app.run(host='0.0.0.0', port=81)
```

So here we add the first route by creating a route for our index html file by typing out `@app.route('/')`.  Next we add our `index` method to render the template.  Altogether this looks like this:

```py
@app.route('/')
def index():
    return render_template('./index.html')
```

So the code above takes care of telling flask to render our index.html template but we still have to handle the image data that will come from our form.  So to do that we add `@app.route('/upload', methods=['POST'])`.  Notice we use `/upload` and `POST`, which matches what we have in the html form.  Then under that we write the logic to parse out an image file and then send it to our `query` method.  This can all be reflected in the code snippet below.

```py
def upload():
    file = request.files['file1']
    modeldata = query(file)
    return jsonify(modeldata)
```

Nice now all of our flask code is done!

## Now run the project.

```shell
python3 web.py
```

## Bonus implement the successor not Bannana.

The not\_hot\_dog model was original created by Julien C at https://huggingface.co/julien-c. Now the fun thing is you can actually train your own version of the model which we can save for another time, but in the meantime you can replace your `HUGGING_FACE_API_URL` with one I created for not bannanas. Just upload pictures of Bannanas instead of hot dogs.

## Replace your Url

Just set your `HUGGING_FACE_API_URL` in your `.env` file to `https://api-inference.huggingface.co/models/andrewvanbeek/autotrain-not-something-2133568871`.

```shell
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/andrewvanbeek/autotrain-not-something-2133568871
```

Now run the project again and upload bannanas or anything not bannanas.
