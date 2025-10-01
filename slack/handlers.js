const registerSubscribeCommand = require('./commands/subscribe');
const registerUnsubscribeCommand = require('./commands/unsubscribe');

module.exports = function registerHandlers(app) {
  // Slash commands
  registerSubscribeCommand(app);
  registerUnsubscribeCommand(app);

  // Events
  app.event('app_mention', async ({ say }) => {
    await say("👋 Hello! I’ll notify you about your PR check failures.");
  });
};
