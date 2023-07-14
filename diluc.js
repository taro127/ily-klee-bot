// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('diluc', 'dilu', 'diluc', 'luc', 'dilulu')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Diluc? He's Diona's dad! He's also one of the weird grown-ups. He's so grumpy all the time... Why does he never smile?`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}