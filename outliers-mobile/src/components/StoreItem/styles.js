import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  oneRow: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: config.white,
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,
    borderColor: config.paleGold,
    paddingHorizontal: 15,
    paddingVertical: 25
  },
  cloverNum: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  seperatorLine: {
    marginTop: 13,
    marginBottom: 7,
    width: '80%',
    height: 1,
    backgroundColor: config.whiteSmoke
  },
  priceHot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cloverImage: {
    height: 25,
    width: 25,
    marginRight: 10
  },
  hotIcon: {
    height: 20,
    width: 45
  },
  numText: {
    fontSize: 17,
    color: config.black
    // marginRight: 4
  },
  numPrice: {
    color: config.goldYellow,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 0
  }
}));
