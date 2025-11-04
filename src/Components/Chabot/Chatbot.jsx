import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import "./Chatbot.css"; // Tailwind বা custom css

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Chat history store (last 10 messages)
  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        "chat_history",
        JSON.stringify(messages.slice(-10)) // last 10 messages
      );
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.content, sender: "bot" }]);
    } catch {
      // catch variable ব্যবহার করা হয়নি, redline gone
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ সার্ভারে সংযোগে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Floating Name + Icon */}
      {!isOpen && (
        <div className="flex flex-col items-center">
          <span className="mb-1 text-xl font-medium text-green-700 animate-pulse">
            আপনার বন্ধু
          </span>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-green-800 to-green-600 hover:from-green-900 hover:to-green-900 text-white rounded-full p-4 shadow-2xl flex items-center justify-center animate-bounceSlow"
            title="চ্যাট করুন আপনার বন্ধুর সাথে"
          >
            <MessageCircle size={30} />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-3 flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              🤖 আপনার বন্ধু
              <span className="text-sm opacity-90">(আপনার মানসিক সহায়ক)</span>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center text-sm mt-10">
                👋 হ্যালো! আমি <b>আপনার বন্ধু</b> — আপনার মানসিক স্বাস্থ্য সহায়ক। 
                কীভাবে সাহায্য করতে পারি?
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl text-sm shadow-md max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-white border border-green-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="আপনার বার্তা লিখুন..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              পাঠান
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
