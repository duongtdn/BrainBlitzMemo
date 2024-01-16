"use strict"

import React from 'react';

import { StyleSheet, View, TextInput } from 'react-native';
import Colors from '../../Lib/colors';

export default function InputPlayerName({ playerName, onChangePlayerName }) {
  return (
    <View style = {styles.container}>
      <TextInput
        style = {styles.inputName}
        onChangeText = {onChangeText}
        value = {playerName}
        placeholder = "Player's name"
        placeholderTextColor = {Colors.Gray}
        autoCapitalize = 'words'
        maxLength = {19}
      />
    </View>
  );
  function onChangeText(text) {
    onChangePlayerName(text);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  inputName: {
    fontFamily: 'Mali-Medium',
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
    width: 280,
    height: 50,
    borderStyle: 'solid',
    borderColor: Colors.LightGray,
    borderWidth: 1,
    borderRadius: 8,
    color: Colors.Sand,
  },
});
