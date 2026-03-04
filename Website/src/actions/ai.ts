"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY!);

export const generateAIResponse = async (prompt: string, context: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const fullPrompt = `
        Context (Video Transcript):
        ${context}
        User Question:
        ${prompt}
        Answer the user's question based on the video transcript provided above. Keep it professional and concise.
        `
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        return { status: 200, data: text }
    }
    catch (error) {
        console.log("Gemini Error: ", error);
        return { status: 500, data: "Failed to generate response." };
    }
}