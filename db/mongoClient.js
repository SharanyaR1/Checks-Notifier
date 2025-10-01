const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  // Optional: good defaults for modern driver
  maxPoolSize: 10,
});

let db;

async function connectDB() {
  try {
    await client.connect();
    // If you included /dbname in the URI, this will still work—Mongo ignores the argument here.
    db = client.db(process.env.DB_NAME || "slackbot");

    // Verify the connection
    await db.command({ ping: 1 });
    console.log("📦 Connected to MongoDB");

    // Create the index you'll query on (once)
    await db.collection("subscriptions")
      .createIndex({ github_username: 1 }, { unique: true });
    console.log("✅ Ensured index on subscriptions.github_username");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Don’t crash — bot keeps running
    db = null; // mark as unavailable
  }
}

function getDB() {
  if (!db) throw new Error("DB unavailable. Try again later.");
  return db;
}

module.exports = { connectDB, getDB };
