"use strict"

import React, {useState, useEffect} from 'react';
import { StyleSheet, View, AppState } from 'react-native';

import StatusBar from '../../Component/StatusBar';
import Header from './Header.js';
import InputPlayerName from './InputPlayerName.js';
import PlayButton from './PlayButton.js';
import BottomPanel from './BottomPanel.js';

import storage from '../../Lib/storage.js';

export default function PageHome({ navigation }) {

  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    (async () => {
      const setting = await storage.setting.get();
      setPlayerName(setting.playerName || '');
    })();
  },[]);


  return (
    <View  style={styles.screen}>
      <StatusBar />
      <Header />

      <InputPlayerName playerName={playerName} onChangePlayerName={onChangePlayerName} />

      <PlayButton onClick={play}/>

      <BottomPanel openSetting={openSetting} openRecord={openRecord} />

    </View>
  );

  async function play() {
    await storePlayerName()
    navigation.navigate('games-list');
  }

  function onChangePlayerName(name) {
    setPlayerName(name);
  }

  async function storePlayerName() {
    const setting = await storage.setting.get();
    setting.playerName = playerName.trim();
    await storage.setting.put(setting);
  }

  function openSetting() {
    navigation.navigate('setting');
  }

  function openRecord() {
    navigation.navigate('record');
  }

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});