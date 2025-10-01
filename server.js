require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/mongoClient");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON payloads
app.use(express.json());

// Mount GitHub webhook route
app.use("/github", require("./routes/githubWebhookRoute"));

app.get("/", (req, res) => {
  res.send("✅ GitHub Webhook server is up and running!");
});

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🌐 GitHub webhook server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start Express server:", err);
    process.exit(1);
  }
})();
