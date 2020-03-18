import { StyleSheet} from 'react-native';

import config from '@src/config';

export default styles = StyleSheet.create ({
  subtitleText: {
    fontFamily: config.regularFont,
    fontSize: 16,
    marginTop: 6,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.brownishGrey,
  },
  headerText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    marginTop: 26,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
  },
  buttonStyle: {
    width: 295,
    height: 54,
    marginVertical: 16,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.navyBlack,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
