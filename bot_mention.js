// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let result = await lib.discord.channels['@0.3.4'].update({
  channel_id: `1129120081851453470`
});

let messageResponse = await lib.discord.channels['@0.3.4'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: [
    `Spark Knight Klee of the Knights of Favonius, reporting for duty!`,
    `...There's some more, but uh, I forgot. I'm not so good at remembering...`,
].join('\n'), 
});

return messageResponse;
