import { Modal, Pressable, Text, View } from 'react-native';

import { styles } from './styles';
import { availableModels } from '../../../types/models';
import { RadioButtons } from '../RadioButtons';
import { SettingsModalProps } from './types';

export const SettingsModal = ({
  selectedOption,
  setSelectedOption,
  setIsModalVisible,
}: SettingsModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible
      onRequestClose={() => {
        setIsModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleText}>Currently used LLM</Text>
          <RadioButtons
            options={availableModels}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
          <Pressable style={styles.button} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
