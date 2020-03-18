import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, BackHandler } from 'react-native';

var FloatingLabel = require('react-native-floating-labels');

// Import components
import CheckBox from '@components/CheckBox';
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import InputWithTitle from '@components/InputWithTitle';
import Modal from '@components/CustomModal';

// Import config and styles
import config from '@src/config';

import CloseIcon from '@assets/images/ic_close.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';


const uniList = [
  'University of Colombia',
  'U University Corporation of Colombia',
  'La Gran Colombia Univercity',
  'National University of Colombia',
  'Externado University of Colombia',
  'Catholic University of Colombia'
]
export default function EnterHighschoolNameScreen(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("")
  const [namePlaceHolder, setNamePlaceHolder] = useState("Search High School")

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })

  return (
    <View style={styles.mainContainer}>
      <TopBarHeader action={'back'} />

      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Input your Hight School name.</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <InputWithTitle
              placeholder="학교이름을 입력해 주세요."
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          <Text style={styles.instructionText}>
            출신고교는 프로필에 표시되지 않아요.{'\n'}
            고등학교 피하기 서비스를 원활하게 제공할 수 있도록{'\n'}
            입력해주세요 :)
        </Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row', marginBottom: 18 }}>
            <CheckBox normalImage={CheckboxIcon} selected />
            <Text style={styles.confirm}>
              같은 학교사람 숨기기
            </Text>
          </View>
        </View>
      </View>
      <ActionButton text="다음"
        onPress1={() => props.navigation.navigate('BasicDetails')}
        customStyle={{
          touchableStyle: styles.buttonStyle
        }} />
      {/** Search Scool Name modal*/}
      <Modal
        outerPadding={20}
        containerPadding={20}
        shouldHideActionButton
        visible={modalVisible}
        buttonText1='입력 완료'
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ height: Dimensions.get('window').height * 0.4 }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            value={search}
            onChangeText={(text) => setSearch(text)}
            onFocus={() => {
              setNamePlaceHolder('Hight School name')
            }}
            onBlur={() => {
              if (search.length == 0) {
                setNamePlaceHolder('Search High School')
              }
            }}
          >{namePlaceHolder}</FloatingLabel>
          <TouchableOpacity style={styles.closeContainer}
            onPress={() => {
              setSearch("")
              setModalVisible(false)
              setNamePlaceHolder('Search High School')
            }}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          {search.length > 0 ?
            <FlatList
              data={uniList}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text style={styles.listItem}>
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
            : <Text style={styles.addInstruction}>
              검색되지 않는경우 직접 입력 후 추가해 주세요.
          </Text>}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1
  },
  instructionText: {
    lineHeight: 22,
    fontSize: 14,
    color: config.btnLine,
    fontFamily: config.regularFont,
    marginTop: 20
  },
  confirm: {
    fontSize: 15,
    color: config.brownishGrey,
    marginLeft: 5,
    paddingRight: 20,
    fontFamily: config.regularFont
  },
  buttonStyle: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.charcoal_grey
  },
  labelInput: {
    color: config.black,
    paddingLeft: 0,
    paddingBottom: 0,
    color: config.hintText,
    fontFamily: config.regularFont
  },
  formInput: {
    borderBottomWidth: 1,
    borderColor: config.selectBox,
  },
  input: {
    borderWidth: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    fontWeight: 'bold',
    color: config.black
  },
  addInstruction: {
    color: config.clearBlue,
    fontFamily: config.regularFont,
    fontSize: 14,
    marginTop: 5
  },
  closeContainer: {
    alignSelf: 'flex-end',
    position: 'absolute'
  },
  closeIcon: {
    width: 24,
    height: 24
  },
  listItem: {
    fontFamily: config.regularFont,
    fontSize: 16,
    paddingVertical: 10,
    color: config.black
  },
  titleText: {
    fontSize: 20,
    fontFamily: config.regularFont,
    fontWeight: 'bold',
    color: config.black,
    marginBottom: 20
  },
});
