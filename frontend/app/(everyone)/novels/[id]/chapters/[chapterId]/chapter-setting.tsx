'use client';

import { useTts } from '@/hook/use-tts';

export default function ChapterSetting() {
  const { currentVoice, voices, setVoice, setRate, setPitch, setVolume, rate, pitch, volume } = useTts();

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Voice</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={currentVoice?.name} onChange={(event) => setVoice(voices.find((v) => v.name === event.target.value)?.name ?? voices[0].name)}>
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Pitch</label>
        <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(event) => setPitch(event.currentTarget.valueAsNumber)} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0.5x</span>
          <span>2x</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Speed</label>
        <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(event) => setRate(event.currentTarget.valueAsNumber)} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0.5x</span>
          <span>2x</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Volume</label>
        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(event) => setVolume(event.currentTarget.valueAsNumber)} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
