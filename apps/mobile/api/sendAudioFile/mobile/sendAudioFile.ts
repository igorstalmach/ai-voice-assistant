import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';

export const sendAudioFile = async (uri: string): Promise<string | undefined> => {
  try {
    const response = await FileSystem.uploadAsync(
      `http://${process.env.EXPO_PUBLIC_API_URL}/transcribe`,
      uri,
      {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        httpMethod: 'POST',
        headers: {
          'Content-Type': 'audio/m4a',
        },
      }
    );

    return JSON.parse(response.body).transcription;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Unable to process the request',
      text2: 'Transcription failed. Please try again.',
    });
    console.error(error);
  }
};
