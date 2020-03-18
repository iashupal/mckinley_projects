import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingBottom: 10,
    borderBottomColor: config.whiteTwo,
    borderBottomWidth: 1,
    paddingTop: 12
  },

  commentCountText: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginRight: 16,
    marginLeft: 20,
    marginTop: 0,
    paddingLeft: 0
  },
  commentLevelContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#efefef',
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentLevel: {
    fontFamily: 'NotoSansKr-Bold',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 13,
    color: config.brownishGrey,
    marginBottom: 1
  },
  commentText: {
    fontSize: 12,
    width: '85%',
    color: config.brownishGrey,
    paddingLeft: 5,
    paddingRight: 16
  },
  reportButton: {
    width: 10,
    height: 14,
    textAlign: 'center'
  },
  replyButton: {
    fontWeight: 'bold',
    fontSize: 12,
    color: config.brownishGrey,
    marginTop: 6,
    marginLeft: 0
  },
  deleteButton: {
    fontWeight: 'bold',
    fontSize: 12,
    color: config.brownishGrey,
    marginTop: 6,
    marginLeft: 10
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 16,
    marginLeft: 20,
    marginTop: 0
  },
  commentIconWrapper: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  commentContainerTwo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginRight: 16,
    marginLeft: 20,
    marginTop: 0,
    paddingLeft: 0
  },
  greyButton: {
    backgroundColor: '#888888',
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row'
  },
  greyButtonText: {
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 3
  },
  commentTextTwo: {
    fontSize: 12,
    width: '65%',
    color: config.brownishGrey,
    paddingLeft: 10,
    paddingRight: 0,
    alignSelf: 'flex-start',
    marginLeft: -10
  },
  iconClover: {
    width: 12,
    height: 14,
    textAlign: 'center'
  },
  cloveText: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: config.navyBlack
  },
  cloveImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: 'contain',
    tintColor: config.navyBlack
  },
  cloveTextWhite: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: config.white
  },
  cloveImageWhite: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: 'contain',
    tintColor: config.navyWhite
  },
  cloveContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 12,
    width: 131,
    height: 36,
    borderRadius: 25,
    backgroundColor: config.paleGrey
  }
}));
