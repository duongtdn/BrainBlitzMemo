"use strict"

import React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import Colors from '../../Lib/colors';

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Image
        style = {styles.img}
        source = {require('../../../assets/mmq.png')}
      />
      <View style={styles.logo}>
        <Text style={[styles.logoText, styles.textLightBlue]}>Math </Text>
        <Text style={[styles.logoText, styles.textPaleRed]}>Mad </Text>
        <Text style={[styles.logoText, styles.textLightGray]}>Quick</Text>
      </View>
      <Text style={styles.slogan}> Simple Math &hearts; Strengthen Brains &hearts; Do it quick </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 48,
    marginBottom: 32,
    alignItems: 'center',
  },
  img: {
    width: 180,
    height: 180,
    marginBottom: 32,
  },
  logo: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Mali-Bold',
    fontSize: 40,
    lineHeight: 56,
  },
  slogan: {
    fontFamily: 'Mali-Regular',
    fontSize: 12,
    color: Colors.Sand,
  },
  textLightBlue: {
    color: Colors.LightBlue,
  },
  textPaleRed: {
    color: Colors.PaleRed,
  },
  textLightGray: {
    color: Colors.LightGray,
  },
});
