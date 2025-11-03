// voice/voiceChat.js
import React, { useState } from 'react';

const VoiceChat = () => {
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    // Initialize speech recognition
    React.useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onresult = async (event) => {
                const userMessage = event.results[0][0].transcript;
                handleSend(userMessage);
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

        try {
            const response = await fetch('http://localhost:5000/chat', {
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
        }
    };

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const startListening = () => {
        if (recognition) {
            recognition.start();
            setIsListening(true);
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
            <button onClick={startListening} style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
                {isListening ? 'Listening...' : 'Hold to Talk'}
            </button>
        </div>
    );
};

export default VoiceChat;