import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 190, 224, 0.50)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '600',
  },
  button: {
    borderRadius: 16,
    padding: 10,
    elevation: 2,
    backgroundColor: '#3b61cc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '600',
  },
});
