import React from 'react';
import { Text } from 'react-native';

import { MessageBoxProps } from './types';
import { Box } from '../Box';

export const MessageBox = ({
  message,
  color,
  textColor,
  textAlignment = 'left',
}: MessageBoxProps) => {
  return (
    <Box color={color}>
      <Text
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: 16,
          fontWeight: '600',
          color: textColor,
          textAlign: textAlignment,
        }}
      >
        {message}
      </Text>
    </Box>
  );
};
