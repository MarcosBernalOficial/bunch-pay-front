import { useState, useEffect, useRef } from "react";

export default function SupportChat({ messages = [], onSendMessage, isSupport, disabled = false }) {
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    const handleSend = () => {
        if (!text.trim() || disabled) return;
        onSendMessage(text);
        setText("");
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const isMyMessage = (type) => {
        return isSupport ? type === "SUPPORT" : type === "CLIENT";
    };


    return (
        <div className="bg-blue-mid border border-blue-accent rounded-xl shadow-xl h-[500px] flex flex-col">
            {/* Mensajes */}
            <div className="p-4 flex-1 space-y-4 overflow-y-auto no-scrollbar">
                {messages.map((m, index) => {
                    const mine = isMyMessage(m.senderType);

                    return (
                        <div
                            key={index}
                            className={`flex ${mine ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md text-sm break-words whitespace-pre-wrap ${
                                    mine
                                        ? "bg-green-200 text-green-900 rounded-br-none"
                                        : "bg-white text-blue-dark rounded-bl-none"
                                }`}
                            >
                                <div className="text-[13px] font-semibold mb-1 text-blue-accent">
                                    {m.senderName}
                                </div>
                                <div>{m.content}</div>
                                <div className="text-[10px] text-right text-gray-500 mt-1">
                                    {new Date(m.date).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef}></div>
            </div>

            {/* Input y botón */}
            <div className="p-3 border-t border-blue-accent flex gap-2 bg-blue-dark rounded-b-xl">
                <input
                    disabled={disabled}
                    maxLength={65}
                    className={`flex-1 px-4 py-2 rounded-full outline-none text-white placeholder:text-blue-accent border ${
                        disabled
                            ? "bg-gray-700 border-gray-500 cursor-not-allowed"
                            : "bg-blue-mid border-blue-accent"
                    }`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={disabled ? "El chat está cerrado" : "Escribí tu mensaje..."}
                />
                <button
                    disabled={disabled}
                    onClick={handleSend}
                    className={`px-4 py-2 font-semibold rounded-full transition ${
                        disabled
                            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                            : "bg-blue-accent text-blue-dark hover:brightness-110"
                    }`}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}
