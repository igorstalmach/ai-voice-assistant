import { useEffect, useRef, useState } from 'react';

export const useRecord = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioURL = useRef<string | null>(null);
  const mediaChunks = useRef<Blob[]>([]);
  const resolveRef = useRef<(value: string) => void>();

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mediaChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(mediaChunks.current, { type: 'audio/m4a' });
        audioURL.current = URL.createObjectURL(blob);
        mediaChunks.current = [];

        if (resolveRef.current) {
          resolveRef.current(audioURL.current);
        }
      };
    }
  }, [mediaRecorder]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    setMediaRecorder(recorder);
    recorder.start();
  };

  const stopRecording = async (): Promise<string | undefined> => {
    if (!mediaRecorder) {
      return;
    }

    mediaRecorder.stop();

    return new Promise((resolve) => {
      resolveRef.current = resolve;
      mediaRecorder.stop();
    });
  };

  return { startRecording, stopRecording };
};
