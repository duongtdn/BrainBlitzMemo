"use strict"

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native';

import StatusBar from '../../Component/StatusBar';

import games from '../../Game';

export default function PageGamePlayground({ route, navigation, sound }) {

  const { game, level } = route.params;

  const engines = useMemo(() => games.engines[game.name], []);

  const GameView = engines[level.engine]?.View

  return(
    <SafeAreaView style = {styles.screen}>
      <StatusBar />
      <GameView gameLevel = {level} sound = {sound} onComplete = {onComplete} />
    </SafeAreaView>
  );

  function onComplete(result) {
    console.log(result)
    // navigation.navigate('result', { game, level, result });
  }

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
