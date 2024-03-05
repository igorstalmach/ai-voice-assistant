import { useEffect, useState } from 'react';
import { Button, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
    gap: 16,
  },
});

const inwokacja = `Litwo, Ojczyzno moja! ty jesteś jak zdrowie;
Ile cię trzeba cenić, ten tylko się dowie,
Kto cię stracił. Dziś piękność twą w całej ozdobie
Widzę i opisuję, bo tęsknię po tobie.`;

export default function RootLayout() {
  const [text, setText] = useState(inwokacja);

  // https://docs.expo.dev/versions/latest/sdk/localization/
  const plVoices = [
    'pl-pl-x-oda-local',
    'pl-pl-x-bmg-local',
    'pl-pl-x-oda-network',
    'pl-pl-x-afb-network',
    'pl-pl-x-zfg-network',
    'pl-pl-x-jmk-network',
    'pl-pl-x-bmg-network',
    'pl-pl-x-zfg-local',
    'pl-pl-x-jmk-local',
    'pl-pl-x-afb-local',
    'pl-PL-language',
  ];

  const speakNext = (index: number = 0) => {
    const voiceIdx = Math.floor(Math.random() * plVoices.length);
    Speech.speak(inwokacja.split(' ')[index], {
      language: 'pl', // TODO: maybe add localization
      rate: 1,
      voice: plVoices[voiceIdx],
      onDone: () => speakNext(index + 1),
    });
  };

  useEffect(() => {
    (async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      const identifiers = voices.filter((v) => v.language === 'pl-PL').map((v) => v.identifier);
      console.log(identifiers);
    })();
  }, []);

  const onTTS = () => {
    speakNext();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Input: {text}</Text>
      <TextInput
        placeholder="Type here to translate!"
        value={text}
        onChangeText={(e) => setText(e)}
      />
      <Button title="DUPA" onPress={onTTS} />
      <Button title="Stop" onPress={() => Speech.stop()} />
    </SafeAreaView>
  );
}
