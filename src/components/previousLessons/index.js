import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated, PanResponder} from 'react-native';

/**
 * Animation types: timing, spring (bounce), decay (acceleration)
 * Math operations: add, subtract, multiply, divide
 * Chaining: sequence, parallel, stagger (parallel with delay), loop
 */

export default function App() {
  const [ball] = useState(new Animated.ValueXY({x: 0, y: 0}));
  const [panResponder, setPanResponder] = useState({});

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          ball.setOffset({
            x: ball.x._value,
            y: ball.y._value,
          });

          ball.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([
          null,
          {
            dx: ball.x,
            dy: ball.y,
          },
        ]),
        onPanResponderRelease: () => {
          ball.flattenOffset();
        },
      }),
    );
  }, [ball, ball.x, ball.y]);

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.ball,
          {
            transform: [{translateX: ball.x}, {translateY: ball.y}],
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
