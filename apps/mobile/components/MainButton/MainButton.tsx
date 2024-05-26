import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Pressable } from 'react-native';
import { MainButtonProps } from './types';

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
    <Pressable onPress={onPressHandler} {...props}>
      <LottieView
        ref={animation}
        style={{
          width: 300,
          height: 300,
          backgroundColor: 'transparent',
        }}
        loop
        renderMode="AUTOMATIC"
        source={require('../../assets/speaking-animation.json')}
      />
    </Pressable>
  );
};
