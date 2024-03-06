import { useEffect } from 'react';

if (!process.env.EXPO_PUBLIC_API_URL) {
  throw new Error('Missing process.env.EXPO_PUBLIC_WS_URL');
}
export const ws = new WebSocket(`ws://${process.env.EXPO_PUBLIC_API_URL}/ws`);

export const useWebsocket = () => {
  useEffect(() => {
    ws.onmessage = (event) => {
      console.log(event.data);
    };

    return () => {
      ws.close();
    };
  }, []);
};
