import * as FileSystem from 'expo-file-system';

export const sendFile = (uri: string) =>
  FileSystem.uploadAsync(`http://${process.env.EXPO_PUBLIC_API_URL}/speech`, uri, {
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'file',
    httpMethod: 'POST',
    headers: {
      'Content-Type': 'audio/m4a',
    },
  });
