import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

export default function User({data, onPress}) {
  const [opacity] = useState(new Animated.Value(0));
  const [offset] = useState(
    new Animated.ValueXY({
      x: 0,
      y: 50,
    }),
  );

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 5,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }, [offset.y, opacity]);

  return (
    <Animated.View
      style={[{transform: [...offset.getTranslateTransform()]}, {opacity}]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{uri: data.thumbnail}} />

          <View style={[styles.infoContainer, {backgroundColor: data.color}]}>
            <View style={styles.bioContainer}>
              <Text style={styles.name}>{data.name.toUpperCase()}</Text>
              <Text style={styles.description}>{data.description}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Icon name="heart" size={12} color="#FFF" />
              <Text style={styles.likes}>{data.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'column',
    marginHorizontal: 15,
  },

  thumbnail: {
    width: '100%',
    height: 150,
  },

  infoContainer: {
    backgroundColor: '#57BCBC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  bioContainer: {
    flex: 1,
  },

  name: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 10,
  },

  description: {
    color: '#FFF',
    fontSize: 13,
    marginTop: 2,
  },

  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },

  likes: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
});
