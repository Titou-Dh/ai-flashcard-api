# Flashcard Backend

A complete backend service using **Elysia (Bun + TypeScript)** for generating flashcards from PDFs and images.

## Features

- **Upload**: Accepts PDF or image uploads.
- **OCR**: Extracts text using `pdf-parse` or `tesseract.js` (WASM).
- **Generate**: Uses OpenRouter AI to create structured flashcards.
- **Deploy**: Ready for Railway.

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. Run development server:
   ```bash
   bun dev
   ```

## Deployment

This project includes a `Dockerfile` compatible with Railway.

## API Endpoints

### POST `/upload`

- Body: `multipart/form-data` with `file` field.
- Returns: `{ "status": "ok", "text": "..." }`

### POST `/generate`

- Body: `{ "text": "...", "count": 10 }`
- Returns: `[{ "question": "...", "answer": "..." }]`
# ai-flashcard-api
