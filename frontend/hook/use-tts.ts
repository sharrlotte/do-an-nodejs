import { useState, useCallback, useRef, useEffect } from 'react';
import { useVoiceContext } from '@/context/VoiceContext';

type TTSUtterance = SpeechSynthesisUtterance;
type TTSState = 'stopped' | 'playing' | 'paused';

interface TTSHookResult {
  state: TTSState;
  progress: number;
  voices: SpeechSynthesisVoice[];
  currentVoice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  progressCharIndex: number;
  speech: (text: string) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVoice: (value: string) => void;
  setPitch: (value: number) => void;
  setRate: (value: number) => void;
  setVolume: (value: number) => void;
}

export function useTts(): TTSHookResult {
  const [state, setState] = useState<TTSState>('stopped');
  const [progressCharIndex, setProgressCharIndex] = useState<number>(0);
  const utteranceRef = useRef<TTSUtterance | null>(null);
  const textLengthRef = useRef<number>(0);
  const { voices, currentVoice, pitch, rate, volume, setVoice, setPitch, setRate, setVolume } = useVoiceContext();

  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.pitch = pitch;
      utteranceRef.current.rate = rate;
      utteranceRef.current.volume = volume;
    }
  }, [pitch, volume, rate]);

  const speech = useCallback(
    (text: string) => {
      if (typeof window === 'undefined') return;

      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.voice = currentVoice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;

      textLengthRef.current = text.length;

      utterance.onstart = () => {
        setState('playing');
        setProgressCharIndex(0);
      };

      utterance.onboundary = (event) => {
        if (textLengthRef.current > 0) {
          setProgressCharIndex(event.charIndex);
        }
      };

      utterance.onend = () => {
        setState('stopped');
        setProgressCharIndex(100);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setState('stopped');
        setProgressCharIndex(0);
      };

      if (utteranceRef.current) {
        synth.cancel();
      }

      utteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [currentVoice, pitch, rate, volume],
  );

  const play = useCallback(() => {
    const synth = window.speechSynthesis;

    if (state === 'paused' && utteranceRef.current) {
      synth.resume();
      setState('playing');
    }
  }, [state]);

  const pause = useCallback(() => {
    const synth = window.speechSynthesis;
    if (state === 'playing') {
      synth.pause();
      setState('paused');
    }
  }, [state]);

  const stop = useCallback(() => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setState('stopped');
    utteranceRef.current = null;
  }, []);

  return {
    state,
    voices,
    currentVoice,
    rate,
    pitch,
    volume,
    speech,
    play,
    pause,
    stop,
    setVoice,
    setPitch,
    setRate,
    setVolume,
    progress: Math.min((progressCharIndex / textLengthRef.current) * 100, 100),
    progressCharIndex,
  };
}
