import { useEffect } from 'react';

if (!process.env.EXPO_PUBLIC_API_URL) {
  throw new Error('Missing process.env.EXPO_PUBLIC_WS_URL');
}
export const ws = new WebSocket(`ws://${process.env.EXPO_PUBLIC_API_URL}/ws`);

export const useWebsocket = (onMessage: (event: MessageEvent<string>) => void) => {
  useEffect(() => {
    ws.onmessage = onMessage;

    return () => {
      ws.close();
    };
  }, []);
};
