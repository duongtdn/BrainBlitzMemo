"use strict"

import React from 'react';

import { View } from 'react-native';

import Constants from 'expo-constants';

export default function StatusBar(props) {

  return (
    <View style={{paddingTop: Constants.statusBarHeight, backgroundColor: 'none'}} >
    </View>
  )
}
