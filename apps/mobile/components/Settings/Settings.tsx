import { useState } from 'react';
import { Pressable } from 'react-native';

import { SettingsIcon } from './SettingsIcon';
import { SettingsModal } from './SettingsModal';
import { styles } from './styles';
import { SettingsProps } from './types';

export const Settings = ({ selectedOption, setSelectedOption }: SettingsProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <Pressable style={styles.container} onPress={() => setIsModalVisible(true)}>
        <SettingsIcon />
      </Pressable>
      {isModalVisible && (
        <SettingsModal
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
};
