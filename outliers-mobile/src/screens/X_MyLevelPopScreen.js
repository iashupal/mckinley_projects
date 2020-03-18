import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, BackHandler } from 'react-native';

//Import Assets
import LevelOneImage from '@assets/images/ic_level_1.png';
import LevelTwoImage from '@assets/images/ic_level_2.png';
import LevelOneBlackImage from '@assets/images/ic_black_1.png';
import LevelTwoBlackImage from '@assets/images/ic_black_2.png';
import LevelThreeBlackImage from '@assets/images/ic_black_3.png';
import FloralRibbonImage from '@assets/images/img_laurel.png';
import config from '@src/config';
//Import Components
import ActionButton from '@components/ActionButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

class X_MyLevelPopScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }
  render() {
    const { t } = this.props;
    console.log('props', this.props);
    return (
      <View style={styles.modalBackground}>
        <View style={styles.contentOuter}>
          <View style={styles.contentBox}>
            <View style={styles.topBox}>
              <View style={styles.topBoxTop}>
                <View style={styles.imageTextBanner}>
                  <ImageBackground
                    source={FloralRibbonImage}
                    style={{ width: 200, height: 36 }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: config.goldYellow,
                        marginTop: -10
                      }}
                    >
                      {t('levels:goldenHeading')}
                    </Text>
                  </ImageBackground>
                </View>
              </View>
              <View style={styles.topBoxBottom}>
                <Text style={[styles.text12, styles.center]}>
                  {t('levels:paragraph')}
                </Text>
                <Text style={styles.textGrey}>{t('levels:date')}</Text>
              </View>
            </View>
            <View style={styles.bottomBox}>
              <View style={styles.groupIconText}>
                <Image source={LevelOneImage} style={styles.Icon} />
                <Text style={styles.text}>{t('levels:levelOne')}</Text>
              </View>
              <View style={styles.groupIconText}>
                <Image source={LevelTwoImage} style={styles.Icon} />
                <Text style={styles.text}>{t('levels:levelTwo')}</Text>
              </View>
              <View style={styles.groupIconText}>
                <Image source={LevelOneBlackImage} style={styles.Icon} />
                <Text style={styles.text}>{t('levels:blackLevelOne')}</Text>
              </View>
              <View style={styles.groupIconText}>
                <Image source={LevelTwoBlackImage} style={styles.Icon} />
                <Text style={styles.text}>{t('levels:blackLevelTwo')}</Text>
              </View>
              <View style={styles.groupIconText}>
                <Image source={LevelThreeBlackImage} style={styles.Icon} />
                <Text style={styles.text}>
                  {this.props.t('levels:blackLevelThree')}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress1={() => this.submitForm()}
              style={{
                height: 54,
                backgroundColor: config.charcoal_grey,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={styles.buttonText}> {t('rfrScrLang:cnfrm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default X_MyLevelPopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentOuter: {
    backgroundColor: 'white',
    width: 320,
    height: 481
    // borderColor: 'red',
    // borderWidth: 1
  },
  contentBox: {
    width: 320,
    height: 428,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  topBox: {
    backgroundColor: '#fffbf0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 26
  },
  imageTextBanner: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  topBoxBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  bottomBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 2,
    paddingTop: 16,
    paddingBottom: 31
  },
  buttonBox: {
    height: 54,
    backgroundColor: config.black
  },
  groupIconText: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 53,
    alignItems: 'center'
  },
  Icon: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  text: {
    fontSize: 13,
    color: config.greyishBrown,
    lineHeight: 18
  },
  text12: {
    fontSize: 12,
    color: config.black,
    lineHeight: 16
  },
  textGrey: {
    fontSize: 12,
    color: config.btnLine,
    paddingTop: 6
  },
  center: {
    textAlign: 'center'
  },
  buttonText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: config.white
  },
  buttonStyle1: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 0
  }
});
