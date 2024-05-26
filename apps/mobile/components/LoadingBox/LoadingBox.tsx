import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { View } from 'react-native';

import { LoadingBoxProps } from './types';

export const LoadingBox = ({ color }: LoadingBoxProps) => {
  const animation = useRef<LottieView | null>(null);

  return (
    <View
      style={{
        backgroundColor: color,
        padding: 16,
        borderRadius: 6,
        margin: 8,
        width: '80%',
        height: 100,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'scale(0.4)',
        }}
      >
        <LottieView
          ref={animation}
          loop
          autoPlay
          renderMode="AUTOMATIC"
          source={require('../../assets/loading.json')}
        />
      </View>
    </View>
  );
};
