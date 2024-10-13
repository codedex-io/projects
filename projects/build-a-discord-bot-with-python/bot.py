import discord
import aiohttp

async def get_meme():
    async with aiohttp.ClientSession() as session:
        async with session.get('https://meme-api.com/gimme') as response:
            json_data = await response.json()
            return json_data['url']

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}')

    async def on_message(self, message):
        if message.author == self.user:
            return
        if message.content.startswith('$meme'):
            meme_url = await get_meme()  # Await the asynchronous function
            await message.channel.send(meme_url)

# Create intents keyword argument
intents = discord.Intents.default()
intents.message_content = True

# Update the call here by passing the 'intents' keyword argument
client = MyClient(intents=intents)
client.run('Your Token Here')
