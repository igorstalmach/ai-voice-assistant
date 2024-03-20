import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { TouchableWithoutFeedbackProps, Pressable } from 'react-native';

type MainButtonProps = {
  onStart?: () => void;
  onStop?: () => void;
} & Pick<TouchableWithoutFeedbackProps, 'style' | 'onLongPress'>;

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
        source={require('../assets/speaking-animation.json')}
      />
    </Pressable>
  );
};
