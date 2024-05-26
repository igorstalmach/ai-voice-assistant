import { useSentenceQueue } from '../../../hooks/cross/useSentenceQueue';
import { useRecord } from '../../../hooks/web/useRecord';
import { useWebSocket, ws } from '../../../hooks/cross/useWebSocket';
import { sendAudioFile } from '../../../api/sendAudioFile/web/sendAudioFile';
import { MainButton } from '../../cross/MainButton';
import * as Speech from 'expo-speech';
import Toast from 'react-native-toast-message';

export const WebAssistant = () => {
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

    const transcription = await sendAudioFile(uri);

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
