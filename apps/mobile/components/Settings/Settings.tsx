import { SettingsIcon } from './SettingsIcon';
import { Pressable } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { SettingsModal } from './SettingsModal';

export const Settings = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <Pressable style={styles.container} onPress={() => setIsModalVisible(true)}>
        <SettingsIcon />
      </Pressable>
      {isModalVisible && <SettingsModal setIsModalVisible={setIsModalVisible} />}
    </>
  );
};
