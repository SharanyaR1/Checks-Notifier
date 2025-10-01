# Checks-Notifier

A Slack bot that notifies users when their GitHub check runs fail.

## Features

- Subscribe to GitHub check alerts via Slack (`/subscribe <github_username>`)
- Unsubscribe from alerts (`/unsubscribe`)
- Direct message notifications for failed GitHub checks
- MongoDB-backed subscription management

## Status

**This project is still in progress and considered a prototype due to strict rules and limitations imposed by Slack on bot permissions and interactions.**

## Usage

- In Slack, use `/subscribe <github_username>` to receive alerts for failed GitHub checks.
- Use `/unsubscribe` to stop receiving alerts.

## GitHub Webhook

Configure your GitHub organisation/repository to send `check_run` events to your server's webhook endpoint.  
For example, set up a webhook in your repository with:

- **Payload URL:** `http://<your-server-domain-or-ip>/github/webhook`
- **Content type:** `application/json`
- **Events to send:** Choose "Let me select individual events" and check `check_run`and `check_suite`

This will allow the bot to receive notifications when check runs fail and notify subscribed Slack users.

## Project Structure

- `server.js` — Express server for GitHub webhooks
- `index.js` — Slack bot entry point
- `db/` — MongoDB client
- `slack/` — Slack bot logic and commands
- `github/` — GitHub webhook handler
- `routes/` — Express routes
- `utils/` — Helper functions

## Thank you!

Feedback and contributions are welcome! 