// Require the necessary discord.js classes
const Discord = require('discord.js');
require("dotenv").config();

// Create a new client instance
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

let bot = {
    client,
    prefix: "_.",
    owners: ["228233533477355520"]
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot;

/*// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('First test');
});

//When user types 'hola' bot responses 'puto el que saluda'
client.on("messageCreate", (message) => {
    if(message.content == "hola"){
        message.reply("puto el que saluda")
    }
})

//sends a message when someone join the server
client.on("guildMemberAdd", (member) =>
    member.guild.channels.cache.get(process.env.NEWSCHANNEL).send(`<@${member.id}> Bienvenido xd`)
)*/

// Login to Discord with your client's token
client.login(process.env.TOKEN);