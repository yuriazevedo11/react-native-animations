import React, {useState} from 'react';

import User from './components/User';
import USERS_ARRAY from './constants/users';
import {
  View,
  Image,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function App() {
  const [scrollOffset] = useState(new Animated.Value(0));
  const [userSelected, setUserSelected] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [users] = useState(USERS_ARRAY);

  function handleUserSelection(user) {
    setUserSelected(user);
    setUserInfoVisible(true);
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
      <View style={styles.container}>
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
      </View>
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
        <Image
          style={styles.headerImage}
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
            },
          ]}>
          {userSelected ? userSelected.name : 'GoNative'}
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
