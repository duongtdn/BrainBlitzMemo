"use strict"

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Expression({ expr }) {
  if (!expr || expr.length === 0) { return null; }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{expr.quiz.replace('*', 'x').replace('/','÷')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  text: {
    fontFamily: 'Mali-SemiBold',
    fontSize: 48,
  }
});