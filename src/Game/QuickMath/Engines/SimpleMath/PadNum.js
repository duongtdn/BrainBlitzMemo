"use strict"

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import Colors from '../../../../Lib/colors';

export default function PadNum({ num, onPress }) {
  return(
    <TouchableOpacity style={styles.padButton} onPress={e => onPress(num)}>
      <Text style={styles.padNumText}>{num}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  padButton: {
    borderRadius: 32,
    justifyContent: 'center',
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: Colors.LightBlue,
    margin: 4,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 8,
    flex: 1
  },
  padNumText: {
    fontFamily: 'Mali-Bold',
    fontSize: 38,
    color: Colors.Black,
  }
});
