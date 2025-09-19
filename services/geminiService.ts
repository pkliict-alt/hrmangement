
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this project, we assume the API key is set in the environment.
  console.warn("API_KEY not found. AI Assistant will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

let chat: Chat | null = null;

export const startChat = () => {
  if (!API_KEY) return;
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a helpful and expert HR assistant. Provide concise, accurate, and professional advice on human resources topics. You can draft documents, answer questions about best practices, and help with HR-related queries. Format your responses clearly, using markdown for lists, bolding, and italics where appropriate.',
    },
  });
};

export const sendMessageToAI = async (message: string, history: ChatMessage[]): Promise<string> => {
  if (!API_KEY) {
    return "AI service is unavailable. Please configure the API key.";
  }

  if (!chat) {
    startChat();
  }

  try {
    const response = await chat!.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};

export const sendMessageToAIStream = async (
    message: string, 
    onChunk: (chunk: string) => void
): Promise<void> => {
    if (!API_KEY) {
        onChunk("AI service is unavailable. Please configure the API key.");
        return;
    }

    if (!chat) {
        startChat();
    }

    try {
        const responseStream = await chat!.sendMessageStream({ message });
        for await (const chunk of responseStream) {
            onChunk(chunk.text);
        }
    } catch (error) {
        console.error("Error sending message to AI:", error);
        onChunk("Sorry, I encountered an error. Please try again.");
    }
};
