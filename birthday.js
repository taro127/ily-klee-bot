// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hello".
if (context.params.event.content.toLowerCase().includes('birfgay', 'burfgay', 'birthday', 'bday', 'birthdays')) {

  await lib.discord.channels['@0.3.4'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Happy birthday to you, happy birthday to you, happy birthday dear traveler, happy birthday to you! You're older than me right? That means you've had way more birthdays than me... I'm sooo jealous!`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}