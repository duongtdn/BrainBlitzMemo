"use strict"

import AsyncStorage from '@react-native-async-storage/async-storage';

import defaultConfig from './default.js';

const storage = {
  async get(key) {
    try {
      const valueString = await AsyncStorage.getItem(key);
      const parsedValue = (valueString && valueString.length > 0) ? JSON.parse(valueString) : defaultConfig[key];
      return parsedValue;
    } catch(err) {
      console.error(e);
    }
  },
  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }

  },
  async put(key, value) {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  },
  setting: {
    async get() { return storage.get('setting'); },
    set(value) { return storage.set('setting', value); },
    put(value) { return storage.put('setting', value); },
  },
  record: {
    async get() { return storage.get('record'); },
    set(value) { return storage.set('record', value); },
    put(value) { return storage.put('record', value); },
  },
  unlock: {
    async get() { return storage.get('unlock'); },
    set(value) { return storage.set('unlock', value); },
    put(value) { return storage.put('unlock', value); },
  }
};

export default storage;
