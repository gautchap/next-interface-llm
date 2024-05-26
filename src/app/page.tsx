"use client";

import { useChat } from "ai/react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [messages]);

    return (
        <main className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <div className="mb-5">
                {messages.map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap">
                        {m.role === "user" ? "User: " : "AI: "}
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                ))}
            </div>

            <form className="w-full fixed bottom-0 left-0 flex justify-center bg-white pt-4" onSubmit={handleSubmit}>
                <input
                    className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </main>
    );
}
