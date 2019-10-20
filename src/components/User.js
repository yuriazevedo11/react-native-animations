import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

export default function User({data, onPress}) {
  return (
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
