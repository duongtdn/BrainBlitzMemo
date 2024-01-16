"use strict"

import React from 'react'
import { StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';

import Colors from '../../Lib/colors.js';
import GameLevel from './GameLevel';

export default function PageGameLevels({ route, navigation }) {

  const { game } = route.params;

  return(
    <SafeAreaView style = {styles.screen}>
      <Text style = {styles.text} >What challenge ?</Text>
      <FlatList
        data = {game.levels}
        renderItem={({item}) => <GameLevel level = {item} onPress = {onSelectGameLevel} />}
      />
    </SafeAreaView>
  );

  function onSelectGameLevel(level) {
    navigation.navigate('game-playground', { game, level });
  }

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Background,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Mali-Bold',
    marginTop: 32,
    color: Colors.LightGray
  }
});
