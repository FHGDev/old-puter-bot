const discord = require('discord.js')
const bot = new discord.Client();
const config = require('./config.json')
const prefix = config.prefix
bot.login(config.token)
const enmap = require('enmap')


bot.commands = new discord.Collection()

require('fs').readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});



bot.on("ready", () => {
	bot.user.setActivity('my dog play', { type: "WATCHING"})
	console.log(`${bot.user.username} Ready!`)
})

bot.on("message", message => {
	if (message.channel.type == "dm") { 
	require('./events/cleverbot.js')(bot, message)
   } if (message.content == prefix + "help") {
		let embed = new discord.RichEmbed()
		.setTitle(`${bot.user.username} Help`)
		.setDescription(`Only help for now... :neutral_face:`)
		.setColor("RANDOM")
		message.channel.send({embed})
		console.log(message.author.username + " used the help command."	)
   }
})
