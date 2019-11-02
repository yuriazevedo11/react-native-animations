import React, {useState} from 'react';

import User from './components/User';
import USERS_ARRAY from './constants/users';
import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function App() {
  const [scrollOffset] = useState(new Animated.Value(0));
  const [listProgress] = useState(new Animated.Value(0));
  const [userInfoProgress] = useState(new Animated.Value(0));
  const [userSelected, setUserSelected] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [users] = useState(USERS_ARRAY);

  function handleUserSelection(user) {
    setUserSelected(user);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scrollOffset, {
          toValue: 0,
          duration: 500,
        }),
        Animated.timing(listProgress, {
          toValue: 100,
          duration: 300,
        }),
      ]),
      Animated.timing(userInfoProgress, {
        toValue: 100,
        duration: 500,
      }),
    ]).start(() => setUserInfoVisible(true));
  }

  function renderDetail() {
    return (
      <View>
        <User data={userSelected} />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: listProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, width],
                }),
              },
            ],
          },
        ]}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollOffset}}},
          ])}
          contentContainerStyle={styles.list}>
          {users.map(user => (
            <User
              key={user.id}
              onPress={() => handleUserSelection(user)}
              data={user}
            />
          ))}
        </ScrollView>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.header,
          {
            height: scrollOffset.interpolate({
              inputRange: [0, 140],
              outputRange: [200, 70],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <Animated.Image
          style={[
            styles.headerImage,
            {
              opacity: userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
            },
          ]}
          source={userSelected ? {uri: userSelected.thumbnail} : null}
        />
        <Animated.Text
          style={[
            styles.headerText,
            {
              fontSize: scrollOffset.interpolate({
                inputRange: [110, 130],
                outputRange: [24, 18],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, width],
                  }),
                },
              ],
            },
          ]}>
          GoNative
        </Animated.Text>

        <Animated.Text
          style={[
            styles.headerText,
            {
              transform: [
                {
                  translateX: userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [width * -1, 0],
                  }),
                },
              ],
            },
          ]}>
          {userSelected ? userSelected.name : null}
        </Animated.Text>
      </Animated.View>

      {userInfoVisible ? renderDetail() : renderList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 15,
    backgroundColor: '#2E93E5',
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },

  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 10,
    color: '#FFF',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  },

  list: {
    paddingBottom: 10,
  },
});
