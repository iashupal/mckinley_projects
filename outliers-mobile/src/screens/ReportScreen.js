import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  BackHandler,
  AsyncStorage
} from "react-native";
// Import components
import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
import Modal from "@components/HashtagModal";
import ImagePicker from "react-native-image-picker";
// Import config and assets
import config from "@src/config";
import ReportIcon from "@assets/images/ic_report2.png";
import DeleteIcon from "@assets/images/ic_delete.png";
import { connect } from "react-redux";
import { reportUser } from "../store/actions";
import vibeFunc from '../services/VibesApiService';
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { withNamespaces } from "react-i18next";
function ReportScreen(props) {
  const [imageSource, setImageSource] = useState(null);
  const [reason1, toggleR1] = useState(false);
  const [reason2, toggleR2] = useState(false);
  const [reason3, toggleR3] = useState(false);
  const [reason4, toggleR4] = useState(false);
  const [reportText, setText] = useState("");
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const { t } = props;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.goBack(null);
      return true;
    });
  });
  function openGallery() {
    const options = {
      title: t("common:app.selectImage"),
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert(t("common:app.error"), t("common:app.errorGallery"));
      } else {
        setImageSource(response);
      }
    });
  }

  const reportedModal = props => {
    const { t } = props;
    return (
      <Modal
        transparent={true}
        buttonText1={t("reportScreen:close")}
        visible={reportModalVisible}
        onCancel={() => {
          setReportModalVisible(!reportModalVisible);
          props.navigation.goBack(null);
        }}
      >
        <View style={styles.innerModalContainer}>
          <Text style={styles.textHeader}>{t("reportScreen:reported")}</Text>
        </View>
      </Modal>
    );
  }

  async function _reportUser() {
    const { t } = props;
    let token = await AsyncStorage.getItem('@token:key');
    let userId = await AsyncStorage.getItem('@userid:key');
    let report_type = t("reportScreen:option1");
    if (reason1) {
      report_type = `${t("reportScreen:option1")},${report_type}`;
    }
    if (reason2) {
      report_type = `${t("reportScreen:option2")},${report_type}`;
    }
    if (reason3) {
      report_type = `${t("reportScreen:option3")},${report_type}`;
    }
    if (reason4) {
      report_type = `${t("reportScreen:option4")},${report_type}`;
    }
    if (!imageSource) {
      Alert.alert(t("common:app.error"), t("common:app.attachImage"));
      return;
    }
    if (!reportText) {
      Alert.alert(t("common:app.error"), t("reportScreen:fewWords"));
      return;
    }
    let params = {
      report_type: report_type,
      reportee_id: userId,
      report_info: reportText ? reportText : "",
      type: props.navigation.getParam("type").toLowerCase(),
      momentVibeOrCommentId: props.navigation.getParam("vibeOrMomentId")
    };
    const res = await vibeFunc.reportUser(token, params, imageSource.uri);
    setReportModalVisible(!reportModalVisible);
    toggleR1(false);
    toggleR2(false);
    toggleR3(false);
    toggleR4(false);
    setText("");
    setImageSource(null);
  }
  return (
    <Fragment>
      <TopBarHeader
        action="close"
        //sectionTitle={t('reportScreen:header')}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <Image style={styles.reportIcon} source={ReportIcon} />
          <View>
            <Text style={styles.prompt}>{t("reportScreen:chooseWhy")}</Text>
            <Text style={styles.prompt2}>{t("reportScreen:reviewAction")}</Text>
          </View>
          <View style={styles.buttonRow}>
            <ActionButton
              customStyle={
                !reason1
                  ? {
                      touchableStyle: styles.actionButton,
                      buttonTextStyle: styles.buttonText
                    }
                  : {
                      touchableStyle: [styles.actionButton, styles.activeButton],
                      buttonTextStyle: styles.activeButtonText
                    }
              }
              onPress1={() => toggleR1(!reason1)}
              // text={'1. 욕설 및 음담패설'}
              text={t("reportScreen:option1")}
            />
            <ActionButton
              customStyle={
                !reason2
                  ? {
                      touchableStyle: styles.actionButton,
                      buttonTextStyle: styles.buttonText
                    }
                  : {
                      touchableStyle: [styles.actionButton, styles.activeButton],
                      buttonTextStyle: styles.activeButtonText
                    }
              }
              onPress1={() => toggleR2(!reason2)}
              text={t("reportScreen:option2")}
            />
          </View>
          <View style={styles.buttonRow}>
            <ActionButton
              customStyle={
                !reason3
                  ? {
                      touchableStyle: styles.actionButton,
                      buttonTextStyle: styles.buttonText
                    }
                  : {
                      touchableStyle: [styles.actionButton, styles.activeButton],
                      buttonTextStyle: styles.activeButtonText
                    }
              }
              onPress1={() => toggleR3(!reason3)}
              text={t("reportScreen:option3")}
            />
            <ActionButton
              customStyle={
                !reason4
                  ? {
                      touchableStyle: styles.actionButton,
                      buttonTextStyle: styles.buttonText
                    }
                  : {
                      touchableStyle: [styles.actionButton, styles.activeButton],
                      buttonTextStyle: styles.activeButtonText
                    }
              }
              onPress1={() => toggleR4(!reason4)}
              text={t("reportScreen:option4")}
            />
          </View>
          {!imageSource && (
            <ActionButton
              customStyle={{
                touchableStyle: styles.addImageButton,
                buttonTextStyle: styles.addImageText
              }}
              onPress1={() => openGallery()}
              //source={DeleteIcon}
              text={"+ " + t("reportScreen:uploadImage")}
            />
          )}
          {imageSource && (
            <View style={styles.uploadedImage}>
              <Text>{imageSource.fileName}</Text>
              <TouchableOpacity onPress={() => setImageSource(null)}>
                <Image
                  style={{
                    width: 20,
                    height: 30
                  }}
                  source={DeleteIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.reportDetails}>
            <TextInput
              maxLength={200}
              style={styles.reportDetailsInput}
              scrollEnabled={true}
              onChangeText={text => {
                setText(text);
              }}
              value={reportText}
              placeholder={t("reportScreen:context")}
              multiline={true}
            />
          </View>
          <Text style={styles.warningText}>
            {t("reportScreen:warning")}
            <Text style={{ color: "red" }}>{t("reportScreen:redNote")}</Text>
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          _reportUser();
        }}
        style={styles.reportButton}
      >
        <Text style={styles.reportButtonText}>{t("reportScreen:header")}</Text>
      </TouchableOpacity>
      {reportedModal(props)}
    </Fragment>
  );
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reportUser: (data, image) => dispatch(reportUser(data, image))
  };
};
const styles = StyleSheet.create({
  reportIcon: {
    width: 100,
    height: 84,
    marginTop: 4
  },
  prompt: {
    fontFamily: "NotoSansKR-Bold",
    color: config.black,
    alignSelf: "center",
    fontSize: 16
  },
  prompt2: {
    fontFamily: "NotoSansKR-Regular",
    color: config.black,
    fontSize: 16,
    width: Dimensions.get("window").width - 50,
    textAlign: "center"
  },
  buttonRow: {
    flexDirection: "row",
    width: config.component_width,
    justifyContent: "space-between",
    marginVertical: 5
  },
  actionButton: {
    width: config.component_width * 0.49,
    height: 48,
    borderRadius: 4,
    backgroundColor: config.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dddddd"
  },
  activeButton: {
    borderColor: config.charcoal_grey
  },
  activeButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: config.charcoal_grey,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  buttonText: {
    fontSize: 15,
    color: config.btnLine,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  addImageButton: {
    marginTop: 10,
    width: config.component_width,
    height: 52,
    borderRadius: 4,
    backgroundColor: config.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#dddddd"
  },
  addImageText: {
    fontFamily: "NotoSansKr-Bold",
    fontWeight: "bold",
    fontSize: 15,
    color: config.btnLine
  },
  uploadedImage: {
    borderRadius: 4,
    marginVertical: 10,
    backgroundColor: config.lightGreyBg,
    width: config.component_width,
    height: 52,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row"
  },
  reportDetails: {
    marginTop: 10,
    width: config.component_width,
    height: 152,
    backgroundColor: config.white_grey,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    borderRadius: 4,
    paddingHorizontal: 14
  },
  reportDetailsInput: {
    width: "100%"
  },
  warningText: {
    marginTop: 16,
    paddingHorizontal: 20,
    lineHeight: 18,
    color: config.brownishGrey,
    fontSize: 13,
    marginBottom: 53
  },
  reportButton: {
    width: "100%",
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  reportButtonText: {
    color: "white",
    fontFamily: "NotoSansKR-Bold",
    fontSize: 17
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeader: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black
  }
});
const ReportScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ReportScreen));
export default withNamespaces(["common", "reportScreen"], {
  wait: true
})(ReportScreenHOC);
