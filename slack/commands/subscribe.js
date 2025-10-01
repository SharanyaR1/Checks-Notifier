const { getDB } = require('../../db/mongoClient');
const { getAppHomeChannel } = require('../../utils/slackHelpers');

module.exports = function registerSubscribeCommand(app) {
  app.command("/subscribe", async ({ command, ack }) => {
    await ack();

    const slack_id = command.user_id;
    const github_username = command.text.trim();

    if (!github_username) {
      const channel_id = await getAppHomeChannel(app.client, slack_id);
      await app.client.chat.postMessage({
        channel: channel_id,
        text: "❗ Please provide your GitHub username. Usage: `/subscribe octocat`"
      });
      return;
    }

    const db = getDB();
    await db.collection("subscriptions").updateOne(
      { slack_id },
      { $set: { slack_id, github_username } },
      { upsert: true }
    );

    const channel_id = await getAppHomeChannel(app.client, slack_id);
    await app.client.chat.postMessage({
      channel: channel_id,
      text: `✅ Subscribed to GitHub check alerts!\nGitHub: *${github_username}*`
    });
  });
};
