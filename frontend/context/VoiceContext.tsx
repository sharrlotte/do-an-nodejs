'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';

type TTSVoice = SpeechSynthesisVoice;

type VoiceContextType = {
  voices: TTSVoice[];
  currentVoice: TTSVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  setVoice: (value: string) => void;
  setPitch: (value: number) => void;
  setRate: (value: number) => void;
  setVolume: (value: number) => void;
};

const defaultContextValue: VoiceContextType = {
  voices: [],
  currentVoice: null,
  rate: 1,
  pitch: 1,
  volume: 1,
  setVoice: () => {},
  setPitch: () => {},
  setRate: () => {},
  setVolume: () => {},
};

export const VoiceContext = React.createContext<VoiceContextType>(defaultContextValue);

export function useVoiceContext(): VoiceContextType {
  const context = React.useContext(VoiceContext);

  if (!context) {
    throw new Error('useVoiceContext must be used within a VoiceProvider');
  }

  return context;
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voices, setVoices] = useState<TTSVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<TTSVoice | null>(null);
  const [pitch, setPitch] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('pitch')) || 1;
    }
    return 1;
  });
  const [rate, setRate] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('rate')) || 1;
    }
    return 1;
  });
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('volume')) || 1;
    }
    return 1;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        const storedVoice = localStorage.getItem('voice');
        if (storedVoice) {
          const selectedVoice = availableVoices.find((v) => v.name === storedVoice);
          if (selectedVoice) {
            setCurrentVoice(selectedVoice);
            return;
          }
        }
        setCurrentVoice(availableVoices[0]);
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const setVoice = useCallback(
    (value: string) => {
      const selectedVoice = voices.find((v) => v.name === value);
      if (selectedVoice) {
        localStorage.setItem('voice', value);
        setCurrentVoice(selectedVoice);
      }
    },
    [voices],
  );

  const handleSetPitch = useCallback((value: number) => {
    localStorage.setItem('pitch', value.toString());
    setPitch(value);
  }, []);

  const handleSetRate = useCallback((value: number) => {
    localStorage.setItem('rate', value.toString());
    setRate(value);
  }, []);

  const handleSetVolume = useCallback((value: number) => {
    localStorage.setItem('volume', value.toString());
    setVolume(value);
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        voices,
        currentVoice,
        rate,
        pitch,
        volume,
        setVoice,
        setPitch: handleSetPitch,
        setRate: handleSetRate,
        setVolume: handleSetVolume,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}
