import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2c9dd1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2c9dd1',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});
