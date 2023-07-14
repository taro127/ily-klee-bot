// Secret Token
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Gets the Current Time
const now = new Date();
const m = now.getMonth() + 1; // 0 index based
const d = now.getDate();
const h = now.getHours();
const min = now.getMinutes();

const dateText = `${m}/${d}, ${h}:${min}`; // -> "6/6, 15:19"

// Checks to see what the DM is
let contextCheck = await lib.utils.kv['@0.1.16'].get({
  key: `Xmod-ContextDM-${context.params.event.author.id}`,
});

const banRegEx = /Ban-\d+/g;

if (banRegEx.test(contextCheck)) {
  let user = contextCheck.substring(4);
  
  // Sends a DM to notify the user that they were banned
  await lib.discord.users['@0.1.1'].dms.create({
    recipient_id: `${user}`,
    content: `**${process.env.SERVERNAME} Alert**`,
    tts: false,
    embed: {
      type: 'rich',
      title: 'Banned',
      description: `Hey! You've been banned in the ${process.env.SERVERNAME}.`,
      color: 0xcc2936,
      fields: [
        {
          name: 'Reason',
          value: `${context.params.event.content}`,
        },
        {
          name: 'Issue?',
          value: `Does this seem wrong contact a ${process.env.SERVERNAME} Staff!`,
        },
      ],
    },
  });
  
  // Logs the Ban
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${process.env.LOGCHANNEL}`,
    content: '**Moderation Logs |** Ban',
    tts: false,
    embed: {
      type: 'rich',
      title: 'Ban',
      description: `A Ban was Created on the ${process.env.SERVERNAME}!`,
      color: 0xcc2936,
      fields: [
        {
          name: 'User | 👤',
          value: `<@!${user}>`,
        },
        {
          name: 'Reason | ❓',
          value: `${context.params.event.content}`,
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

  // Creates a Ban With the Reason of the DM sent
  await lib.discord.guilds['@0.1.0'].bans.create({
    user_id: `${user}`,
    guild_id: `${process.env.GUILDID}`,
    reason: `${context.params.event.content}`,
  });
  
  // Sends a Ban Confirmation Message
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `Case #00`,
        description: `**Ban** | Ban Created for <@${user}> in ${process.env.SERVERNAME}`,
        color: 0xfb4646,
        footer: {
          text: `XMod - ${dateText} UTC`,
          icon_url: `https://imgur.com/N1zkwqV.png`,
        },
      },
    ],
  });
  
  // Clears DM Key
  await lib.utils.kv['@0.1.16'].set({
    key: `Xmod-ContextDM-${context.params.event.author.id}`,
    value: `None`
  });
}
