import { StyleSheet, Dimensions } from 'react-native';
import config from '@src/config';

const { width } = Dimensions.get('window');
export default (styles = StyleSheet.create({
  locationSelectionBtn: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: config.navyBlack,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  locationBtnTitle: {
    fontWeight: config.regularFont,
    fontSize: 16,
    fontWeight: '500',
    color: config.black
  },
  alertTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    color: config.black
  },
  cardListOuter: {
    backgroundColor: config.lightGreyBg,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    borderRadius: 3,
    height: 48,
    width: config.component_width
  },
  lhsBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rhsBox: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  label: {
    fontSize: 15,
    color: config.black,
    paddingLeft: 6
  },
  itemText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.greyishBrown
  },
  itemContainer: {
    paddingVertical: 2,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginVertical: 4,
    borderColor: config.selectBox,
    height: 32
  },
  selectItemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8
  },
  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: config.black,
    paddingRight: 6
  },
  value1: {
    fontSize: 18,
    fontWeight: '500',
    color: config.black,
    paddingRight: 6,
    marginTop: 20
  },
  inputType: {
    height: 48,
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 3,
    color: config.black,
    textAlign: 'right'
  },
  icon: {
    width: 16,
    height: 16
  },
  downArrowIcon: {
    width: 10,
    height: 10
  },
  internalPickerContainer: {
    height: 48,
    width: '100%'
  },
  addImageIcon: { width: 14, height: 14, resizeMode: 'contain' },
  addImageButton: {
    width: 95,
    height: 31,
    backgroundColor: config.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: config.btnLine
  },
  addImageText: {
    fontFamily: config.regularFont,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.greyishBrown,
    fontWeight: 'bold',
    fontSize: 14
  },
  textInputContainer: {
    width: width * 0.89,
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    backgroundColor: config.white,
    borderColor: config.whiteTwo,
    marginLeft: -2
  },
  textInputStyle: {
    textAlignVertical: 'top',
    fontFamily: config.regularFont,
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'normal',
    flexWrap: 'wrap',
    lineHeight: 18,
    letterSpacing: 0,
    paddingTop: 10
    // color: config.hintText,
  },
  textInputContainerTwo: {
    width: width * 0.89,
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    backgroundColor: '#fafafa',
    borderColor: config.whiteTwo,
    marginLeft: -2
  }
}));
