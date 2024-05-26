import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { sendAudioFile as sendAudioFileMobile } from '../../api/sendAudioFile/mobile/sendAudioFile';
import { sendAudioFile as sendAudioFileWeb } from '../../api/sendAudioFile/web/sendAudioFile';
import { useRecord } from '../../hooks/useRecord';
import { useSentenceQueue } from '../../hooks/useSentenceQueue';
import { useWebSocket, ws } from '../../hooks/useWebSocket';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { MainButton } from '../MainButton';
import { MessageBox } from '../MessageBox';

export const Assistant = () => {
  const { addSentence } = useSentenceQueue();
  const { stopRecording, startRecording } = useRecord();

  const [isTranscriptionLoading, setIsTranscriptionLoading] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>();
  const [isAnswerLoading, setIsAnswerLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>();

  useWebSocket((event) => {
    setIsAnswerLoading(false);
    addSentence(event.data);
    setAnswer(answer + event.data);
  });

  const onStopRecording = async () => {
    const uri = await stopRecording();

    setTranscription(undefined);
    setAnswer(undefined);
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
    ws.send(transcription);
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          rowGap: 8,
          paddingTop: 40,
        }}
      >
        {isTranscriptionLoading ? (
          <LoadingBox color="#aaccdb" />
        ) : (
          transcription && (
            <MessageBox message={transcription} color="#aaccdb" textColor="#113441" />
          )
        )}
        {isAnswerLoading ? (
          <LoadingBox color="#74d2f7" />
        ) : (
          answer && <MessageBox message={answer} color="#74d2f7" textColor="#003545" />
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
