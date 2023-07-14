// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('kae', 'kayak', 'kaeya', 'kaeyas')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Kaeya is the best! He wrote the Favonius Survival Rulebook for me and he always helps me cover it up when I make a big disaster.`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}