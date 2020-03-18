import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  vibeHeader: {
    flexDirection: 'row'
  },
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
    fontWeight: 'bold',
    marginBottom: 1
  },
  userInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: config.black,
    flex: 1,
    paddingRight: 6
  }
}));
