"use strict"

import React, { useEffect, useState, useRef } from "react";
import { BackHandler, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import Colors from "../../Lib/colors";
import storage from '../../Lib/storage.js';
import { formatTime } from "../../Lib/date.js";
import Button from "../../Component/Button";
import StatusBar from "../../Component/StatusBar.js";

export default function PageResult({ route, navigation }) {

  const { game, level, result } = route.params;

  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    (async () => {
      const setting = await storage.setting.get();
      setPlayerName(setting.playerName || '');
    })();
  },[]);

  useEffect(() => {
    const evt = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('home');
      return true;
    });
    return () => evt.remove();
  }, []);

  const [isBestRecord, setIsBestRecord] = useState(false);
  useEffect(() => {
    (async() => {
      const records = await storage.record.get();
      const gameRecord = records[game.name] || {};
      const levelRecord = gameRecord[level.id]
      const isBestRecord = checkIfIsBestRecord(levelRecord?.best, result, level.resultType);
      if (isBestRecord) {
        gameRecord[level.id] = { best: parseInt(result), ts: (new Date()).getTime() };
        records[game.name] = gameRecord;
        await storage.record.put(records);
      }
      setIsBestRecord(isBestRecord);
    })();
  }, []);

  function checkIfIsBestRecord(lastBest, result, resultType) {
    if (lastBest) {
      return resultType === 'time' ? parseInt(result) < parseInt(lastBest) : parseInt(result) > parseInt(lastBest)
    } else {
      return true
    }
  }

  const __screenShotRef = useRef(null);

  return (
    <SafeAreaView style = {styles.screen}>
      <StatusBar />
      <ScrollView>
        <View style = {styles.container}>

          <View style = {styles.shareableAea} ref={__screenShotRef} collapsable={false}>

            <View style = {styles.gameTitleBox}>
              <Image
                style = {styles.img}
                source = {require('../../../assets/mmq.png')}
              />
              <View style={styles.logo}>
                <Text style={[styles.logoText, styles.textLightBlue]}>Math </Text>
                <Text style={[styles.logoText, styles.textPaleRed]}>Mad </Text>
                <Text style={[styles.logoText, styles.textLightGray]}>Quick</Text>
              </View>
              <Text style = {styles.gameTitleText}>{game.title}</Text>
              <Text style = {styles.gameLevelText}>{level.title}</Text>
            </View>

            <View style = {styles.congratsBox}>
              <Text style = {styles.congratsText}>Weldone</Text>
              {
                playerName && playerName.length > 0 ? <Text style={styles.playerNameText}>{playerName}</Text> : null
              }
              {
                isBestRecord ?
                  <View style = {styles.bestRecordBox}>
                    <Text style = {styles.bestRecordStart}>&#x1F31F;</Text>
                    <Text style={styles.bestRecordText}>New Best Result</Text>
                  </View>
                  : null
              }
            </View>

            <View style = {styles.resultBox}>
              <Text style={styles.message}>{level.resultMessage}</Text>
              {
                level.resultType === 'time' ? <Text style={styles.resultText}>{formatTime(result, {long: true})}</Text> : null
              }
            </View>

            <View style = {styles.encourageBox}>
              <Text style={styles.message}>Play every day to strengthen your brain</Text>
            </View>

          </View>

          <View style = {styles.actionBox}>
            <Button
              background = {Colors.Blue}
              color = {Colors.White}
              fontSize = {24}
              onPress = {playAgain}
            >
              Play again
            </Button>
            <Button
              background = {Colors.Sand}
              color = {Colors.DeepOrange}
              fontSize = {24}
              onPress = {share}
            >
              Share your achievement
            </Button>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );

  async function playAgain() {
    navigation.navigate('game-playground', { game, level });
  }

  async function share() {
    try {
      const uri = await captureRef(__screenShotRef);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(`file://${uri}`)
      } else {
        console.log('Sharing is not avalable');
      }
    } catch(err) {
      console.log('Take screenshot failed!')
      console.log(err)
    }

  }

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.Background,
  },
  container: {
    alignItems: 'center',
  },
  gameTitleBox: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 4,
    padding: 6,
    alignItems: 'center',
  },
  gameTitleText: {
    fontFamily: 'Mali-Bold',
    fontSize: 24,
    lineHeight: 32,
    paddingLeft: 16,
    paddingRight: 16,
    color: Colors.LightGray,
    backgroundColor: Colors.DeepOrange,
  },
  gameLevelText: {
    fontFamily: 'Mali-Regular',
    fontSize: 16,
    color: Colors.Amber,
  },
  congratsBox: {
    alignItems: 'center',
  },
  congratsText: {
    fontFamily: 'Mali-Bold',
    fontSize: 28,
    lineHeight: 36,
    color: Colors.Sand,
    marginBottom: 16,
  },
  playerNameText: {
    fontFamily: 'Mali-Bold',
    fontSize: 32,
    lineHeight: 38,
    color: Colors.Yellow,
    marginBottom: 16,
  },
  resultBox: {
    alignItems: 'center',
  },
  message: {
    fontFamily: 'Mali-Regular',
    fontSize: 18,
    color: Colors.Gray,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
  },
  resultText: {
    fontFamily: 'Mali-Bold',
    fontSize: 32,
    lineHeight: 40,
    paddingLeft: 16,
    paddingRight: 16,
    color: Colors.Red,
    backgroundColor: Colors.PaleYellow,
  },
  actionBox: {
    alignItems: 'center',
    gap: 16,
  },
  encourageBox: {
    marginTop: 16,
    marginBottom: 16,
  },
  shareableAea: {
    width: '100%',
    backgroundColor: Colors.Background,
  },
  img: {
    width: 120,
    height: 120,
  },
  logo: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Mali-Bold',
    fontSize: 32,
    lineHeight: 56,
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
  bestRecordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bestRecordStart: {
    fontSize: 32,
    color: Colors.Yellow,
  },
  bestRecordText: {
    fontFamily: 'Mali-Bold',
    fontSize: 24,
    color: Colors.Orange,
  },
});
