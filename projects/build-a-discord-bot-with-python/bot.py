import discord
import requests
import json

def get_meme():
  response = requests.get('https://meme-api.herokuapp.com/gimme')
  json_data = json.loads(response.text)
  return json_data['url']


class MyClient(discord.Client):
  async def on_ready(self):
    print('Logged on as {0}!'.format(self.user))

  async def on_message(self, message):
    if message.author == self.user:
      return

    if message.content.startswith('$meme'):
      await message.channel.send(get_meme())

client = MyClient()
client.run('Your Token Here') # Replace with your own token