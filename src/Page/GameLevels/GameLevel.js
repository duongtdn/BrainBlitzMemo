"use strict"

import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../Component/Button';
import Colors from '../../Lib/colors';

export default function GameLevel({ level, onPress }) {

  return(
    <View style = {styles.container}>
      <Button
        background = {Colors[level.background]}
        color = {Colors[level.color]}
        fontSize = {18}
        fontFamily = 'Mali-Regular'
        onPress = {e => onPress(level)}
      >
        {level.title}
      </Button>
      <Text style = {styles.text}>
        {level.info}
      </Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  text: {
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'Mali-Italic',
  }
});
