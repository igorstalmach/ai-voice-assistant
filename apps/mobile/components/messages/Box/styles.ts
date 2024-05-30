import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    margin: 8,
    width: '85%',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
});
