import { Platform, SafeAreaView, StyleSheet } from 'react-native';

import Toast from 'react-native-toast-message';
import { WebAssistant } from '../components/web/WebAssistant/WebAssistant';
import { MobileAssistant } from '../components/mobile/MobileAssistant/MobileAssistant';

export default function RootLayout() {
  const getAssistant = () => {
    if (Platform.OS === 'web') {
      return <WebAssistant />;
    } else {
      return <MobileAssistant />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {getAssistant()}
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
