import { OpenAIStream, StreamingTextResponse, StreamData } from "ai";
import { OpenAI } from "openai";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const openai = new OpenAI({
        baseURL: process.env.LLM_API_URL,
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
        model: process.env.LLM_MODEL,
        stream: true,
        messages: [
            {
                role: "system",
                content:
                    "You are a helpful, smart, kind, and efficient AI assistant. You always fulfill the user's requests to the best of your ability.",
            },
            ...messages,
        ],
        temperature: 0.8,
    });

    const data = new StreamData();
    const stream = OpenAIStream(response, {
        onFinal(completion) {
            data.close();
        },
    });

    data.append({
        text: "Hello, how are you?",
    });

    return new StreamingTextResponse(stream, {}, data);
}
