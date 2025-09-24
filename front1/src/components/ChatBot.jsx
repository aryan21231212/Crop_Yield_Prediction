// src/components/ChatBot.jsx
'use client';
import React from 'react';

const ChatBot = () => {
  return (
    <div className="w-full h-[700px] md:h-[800px] lg:h-[900px]">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/3yBMsL89D9WBHMCaCMdOn"
        title="ChatBot"
        width="100%"
        height="100%"
        style={{ border: 'none', minHeight: '700px' }}
        allow="microphone; autoplay"
      />
    </div>
  );
};

export default ChatBot;
