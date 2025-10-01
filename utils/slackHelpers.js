async function getAppHomeChannel(slackClient, slack_id) {
  const result = await slackClient.conversations.list({ types: 'im' });
  const channel = result.channels.find(c => c.user === slack_id);
  return channel?.id;
}

module.exports = { getAppHomeChannel };
