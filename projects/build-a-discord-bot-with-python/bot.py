import discord
import requests
import json

# Update the URL to https://meme-api.com/gimme
def get_meme():
    try:
        response = requests.get('https://meme-api.com/gimme')
        response.raise_for_status()  # Raise an error for bad responses
        json_data = response.json()  # Directly parse the JSON response
        return json_data['url']
    except requests.exceptions.RequestException as e:
        print(f"Error fetching meme: {e}")
        return None  # Return None in case of an error

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}')

    async def on_message(self, message):
        if message.author == self.user:
            return
        if message.content.startswith('$meme'):
            meme_url = get_meme()
            if meme_url:  # Check if a meme was fetched successfully
                await message.channel.send(meme_url)
            else:
                await message.channel.send("Sorry, I couldn't fetch a meme right now.")

# Create intents keyword argument
intents = discord.Intents.default()
intents.message_content = True

# Update the call here by passing the 'intents' keyword argument
client = MyClient(intents=intents)
client.run('Your Token Here')
