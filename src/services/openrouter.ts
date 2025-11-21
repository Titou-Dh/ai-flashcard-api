import { env } from "process";

const OPENROUTER_API_KEY = env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = env.OPENROUTER_MODEL || "x-ai/grok-4.1-fast";

export const generateFlashcardsFromText = async (
  text: string,
  count: number = 10
) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const prompt = `
    You are a helpful assistant that generates flashcards.
    Create ${count} flashcards based on the following text.
    Return ONLY a raw JSON array of objects with "question" and "answer" keys.
    Do not include markdown formatting like \`\`\`json.
    
    Text:
    ${text}
  `;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${error}`);
    }

    const data = await response.json();
    // @ts-ignore
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    throw error;
  }
};
