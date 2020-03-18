import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    marginLeft: 2,
    marginRight: 2
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'black',
    width: 96,
    height: 96,
    opacity: 0.5,
    marginTop: -70
  },
  overlayBox: {
    flex: 1,
    position: 'absolute',
    width: 96,
    height: 26,
    marginTop: 70,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  momentImage: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    // marginRight: 21,
    borderColor: '#e8e8e8',
    borderWidth: 3
  },
  countDown: {
    position: 'absolute',
    fontSize: 13,
    color: 'white',
    marginLeft: 33,
    fontWeight: 'bold',
    marginTop: 2
  },
  newMargin: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    // marginRight: 21,
    borderColor: '#e8e8e8',
    borderWidth: 3
  }
}));
