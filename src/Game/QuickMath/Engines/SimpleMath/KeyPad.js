"use strict"

import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import Colors from '../../../../Lib/colors';
import PadNum from './PadNum';

export default function KeyPad({ onChange, cmd }) {

  const [answer, setAnswer] = useState(0);
  const [answerBoxColor, setAnswerBoxColor] = useState('White')

  useEffect(() => {
    setAnswerBoxColor('White');
    onChange && onChange(answer);
  }, [answer]);

  useEffect(() => {
    cmd.current = {
      clear: () => setAnswer(0),
      setColor: (color) => setAnswerBoxColor(color),
    }
  }, []);

  return(
    <View style = {styles.container}>

      <View style = {[styles.answerBox, { backgroundColor: Colors[answerBoxColor] }]}>
        <Text style={[styles.answerText]}>{answer}</Text>
      </View>

      <View style = {styles.pads}>
        <View style = {styles.row}>
          {
            [1,2,3].map(num => <PadNum key={num} num={num} onPress={addDigitToAnswer} />)
          }
        </View>
        <View style= {styles.row}>
          {
            [4,5,6].map(num => <PadNum key={num} num={num} onPress={addDigitToAnswer} />)
          }
        </View>
        <View style = {styles.row}>
          {
            [7,8,9].map(num => <PadNum key={num} num={num} onPress={addDigitToAnswer} />)
          }
        </View>
        <View style = {styles.row}>
          <View style={styles.padEnterBtnWrapper}>
            <TouchableOpacity style={styles.padEnterBtn} onPress={backspace}>
              <Text style={styles.padEnterBtnText}> &#8592;&#x2408; </Text>
            </TouchableOpacity>
          </View>
          <PadNum num={0} onPress={addDigitToAnswer} />
          <View style={styles.padEnterBtnWrapper}>
            <TouchableOpacity style={styles.padEnterBtn} onPress={clearAnswer}>
              <Text style={[styles.padEnterBtnText, {color: Colors.DeepOrange}]}>&#9249;</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );

  function addDigitToAnswer(digit) {
    setAnswer(answer => parseInt(`${answer}${digit}`))
  }

  function backspace() {
    if (answer > 9) {
      setAnswer(answer => parseInt( `${answer}`.slice(0, -1) ))
    } else  {
      setAnswer(0);
    }
  }

  function clearAnswer() {
    setAnswer(0);
  }


}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  answerBox: {
    borderRadius: 16,
    borderColor: '#9e9e9e',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    // height: 56,
    // width: 240,
    // marginTop: 2,
    // paddingLeft: 8,
    // paddingBottom: 8,
    backgroundColor: '#f2f2f2',
    // flexDirection: 'row',
    alignItems: 'center',
  },
  answerText: {
    fontFamily: 'Mali-Regular',
    fontSize: 36,
  },
  pads: {

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padEnterBtnWrapper: {
    flex: 1,
  },
  padEnterBtn: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
  padEnterBtnText: {
    fontFamily: 'Mali-Bold',
    fontSize: 52,
    color: '#000',
  },
});
