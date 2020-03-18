import { StyleSheet, Dimensions } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  uploadButton: {
    borderColor: config.charcoal_grey,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
    // width: "100%"
  },
  component_width: {
    width: Dimensions.get('window').width - 30, //config.component_width,
    // marginHorizontal: 0,
    aspectRatio: 1.38
    // height: 220
  },
  half_width: {
    flex: 1,
    aspectRatio: 1
  },
  addIcon: {
    width: 35,
    height: 35
  }
}));
