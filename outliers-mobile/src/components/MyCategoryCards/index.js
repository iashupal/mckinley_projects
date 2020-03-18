import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './styles';

//Import assets
import UniversityImage from '@assets/images/ic_univ.png';
import JobImage from '@assets/images/ic_job.png';
import PropertyImage from '@assets/images/ic_property.png';
import BlackCheckImage from '@assets/images/ic_checked_list.png';
import KeyImage from '@assets/images/ic_key.png';
import QuestImage from '@assets/images/ic_quest.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';

import SendConfirmIcon from '@assets/images/ic_send_confirm_b.png';
import Modal from '@components/CustomModal';
import CheckBox from '@components/AppCheckbox';

export default function MyCategoryCards(props) {
  const { t } = props;
  const [intial, setInitial] = useState(true);
  const [myCategory, setMyCategory] = useState({
    0: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.key.label'),
      // header: KeyImage,
      title: t('common:register.categoryScreen.categoryList.key.title'),
      gold: false,
      active: false,
      headerOnly: false,
      bottomMargin: 24
    },
    1: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.school.label'),
      // header: UniversityImage,
      title: t('common:register.categoryScreen.categoryList.school.title'),
      gold: false,
      active: false,
      headerOnly: false,
      bottomMargin: 10
    },
    2: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.school.label1'),
      header: QuestImage,
      // title: QuestImage,
      gold: false,
      active: false,
      headerOnly: false,
      bottomMargin: 10
    },
    3: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.school.label2'),
      header: QuestImage,
      // title: QuestImage,
      gold: false,
      active: false,
      headerOnly: false,
      bottomMargin: 20
    },
    4: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.job.label'),
      // header: JobImage,
      title: t('common:register.categoryScreen.categoryList.job.title'),
      gold: false,
      active: false,
      headerOnly: false,
      bottomMargin: 10
    },
    5: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.job.label1'),
      header: null,
      gold: false,
      active: false,
      headerOnly: false,
      bottomMargin: 10
    },
    6: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.job.label2'),
      header: null,
      gold: false,
      active: false,
      headerOnly: false,
      bottomMargin: 20
    },
    7: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.assets.label'),
      // header: PropertyImage,
      title: t('common:register.categoryScreen.categoryList.assets.title'),
      gold: true,
      active: false,
      headerOnly: false,
      bottomMargin: 10
    },
    8: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.assets.label1'),
      header: null,
      gold: true,
      active: false,
      headerOnly: false,
      bottomMargin: 10
    },
    9: {
      selected: false,
      label: t('common:register.categoryScreen.categoryList.assets.label2'),
      header: null,
      gold: true,
      active: false,
      headerOnly: false,
      bottomMargin: 10
    }
  });

  const [modalVisible, toggleModal] = useState(false);
  const [tapNumber, funcTapNumber] = useState(0);
  const [modalText, funcText] = useState('');
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (intial) {
      setInitial(!intial);
      handleSetMyCategory(0);
    }
  });

  function handleSetMyCategory(key) {
    setMyCategory({
      ...myCategory,
      [key]: {
        ...myCategory[key],
        active: !myCategory[key].active
      }
    });

    if (myCategory[key].active === true) {
      props.setCount(props.count + 1);
    } else {
      props.setCount(props.count - 1);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {modalVisible && (
        <Modal
          transparent={true}
          onClose={() => {
            toggleModal(false);
          }}
          buttonText1={t('common:app.confirm')}
          onPress1={() => {
            toggleModal(false);
          }}
        >
          {tapNumber == 3 ? (
            <Text style={styles.modalHeading}>
              {t('common:register.categoryScreen.categoryList.school.label2')}
            </Text>
          ) : (
            <Text style={styles.modalHeading}>
              {t('common:register.categoryScreen.categoryList.school.label1')}
            </Text>
          )}

          {tapNumber === 3 ? (
            <View style={styles.container2}>
              <Text style={styles.modalText}>{modalText}</Text>
            </View>
          ) : (
            <ScrollView style={styles.container1}>
              <Text style={styles.modalText}>{modalText}</Text>
            </ScrollView>
          )}
        </Modal>
      )}

      <ScrollView>
        {Object.keys(myCategory).map((key, index) => {
          console.log({ ...myCategory });
          return (
            <View
              key={key}
              style={[
                styles.checkCardOuter,
                { marginBottom: myCategory[key].bottomMargin }
              ]}
            >
              <View
                style={[
                  styles.iconOuter
                  // {
                  //   justifyContent: myCategory[key].headerOnly
                  //     ? 'flex-end'
                  //     : 'space-between'
                  // }
                ]}
              >
                {myCategory[key].header && (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      if (index === 2 || index === 3) {
                        if (index === 2) {
                          funcTapNumber(2);
                          funcText(
                            'Cooper Union' +
                              '\n' +
                              'Massachusetts Institute of Technology' +
                              '\n' +
                              'University of Chicago' +
                              '\n' +
                              'Stanford University' +
                              '\n' +
                              'Duke University' +
                              '\n' +
                              'Johns Hopkins University' +
                              '\n' +
                              'Northwestern University' +
                              '\n' +
                              'California Institute of Technology' +
                              '\n' +
                              'Vanderbilt University' +
                              '\n' +
                              'Rice University' +
                              '\n' +
                              'University of Notre Dame' +
                              '\n' +
                              'University of California - Berkeley' +
                              '\n' +
                              'University of California - Los Angeles' +
                              '\n' +
                              'Washington University in St. Louis' +
                              '\n' +
                              'Emory University' +
                              '\n' +
                              'Georgetown University' +
                              '\n' +
                              'University of Southern California' +
                              '\n' +
                              'Carnegie Mellon University' +
                              '\n' +
                              'University of Virginia' +
                              '\n' +
                              'Tufts University' +
                              '\n' +
                              'University of Michigan - Ann Arbor' +
                              '\n' +
                              'Wake Forest University' +
                              '\n' +
                              'New York University' +
                              '\n' +
                              'United States Military Academy' +
                              '\n' +
                              'United States Naval Academy' +
                              '\n' +
                              'Williams College' +
                              '\n' +
                              'Amherst College' +
                              '\n' +
                              'Swarthmore college' +
                              '\n' +
                              'Wellesley College' +
                              '\n' +
                              'Bowdoin College' +
                              '\n' +
                              'Carleton College' +
                              '\n' +
                              'Middlebury College' +
                              '\n' +
                              'Pomona College' +
                              '\n' +
                              'Claremont McKenna College' +
                              '\n' +
                              'Davidson College' +
                              '\n' +
                              'Grinnell College' +
                              '\n' +
                              'Haverford College' +
                              '\n' +
                              'Smith College' +
                              '\n' +
                              'Vassar College' +
                              '\n' +
                              'Washington and Lee University' +
                              '\n' +
                              'Colgate University' +
                              '\n' +
                              'Hamilton college' +
                              '\n' +
                              'Colby College' +
                              '\n' +
                              'Harvey Mudd College' +
                              '\n' +
                              'Wesleyan University' +
                              '\n' +
                              'University of Oxford, UK' +
                              '\n' +
                              'University of Cambridge, UK' +
                              '\n' +
                              'Imperial College London, UK' +
                              '\n' +
                              'UCL (University College London), UK' +
                              '\n' +
                              'LSE (The London School of Economics and Political Science, UK'
                          );
                        } else {
                          funcTapNumber(3);
                          funcText(
                            'Seoul National University' +
                              '\n' +
                              'Yonsei University' +
                              '\n' +
                              'Korea University' +
                              '\n' +
                              'KAIST' +
                              '\n' +
                              'POSTECH' +
                              '\n'
                          );
                        }

                        toggleModal(true);
                      }
                    }}
                  >
                    <Image
                      source={myCategory[key].header}
                      style={{ ...styles.icon, marginLeft: 8 }}
                    />
                  </TouchableOpacity>
                )}
                {myCategory[key].title && (
                  <Text style={styles.label}> {myCategory[key].title}</Text>
                )}
              </View>
              <View style={styles.cardClickable}>
                {myCategory[key].gold ? (
                  <TouchableOpacity
                    style={
                      myCategory[key].active
                        ? [styles.goldCheckCard, styles.activeGoldCheckCard]
                        : [styles.goldCheckCard, styles.normalGoldCheckCard]
                    }
                    onPress={() => handleSetMyCategory(key)}
                  >
                    <Text
                      style={[
                        myCategory[key].active
                          ? styles.activeGold
                          : styles.goldyellow,
                        {
                          width: '95%'
                        }
                      ]}
                    >
                      {myCategory[key].label}
                    </Text>
                    {myCategory[key].active && (
                      <Image
                        source={BlackCheckImage}
                        style={{ ...styles.iconCheckmark, alignSelf: 'center' }}
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={
                      myCategory[key].active
                        ? [styles.whiteCheckCard, styles.activeCheckCard]
                        : [styles.whiteCheckCard, styles.normalCheckCard]
                    }
                    onPress={() => handleSetMyCategory(key)}
                  >
                    <Text
                      style={[
                        styles.medium_grey_txt,
                        {
                          width: '95%'
                        }
                      ]}
                    >
                      {myCategory[key].label}
                    </Text>
                    {myCategory[key].active && (
                      <Image
                        source={index !== 0 ? BlackCheckImage : ''}
                        style={[styles.iconCheckmark, { alignSelf: 'center' }]}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
        <View style={styles.agreeContainer}>
          <CheckBox
            onPress={() => {
              setSelected(!selected);
              props.agreedToTerms(!selected);
            }}
            normalImage={CheckboxIcon}
            selected={selected}
            containerStyle={styles.chkboxIcon}
          />
          <Text style={styles.confirm}>
            {Platform.OS === 'android' ? '\t\t\t\t\t' : ''}
            {'\t'}
            {t('common:register.agreeTermsScreen.signinUpText')}{' '}
            <Text
              onPress={() => props.navigation.navigate('TermsOfService')}
              style={styles.underlineText}
            >
              {t('common:register.agreeTermsScreen.termsOfService')}
            </Text>
            ,{' '}
            <Text
              onPress={() => {
                props.navigation.navigate('LocationTerms');
              }}
              style={styles.underlineText}
            >
              {t('common:register.agreeTermsScreen.locationBased')}
            </Text>
            ,{' '}
            <Text
              onPress={() => props.navigation.navigate('PrivacyPolicy')}
              style={styles.underlineText}
            >
              {t('common:register.agreeTermsScreen.privacyPolicy')}
            </Text>
            ,{' '}
            <Text
              onPress={() => props.navigation.navigate('PersonalInformation')}
              style={styles.underlineText}
            >
              {t('common:register.agreeTermsScreen.personalInformation')}
            </Text>{' '}
            {t('common:register.agreeTermsScreen.agree')}
          </Text>
        </View>
      </ScrollView>

      <Text>{'\n'}</Text>
    </ScrollView>
  );
}
