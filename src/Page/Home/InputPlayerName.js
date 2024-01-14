"use strict"

import React from 'react';

import { StyleSheet, View, TextInput } from 'react-native';

export default function InputPlayerName({ playerName, onChangePlayerName }) {
  return (
    <View style = {styles.container}>
      <TextInput
        style = {styles.inputName}
        onChangeText = {onChangeText}
        value = {playerName}
        placeholder = "Player's name"
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
    borderColor: '#919191',
    borderWidth: 1,
    borderRadius: 8,
  },
});
