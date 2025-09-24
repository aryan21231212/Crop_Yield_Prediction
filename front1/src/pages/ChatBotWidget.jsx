// src/components/ChatBotWidget.jsx
'use client';
import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat iframe */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 md:w-96 h-126 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
         
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/3yBMsL89D9WBHMCaCMdOn"
            title="ChatBot"
            width="100%"
            height="100%"
            style={{ border: 'none', flexGrow: 1 }}
            allow="microphone; autoplay"
          />
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;
