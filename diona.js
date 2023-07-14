// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('diona', 'cat', 'kitty', 'kitten', 'dionas')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Are we talking about Diona? Diona is the best! I like listening to her, last time I heard her say, "I'm gonna destroy the wine industry in this city if it's the last thing I do!" And I'm gonna help her using my bombs! ...I don't know what a wine industry is though. Is it a monster?`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}