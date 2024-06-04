import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { RadioButtonsProps } from './types';

export const RadioButtons = ({ options, selectedOption, onSelect }: RadioButtonsProps) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioContainer}
          onPress={() => onSelect(option)}
        >
          <View style={styles.radioCircle}>
            {selectedOption === option && <View style={styles.selectedRadioButton} />}
          </View>
          <Text style={styles.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
