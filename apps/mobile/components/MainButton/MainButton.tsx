import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Pressable, View } from 'react-native';

import { MainButtonProps } from './types';
import { styles } from './styles';

export const MainButton = ({ onStart, onStop, ...props }: MainButtonProps) => {
  const animation = useRef<LottieView | null>(null);
  const isPressed = useRef(false);

  const onPressHandler = () => {
    if (isPressed.current) {
      animation.current?.reset();
      isPressed.current = false;
      onStop?.();
      return;
    }

    animation.current?.play(0, 70);
    isPressed.current = true;
    onStart?.();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressHandler} style={styles.button} {...props}>
        <LottieView
          ref={animation}
          loop
          renderMode="AUTOMATIC"
          source={require('../../assets/recording.json')}
        />
      </Pressable>
    </View>
  );
};
