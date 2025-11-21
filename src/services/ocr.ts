import { createWorker } from "tesseract.js";

export const extractTextWithOCR = async (buffer: Buffer): Promise<string> => {
  const worker = await createWorker("eng");

  try {
    const ret = await worker.recognize(buffer);
    await worker.terminate();
    return ret.data.text;
  } catch (error) {
    await worker.terminate();
    console.error("Error performing OCR:", error);
    throw new Error("Failed to perform OCR");
  }
};
