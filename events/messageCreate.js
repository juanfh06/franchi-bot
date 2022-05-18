const Discord = require("discord.js");

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message){
        const {client, prefix, owners} = bot;

        if (!message.guild || message.author.bot || !message.content.startsWith(prefix)){
            return;
        }


        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const commandString = args.shift().toLowerCase();

        let command = client.commands.get(commandString);

        if(!command){
            return;
        }

        let member = message.member

        if(command.devOnly && !owners.includes(member.id)){
            return message.reply("This command is only available to the bot owners.");
        }

        if(command.permissions && member.permissions.missing(command.permissions).length !== 0){
            return message.reply("You do not have permission to use this command.")
        }

        try{
            await command.run({...bot, message, args})
        }catch(error){
            let errorMessage = error.toString();

            if(errorMessage.startsWith("?")){
                errorMessage = errorMessage.slice(1);
                await message.reply(errorMessage);
            } else{
                console.error(error);
            }
        }
    }
}