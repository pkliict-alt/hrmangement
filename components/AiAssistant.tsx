
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAIStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Icons, Card } from './ui';

// --- Chat Bubble ---
const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    const bubbleClasses = isUser
        ? 'bg-primary-600 text-white self-end'
        : 'bg-gray-200 text-gray-800 self-start';
    const containerClasses = isUser ? 'justify-end' : 'justify-start';

    return (
        <div className={`flex ${containerClasses}`}>
            <div className={`max-w-xl rounded-lg px-4 py-2 ${bubbleClasses}`}>
                 <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
            </div>
        </div>
    );
};

// --- AI Assistant Page ---
const AiAssistantPage: React.FC = () => {
    const [history, setHistory] = useState<ChatMessage[]>([
        { role: 'model', text: 'Hello! I am your AI HR Assistant. How can I help you today? You can ask me to draft job descriptions, provide interview questions, or answer HR policy questions.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const modelMessage: ChatMessage = { role: 'model', text: '' };
        setHistory(prev => [...prev, modelMessage]);

        await sendMessageToAIStream(input, (chunk) => {
            setHistory(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.role === 'model') {
                    const updatedMessage = { ...lastMessage, text: lastMessage.text + chunk };
                    return [...prev.slice(0, -1), updatedMessage];
                }
                return prev;
            });
        });

        setIsLoading(false);
    };

    return (
        <Card className="flex flex-col h-full max-h-[calc(100vh-10rem)]">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {history.map((msg, index) => (
                    <ChatBubble key={index} message={msg} />
                ))}
                 {isLoading && history[history.length-1].role === 'model' && history[history.length-1].text === '' && (
                    <div className="flex justify-start">
                         <div className="bg-gray-200 text-gray-800 self-start rounded-lg px-4 py-2">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                            </div>
                         </div>
                    </div>
                )}
            </div>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask your HR question..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-2.5 rounded-lg bg-primary-600 text-white disabled:bg-primary-300 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
                    >
                        {Icons.send}
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default AiAssistantPage;
