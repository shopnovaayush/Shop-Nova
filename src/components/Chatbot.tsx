import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { findBestResponse, getAIResponse } from '../lib/chatbotKnowledge';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const { chatbot } = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: chatbot.welcomeMessage,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, [chatbot.welcomeMessage, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let botResponse: string;

      if (chatbot.useApi && chatbot.apiKey) {
        // Use AI API
        try {
          botResponse = await getAIResponse(
            userMessage.text,
            chatbot.apiProvider,
            chatbot.apiKey,
            chatbot.apiEndpoint
          );
        } catch {
          // Fallback to basic if API fails
          botResponse = findBestResponse(userMessage.text) + '\n\n_(AI temporarily unavailable, using basic mode)_';
        }
      } else {
        // Use basic knowledge-based response
        botResponse = findBestResponse(userMessage.text);
      }

      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!chatbot.enabled) return null;

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-full shadow-2xl shadow-violet-500/30 flex items-center justify-center hover:scale-110 transition-transform group"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us! 💬
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold flex items-center gap-1.5">
                {chatbot.botName}
                {chatbot.useApi && chatbot.apiKey && (
                  <Sparkles size={14} className="text-amber-300" />
                )}
              </h3>
              <p className="text-xs text-white/80">
                {chatbot.useApi && chatbot.apiKey ? 'AI Powered ✨' : 'Online • Ready to help'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.isBot ? '' : 'flex-row-reverse'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.isBot
                      ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {msg.isBot ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    msg.isBot
                      ? 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
                      : 'bg-violet-600 text-white rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-violet-300 transition-all"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Powered by ShopNova ✦
            </p>
          </div>
        </div>
      )}
    </>
  );
}
