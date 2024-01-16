"use strict"

import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function TabBar({ state }) {
  return (
    <View style={styles.tabBar}>
      {
        state.routes.map((route, index) => {
          const isFocus = state.index === index;
          return (
            <View key={route.key} style={[styles.tabBarIndicator, { backgroundColor: isFocus? 'tomato': '#d1d1d1' }]} />
          );
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  tabBarIndicator: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#d1d1d1',
    margin: 2,
  },
});
