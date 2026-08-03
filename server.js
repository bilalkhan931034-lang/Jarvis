import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import fs from "fs";
import { tavily } from "@tavily/core";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});
console.log("Tavily ready");
let memory = JSON.parse(fs.readFileSync("memory.json", "utf-8"));

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
let searchResult = "";

if (
  message.toLowerCase().includes("latest") ||
  message.toLowerCase().includes("weather") ||
  message.toLowerCase().includes("news") ||
  message.toLowerCase().includes("score") ||
  message.toLowerCase().includes("price") ||
  message.toLowerCase().includes("बताओ") ||
  message.toLowerCase().includes("क्या") ||
  message.toLowerCase().includes("आज")
) {
  const search = await tvly.search(message);

  searchResult = search.results
    .map((item) => item.content)
    .join("\n");
}
    
    console.log("Search Result:", searchResult);
    const chat = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "system",
      content: `You are Jarvis, an intelligent AI assistant.
Always use the Internet Data below when it is available.

Internet Data:
${searchResult}`,
    },

    ...memory,

    {
      role: "user",
      content: `Internet search results:
${searchResult}

User question:
${message}`,
    },
  ],
});

    memory.push({
      role: "user",
      content: message,
    });

    memory.push({
      role: "assistant",
      content: chat.choices[0].message.content,
    });

    fs.writeFileSync(
    "memory.json",
 JSON.stringify(memory, null, 2)
);

    if (memory.length > 20) {
      memory.splice(0, 2);
    }

    res.json({
  message: chat.choices[0].message.content,
});
  } catch (error) {
    console.error(error);
    res.json({
      reply: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Jarvis AI running on port 3000");
});