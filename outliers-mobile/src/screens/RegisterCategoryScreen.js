import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler, Alert } from 'react-native';

//Import Components
import MyCategoryCards from '@components/MyCategoryCards';
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import DotSlider from '@components/DotSlider';
import config from '@src/config';

export default function RegisterCategoryScreen(props) {
  const [count, setCount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const { t } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  });

  return (
    <Fragment>
      <TopBarHeader
        sectionTitle={t('common:register.categoryScreen.header')}
        action={'back'}
      />
      <DotSlider numberOfSteps={5} active={1} />
      <View style={styles.container}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instruction}>
            {t('common:register.categoryScreen.note')} :)
          </Text>
        </View>
        <MyCategoryCards
          count={count}
          setCount={total => {
            console.log('Total selected', total);
            setCount(total);
          }}
          t={t}
          navigation={props.navigation}
          agreedToTerms={agree => setAgreed(agree)}
        />
      </View>
      <ActionButton
        onPress1={() => {
          // props.navigation.navigate('MyDetails')
          if (count !== 0) {
            if (agreed) {
              props.navigation.navigate('MobileNumberVerification');
            } else {
              Alert.alert(
                t('common:app.error'),
                t('common:register.agreeTermsScreen.agreeError')
              );
            }
          } else {
            Alert.alert(
              t('common:app.error'),
              t('common:register.categoryScreen.atleastOneCategory')
            );
          }
        }}
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
        text={t('common:register.nextButton')}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  instructionContainer: {
    paddingBottom: 24
  },
  instruction: {
    color: config.greyishBrown,
    fontSize: 14,
    fontFamily: config.regularFont,
    textAlign: 'center'
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.navyBlack,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
