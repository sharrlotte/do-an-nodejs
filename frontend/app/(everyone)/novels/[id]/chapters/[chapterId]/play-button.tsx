'use client';
import { useTts } from '@/hook/use-tts';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PlayButton({ text }: { text: string[] }) {
  const [isScrollFucus, setIsScrollFucus] = useState(false);
  const { speech, state, pause, progress, progressCharIndex } = useTts();
  const joinedText = text.join('. ');

  useEffect(() => {
    let arrayIndex = 0;
    let charIndex = 0;

    while (charIndex <= progressCharIndex) {
      charIndex += text[arrayIndex].length + 2; // Plus 2 for the space and period after each sentence
      arrayIndex++;

      if (arrayIndex >= text.length) {
        break;
      }
    }

    const content = document.getElementById('content');

    if (content && isScrollFucus) {
      for (let i = 0; i < content.children.length; i++) {
        if (i === arrayIndex) {
          content.children[i]?.classList.add('text-amber-600');
          continue;
        }
        content.children[i]?.classList.remove('text-amber-600');
      }
      content.children[arrayIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }

    document.addEventListener('scroll', () => {
      setIsScrollFucus(false);
    });
  }, [progressCharIndex, isScrollFucus, text]);

  const onClick = () => {
    if (state === 'playing') {
      pause();
      return;
    }
    setIsScrollFucus(true);
    speech(joinedText);
  };

  return (
    <button className="p-1 relative" onClick={onClick} aria-label={state === 'playing' ? 'Dừng' : 'Đọc'}>
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="gray" strokeWidth="3" strokeDasharray="100 100" className="opacity-50" />
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${progress} 100`} className="transition-all duration-200" />
      </svg>
      {state === 'playing' ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
    </button>
  );
}
