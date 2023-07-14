// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('bomb', 'bombs', 'bombing')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Did someone say bomb? This is my new and improved bomb! Whaddya think? Great huh? ...Oh, but ahh... If you find it near any fires, it's not mine. Definitely. Not. Mine.`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}