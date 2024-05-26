import Toast from 'react-native-toast-message';

export const sendAudioFile = async (uri: string): Promise<string | undefined> => {
  try {
    const recording = await fetch(uri);
    const blob = await recording.blob();
    const formData = new FormData();
    formData.append('file', blob, 'recording.m4a');

    return await fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/transcribe`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => data.transcription);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Unable to process the request',
      text2: 'Transcription failed. Please try again.',
    });
    console.error(error);
  }
};
