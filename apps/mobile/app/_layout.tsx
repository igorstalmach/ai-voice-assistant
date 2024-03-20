import * as Speech from 'expo-speech';
import { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { MainButton } from '../components';
import { sendFile } from '../hooks/useFetch';
import { useRecord } from '../hooks/useRecord';
import { useWebsocket, ws } from '../hooks/useWebsocket';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 16,
  },
});

const useSentenceQueue = () => {
  const sentence = useRef<string>('');

  const add = (text: string) => {
    sentence.current += text;

    if (!text.includes('.')) return;

    Speech.speak(sentence.current, {
      language: 'pl', // TODO: maybe add localization
      rate: 1,
      voice: 'pl-pl-x-oda-local',
    });
    sentence.current = '';
  };

  return { add };
};

export default function RootLayout() {
  const { add } = useSentenceQueue();

  useWebsocket((event) => {
    add(event.data);
  });

  const { stopRecording, startRecording } = useRecord();

  const onStopRecording = async () => {
    const uri = await stopRecording();
    const res = await sendFile(uri);

    const transcription = JSON.parse(res.body).transcription;
    ws.send(transcription);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainButton
        onStart={startRecording}
        onStop={onStopRecording}
        // TODO: probably change this as it's bad UX
        onLongPress={() => Speech.stop()}
      />
    </SafeAreaView>
  );
}
