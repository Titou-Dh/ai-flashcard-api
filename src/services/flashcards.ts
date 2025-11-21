export interface Flashcard {
  question: string;
  answer: string;
}

export const parseFlashcards = (llmOutput: string): Flashcard[] => {
  try {
    let cleanOutput = llmOutput
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanOutput);

    if (!Array.isArray(parsed)) {
      throw new Error("Output is not an array");
    }

    return parsed.map((item: any) => {
      if (!item.question || !item.answer) {
        throw new Error("Invalid flashcard structure");
      }
      return {
        question: String(item.question),
        answer: String(item.answer),
      };
    });
  } catch (error) {
    console.error("Error parsing flashcards:", error);
    console.error("Raw output:", llmOutput);
    throw new Error("Failed to parse flashcards from LLM output");
  }
};
