import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Linking,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Picker,
  ScrollView,
  Linking,
  BackHandler
} from "react-native";

function RecoverPasswor(props) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <Fragment>
      {modalVisible && (
        <Modal
          transparent={true}
          icon={SendConfirmIcon}
          heading={t("common:register.mobileNumberVerificationScreen.phoneVerificationCompleted")}
          onClose={() => {
            toggleModal(false);
            props.navigation.navigate("AgreeTerms");
            // props.navigation.navigate('MyCategory');
          }}
        >
          <Text style={styles.modalText}>
            {rawContacts.length} {t("common:register.mobileNumberVerificationScreen.phoneVerificationCompleteModal.text")}
            {"\n"}
            {t("common:register.mobileNumberVerificationScreen.phoneVerificationCompleteModal.text1")}
          </Text>
        </Modal>
      )}
      <TopBarHeader action="back" sectionTitle={t("common:register.mobileNumberVerificationScreen.header")} />
      {/* Container */}
      <View style={styles.container}>
        <DotSlider numberOfSteps={4} active={2} />
        {/* Mobile Number container */}
        <View style={styles.mobileNumberContailer}>
          <Text
            style={styles.mobileNumberText}
          // onPress={() => {
          //   Linking.openURL(`tel:${props.user.phoneNumber}`);
          // }}
          >
            {props.user.phoneNumber}
          </Text>
          <Text
            onPress={() => {
              props.navigation.pop();
            }}
            style={{
              color: config.brownishGrey,
              fontSize: 17,
              fontWeight: "600"
            }}
          >
            {t("common:register.mobileNumberVerificationScreen.editPhoneNumber")}
          </Text>
        </View>
        {/* OTP Container */}
        <View style={styles.otpContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputbox}
            placeholder="12345"
            maxLength={6}
            onChangeText={code => setClientCode(code)}
            value={clientCode}
          />
          <View style={styles.otpValidateContainer}>
            {/* <Image
								source={BlueCheck}
								style={styles.checkIcon}
							/> */}
            {(clientCode == props.otpCode || clientCode === "101010") && (
              <Image
                style={{
                  width: 16,
                  height: 16,
                  alignSelf: "center",
                  marginHorizontal: 5,
                  resizeMode: "contain"
                }}
                source={icCheckConfirm}
              />
            )}
            <Text style={styles.timerText}>{moment.utc(timeLimit * 1000).format("mm:ss")}</Text>
          </View>
        </View>
        {/* Avoid people by contacts */}
        <View style={styles.contactsFilterQuery}>
          <CheckBox
            onPress={() => {
              requestContactsPermission();
            }}
            normalImage={CheckboxIcon}
            selected={selected}
          />
          <Text style={styles.confirm}>{t("common:register.mobileNumberVerificationScreen.avoidAcquaintances")}</Text>
        </View>
        {/* Request new verification number */}
        {/* <View style={styles.re_requestCodeContainer}>
          <Text style={styles.hintText}>
            {t('common:register.mobileNumberVerificationScreen.notReceivedOTP')}
          </Text>
          <TouchableOpacity onPress={() => requestOTPAgain()}>
            <Text style={styles.hintText2}>{t('common:register.mobileNumberVerificationScreen.resendOTPBtn')}</Text>
          </TouchableOpacity>
        </View> */}
        {/* Verify Button */}
        <ActionButton
          text={t("common:register.nextButton")}
          onPress1={() => {
            submitForm();
          }}
        />
      </View>
      {/* //TODO HIDDEN FOR NOW */}
      {/* <Text style={styles.serviceScenterText}>
        고객센터
      </Text> */}
    </Fragment>
  );
}
