"use strict"

import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function Button({ children, width, background = 'none', color = 'black', fontSize = 18, fontFamily = 'Mali-Regular', onPress }) {

  return(
    <TouchableOpacity
      style={[styles.button, { backgroundColor: background, width: width }]}
      onPress = {onPress}
    >
      <Text style={[{ color: color,  fontSize: fontSize, fontFamily: fontFamily }]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 6,
    paddingTop: 6,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 8,
  },
});

