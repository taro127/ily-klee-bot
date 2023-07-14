// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let CommandType = process.env.COMMANDTYPE;
if (CommandType === 'command' || CommandType === 'both') {

let sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms || 0);
  });
};

// this file will be triggered when app is first installed,
// or can be triggered manually from within Autocode to create command

// first grab the guild the bot belongs to
let guildResult = await lib.discord.users['@0.0.1'].me.guilds.list({
  limit: 1,
});

// Make sure this has been installed to at least one guild
// before trying to create command
if (guildResult.length) {
  // create the command in the first guild the bot is in
  let gid = guildResult[0].id;
  await lib.discord.commands['@0.0.0'].create({
    guild_id: `${gid}`,
    name: 'ban',
    description: 'Ban a User',
    options: [
      {
        type: 6,
        name: 'user',
        description: 'The user that should be banned',
        required: true,
      },
      {
        type: 3,
        name: 'reason',
        description: 'The Reason for the Ban',
        required: true,
      },
    ],
  });

  await sleep(4000);

  await lib.discord.commands['@0.0.0'].create({
    guild_id: `${gid}`,
    name: 'kick',
    description: 'Kick a User',
    options: [
      {
        type: 6,
        name: 'user',
        description: 'The User that should be kicked',
        required: true,
      },
      {
        type: 3,
        name: 'reason',
        description: 'Reason for Kick',
        required: true,
      },
    ],
  });

  await sleep(4000);

  await lib.discord.commands['@0.0.0'].create({
    guild_id: `${gid}`,
    name: 'unban',
    description: 'Unban a User',
    options: [
      {
        type: 3,
        name: 'user',
        description: 'The User Id of the person that needs to be unbanned.',
        required: true,
      },
    ],
  });

  await sleep(4000);

  await lib.discord.commands['@0.0.0'].create({
    guild_id: `${gid}`,
    name: 'mute',
    description: 'Mute a User',
    options: [
      {
        type: 6,
        name: 'user',
        description: 'User to Mute.',
        required: true,
      },
      {
        type: 3,
        name: 'reason',
        description: 'Reason of Muting',
        required: true,
      },
    ],
  });

  await sleep(4000);

  await lib.discord.commands['@0.0.0'].create({
    guild_id: `${gid}`,
    name: 'unmute',
    description: 'Unmute a User',
    options: [
      {
        type: 6,
        name: 'user',
        description: 'Unmuted user',
        required: true,
      },
    ],
  });

  await sleep(4000);

  await lib.discord.commands['@0.0.0'].create({
    guild_id: `${gid}`,
    name: 'warn',
    description: 'Warn a user for actions against server Rules.',
    options: [
      {
        type: 6,
        name: 'user',
        description: 'The User that will be warned',
        required: true,
      },
      {
        type: 3,
        name: 'warning',
        description: 'What you are warning them for...',
        required: true,
      },
    ],
  });
} else {
  return 'No guild found.';
}
}