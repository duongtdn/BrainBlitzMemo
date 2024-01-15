"use strict"

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text} from 'react-native';

import { formatTime } from '../../../../Lib/date';
import Colors from '../../../../Lib/colors';

export default function Header({ active, quizNumber, totalQuizNumbers, timer }) {

  const [elapsedTime, setElapsedTime] = useState(0);

  // useEffect(() => {
  //   const t = active? setInterval(() => setElapsedTime(elapsedTime => elapsedTime + 1), 1000) : null;
  //   return () => active && t && clearInterval(t);
  // }, [active]);

  useEffect(() => {
    const t = setInterval(() => {
      setElapsedTime(elapsedTime => elapsedTime + 1);
      timer.current.value++;
    }, 1000)
    timer.current = {
      stop: () => clearInterval(t),
      value: elapsedTime,
    }
  }, [])

  return (
    <View style = {styles.container}>
      <View>
        <Text style={[styles.textNumber, styles.text]}> {quizNumber}/{totalQuizNumbers} </Text>
      </View>
      <View>
        <Text style={[styles.textTimer, styles.text]} > {formatTime(elapsedTime, {short: true})} </Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Mali-Bold',
    fontSize: 16,
  },
  textNumber: {
    color: Colors.Blue,
  },
  textTimer: {
    color: Colors.Red,
  },
});
