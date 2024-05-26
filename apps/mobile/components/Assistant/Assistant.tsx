import { useSentenceQueue } from '../../hooks/useSentenceQueue';
import { useRecord } from '../../hooks/useRecord';
import { useWebSocket, ws } from '../../hooks/useWebSocket';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { sendAudioFile as sendAudioFileWeb } from '../../api/sendAudioFile/web/sendAudioFile';
import { sendAudioFile as sendAudioFileMobile } from '../../api/sendAudioFile/mobile/sendAudioFile';
import * as Speech from 'expo-speech';
import { MainButton } from '../MainButton';

export const Assistant = () => {
  const { addSentence } = useSentenceQueue();
  const { stopRecording, startRecording } = useRecord();

  useWebSocket((event) => {
    addSentence(event.data);
  });

  const onStopRecording = async () => {
    const uri = await stopRecording();

    if (!uri) {
      Toast.show({
        type: 'error',
        text1: 'Recording failed',
        text2: 'Failed to save the recording',
      });
      return;
    }

    let transcription;

    if (Platform.OS === 'web') {
      transcription = await sendAudioFileWeb(uri);
    } else {
      transcription = await sendAudioFileMobile(uri);
    }

    if (!transcription) {
      Toast.show({
        type: 'error',
        text1: 'Unable to process the request',
        text2: 'Transcription failed. Please try again.',
      });
      return;
    }

    ws.send(transcription);
  };

  return (
    <MainButton
      onStart={startRecording}
      onStop={onStopRecording}
      onLongPress={() => Speech.stop()}
    />
  );
};
