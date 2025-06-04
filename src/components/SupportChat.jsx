import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function SupportChat() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'support', content: 'Hola 👋 ¿En qué podemos ayudarte?' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'user',
            content: newMessage,
        };

        setMessages((prev) => [...prev, newMsg]);
        setNewMessage('');

        // Simulación de respuesta del soporte
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    sender: 'support',
                    content: 'Gracias por tu mensaje. En breve te ayudamos.',
                },
            ]);
        }, 1500);
    };

    return (
        <div className="bg-blue-mid border border-blue-accent rounded-xl p-4 max-w-xl mx-auto h-[500px] flex flex-col">
            <h2 className="text-blue-accent text-center font-semibold text-xl mb-4">Soporte</h2>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 pr-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm break-words
                            ${msg.sender === 'user'
                                ? 'bg-blue-dark text-white ml-auto'
                                : 'bg-blue-soft text-blue-dark mr-auto'
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={chatRef} />
            </div>

            {/* Input area */}
            <div className="mt-4 flex items-center">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    placeholder="Escribí tu mensaje..."
                    className="flex-1 px-4 py-2 rounded-l-md border-t border-b border-l border-blue-accent bg-blue-dark text-white placeholder:text-blue-accent focus:outline-none break-words"
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-accent text-blue-dark rounded-r-md hover:brightness-110 transition"
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}
