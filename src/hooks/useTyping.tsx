import { useState, useEffect } from 'react';

const TypingEffect = ({ text, container }: { text: string; container: HTMLDivElement }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
        container.scrollTo({ top: container.scrollHeight - container.clientHeight, behavior: 'smooth' });
      } else {
        clearInterval(interval);
      }
    }, 50);
    console.log(container.scrollHeight);
    return () => clearInterval(interval);
  }, [text]);

  return <p>{displayedText}</p>;
};

export default TypingEffect;
