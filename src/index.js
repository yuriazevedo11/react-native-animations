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
} from 'react-native';

const {width} = Dimensions.get('window');

export default function App() {
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
        <ScrollView contentContainerStyle={styles.list}>
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

      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={userSelected ? {uri: userSelected.thumbnail} : null}
        />

        <Text style={styles.headerText}>
          {userSelected ? userSelected.name : 'GoNative'}
        </Text>
      </View>

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
    height: 200,
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },

  headerText: {
    fontSize: 24,
    fontWeight: '900',
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
