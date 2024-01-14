"use strict"

import React from 'react';

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function PlayButton({ onClick }) {
  return (
    <View style = {styles.playButtonWrapper}>
      <TouchableOpacity
        style = {styles.playButton}
        onPress = {onClick}
      >
        <Text style = {styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playButtonWrapper: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#2196F3',
    paddingLeft: 48,
    paddingRight: 48,
    paddingBottom: 8,
    borderRadius: 32,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 8,
  },
  playButtonText: {
    fontFamily: 'Mali-Bold',
    fontSize: 24,
    color: '#fff',
  },
});
