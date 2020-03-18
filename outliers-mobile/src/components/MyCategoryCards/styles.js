import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container1: {
    height: 250,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 14
  },
  container2: {
    height: 160,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 14
  },
  checkCardOuter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14
    // marginTop: 10
  },
  iconOuter: {
    flex: 1.4,
    flexDirection: 'row'
    // justifyContent: "center"
  },
  cardClickable: {
    flex: 5.6
  },
  //white check card
  whiteCheckCard: {
    flex: 5,
    paddingVertical: 13,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  normalCheckCard: {
    borderColor: config.selectBox,
    borderWidth: 1,
    borderRadius: 3
  },
  activeCheckCard: {
    borderColor: config.charcoal_grey,
    borderWidth: 1.5,
    borderRadius: 3
  },
  // gold yellow check card
  goldCheckCard: {
    flex: 6,
    paddingVertical: 13,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1FBFF'
  },
  normalGoldCheckCard: {
    backgroundColor: '#F1FBFF',
    borderColor: '#F1FBFF',
    borderWidth: 1,
    borderRadius: 3
  },
  activeGoldCheckCard: {
    // backgroundColor: "#fffbf0",
    borderColor: config.charcoal_grey,
    borderWidth: 1.5,
    borderRadius: 3
  },
  icon: {
    width: 18,
    height: 18
  },
  iconCheckmark: {
    width: 14,
    height: 10
  },
  black_txt: {
    color: config.black,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: config.boldFont
  },
  medium_grey_txt: {
    color: config.brownishGrey,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: config.boldFont,
    lineHeight: 18
  },
  activeGold: {
    color: config.black,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: config.boldFont
  },
  goldyellow: {
    color: '#13ADF3',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: config.boldFont
  },
  label: {
    color: config.black,
    fontFamily: config.regularFont,
    alignSelf: 'flex-start',
    textAlign: 'left'
  },
  toolTipIcon: {
    width: 20,
    height: 18,
    position: 'absolute',
    right: 18,
    marginTop: -10
  },
  modalText: {
    color: '#666666',
    fontSize: 16,
    lineHeight: 26
  },
  modalHeading: {
    color: '#222222',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  confirm: {
    fontSize: 16,
    color: config.brownishGrey,
    marginLeft: 5,
    paddingRight: 20,
    fontFamily: config.regularFont,
    lineHeight: 28,
    zIndex: -1
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: config.greyishBrown
  },
  agreeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 40,
    paddingHorizontal: 14,
    justifyContent: 'flex-start',
    marginTop: 6
  },
  checkContainer: {
    flex: 0.8,
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingTop: 4
  },
  textContainer: {
    flex: 6
  },
  chkboxIcon: {
    position: 'absolute',
    top: 2.5,
    left: 3
    // zIndex: 200
  }
}));
