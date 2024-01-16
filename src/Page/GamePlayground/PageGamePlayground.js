"use strict"

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';

import Colors from '../../Lib/colors.js';
import StatusBar from '../../Component/StatusBar';

import games from '../../Game';
import { useIsFocused } from '@react-navigation/native';

export default function PageGamePlayground({ route, navigation, sound }) {

  const { game, level } = route.params;

  const isFocused = useIsFocused();

  const engines = useMemo(() => games.engines[game.name], []);

  const GameView = useMemo(() => isFocused? engines[level.engine]?.View : null, [isFocused]);

  return(
    <SafeAreaView style = {styles.screen}>
      <StatusBar />
      {
        GameView && <GameView gameLevel = {level} sound = {sound} onComplete = {onComplete} />
      }
    </SafeAreaView>
  );

  function onComplete(result) {
    navigation.navigate('result', { game, level, result });
  }

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Background,
  },
});
