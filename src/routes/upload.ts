import { Elysia, t } from "elysia";
import { extractTextFromPDF } from "../services/pdf";
import { extractTextWithOCR } from "../services/ocr";

export const uploadRoutes = new Elysia({ prefix: "/upload" }).post(
  "/",
  async ({ body, set }) => {
    const file = body.file;

    if (!file) {
      set.status = 400;
      return { error: "No file uploaded" };
    }

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileType = file.type;
      let text = "";

      if (fileType === "application/pdf") {
        text = await extractTextFromPDF(buffer);

        // Fallback to OCR if text is too short (scanned PDF)
        if (text.trim().length < 50) {
          console.log("PDF text insufficient, falling back to OCR");
          text = await extractTextWithOCR(buffer);
        }
      } else if (fileType.startsWith("image/")) {
        text = await extractTextWithOCR(buffer);
      } else {
        set.status = 400;
        return {
          error: "Unsupported file type. Please upload a PDF or image.",
        };
      }

      return {
        status: "ok",
        text: text.trim(),
      };
    } catch (error) {
      console.error("Upload processing error:", error);
      set.status = 500;
      return { error: "Failed to process file" };
    }
  },
  {
    body: t.Object({
      file: t.File(),
    }),
  }
);
