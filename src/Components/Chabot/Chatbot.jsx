import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return; // Prevent sending empty messages

        // Add user's message to chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, sender: 'user' },
        ]);

        // Clear input field
        setInput('');

        // Send message to the backend
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            // Add bot's response to chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data.content, sender: 'bot' },
            ]);
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., notify user)
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ color: msg.sender === 'user' ? 'blue' : 'green' }}>
                        {msg.sender === 'user' ? 'User: ' : 'Bot: '}
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
            />
            <button onClick={handleSend} style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
                Send
            </button>
        </div>
    );
};

export default Chatbot;