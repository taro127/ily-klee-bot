// Secret Token
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Gets the Current Time
const now = new Date();
const m = now.getMonth() + 1; // 0 index based
const d = now.getDate();
const h = now.getHours();
const min = now.getMinutes();

const dateText = `${m}/${d}, ${h}:${min}`; // -> "6/6, 15:19"

// Get's the guilds owner
let guild = await lib.discord.guilds['@0.1.0'].retrieve({
  guild_id: `${context.params.event.guild_id}`
});

let guildOwner = guild.owner_id;

// Checks to see if user has permission
if (
  context.params.event.member.permission_names.includes('ADMINISTRATOR') ||
  context.params.event.member.permission_names.includes('BAN_MEMBERS') ||
  context.params.event.member.user.id === guildOwner
  ) {
    
    // Sends a DM to the Author for a Reason To Ban
    await lib.discord.users['@0.1.5'].dms.create({
      recipient_id: `${context.params.event.member.user.id}`,
      "content": "",
        "tts": false,
        "embeds": [
          {
            "type": "rich",
            "title": `Case #00`,
            "description": `**Ban** | Please Provide a Reason below for the Ban of <@${context.params.event.data.target_id}>`,
            "color": 0xfb4646,
            "footer": {
              "text": `XMod - ${dateText} UTC`,
              "icon_url": `https://imgur.com/N1zkwqV.png`
            }
          }
        ]
      });
      
      // Sets a Key for DM info
      await lib.utils.kv['@0.1.16'].set({
        key: `Xmod-ContextDM-${context.params.event.member.user.id}`,
        value: `Ban-${context.params.event.data.target_id}`
      });
      
  }
  else {
    // Sends a Dm if invalid Permissions
    await lib.discord.users['@0.1.5'].dms.create({
      recipient_id: `${context.params.event.member.user.id}`,
      content: `**⛔ | Hm, It looks like you don't have permission to use this!**`
    });
  }