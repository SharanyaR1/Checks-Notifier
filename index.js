const app = require('./slack/slackClient');
const registerHandlers = require('./slack/handlers');
const { connectDB, getDB } = require("./db/mongoClient");

(async () => {
  await connectDB();
  registerHandlers(app);
  await app.start();
  console.log('⚡️ Slack bot is running via Socket Mode');

})();



