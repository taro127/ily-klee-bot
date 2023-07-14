// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('crazy')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy.`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}