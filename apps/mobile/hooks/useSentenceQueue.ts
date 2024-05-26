import * as Speech from 'expo-speech';
import { useRef } from 'react';

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
