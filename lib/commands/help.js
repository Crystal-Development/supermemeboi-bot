const utils = require('../utils');

exports.run = function(bot, msg, args) {
  var commands = {};

  if (args.length > 0) {
    if (!bot.commands[args[0]]) {
      msg.channel.sendMessage(`:x: The command '${args[0]}' doesn't exist!`);
      return;
    }
    commands = [bot.commands[args[0]]];
  } else {
    commands = bot.commands;
  }

  let fields = [];

  for (const key in commands) {
    let command = commands[key];
    if (!command.info.hidden) {
      fields.push(getField(bot, command));
    }
  }
  
  msg.delete();
  msg.channel.send(':ok_hand: Help Sent!').then(m => {m.delete(3000)})
  msg.author.send({
    embed: utils.embed('Help for LightBot)', '\n\u200b', fields, {
      inline: true
    })
  });
};

function getField(bot, command) {
  return {
    name: command.info.name,
    value: `**Usage:** \`${bot.config.prefix}${command.info.usage}\`\n**Description:** ${
      command.info.description
    }`
  };
}

exports.info = {
  name: 'help',
  usage: 'help [command]',
  description: 'Shows help for all commands or an individual command'
};
