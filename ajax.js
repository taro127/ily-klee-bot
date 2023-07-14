// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('ajax', 'ajaxs', 'jax', 'ajaxx', 'ajaxxx')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `I need that twink obliterated.`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}