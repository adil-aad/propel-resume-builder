import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    baseUrl: process.env.GEMINI_BASE_URL,
  },
});

export default ai;
