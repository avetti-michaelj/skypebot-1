var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {
    session.send("Tell me about it...");
});

// Install logging middleware
bot.use({
    botbuilder: function (session, next) {
        if (/^\/log on/i.test(session.message.text)) {
            session.userData.isLogging = true;
            session.send('Logging is now turned on');
        } else if (/^\/log off/i.test(session.message.text)) {
            session.userData.isLogging = false;
            session.send('Logging is now turned off');
        } else {
            if (session.userData.isLogging) {
                console.log('Message Received: ', session.message.text);
            }
            next();
        }
    }
});
