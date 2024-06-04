import * as Speech from 'expo-speech';
import { useRef } from 'react';
import { Platform } from 'react-native';

export const useSentenceQueue = () => {
  const sentenceQueue = useRef<string[]>([]);
  const isSpeaking = useRef<boolean>(false);
  const buffer = useRef<string>('');

  const addSentence = (text: string) => {
    buffer.current += text;

    let delimiter;
    while ((delimiter = buffer.current.match(/[.]/)) !== null) {
      const index = delimiter.index!;
      const sentence = buffer.current.slice(0, index + 1);
      buffer.current = buffer.current.slice(index + 1).trim();
      sentenceQueue.current.push(sentence.trim());
    }

    if (!isSpeaking.current) {
      speakNextSentence();
    }
  };

  const speakNextSentence = () => {
    if (sentenceQueue.current.length === 0) {
      isSpeaking.current = false;
      return;
    }

    isSpeaking.current = true;
    const nextSentence = sentenceQueue.current.shift()!;

    Speech.speak(nextSentence, {
      language: 'pl',
      rate: 1,
      voice: Platform.OS === 'web' ? 'Google polski' : 'pl-pl-x-oda-local',
      onDone: () => {
        speakNextSentence();
      },
      onError: () => {
        speakNextSentence();
      },
    });
  };

  const clearSentence = () => {
    buffer.current = '';
    sentenceQueue.current = [];
    isSpeaking.current = false;
  };

  return { addSentence, clearSentence };
};
