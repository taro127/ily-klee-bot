// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('draff', 'draffs')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Draff is a stupid ugly rotten rancid wiped out piece of shit and i hope he dies in a ditch oh I swear the next time I see that disgusting furry ass sorry excuse for a man I'm going to blow him up with dodoco and feed him to Timmie's birds I hope that motherfucker dies ong`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}