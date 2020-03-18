import { StyleSheet } from 'react-native';
import config from '@src/config.js';

export default (styles = StyleSheet.create({
  inputWithIcon: {
    height: 50,
    width: config.component_width,
    margin: 5,
    backgroundColor: config.inputBgColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderRadius: 5,
    paddingHorizontal: 12,
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
    // shadowRadius: 0.3,
    // shadowOffset: { width: -1, height: -1 },
    borderColor: '#e1dfdb',
    borderWidth: 1
  },
  icon: {
    width: 15,
    height: 18,
    marginRight: 12
  },
  insetShadow: {
    position: 'absolute',
    backgroundColor: '#e1dfdb',
    bottom: 0,
    height: 0,
    width: config.component_width,
    borderRadius: 1
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    fontFamily: config.boldFont,
    fontWeight: 'bold'
  }
}));
