"use strict"

import React from 'react'
import { StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';

import Colors from '../../Lib/colors.js';
import Game from './Game';

import games from '../../Game';

export default function PageGamesList({ navigation }) {

  return(
    <SafeAreaView style = {styles.screen}>
      <Text style = {styles.text}>What game you wanna play?</Text>
      <FlatList
        data = {games.list}
        renderItem={({item}) => <Game game = {item} onPress = {onSelectGame} />}
      />
    </SafeAreaView>
  );

  function onSelectGame(game) {
    navigation.navigate('game-levels', { game });
  }

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Background,
  },
  text: {
    fontSize: 24,
    fontFamily: 'Mali-Bold',
    marginTop: 32,
    color: Colors.LightGray,
  }
});
