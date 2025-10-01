// utils/notifyUser.js
const app = require('../slack/slackClient');

async function notifyUser(userId, message) {
  try {
    // Open DM channel between bot and user
    const result = await app.client.conversations.open({
      users: userId,
    });

    const channelId = result.channel.id;

    await app.client.chat.postMessage({
      channel: channelId,
      text: message,
    });

    console.log(`✅ Notified Slack user ${userId} in App Home DM`);
  } catch (error) {
    console.error(`❌ Failed to DM ${userId}:`, error);
  }
}

module.exports = notifyUser;
