import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  container: {
    backgroundColor: config.whiteSmoke,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    height: 32,
    borderRadius: 16
  },
  buttonContainer: {
    borderRadius: 16,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: config.charcoal_grey,
    // fontFamily: config.regularFont,
    lineHeight: 20,
  },
  textContainer: {
    height: 32,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
