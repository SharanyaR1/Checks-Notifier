const express = require("express");
const router = express.Router();
const handleGithubWebhook = require("../github/webhookHandler");

router.post("/webhook", handleGithubWebhook);

module.exports = router;
