import { Text, View } from 'react-native';

import { MessageBoxProps } from './types';

export const MessageBox = ({ message, color, textColor }: MessageBoxProps) => {
  return (
    <View
      style={{
        backgroundColor: color,
        padding: 16,
        borderRadius: 6,
        margin: 8,
        width: '80%',
        minHeight: 100,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }}
    >
      <Text
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: 16,
          fontWeight: '600',
          color: textColor,
        }}
      >
        {message}
      </Text>
    </View>
  );
};
