"use strict"

import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, Animated} from 'react-native';

import Expression from './Expression';

export default function FlipCard({ quiz, nextQuiz, animate }) {

  const [frontAnimStyle, backAnimStyle] = useFlipAnimation(animate);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.flipCardFront, frontAnimStyle]}>
        <Expression
          expr = {quiz}
        />
      </Animated.View>
      <Animated.View style={[styles.flipCardBack, backAnimStyle]}>
        <Expression
          expr = {nextQuiz}
        />
      </Animated.View>
    </View>
  );

}

function useFlipAnimation(animate) {

  const animValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const frontAnimStyle = {
    transform: [
      { rotateX: frontInterpolate }
    ]
  };
  const backAnimStyle = {
    transform: [
      { rotateX: backInterpolate }
    ]
  };

  animate.setAnimateFunction(function() {
    return new Promise( resolve => {
      Animated.timing(animValue, {
        toValue: 180,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        animValue.setValue(0);
        resolve();
      });
    });
  })

  return [frontAnimStyle, backAnimStyle];
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardFront: {
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    backfaceVisibility: 'hidden',
  },
});
