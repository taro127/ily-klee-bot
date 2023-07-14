# XMod
### Created by lols :D

## Want a better experience? Use [X-Mod 2.0](https://autocode.com/app/x-series/x-mod/)

### Update: Code Cleanup, and Better Errors

## Intro
Hey! Welcome to coolest Mod App in town. It contains six slash commands and/or prefix commands, each of which
are only usable by admins or members of your server with the proper permissions:

1. `/ban <user> <reason>`, which bans the mentioned user. Simple as that!
2. `/kick <user> <reason>`, which kicks the mentioned user.
3. `/mute <user> <reason>`, which mutes a user by applying a **mute** role. **Note:** You'll need to set this up yourself.
4. `/unban <user_id>`, which unbans a previously banned user by id.
5. `/unmute <user>`, which unmutes a user by remove the **mute** role from them.
6. `/warn <user> <warning>`, which sends the mentioned user a warning.

**Note:** These are the same for the prefix comands but don't use the slash command UI

All commands DM the warned/muted/banned user to let them know what happened. The
app also logs triggered commands to a channel of your choice so you
can see exactly when they're run!

This project sets up the slash commands automatically on installation and requires little 
coding &mdash; it's very beginner friendly. In just a matter of minutes we'll get your commands running! 

## Starting 
To start, click **Install Free** above to install this app to your Autocode account. 
Follow the instructions to create and link your Discord bot to Autocode, then provide the following
information:

#### Server Name
![ServerName](https://cdn.discordapp.com/attachments/848567922892341269/851925206301409310/Screen_Shot_2021-06-08_at_3.46.23_PM.png)
Your server name. This should be simple like "Youtube World" or "Cheerios Hangout". It will be used for mentioning the server in logs like "Muted in Cheerios Hangout", etc. 

#### Muted Role
![Muted Role](https://cdn.discordapp.com/attachments/848567922892341269/851927108598759424/Screen_Shot_2021-06-08_at_3.53.37_PM.png)
This is the role that you've set up to mute people on your server.
To copy the ID of your role, make sure you have developer mode enabled in **Appearance Settings**. Then click on the role in **Role Settings** and paste it here. 
![Perms](https://cdn.discordapp.com/attachments/848567922892341269/851924757155020840/Screen_Shot_2021-06-08_at_3.41.37_PM.png). 
Make sure that you set the muted role not able to talk in any channels, as the bot will not configure this for you. 

#### Log Channel
![Log Channel](https://cdn.discordapp.com/attachments/848567922892341269/852039251481985064/Screen_Shot_2021-06-08_at_11.19.03_PM.png)
This is the channel id of the channel you want the commands to log in.

#### Command Type
![Command Type](https://cdn.discordapp.com/attachments/851196958583685200/855987391445729290/Screen_Shot_2021-06-19_at_8.48.09_PM.png)
This decideds whether you have slash commands using `command`, prefix commands using `prefix`, or even both using `both`.


**The Variables below are only needed if `Command Type` is set to `prefix` or `both`!**


#### Admin Role
![Admin Role](https://cdn.discordapp.com/attachments/848567907802021897/855992088944050186/Screen_Shot_2021-06-19_at_9.06.49_PM.png)
This is the role that can access the prefix commands when `Command Type` is set to `prefix` or `both`.

#### Command Prefix
![Command Prefix](https://cdn.discordapp.com/attachments/848567907802021897/855992402237718558/Screen_Shot_2021-06-19_at_9.08.05_PM.png)
This is the prefix used for the command when `Command Type` is set to `prefix` or `both`.

## Keep in Mind

It may take a few seconds after the app is installed for the commands to be created!

If you'd like to add slash command back to the server if you didn't select `command` or `both`. Then simply run the `CommandCreator.js` file in the SlashCommands Folder!

### Enjoy!

Thanks for checking out the app! It should be working now! And you can use it immediately.

> Enjoy Moderating your server!
  >lols <3


Need Support? DM me @ lols#7896!