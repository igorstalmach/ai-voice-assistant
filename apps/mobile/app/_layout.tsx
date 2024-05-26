import { SafeAreaView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { Assistant } from '../components/Assistant';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Assistant />
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2f3f5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
