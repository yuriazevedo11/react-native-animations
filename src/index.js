import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

export default function App() {
  const [ballY] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(ballY, {
      toValue: 550,
      duration: 1000,
    }).start();
  }, [ballY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, {top: ballY}]} />
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
