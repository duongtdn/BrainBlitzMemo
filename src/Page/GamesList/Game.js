"use strict"

import React from 'react'
import { StyleSheet, View } from 'react-native';

import Button from '../../Component/Button';
import Colors from '../../Lib/colors';

export default function GameLevel({ game, onPress }) {

  return(
    <View style = {styles.container}>
      <Button
        background = {Colors[game.btnBackground]}
        color = {Colors[game.txtColor]}
        width = {240}
        fontSize = {20}
        fontFamily = 'Mali-Bold'
        onPress = {e => onPress(game)}
      >
        {game.title}
      </Button>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    width: '100%',
  },
});
