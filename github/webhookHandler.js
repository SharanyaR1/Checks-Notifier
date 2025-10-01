const { getDB } = require("../db/mongoClient");
const notifyUser = require("../utils/notifyUser");

function getDurationMs(start, end) {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const durationSec = Math.round((endTime - startTime) / 1000);
  return `${durationSec}s`;
}

module.exports = async function handleGithubWebhook(req, res) {
  const event = req.headers["x-github-event"];
  const payload = req.body;

  try {
    if (event === "check_run" && payload.action === "completed") {
      const checkRun = payload.check_run;
      const conclusion = checkRun.conclusion;

      if (conclusion === "failure") {
        const username = payload.sender?.login;
        const repoName = payload.repository?.full_name || "Unknown repository";

        if (!username) {
          console.log("❌ No GitHub username found in payload.");
          return res.status(400).send("Missing GitHub username.");
        }

        const db = getDB();
        const subscriptions = db.collection("subscriptions");
        const subscriber = await subscriptions.findOne({ github_username: username });

        if (subscriber) {
          // Collect failed check details
          const failedCheck = `• *${checkRun.name}* - Failed in *${getDurationMs(checkRun.started_at, checkRun.completed_at)}*\n<${checkRun.html_url}|View check details>`;

          const message = `❌ *Check Run Failed!*
*GitHub User:* ${username}
*Repository:* ${repoName}

*Failed Checks:*
${failedCheck}`;

          await notifyUser(subscriber.slack_id, message);
          console.log(`✅ Notified Slack user ${subscriber.slack_id} for ${username}`);
        } else {
          console.log(`ℹ️ No subscriber for GitHub user: ${username}`);
        }
      }
    }

    res.status(200).send("✅ Webhook processed");
  } catch (err) {
    console.error("❌ Webhook handler error:", err);
    res.status(500).send("Internal server error");
  }
};
