import React, { useState, useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as Font from 'expo-font';
import { Audio } from 'expo-av';

import storage from './Lib/storage';

const Stack = createNativeStackNavigator();

import PageHome from './Page/Home';
import PageGamesList from './Page/GamesList';
import PageGameLevels from './Page/GameLevels';
import PageGamePlayground from './Page/GamePlayground';
import PageResult from './Page/Result';
import PageSettings from './Page/Settings';
import PageRecords from './Page/Records';

export default function App() {

  const [isReady, setIsReady] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    isReady === false && fetchAssets();
  }, []);


  if (isReady === false) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name = "home" component = {PageHome} />
        <Stack.Screen name = "games-list" component = {PageGamesList} options = {{ headerShown: true, title: 'Select Game'}} />
        <Stack.Screen name = "game-levels" component = {PageGameLevels} options = {{ headerShown: true, title: 'Select Level'}} />
        <Stack.Screen name = "game-playground">
          { props => <PageGamePlayground sound = {sound} {...props} /> }
        </Stack.Screen>
        <Stack.Screen name = "result" component = {PageResult} />
        <Stack.Screen name="settings" options={{ headerShown: true, title: 'Settings'}}>
          {props => <PageSettings onSettingChange={onSettingChange} {...props} />}
        </Stack.Screen>
        <Stack.Screen name = "records" component = {PageRecords} options = {{ headerShown: true, title: 'Best Records'}} />
      </Stack.Navigator>
    </NavigationContainer>
);

  async function fetchAssets() {
    await loadFont();
    const sound = await loadSound();
    setSound(sound);
    setIsReady(true);
  }

  async function loadFont() {
    return Font.loadAsync({
      'Mali-Bold': require('../assets/Font/Mali/Mali-Bold.ttf'),
      'Mali-BoldItalic': require('../assets/Font/Mali/Mali-BoldItalic.ttf'),
      'Mali-ExtraLight': require('../assets/Font/Mali/Mali-ExtraLight.ttf'),
      'Mali-ExtraLightItalic': require('../assets/Font/Mali/Mali-ExtraLightItalic.ttf'),
      'Mali-Italic': require('../assets/Font/Mali/Mali-Italic.ttf'),
      'Mali-Light': require('../assets/Font/Mali/Mali-Light.ttf'),
      'Mali-LightItalic': require('../assets/Font/Mali/Mali-LightItalic.ttf'),
      'Mali-Medium': require('../assets/Font/Mali/Mali-Medium.ttf'),
      'Mali-MediumItalic': require('../assets/Font/Mali/Mali-MediumItalic.ttf'),
      'Mali-Regular': require('../assets/Font/Mali/Mali-Regular.ttf'),
      'Mali-SemiBold': require('../assets/Font/Mali/Mali-SemiBold.ttf'),
      'Mali-SemiBoldItalic': require('../assets/Font/Mali/Mali-SemiBoldItalic.ttf'),
    });
  }

  async function loadSound() {
    const __setting = await storage.setting.get();
    const sound = {
      correct: new Audio.Sound(),
      wrong: new Audio.Sound(),
      music: new Audio.Sound(),
    };
    try {
      await sound.correct.loadAsync(require('../assets/Sound/correct.wav'), { volume: __setting.sound.effect });
      await sound.wrong.loadAsync(require('../assets/Sound/wrong.wav'), { volume: __setting.sound.effect });
      await sound.music.loadAsync(require('../assets/Sound/schooldays.mp3'), { isLooping: true, shouldPlay: true, volume: __setting.sound.music });
    } catch (err) {
      console.log(err)
    }
    return sound;
  }

  function onSettingChange(setting) {
    return function(obj) {
      return async function(value) {
        if (setting === 'sound') {
          if (obj === 'music') {
            await sound.music.setVolumeAsync(value);
          } else {
            await sound.correct.setVolumeAsync(value);
            await sound.wrong.setVolumeAsync(value);
          }
          // save setting
          const newSetting = await storage.setting.get();
          newSetting.sound[obj] = value;
          await storage.setting.put(newSetting);
          return;
        }
      }
    }
  }

}
