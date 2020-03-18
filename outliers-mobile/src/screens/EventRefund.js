import React, { Component, Fragment, useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler
} from 'react-native';
import TopBarHeader from '@components/TopBarHeader';
import config from '@src/config';
import ActionButton from '@components/ActionButton';
import InputWithTitle from '../components/InputWithTitle';
import Modal from '@components/CustomModal';

const bankList = [
  'Shinhan',
  'KB',
  'Hana',
  'NongHyup',
  'Woori',
  'Korea Development Bank'
];

function EventRefundScreen(props) {
  const [modalToggled, setModalToggled] = useState(false);
  const toggleModal = () => setModalToggled(!modalToggled);
  const [bank, setBank] = useState(null);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  });
  return (
    <Fragment>
      <TopBarHeader isProfile={true} action='close' sectionTitle='환불하기' />
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.inputContainer} onPress={toggleModal}>
          <InputWithTitle
            title='은행선택'
            disabled
            iconRight={require('../assets/images/ic_open_list.png')}
            value={bank}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <InputWithTitle title='계좌주명' />
        </View>
        <View style={styles.inputContainer}>
          <InputWithTitle title='계좌번호' keyboardType='number-pad' />
        </View>
      </ScrollView>
      <ActionButton
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
        text='환불 청구'
      />
      <Modal
        visible={modalToggled}
        buttonText1='고르다'
        onClose={() => {
          setModalToggled(false);
        }}
      >
        <View>
          <Text style={styles.alertTitle}>은행을 선택하십시오</Text>
          <FlatList
            style={[styles.listBorder]}
            data={bankList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setBank(item);
                    setModalToggled(false);
                  }}
                >
                  <Text style={styles.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 34
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 0
  },
  inputContainer: {
    marginBottom: 10
  },

  listBorder: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: config.selectBox,
    marginTop: 10
  },
  itemBorder: {
    paddingVertical: 10,
    paddingLeft: 15,
    borderBottomColor: config.selectBox,
    borderBottomWidth: 1,
    color: config.brownishGrey,
    fontFamily: config.regularFont
  },
  alertTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    color: config.black
  }
});

export default EventRefundScreen;
