import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  Dimensions,
  PermissionsAndroid,
  AsyncStorage,
  Alert,
  BackHandler
} from "react-native";
import Contacts from "react-native-contacts";

// Import components
import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
// Import config file
import config from "@src/config";
import api from "./../services/AuthApiService";
import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
const { width } = Dimensions.get("window");
import { withNamespaces } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
function HidePeopleScreen(props) {
  const [phoneFilter, changePhoneFilter] = useState(
    !!parseInt(props.user.hideContact)
  );
  const [uniFilter, changeUniFilter] = useState(
    !!parseInt(props.user.hideCollege)
  );
  const [company, changeCompanyFilter] = useState(
    !!parseInt(props.user.hideColleagues)
  );
  const [gym, changeAvoidMembersOfSameGym] = useState(
    !!parseInt(props.user.hideGym)
  );
  const [highSchool, changeAvoidSameHighSchool] = useState(
    !!parseInt(props.user.hideSchool)
  );
  const [sameSex, changeAvoidSameSex] = useState(
    !!parseInt(props.user.hideSameGender)
  );
  const [selected, setSelected] = useState(false);
  const [rawContacts, setRawContacts] = useState([]);

  const { t } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })

  function _hidePeople() {
    console.log(
      JSON.stringify({
        hideCollege: uniFilter,
        hideSchool: highSchool,
        hideContact: phoneFilter,
        hideColleagues: company,
        hideGym: gym,
        hideSameGender: sameSex
      })
    );

    props.updateUserProfile({
      hideCollege: uniFilter ? "1" : "0",
      hideSchool: highSchool ? "1" : "0",
      hideContact: phoneFilter ? "1" : "0",
      hideColleagues: company ? "1" : "0",
      hideGym: gym ? "1" : "0",
      hideSameGender: sameSex ? "1" : "0"
    });
  }

  async function putUserDetails(data) {
    const token = await AsyncStorage.getItem("@token:key");
    const response = await api.putUserDetails(token, data);
  }

  (function requestContactsPermission() {
    if (Platform.OS == "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: t(
          "common:register.mobileNumberVerificationScreen.contactPermission.title"
        ),
        message: t(
          "common:register.mobileNumberVerificationScreen.contactPermission.message"
        )
      })
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Contacts.getAll((err, contacts) => {
              setRawContacts(contacts);
            });
          } else {
            // Handle
            setSelected(false);
            setRawContacts([]);
          }
        })
        .catch(err => {
          debugger;
          console.log("PermissionsAndroid", err);
        });
    }
  })();

  return (
    <Fragment>
      <TopBarHeader
        sectionTitle={t("common:myScreen.avoidPeople")}
        action={"back"}
      />
      <View style={styles.container}>
        <View style={styles.listItem}>
          <Text style={styles.label}>
            {t("common:hidePeopleScreen.contactHide")}
          </Text>
          <Switch
            ios_backgroundColor="#BCBFC1"
            trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
            thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
            value={phoneFilter}
            onValueChange={val => {
              changePhoneFilter(val);
              props.updateUserProfile({
                hideContact: val ? "1" : "0"
              });
            }}
          />
        </View>
        <ActionButton
          onPress1={() => {
            Alert.alert(t("common:myScreen.blockContactsAlert"));
            let importedContacts = [];
            if (rawContacts.length > 0) {
              importedContacts = rawContacts
                .filter(contact => !!contact.phoneNumbers[0])
                .map(newContact =>
                  newContact.phoneNumbers[0].number
                    .replace(/[\W_]/g, "-")
                    .replace(/-/g, "")
                );
            }

            putUserDetails({
              blockedContacts: importedContacts
            });
          }}
          customStyle={{ touchableStyle: styles.buttonStyle }}
          text={t("common:hidePeopleScreen.registerContact")}
        />
        <View style={styles.listItem}>
          <Text style={styles.label}>
            {t("common:hidePeopleScreen.hideCollege")}
          </Text>
          <Switch
            ios_backgroundColor="#BCBFC1"
            trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
            thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
            value={uniFilter}
            onValueChange={val => {
              changeUniFilter(val);
              props.updateUserProfile({
                hideCollege: val ? "1" : "0"
              });
            }}
          />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>
            {t("common:hidePeopleScreen.hideColleague")}
          </Text>
          <Switch
            ios_backgroundColor="#BCBFC1"
            trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
            thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
            value={company}
            onValueChange={val => {
              changeCompanyFilter(val);
              props.updateUserProfile({
                hideColleagues: val ? "1" : "0"
              });
            }}
          />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>
            {t("common:hidePeopleScreen.hideGym")}
          </Text>
          <Switch
            ios_backgroundColor="#BCBFC1"
            trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
            thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
            value={gym}
            onValueChange={val => {
              changeAvoidMembersOfSameGym(val);
              props.updateUserProfile({
                hideGym: val ? "1" : "0"
              });
            }}
          />
        </View>
        {/* <View style={styles.listItem}>
					<Text style={styles.label}>
						{t('common:hidePeopleScreen.hideSchool')}
					</Text>
					<Switch
						ios_backgroundColor="#bbbbbb"
						trackColor={{
							true:
								Platform.OS == 'android'
									? '#BCBFB1'
									: '#45494E',
							false:
								Platform.OS == 'android' ? '#BCBFB1' : '#BBBBBB'
						}}
						thumbColor={[
							Platform.OS == 'ios' ? '#FFFFFF' : '#FFFFFF'
						]}
						value={highSchool}
						onValueChange={val => {
							changeAvoidSameHighSchool(val);
							props.updateUserProfile({
								hideSchool: val ? '1' : '0'
							});
						}}
					/>
				</View> */}
        <View style={styles.listItem}>
          <Text style={styles.label}>
            {t("common:hidePeopleScreen.hideSameGender")}
          </Text>
          <Switch
            ios_backgroundColor="#BCBFC1"
            trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
            thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
            value={sameSex}
            onValueChange={val => {
              changeAvoidSameSex(val);
              props.updateUserProfile({
                hideSameGender: val ? "1" : "0"
              });
            }}
          />
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: config.white_grey
  },
  listItem: {
    minHeight: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: config.whiteTwo
  },
  label: {
    fontSize: 15,
    width: "80%",
    color: config.black,
    paddingLeft: 6
  },
  note: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 58
  },
  buttonStyle: {
    width: width - 30,
    height: 48,
    // marginHorizontal: 16,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: config.navyBlack
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    userDetails: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: (profile, uri) =>
      dispatch(AuthActions.updateUserProfile(profile, uri)),
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data)),
    getUserInfo: () => dispatch(AuthActions.getUserInfo())
  };
};

const HidePeopleScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(HidePeopleScreen));

export default withNamespaces(["common"], { wait: true })(HidePeopleScreenHOC);
