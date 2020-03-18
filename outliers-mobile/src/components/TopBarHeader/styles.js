import { StyleSheet, Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import config from '@src/config';
const { width } = Dimensions.get('window');
export default (styles = StyleSheet.create({
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e8e8e8'
  },
  alarmIcon: {
    width: 24,
    height: 24
  },
  header: {
    width: '100%',
    height: 54,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? (DeviceInfo.hasNotch() ? 44 : 20) : 0
  },
  topLeftIconButton: {
    width: 32
  },
  topLeftIcon: {
    width: 24,
    height: 24
  },
  sectionTitleContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  sectionTitle: {
    width: 216,
    textAlign: 'center',
    fontSize: 18,
    color: config.charcoal_grey,
    fontFamily: 'NotoSansKr-Bold',
    fontWeight: 'bold'
  },
  topRightIcon: {
    width: 20,
    height: 20,
    marginRight: 3,
    marginTop: 3,
    tintColor: 'black'
  },
  rightSecondIcon: {
    width: 20,
    height: 20,
    marginLeft: 9,
    marginTop: 3,
    tintColor: 'black'
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightNavText: {
    color: config.charcoal_grey,
    fontSize: 16
  },
  vibeProfile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: '#e8e8e8',
    borderWidth: 1
  },
  cloverIcon: {
    width: 22,
    height: 22
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: -8,
    backgroundColor: '#F83447',
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    fontFamily: 'NotoSansKr-Bold',
    fontSize: 9,
    color: '#fff'
  },
  noOfCloves: {
    flexDirection: 'row'
  },
  noOfClovesText: {
    fontSize: 16,
    marginLeft: 5
  }
}));
