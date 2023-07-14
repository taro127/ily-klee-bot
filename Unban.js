// Secret Token
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Check to see if guild is using prefix commands
let CommandType = process.env.COMMANDTYPE;
if (CommandType === 'prefix' || CommandType === 'both') {
  
  // Checks to see if the message starts with (prefixunban)
  let message = `${context.params.event.content}`;
  if (message.startsWith(`${process.env.COMMANDPREFIX}unban`)) {
    
    // Retreive the user that triggered the command
    let serverMember = await lib.discord.guilds['@0.1.0'].members.retrieve({
      user_id: `${context.params.event.author.id}`,
      guild_id: `${context.params.event.guild_id}`,
    });
    
    // Gets guild owner
    let guild = await lib.discord.guilds['@0.1.0'].retrieve({
      guild_id: `${context.params.event.guild_id}`,
    });
    let guildOwner = guild.owner_id;


    // checks to see if you have access to the command
    if (
      serverMember.roles.includes(`${process.env.ADMINROLE}`) ||
      context.params.event.author.id === guildOwner
    ) {
      
      // Gets the Current Time
      const now = new Date();
      const m = now.getMonth() + 1; // 0 index based
      const d = now.getDate();
      const h = now.getHours();
      const min = now.getMinutes();

      const dateText = `${m}/${d}, ${h}:${min}`; // -> "6/6, 15:19"


      // Tests to make sure that the message follows the right format
      let regEx = /.+unban \d+/;
      if (regEx.test(message)) {
        
        // Grabs the user for the unban
        let userId = message.split(' ').slice(1).join(' ');

        // Logs the unban to the Log Channel
        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: `${process.env.LOGCHANNEL}`,
          content: '**Moderation Logs |** Unban',
          tts: false,
          embed: {
            type: 'rich',
            title: 'Unban',
            description: `A User was Unbanned on the ${process.env.SERVERNAME}!`,
            color: 0x9be564,
            fields: [
              {
                name: 'User | 👤',
                value: `<@!${userId}>`,
              },
              {
                name: 'Moderator | 🔒',
                value: `<@!${context.params.event.author.id}>`,
              },
              {
                name: 'Time | ⏱️',
                value: `${dateText} UTC`,
              },
            ],
          },
        });


        // Unbans the specified user in the guild
        let result = await lib.discord.guilds['@0.1.0'].bans.destroy({
          user_id: `${userId}`,
          guild_id: `${context.params.event.guild_id}`,
        });

        // Notify's the unban where it took place
        await lib.discord.channels['@0.1.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: '**User Unbanned**',
          tts: false,
          embed: {
            type: 'rich',
            title: 'Moderation - Unban :white_check_mark: ',
            description: `A User has been Unbanned from the ${process.env.SERVERNAME}!`,
            color: 0x9be564,
            fields: [
              {
                name: 'User ',
                value: `<@!${userId}> | 👤`,
              },
            ],
            footer: {
              text: `Unbanned by ${context.params.event.author.username}`,
            },
          },
        });
      } else {
        
        // Gives an error message due to not having correct Formatting
        await lib.discord.channels['@0.2.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: `> That's invalid formating. Please use: **${process.env.COMMANDPREFIX}unban <userId>**`,
          message_reference: {
            message_id: `${context.params.event.id}`,
            channel_id: `${context.params.event.channel_id}`,
            guild_id: `${context.params.event.guild_id}`,
          },
        });
      }
    } else {
      
      // Gives an error message due to not having correct Permssions
      await lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `> <@!${context.params.event.author.id}>** | You Don't have permission to use \`${process.env.COMMANDPREFIX}unban\`**`,
        message_reference: {
          message_id: `${context.params.event.id}`,
          channel_id: `${context.params.event.channel_id}`,
          guild_id: `${context.params.event.guild_id}`,
        },
      });
    }
  }
}
