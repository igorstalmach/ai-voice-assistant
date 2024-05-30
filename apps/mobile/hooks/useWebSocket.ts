import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

if (!process.env.EXPO_PUBLIC_API_URL) {
  Toast.show({
    type: 'error',
    text1: 'Missing environment variable',
    text2: 'API URL is not set',
  });
}

export let ws: WebSocket;

try {
  ws = new WebSocket(`ws://${process.env.EXPO_PUBLIC_API_URL}/ws`);
} catch {
  Toast.show({
    type: 'error',
    text1: 'Unable to connect to the server',
    text2: 'Connection failed',
  });
}

export const useWebSocket = (onMessage: (event: MessageEvent<string>) => void) => {
  useEffect(() => {
    ws.onmessage = onMessage;

    ws.onerror = () => {
      Toast.show({
        type: 'error',
        text1: 'Connection error',
        text2: 'Unable to process request. Please try again later.',
      });
    };

    ws.onclose = () => {
      Toast.show({
        type: 'error',
        text1: 'Connection error',
        text2: 'Unable to process request. Please try again later.',
      });
    };

    return () => {
      ws.close();
    };
  }, []);
};
