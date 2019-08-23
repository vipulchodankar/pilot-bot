const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag)

    client.user.setActivity("YOU", {type: "WATCHING"});

    client.guilds.forEach((guild) => {
        console.log(guild.name)
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
        // General Channel ID: 614358411697586206
    })

    let generalChannel = client.channels.get('614358411697586206')
    const attachment = new Discord.Attachment('https://vetstreet.brightspotcdn.com/dims4/default/60b6ebe/2147483647/thumbnail/590x420/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F1b%2F10%2F187d796e44db9b3262b45d2e5aac%2Fdog-makes-eye-contact-thinkstockphotos-511375254-590lc031616.jpg')

    generalChannel.send("I'm online peeps!")
    // generalChannel.send(attachment)
})

client.on('message', (recievedMessage) => {
    if(recievedMessage.author === client.user){
        return
    }

    // recievedMessage.channel.send(recievedMessage.author.toString() + ", you said: " + recievedMessage.content)
    // recievedMessage.react('👍')

    if (recievedMessage.content.startsWith(";")){
        processCommand(recievedMessage)
    }
})

function processCommand(recievedMessage){
    let fullCommand = recievedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    switch(primaryCommand){
        case 'help': helpCommand(arguments, recievedMessage); break;

        case 'sup':
        case 'yo':
        case 'hello':
        case 'hey':
        case 'hi': hiCommand(recievedMessage); break;

        case 'ping': pingCommand(recievedMessage); break;

        case 'multiply': multiplyCommand(arguments, recievedMessage); break;

        case 'add': addCommand(arguments, recievedMessage); break;

        default: recievedMessage.channel.send("Sorry, i didn't understand what you said. Try again?"); break;
    }
}

function helpCommand(arguments, recievedMessage){
    if(arguments.length === 0){
        recievedMessage.channel.send(recievedMessage.author.toString() + ", I'm not sure what you need help with. Try ';help [topic]")
    } else {
        recievedMessage.channel.send(recievedMessage.author.toString() + ", it looks like you need help with " + arguments)
    }
}

function pingCommand(recievedMessage){
    recievedMessage.channel.send("pong!")
}

function hiCommand(recievedMessage){
    let greeting = ['Hi', 'Hello', 'Yo', 'Sup?', 'Hey']
    recievedMessage.channel.send(greeting[Math.floor(Math.random()*5)] + " " + recievedMessage.author.toString())
}

function multiplyCommand(arguments, recievedMessage){
    if(arguments.length < 2){
        recievedMessage.channel.send('Not enough arguments. Try `;multiply 2 10`')
        return
    }

    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })

    recievedMessage.channel.send("The product of " + arguments + " is " + product.toString())
}

function addCommand(arguments, recievedMessage){
    if(arguments.length < 2){
        recievedMessage.channel.send('Not enough arguments. Try `;add 2 10`')
        return
    }

    let sum = 0
    arguments.forEach((value) => {
        sum = sum + parseFloat(value)
    })

    recievedMessage.channel.send("The sum of " + arguments + " is " + sum.toString())
}

// Enter Bot Token Here
client.login('')