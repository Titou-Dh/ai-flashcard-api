import { extractTextFromPDF } from "../src/services/pdf";

const test = async () => {
  console.log("Testing PDF extraction...");
  // Create a minimal valid PDF buffer (header only, will fail parsing but verify library load)
  // Or just a random buffer to see if it throws "Invalid PDF" vs "Module not found"
  const buffer = Buffer.from("%PDF-1.7\n%EOF");

  try {
    const text = await extractTextFromPDF(buffer);
    console.log("Text:", text);
  } catch (error: any) {
    console.log("Caught expected error or unexpected error:");
    console.log(error.message);
    if (
      error.message.includes("Invalid PDF structure") ||
      error.message.includes("Missing PDF header")
    ) {
      console.log("SUCCESS: Library loaded and attempted to parse.");
    } else {
      console.log("FAILURE: Unexpected error.");
      console.error(error);
    }
  }
};

test();
