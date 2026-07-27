import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fallbackReplies = [
  "Great question! Let's break it down step by step — try re-reading the lesson slowly, one sentence at a time, and tell me which part feels confusing.",
  "You're doing well! Let's slow down. Can you point to the exact word or sentence that's tricky?",
  "No worries at all — learning takes practice. Try reading it out loud once, then let's talk through it together.",
  "That's a good try! Let's look at it from a different angle — what do you think the first word means?",
];

app.post("/api/ai-tutor", async (req, res) => {
  try {
    const { question, lesson, answer } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a patient literacy tutor helping adult learners. Explain things using very simple English. Be encouraging and never make the learner feel bad.",
        },
        {
          role: "user",
          content: `
Lesson: ${lesson}

Learner question: ${question}

Learner answer (if any): ${answer}
          `,
        },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    const randomReply =
      fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

    res.json({
      reply: randomReply,
    });
  }
});

app.listen(3001, () => {
  console.log("AI Tutor server running on port 3001");
});