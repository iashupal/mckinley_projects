import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  list: {
    marginTop: 10,
    overflow: 'hidden'
  },
  itemTitle: {
    // paddingHorizontal: 4,
    height: 30,
    paddingVertical: 6,
    borderWidth: 1,
    marginRight: 0,
    borderRadius: 3,
    fontFamily: config.regularFont,
    fontSize: 13,
    fontWeight: '600'
  }
}));
