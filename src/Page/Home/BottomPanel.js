"use strict"

import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../../Component/Button';
import Colors from '../../Lib/colors';

export default function BottomPanel({ openSetting, openRecord }) {
  return (
    <View style={styles.container}>
      <Button
          onPress = {openSetting}
          background = {Colors.LightGreen}
          width = {128}
        >
          Settings
        </Button>

        <Button
          onPress = {openRecord}
          background = {Colors.LightBlue}
          width = {128}
        >
          Records
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
