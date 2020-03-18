import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  itemRowContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10
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
    flex: 2.5,
    justifyContent: "center",
    alignItems: "flex-start",
    //alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'justify'
  },
  notificationText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.brownishGrey,
    justifyContent: 'flex-start',
    textAlign: 'justify'
  },
  notificationTimeContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5,
    paddingLeft: 10,
    textAlign: "justify"
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
