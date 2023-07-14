const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await lib.discord.contextmenu['@0.0.0'].items.create({
  guild_id: `${process.env.GUILDID}`,
  name: `Ban`,
  type: 'USER',
  default_permission: true
});

await sleep(1000)

await lib.discord.contextmenu['@0.0.0'].items.create({
  guild_id: `${process.env.GUILDID}`,
  name: `Kick`,
  type: 'USER',
  default_permission: true
});

await sleep(1000)

await lib.discord.contextmenu['@0.0.0'].items.create({
  guild_id: `${process.env.GUILDID}`,
  name: `Mute`,
  type: 'USER',
  default_permission: true
});

await sleep(1000)

await lib.discord.contextmenu['@0.0.0'].items.create({
  guild_id: `${process.env.GUILDID}`,
  name: `Unmute`,
  type: 'USER',
  default_permission: true
});

await sleep(1000)

await lib.discord.contextmenu['@0.0.0'].items.create({
  guild_id: `${process.env.GUILDID}`,
  name: `Warn`,
  type: 'USER',
  default_permission: true
});