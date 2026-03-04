import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { generateAIResponse } from "@/actions/ai";
import { Bot, User, Send, Loader2 } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
    videoId: string;
    transcript: string;
};

type Message = {
    role: "user" | "bot";
    content: string;
};

const AIChatbot = ({ videoId, transcript }: Props) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", content: "Hello! I've analyzed the video. Ask me anything about it!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        const response = await generateAIResponse(userMessage, transcript);

        if (response.status === 200 && response.data) {
            setMessages((prev) => [...prev, { role: "bot", content: response.data as string }]);
        } else {
            setMessages((prev) => [...prev, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
        }
        setIsLoading(false);
    };

    return (
        <TabsContent value="AI Chatbot" className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-4 max-h-[600px]">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white">AI Chatbot</h2>
                <p className="text-[#BDBDBD]">Ask questions about the video content.</p>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#151515] rounded-lg p-4 border border-[#2d2d2d] shadow-inner [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#363636]">
                <div className="flex flex-col gap-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex gap-3 max-w-[85%]",
                                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#8d5bff] to-[#6b3dcc]">
                                {msg.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                            </div>
                            <div
                                className={cn(
                                    "p-3 rounded-2xl text-sm leading-relaxed",
                                    msg.role === "user"
                                        ? "bg-[#6b3dcc] text-white rounded-tr-none"
                                        : "bg-[#2d2d2d] text-gray-200 rounded-tl-none"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 mr-auto">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8d5bff] to-[#6b3dcc] flex items-center justify-center">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="bg-[#2d2d2d] p-3 rounded-2xl rounded-tl-none text-gray-200">
                                <Loader2 className="animate-spin w-4 h-4" />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
                className="flex gap-2 items-center bg-[#151515] p-2 rounded-xl border border-[#2d2d2d]"
            >
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-500"
                />
                <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="bg-[#6b3dcc] hover:bg-[#5a33aa] text-white rounded-lg transition-all"
                >
                    <Send size={18} />
                </Button>
            </form>
        </TabsContent>
    );
};

export default AIChatbot;