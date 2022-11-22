---
title: Detect Not Hot Dogs with hugging face API
author: Dev-Docs
datePublished: 2022-09-17
description: Create your own not-hotdog classifier
header: URL
tags:
  - beginner
  - python
---


# Detect "Not Hot Dogs" with hugging face API.

![jian-yang](https://raw.githubusercontent.com/avb-is-me/projects/main/projects/detect-not-hot-dogs-with-hugging-face/dev-docs-assets/dev-docs-VGh1LCAxNyBOb3YgMjAyMiAxOToyMjowNyBHTVQ=.png?raw=true)

**Prerequisites:**

\-A hugging Face Account

\-Python 3

**Read Time:** 30 Minutes

## Introduction:

Unlock the power of innovation around detecting if an image is a hot dog or a "not hot dog" just like Jian Yang from Silicon Valley using machine learning models on hugging face.


## Create a nothotdog directory:

```shell
mkdir nothotodg
```

## Cd into the nothotdog directory:

```
cd nothotdog
```

## Create the virtual environment

Lets create a virtual environment or venv, which is a isolated environment that contains a Python installation in addition to other packages.  If you want to learn more check out this [Link](https://link-url-here.org](https://docs.python.org/3/tutorial/venv.html).

```shell
python3 -m venv .venv
```

## Activate the virtual environment

```
source .venv/bin/activate
```

## Install the flask

Now we are going to install flask which is a web framework in Python that makes it easy create to web applications and APIs.

```shell
python -m pip install flask
```

## Lets create a templates folder for out html

In flask, if we are going to have html files we typically store them in a folder called templates so flask can find it.  Lets create it below.

```
mkdir templates
```

## Create a file called index.html

```shell
touch index.html
```

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

It is important to note that the `action="{{ url_for('upload') }}`

## Create the server file

```shell
touch web.py
```

## Import the necessary libaries

We are using a flask, and couple of built in libaries to handles files and json.

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
<br>
load_dotenv()
<br>
API_URL = os.getenv("HUGGING_FACE_API_URL")
headers = {'Authorization': f'Bearer {os.getenv("HUGGING_FACE_API_KEY")}'}
<br>
app = Flask(__name__)
```

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

## Now lets add the necessary routes

We will add one route to serve our the index.html template and the other will handle the form post that will receive the image file and send it to our query function.

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

Nice now all of our flask code is done!

## Create an .env file


This is where we will place our hugging face variables

```shell
touch .env
```

## Add variables to the .env file

Open the env variable add `HUGGING_FACE_API_URL= `and `HUGGING_FACE_API_KEY=`. This is where we place the hugging face information. We can actually fill the url with the prefilled model we are using.

```shell
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/julien-c/hotdog-not-hotdog
HUGGING_FACE_API_KEY=
```

## Create a hugging face token:

Then go to https://huggingface.co/settings/tokens and create a token.

![hugging face](https://raw.githubusercontent.com/avb-is-me/projects/main/projects/detect-not-hot-dogs-with-hugging-face/dev-docs-assets/dev-docs-VGh1LCAxNyBOb3YgMjAyMiAyMTowMDozMSBHTVQ=.png?raw=true)

Now fill your `HUGGING_FACE_API_KEY` with that value.

## Now run the project.

```shell
python3 web.py
```

## Bonus implement the successor not Bannana.

The not\_hot\_dog model was original created by Julien C at https://huggingface.co/julien-c. Now the fun thing is you can actually train your own version of the model which we can save for another time, but in the meantime you can replace your `HUGGING_FACE_API_URL` with one I created for not bannanas. Just upload pictures of Bannanas instead of hot dogs.

```shell
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/andrewvanbeek/autotrain-not-something-2133568871
```