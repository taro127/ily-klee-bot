// Secret Token
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Check to see if guild is using prefix commands
let CommandType = process.env.COMMANDTYPE;
if (CommandType === 'prefix' || CommandType === 'both') {
  
  // Checks to see if the message starts with (prefixkick)
  let message = `${context.params.event.content}`;
  if (message.startsWith(`${process.env.COMMANDPREFIX}kick`)) {
    
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
      let regEx = /.+kick <@!?\d+> .+/;
      if (regEx.test(message)) {
        
        // Grabs the user and reason for the kick
        let userId = context.params.event.mentions[0].id;
        let reason = message.split(' ').slice(2).join(' ');


        // Sends a DM to notify the user that they were Kicked
        await lib.discord.users['@0.1.1'].dms.create({
          recipient_id: `${userId}`,
          content: `**${process.env.SERVERNAME} Alert**`,
          tts: false,
          embed: {
            type: 'rich',
            title: 'Kicked',
            description: `Hey! You've been kicked in the ${process.env.SERVERNAME}.`,
            color: 0xe8985e,
            fields: [
              {
                name: 'Reason',
                value: `${reason}`,
              },
              {
                name: 'Issue?',
                value: `Does this seem wrong contact a ${process.env.SERVERNAME}Staff!`,
              },
            ],
          },
        });


        // Logs the kick to the Log Channel
        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: `${process.env.LOGCHANNEL}`,
          content: '**Moderation Logs |** Kick',
          tts: false,
          embed: {
            type: 'rich',
            title: 'Kick',
            description: `A User was Kicked on the ${process.env.SERVERNAME}!`,
            color: 0xe8985e,
            fields: [
              {
                name: 'User | 👤',
                value: `<@!${userId}>`,
              },
              {
                name: 'Reason | ❓',
                value: `${reason}`,
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


        // Kicks the specified user in the guild
        let result = await lib.discord.guilds['@0.1.0'].members.destroy({
          user_id: `${userId}`,
          guild_id: `${context.params.event.guild_id}`,
        });


        // Notify's the kick where it took place
        await lib.discord.channels['@0.1.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: '**User Kicked**',
          tts: false,
          embed: {
            type: 'rich',
            title: 'Moderation - Kick :boot: ',
            description: `A User has been kicked from the ${process.env.SERVERNAME}!`,
            color: 0xe8985e,
            fields: [
              {
                name: 'User ',
                value: `<@!${userId}> | 👤`,
              },
              {
                name: 'Reason | ❓',
                value: `${reason}`,
              },
            ],
            footer: {
              text: `kicked by ${context.params.event.author.username}`,
            },
          },
        });
      } else {
        
        // Gives an error message due to not having correct Formatting
        await lib.discord.channels['@0.2.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: `> That's invalid formating. Please use: **${process.env.COMMANDPREFIX}kick <user> <reason>**`,
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
        content: `> <@!${context.params.event.author.id}>** | You Don't have permission to use \`${process.env.COMMANDPREFIX}kick\`**`,
        message_reference: {
          message_id: `${context.params.event.id}`,
          channel_id: `${context.params.event.channel_id}`,
          guild_id: `${context.params.event.guild_id}`,
        },
      });
    }
  }
}
