import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");
export default (styles = StyleSheet.create({
  container: {
    borderColor: '#fcd86f',
    borderWidth: 2,
    marginBottom: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tagsView: {
    flex: 1,
    paddingVertical: 10,
  },
  time: {
    fontSize: 32,
    fontFamily: 'NotoSansKr-Regular',
    color: '#444',
  },
  tagTitle: {
    color: '#EAAD55',
    fontSize: 15,
    fontFamily: 'NotoSansKr-Bold',
  },
  tagsText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'NotoSansKr-Regular',
  },
  tagImageContainer: {
    width,
    marginHorizontal: 0,
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 1,
    // width: width - 8,
    height: width / 3,
  },
}));
