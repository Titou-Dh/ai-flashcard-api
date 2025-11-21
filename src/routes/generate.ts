import { Elysia, t } from "elysia";
import { generateFlashcardsFromText } from "../services/openrouter";
import { parseFlashcards } from "../services/flashcards";

export const generateRoutes = new Elysia({ prefix: "/generate" }).post(
  "/",
  async ({ body, set }) => {
    const { text, count } = body;

    if (!text || text.trim().length === 0) {
      set.status = 400;
      return { error: "Text is required" };
    }

    try {
      const llmOutput = await generateFlashcardsFromText(text, count);

      if (!llmOutput) {
        throw new Error("No output from LLM");
      }

      const flashcards = parseFlashcards(llmOutput);
      return flashcards;
    } catch (error) {
      console.error("Generation error:", error);
      set.status = 500;
      return { error: "Failed to generate flashcards" };
    }
  },
  {
    body: t.Object({
      text: t.String(),
      count: t.Optional(t.Number({ default: 10 })),
    }),
  }
);
