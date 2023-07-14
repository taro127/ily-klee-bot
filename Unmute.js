// Secret Token
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Check to see if guild is using prefix commands
let CommandType = process.env.COMMANDTYPE;
if (CommandType === 'prefix' || CommandType === 'both') {
  
  // Checks to see if the message starts with (prefixunmute)
  let message = `${context.params.event.content}`;
  if (message.startsWith(`${process.env.COMMANDPREFIX}unmute`)) {
    
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
      let regEx = /.+unmute <@!?\d+>/;
      if (regEx.test(message)) {
        
        // Grabs the user for the unmute
        let userId = context.params.event.mentions[0].id;

        // Sends a DM to notify the user that they were Unmuted
        await lib.discord.users['@0.1.1'].dms.create({
          recipient_id: `${userId}`,
          content: `**${process.env.SERVERNAME} Alert**`,
          tts: false,
          embed: {
            type: 'rich',
            title: 'Unmuted',
            description: `Hey! You've been unmuted in the ${process.env.SERVERNAME}.`,
            color: 0x2ec4b6,
          },
        });

        // Logs the unmute to the Log Channel
        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: `${process.env.LOGCHANNEL}`,
          content: '**Moderation Logs |** Unmute',
          tts: false,
          embed: {
            type: 'rich',
            title: 'Unmute',
            description: `A User was Unmuted on the ${process.env.SERVERNAME}!`,
            color: 0x2ec4b6,
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


        // Unmutes the specified user in the guild
        let result = await lib.discord.guilds['@0.1.0'].members.roles.destroy({
          role_id: `${process.env.MUTEROLE}`,
          user_id: `${userId}`,
          guild_id: `${context.params.event.guild_id}`,
        });

        // Notify's the unmute where it took place
        await lib.discord.channels['@0.1.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: '**User Unmuted**',
          tts: false,
          embed: {
            type: 'rich',
            title: 'Moderation - Unmute :sound:',
            description: `A User has been unmuted!`,
            color: 0x2ec4b6,
            fields: [
              {
                name: 'User ',
                value: `<@!${userId}> | 👤`,
              },
            ],
            footer: {
              text: `Unmuted by ${context.params.event.author.username}`,
            },
          },
        });
      } else {
        
        // Gives an error message due to not having correct Formatting
        await lib.discord.channels['@0.2.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: `> That's invalid formating. Please use: **${process.env.COMMANDPREFIX}unmute <user>**`,
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
        content: `> <@!${context.params.event.author.id}>** | You Don't have permission to use \`${process.env.COMMANDPREFIX}unmute\`**`,
        message_reference: {
          message_id: `${context.params.event.id}`,
          channel_id: `${context.params.event.channel_id}`,
          guild_id: `${context.params.event.guild_id}`,
        },
      });
    }
  }
}
