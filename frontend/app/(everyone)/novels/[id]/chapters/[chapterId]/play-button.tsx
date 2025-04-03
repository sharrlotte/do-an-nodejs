'use client';
import { useTts } from '@/hook/use-tts';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const sentence_separator = '. ';

export default function PlayButton({ text }: { text: string[] }) {
  const [isScrollFucus, setIsScrollFucus] = useState(false);
  const { speech, state, pause, progress, progressCharIndex } = useTts();
  const joinedText = text.join(sentence_separator);

  useEffect(() => {
    let arrayIndex = 0;
    let charIndex = 0;

    while (arrayIndex < text.length && charIndex + text[arrayIndex].length + sentence_separator.length <= progressCharIndex) {
      charIndex += text[arrayIndex].length + sentence_separator.length;
      arrayIndex++;

      if (arrayIndex >= text.length) {
        break;
      }
    }

    const content = document.getElementById('content');
    if (content) {
      for (let i = 0; i < content.children.length; i++) {
        if (i === arrayIndex) {
          content.children[i]?.classList.add('text-amber-600');
          continue;
        }
        content.children[i]?.classList.remove('text-amber-600');
      }

      if (arrayIndex >= content.children.length) {
        return;
      }

      if (isScrollFucus) {
        content.children[arrayIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }

    const onScroll = () => {
      // content.children[arrayIndex] check if it is in viewport
      if (content?.children[arrayIndex]?.getBoundingClientRect()?.top ?? 0 < 0) {
        setIsScrollFucus(false);
      } else {
        setIsScrollFucus(true);
      }
    };

    // Add onScroll to body element
    document.body.addEventListener('scroll', onScroll);
    return () => {
      document.body.removeEventListener('scroll', onScroll);
    };
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
