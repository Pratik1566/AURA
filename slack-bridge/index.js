
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.event("app_mention", async ({ event, say }) => {
  try {
    const question = event.text.replace(/<@[A-Z0-9]+>/g, "").trim();

    if (!question) {
      await say({
        text: "Hello! I'm AURA. How can I help?",
        thread_ts: event.ts,
      });
      return;
    }

    console.log("Received a Slack message.");

    const ollamaUrl = process.env.OLLAMA_BASE_URL.replace(/\/v1\/?$/, "");

    const response = await fetch(
      ollamaUrl + "/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL,
          messages: [
            {
              role: "user",
              content: question,
            },
          ],
          think: false,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Ollama returned HTTP " + response.status);
    }

    const data = await response.json();
    const answer = data.message?.content;

    await say({
      text: answer || "I couldn't generate a response.",
      thread_ts: event.ts,
    });

    console.log("AURA replied successfully.");

  } catch (error) {
    console.error("AURA error:", error.message);

    await say({
      text: "Sorry, I encountered an error while processing your message.",
      thread_ts: event.ts,
    });
  }
});

(async () => {
  await app.start();

  console.log("AURA Slack Bridge is running!");
  console.log("Connected to local Ollama.");
})();
