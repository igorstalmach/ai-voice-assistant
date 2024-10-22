import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { View } from 'react-native';

import { Box } from '../Box';
import { styles } from './styles';
import { LoadingBoxProps } from './types';

export const LoadingBox = ({ color }: LoadingBoxProps) => {
  const animation = useRef<LottieView | null>(null);

  return (
    <Box color={color}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <LottieView
            ref={animation}
            loop
            autoPlay
            renderMode="AUTOMATIC"
            source={require('../../../assets/loading.json')}
          />
        </View>
      </View>
    </Box>
  );
};
