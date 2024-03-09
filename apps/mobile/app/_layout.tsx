// import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useRef } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';

import { MainButton } from '../components';
import { sendFile } from '../hooks/useFetch';
import { useRecord } from '../hooks/useRecord';
import { useWebsocket, ws } from '../hooks/useWebsocket';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
    gap: 16,
    padding: 'auto',
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
  // https://docs.expo.dev/versions/latest/sdk/localization/
  // const plVoices = [
  //   'pl-pl-x-oda-local',
  //   'pl-pl-x-bmg-local',
  //   'pl-pl-x-oda-network',
  //   'pl-pl-x-afb-network',
  //   'pl-pl-x-zfg-network',
  //   'pl-pl-x-jmk-network',
  //   'pl-pl-x-bmg-network',
  //   'pl-pl-x-zfg-local',
  //   'pl-pl-x-jmk-local',
  //   'pl-pl-x-afb-local',
  //   'pl-PL-language',
  // ];

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

  const onStop = () => {
    Speech.stop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainButton onStart={startRecording} onStop={onStopRecording} />
      <Button title="Stop" onPress={onStop} />
    </SafeAreaView>
  );
}
