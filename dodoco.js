// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('dodoco', 'dodocos', 'bombing')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Dodoco is my oldest and bestest friend! Okay, now I've introduced you, don't forget her name again alright? No more calling Dodoco "that silly doll Klee always hangs on her rucksack.`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}