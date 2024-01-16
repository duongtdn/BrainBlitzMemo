"use strict"

import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GameRecordView from "./GameRecordView";
import TabBar from "./TabBar";

import storage from '../../Lib/storage';
import games from '../../Game';
import { Colors } from "react-native/Libraries/NewAppScreen";

const Tab = createMaterialTopTabNavigator();

export default function PageRecords() {

  const [records, setRecords] = useState();
  useEffect(() => {
    (async() => {
      const records = await storage.record.get();
      setRecords(records);
    })()
  }, []);

  if (!records) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <Tab.Navigator initialRouteName={`tab.${games.list[0]?.name}`} tabBar = {TabBar} >
      {
        games?.list?.map((game, index) => {
          return (
            <Tab.Screen name={`tab.${game?.name}`} key={game?.name}>
              { props => <GameRecordView game = {game} record = {records[game?.name]} {...props} /> }
            </Tab.Screen>
          );
        })
      }
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
});
