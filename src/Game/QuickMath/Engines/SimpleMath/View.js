"use strict"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../../../../Lib/colors';
import Factory from '../Factory';

import Header from './Header';
import FlipCard from './FlipCard';
import useAnimation from './useAnimation.hook';
import KeyPad from './KeyPad';

export default function ({ gameLevel, onComplete, sound }) {

  const quizzes = useMemo(() => (new Factory(gameLevel.rule)).generate(), []);

  const [quizIndex, setQuizIndex] = useState(0);

  const anim = useAnimation();
  const keyPadRef = useRef();
  const timerRef = useRef();


  return(
    <View style = {styles.container}>

      <Text style = {styles.text}>Quick Math</Text>

      <Header
        quizNumber = {quizIndex + 1}
        totalQuizNumbers = {quizzes.length}
        timer = {timerRef}
      />

      <FlipCard
        quiz = { quizzes[quizIndex] }
        nextQuiz = { (quizIndex < quizzes.length - 1) && quizzes[quizIndex + 1] }
        animate = {anim}
      />

      <KeyPad
        onChange = {evaluate}
        cmd = {keyPadRef}
      />

    </View>
  )

  async function evaluate(answer) {
    if (answer === 0) { return }
    const quiz = quizzes[quizIndex]
    if (Factory.isLikelyTheAnswer(quiz, answer)) {
      if (Factory.check(quiz, answer)) {
        keyPadRef.current?.setColor('LightGreen');
        await sound?.correct?.replayAsync();
        if (quizIndex < quizzes.length - 1) {
          await anim.animate();
          keyPadRef.current?.clear();
          setQuizIndex(quizIndex => quizIndex + 1);
        } else {
          timerRef.current.stop();
          const result = timerRef.current.value;
          onComplete(result)
        }
      } else {
        keyPadRef.current?.setColor('PaleRed');
        await sound?.wrong?.replayAsync();
        keyPadRef.current?.clear();
      }
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.Background,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Mali-Bold',
    textAlign: 'center',
    backgroundColor: Colors.Black,
    color: Colors.White,
  }
});