import { PressableProps } from 'react-native';

export type MainButtonProps = {
  onStart?: () => void;
  onStop?: () => void;
} & Pick<PressableProps, 'style' | 'onLongPress'>;
