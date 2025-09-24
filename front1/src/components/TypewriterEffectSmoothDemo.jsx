'use client';

import React, { useState, useEffect } from 'react';

function Typewriter({ words, typingSpeed = 120, pauseDuration = 1200 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[currentWordIndex].text;
  const currentClass = words[currentWordIndex].className || '';

  useEffect(() => {
    let timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWord, words.length, currentWordIndex, typingSpeed, pauseDuration]);

  return (
    <span className={`inline-block ${currentClass}`}>
      {displayedText}
      <span className="ml-1 inline-block animate-blink">|</span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s infinite; }
      `}</style>
    </span>
  );
}

const TypewriterEffectSmoothDemo = () => {
  const words = [
    { text: 'Next-Gen Solutions ForOptimal Crop Growth' },
    
   
  ];

  return (
    <div className="flex flex-col items-center justify-center  space-y-6 px-4">
     
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
        <Typewriter words={words} typingSpeed={100} pauseDuration={1000} />
      </div>
      
    </div>
  );
};

export default TypewriterEffectSmoothDemo;
