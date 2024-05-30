import * as Speech from 'expo-speech';
import { useRef } from 'react';
import { Platform } from 'react-native';

export const useSentenceQueue = () => {
  const sentence = useRef<string>('');

  const addSentence = (text: string) => {
    sentence.current += text;

    if (!text.includes('.')) return;

    if (Platform.OS === 'web') {
      Speech.speak(sentence.current, {
        language: 'pl',
        rate: 1,
        voice: 'Google polski',
      });
    } else {
      Speech.speak(sentence.current, {
        language: 'pl',
        rate: 1,
        voice: 'pl-pl-x-oda-local',
      });
    }
  };

  const clearSentence = () => {
    sentence.current = '';
  };

  return { addSentence, clearSentence };
};
