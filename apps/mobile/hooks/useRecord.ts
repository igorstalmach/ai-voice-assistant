import { Audio } from 'expo-av';
import { useState } from 'react';

export const useRecord = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const startRecording = async () => {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  };

  const stopRecording = async (): Promise<string> => {
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    // TODO: remove this console.log in the future
    if (!uri) {
      throw new Error('No uri');
    }

    return uri;
  };

  return { recording, startRecording, stopRecording };
};