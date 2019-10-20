import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

/**
 * Animation types: timing, spring (bounce), decay (acceleration)
 * Math operations: add, subtract, multiply, divide
 * Chaining: sequence, parallel, stagger (parallel with delay), loop
 */

export default function App() {
  const [ballY] = useState(new Animated.Value(0));
  const [ballX] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(ballY, {
      toValue: 400,
      duration: 1000,
    }).start();
  }, [ballX, ballY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ball,
          {
            top: ballY,
            opacity: ballY.interpolate({
              inputRange: [0, 200],
              outputRange: [1, 0.2],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
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
