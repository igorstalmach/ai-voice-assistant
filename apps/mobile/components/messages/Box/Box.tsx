import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { BoxProps } from './types';

export const Box = ({ children, color }: BoxProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[color, 'rgba(255, 255, 255, 0.3)']}
        start={[0.5, 0]}
        end={[0.5, 1]}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
};
