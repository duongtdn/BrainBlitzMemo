"use strict"

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Slider from '@react-native-community/slider';

import storage from '../../Lib/storage';
import Colors from '../../Lib/colors';

function SettingSlider({ label, value, onValueChange }) {
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <Slider
        style={styles.sliderBar}
        minimumValue={0.0}
        maximumValue={1.0}
        step={0.1}
        value={value}
        onValueChange = {onValueChange}
        thumbTintColor="#1EB1FC"
      />
    </View>
  )
}

function Sound({ setting, onValueChange }) {
  return (
    <View style={styles.soundContainer}>
      <Text style={styles.soundLabel}>Sound</Text>
      <SettingSlider label='Music ' value={setting.music} onValueChange={onValueChange('music')} />
      <SettingSlider label='Effect' value={setting.effect} onValueChange={onValueChange('effect')} />
    </View>
  )
}

function Credit() {
  return (
    <View style={styles.creditContainer}>
      <Text style={styles.creditText}>Music by Adam Vitovsky</Text>
    </View>
  )
}

export default function PageSettings({ navigation, onSettingChange }) {
  const [setting, setSetting] = useState();
  useEffect(() => {
    (async () => {
      const setting = await storage.setting.get();
      setSetting(setting);
    })();
  },[]);
  if (!setting) return null;
  return (
    <View style={styles.container}>
      <Sound setting={setting.sound} onValueChange={onValueChange} />
      <Credit />
    </View>
  );
  function onValueChange(slider) {
    return function(value) {
      onSettingChange('sound')(slider)(value);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: Colors.Background,
  },
  soundContainer: {
    flex: 1,
    marginTop: 4,
  },
  soundLabel: {
    fontFamily: 'Mali-Bold',
    fontSize: 12,
    color: Colors.LightBlue,
  },
  sliderContainer: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sliderLabel: {
    fontFamily: 'Mali-Regular',
    fontSize: 22,
    marginRight: 8,
    color: Colors.Amber,
  },
  sliderBar: {
    flex: 1,
  },
  creditContainer: {
    alignSelf: 'center',
  },
  creditText: {
    fontFamily: 'Mali-Bold',
    fontSize: 12,
    color: Colors.Gray,
  }
});
