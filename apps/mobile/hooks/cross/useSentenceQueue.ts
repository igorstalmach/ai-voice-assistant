import { useRef } from 'react';
import * as Speech from 'expo-speech';

export const useSentenceQueue = () => {
  const sentence = useRef<string>('');

  const addSentence = (text: string) => {
    sentence.current += text;

    // if (!text.includes('.')) return;

    Speech.speak(sentence.current, {
      language: 'pl',
      rate: 1,
      voice: 'pl-pl-x-oda-local',
    });
    sentence.current = '';
  };

  return { addSentence };
};
