import { Audio } from 'expo-av';
import { useState } from 'react';

export const useRecord = () => {
  const [recording, setRecording] = useState<Audio.Recording>();
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

  const stopRecording = async (): Promise<string | undefined> => {
    if (!recording) {
      return;
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    if (!uri) {
      return;
    }

    setRecording(undefined);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    return uri;
  };

  return { startRecording, stopRecording };
};
