// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
require("dotenv").config()

// Create a new client instance
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('First test');
});

//When user types 'hola' bot responses 'puto el que saluda'
client.on("messageCreate", (message) => {
    if(message.content == "hola"){
        message.reply("puto el que saluda")
    }
})

// Login to Discord with your client's token
client.login(process.env.TOKEN);