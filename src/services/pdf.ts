import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  try {
    const data = new Uint8Array(buffer);

    const loadingTask = getDocument({
      data,
    });
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item: any) => item.str).join(" ");

      fullText += pageText + "\n";
    }

    return fullText.trim();
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF");
  }
};
