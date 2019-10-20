import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

/**
 * Animation types: timing, spring (bounce), decay (acceleration)
 * Math operations: add, subtract, multiply, divide
 */

export default function App() {
  const [ballY] = useState(new Animated.Value(0));
  const [ballX] = useState(Animated.divide(ballY, 2)); //

  useEffect(() => {
    Animated.decay(ballY, {
      velocity: 0.5,
    }).start();
  }, [ballY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, {top: ballY, left: ballX}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ball: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f00',
  },
});
