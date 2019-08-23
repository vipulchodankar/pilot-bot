const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag)   
})

// Enter Bot Token Here
client.login('')