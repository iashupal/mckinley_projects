import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  itemRowContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  rightContentContainer: {
    flex: 5,
    flexDirection: 'column'
  },
  firstRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  notificationTextContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 10
  },
  notificationText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.brownishGrey,
    justifyContent: 'flex-start'
  },
  notificationTimeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10
  },
  notificationTime: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    // textAlign: 'right',
    color: config.hintText
  }
}));
