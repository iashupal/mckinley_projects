import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import config from '@src/config';
const LevelMaker = ({ user }) => {
  switch (user.levelType) {
    case 'white':
      return (
        <View style={styles.userLevelWhite}>
          <Text style={styles.userLevelTextWhite}>
            <Text>{!!user.level ? user.level : '-'}</Text>
          </Text>
        </View>
      );
    case 'black':
      return (
        <View style={styles.userLevel}>
          <Text style={styles.userLevelText}>
            {!!user.level ? user.level : '-'}
          </Text>
        </View>
      );
    default:
      return (
        <View style={styles.userLevel}>
          <Text style={styles.userLevelText}> {''} </Text>
        </View>
      );
  }
};

const Level = ({ level = '-', levelType = 'white' }) => (
  <LevelMaker user={{ level, levelType }} />
);

export default Level;

const styles = StyleSheet.create({
  userLevel: {
    width: 24,
    height: 24,
    backgroundColor: config.navyBlack,
    borderRadius: 12,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#596068'
  },
  userLevelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 1
  },
  userLevelTextWhite: {
    color: config.navyBlack,
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  userLevelWhite: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: config.selectBox,
    backgroundColor: 'white'
  }
});
