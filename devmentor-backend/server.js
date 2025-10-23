import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ error: "Code is required" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are DevMentor.AI — a friendly senior developer assistant. 
Analyze the given code and return feedback in this exact format:

✅ **Good Practices:** (mention what’s done well)
⚠️ **Issues Found:** (list main problems or errors)
💡 **Suggestions to Improve:** (clear, concise bullet points)
🧩 **Code Quality Rating:** (rate from 1-10 briefly)

Keep it short, structured, and easy for beginners to understand.`
        },
        {
          role: "user",
          content: code
        }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    const aiFeedback = response.choices[0].message.content;
    res.json({ feedback: aiFeedback });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
