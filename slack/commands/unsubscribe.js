const { getDB } = require('../../db/mongoClient');
const { getAppHomeChannel } = require('../../utils/slackHelpers');

module.exports = function registerUnsubscribeCommand(app) {
  app.command("/unsubscribe", async ({ command, ack }) => {
    await ack();

    const slack_id = command.user_id;
    const db = getDB();
    const result = await db.collection("subscriptions").deleteOne({ slack_id });

    const channel_id = await getAppHomeChannel(app.client, slack_id);
    const text = result.deletedCount === 0
      ? "❗ You were not subscribed."
      : "🛑 Unsubscribed. You’ll no longer receive PR check alerts.";

    await app.client.chat.postMessage({ channel: channel_id, text });
  });
};
