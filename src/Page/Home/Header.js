"use strict"

import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

export default function Header(props) {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={[styles.logoText, styles.textBlue]}> Math Mad </Text>
        <Text style={[styles.logoText, styles.textBlack]}> Quick </Text>
      </View>
      <Text style={styles.slogan}> Simple Math &hearts; Strengthen Brains &hearts; Do it quick </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Mali-Bold',
    fontSize: 48,
    lineHeight: 56,
  },
  slogan: {
    fontFamily: 'Mali-Regular',
    fontSize: 12,
  },
  textBlue: {
    color: '#2196F3',
  },
  textBlack: {
    color: '#000',
  },
});
