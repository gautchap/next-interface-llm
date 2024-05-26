"use client";

import { Badge } from "@/components/badge";
import { useChat } from "ai/react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, stop } = useChat();

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [messages]);

    return (
        <main className="mx-auto flex w-full py-24">
            <div className="mx-8 mb-5 text-white">
                {messages.map((m) => {
                    return (
                        <div key={m.id} className="flex items-center whitespace-pre-wrap">
                            <div className="my-8 mr-8">
                                <Badge role={m.role === "user" ? "user" : "ai"} />
                            </div>

                            <Markdown
                                className={`w-[90dvw] ${
                                    m.role !== "user" && "rounded border border-[#454056] px-3 py-4"
                                }`}
                                components={{
                                    code({ inline, className, children, ...props }: any) {
                                        return !inline ? (
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                PreTag="div"
                                                language={"javascript"}
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, "")}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {m.content}
                            </Markdown>
                        </div>
                    );
                })}
            </div>

            <form
                className="fixed bottom-0 left-0 flex w-full justify-center bg-background pb-8 pt-4 shadow-[0px_-15px_20px_0px_var(--background)]"
                onSubmit={handleSubmit}
            >
                <div className="mx-8 flex w-full items-center gap-2">
                    <Badge role="user" />
                    <input
                        className=" w-full rounded border border-gray-300 p-2 text-black shadow-xl"
                        value={input}
                        placeholder="Enter your message..."
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={stop}
                        className="flex size-12 items-center justify-center rounded border border-[#30343a] px-1 py-2 text-sm transition-colors hover:bg-[#333747]"
                    >
                        STOP
                    </button>
                </div>
            </form>
        </main>
    );
}
