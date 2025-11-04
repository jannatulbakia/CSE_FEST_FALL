import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, Volume2 } from "lucide-react";

const VoiceChat = () => {
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US'; // Bangla not supported, using English

            recognitionInstance.onresult = async (event) => {
                const userMessage = event.results[0][0].transcript;
                handleSend(userMessage);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => setIsListening(false);
            setRecognition(recognitionInstance);
        }
    }, []);

    const handleSend = async (userMessage) => {
        if (!userMessage.trim()) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: userMessage, sender: 'user' },
        ]);
        setInputText("");

        setLoading(true);
        try {
            const response = await fetch('https://cse-fest-backend-rho.vercel.app/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data.content, sender: 'bot' },
            ]);
            speak(data.content);
        } catch (error) {
            console.error('Error:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'সার্ভারের সাথে যোগাযোগে ত্রুটি হয়েছে।', sender: 'bot' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const speak = (text) => {
        try {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.lang = 'en-US'; // Bangla voice not well supported
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Error in speech synthesis:', error);
        }
    };

    const toggleListening = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop();
                setIsListening(false);
            } else {
                recognition.start();
                setIsListening(true);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(inputText);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                    <div className="flex items-center gap-3">
                        <Volume2 className="w-8 h-8" />
                        <div>
                            <h1 className="text-2xl font-bold">ভয়েস চ্যাট সহায়ক</h1>
                            <p className="text-green-100 text-sm">কথা বলুন অথবা টাইপ করুন</p>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="h-96 overflow-y-auto p-6 bg-gray-50 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-20">
                            <Mic className="w-16 h-16 mx-auto mb-4 opacity-30" />
                            <p className="text-lg">কথোপকথন শুরু করুন</p>
                            <p className="text-sm">মাইক্রোফোনে ক্লিক করুন অথবা একটি বার্তা টাইপ করুন</p>
                        </div>
                    )}
                    
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                                    msg.sender === 'user'
                                        ? 'bg-green-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                                }`}
                            >
                                <p className="text-sm break-words">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-md">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="একটি বার্তা টাইপ করুন..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            disabled={loading || isListening}
                        />
                        <button
                            onClick={() => handleSend(inputText)}
                            disabled={loading || isListening || !inputText.trim()}
                            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                        <button
                            onClick={toggleListening}
                            disabled={loading}
                            className={`px-6 py-3 rounded-full transition-all shadow-md ${
                                isListening
                                    ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                        >
                            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        {isListening ? 'শুনছি... এখন কথা বলুন' : 'পাঠাতে এন্টার চাপুন অথবা মাইকে ক্লিক করুন'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VoiceChat;