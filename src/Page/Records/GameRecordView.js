"use string"

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { formatDate, formatTime } from '../../Lib/date';
import Colors from '../../Lib/colors';

export default function GameRecordView({ game, record }) {
console.log(record)
  return (
    <ScrollView style = {styles.container}>

      <View style = {styles.heading}>
        <Text style = {styles.gameTitle}>{game?.title}</Text>
        <Text style = {[styles.p,s]}>Best Records</Text>
      </View>
      {
        game?.levels.map(level => (
          <View style = {styles.gameLevelBox} key = {level.id}>
            <Text style = {[styles.gameLevelText, styles.title]}>{level.title}</Text>
            {
              record[level.id] ?
                <View style = {styles.record}>
                  <Text style = {styles.date}>{formatDate(record[level.id].ts)} :</Text>
                  <Text style = {styles.bestRecord}>{formatTime(record[level.id].best, { long: true })}</Text>
                </View>
              :
                <Text style = {styles.italic}>There is no best record yet</Text>
            }
          </View>
        ))
      }

    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {},
  heading: {
    alignItems: 'center',
  },
  title: {
    backgroundColor: Colors.Orange,
    paddingLeft: 16,
    paddingRight: 16,
  },
  p: {
    fontFamily: 'Mali-Regular',
    fontSize: 18,
  },
  italic: {
    fontFamily: 'Mali-Italic',
    fontSize: 18,
  },
  gameTitle: {
    fontFamily: 'Mali-Bold',
    fontSize: 32,
  },
  gameLevelBox: {
    fontFamily: 'Mali-Italic',
    fontSize: 24,
    marginTop: 32,
    alignItems: 'center',
  },
  gameLevelText: {
    fontFamily: 'Mali-Regular',
    fontSize: 24,
  },
  record: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    gap: 16,
  },
  date: {
    fontFamily: 'Mali-Regular',
    fontSize: 24,
    color: '#919191',
  },
  bestRecord: {
    fontFamily: 'Mali-Bold',
    fontSize: 28,
    color: 'tomato',
  },
  star: {
    fontSize: 32,
    color: Colors.Orange,
  }
});

