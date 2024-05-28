import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { sendAudioFile as sendAudioFileMobile } from '../../api/sendAudioFile/mobile/sendAudioFile';
import { sendAudioFile as sendAudioFileWeb } from '../../api/sendAudioFile/web/sendAudioFile';
import { useRecord } from '../../hooks/useRecord';
import { useSentenceQueue } from '../../hooks/useSentenceQueue';
import { useWebSocket, ws } from '../../hooks/useWebSocket';
import { LoadingBox } from '../messages/LoadingBox/LoadingBox';
import { MainButton } from '../MainButton';
import { MessageBox } from '../messages/MessageBox';
import { styles } from './styles';

export const Assistant = () => {
  const { addSentence } = useSentenceQueue();
  const { stopRecording, startRecording } = useRecord();

  const [isTranscriptionLoading, setIsTranscriptionLoading] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>('');
  const [isAnswerLoading, setIsAnswerLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  useWebSocket((event) => {
    setIsAnswerLoading(false);
    addSentence(event.data);
    setAnswer(answer + event.data);
  });

  const onStopRecording = async () => {
    const uri = await stopRecording();

    setTranscription('');
    setAnswer('');
    setIsTranscriptionLoading(true);

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
      setIsTranscriptionLoading(false);
      return;
    }

    setIsTranscriptionLoading(false);
    setTranscription(transcription);

    setIsAnswerLoading(true);
    ws.send(JSON.stringify({ model: 'openchat', transcription: transcription }));
  };

  return (
    <>
      <View style={styles.container}>
        {isTranscriptionLoading ? (
          <LoadingBox color="#a8dde7" />
        ) : (
          transcription && (
            <MessageBox
              message={transcription}
              color="#a8dde7"
              textColor="#113441"
              textAlignment="right"
            />
          )
        )}
        {isAnswerLoading ? (
          <LoadingBox color="#7dc0de" />
        ) : (
          answer && <MessageBox message={answer} color="#7dc0de" textColor="#003545" />
        )}
      </View>
      <MainButton
        onStart={startRecording}
        onStop={onStopRecording}
        onLongPress={() => Speech.stop()}
      />
    </>
  );
};
