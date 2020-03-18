import React, { Fragment, Component } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";

import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
import PhotoSelection from "@components/PhotoSelection";

import config from "@src/config";

import icOpenList from "@assets/images/ic_open_list.png";

import { connect } from "react-redux";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { initiateMomentUpload } from "../store/actions";

import Geolocation from "react-native-geolocation-service";
import { hasLocationPermission } from "../utils/geolocation";

import { getAge } from "@utils/utility";
import { withNamespaces } from "react-i18next";

class MomentUploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMoment: {
        imageIndex: 0,
        owner: props.owner,
        location: {
          type: "Point",
          coordinates: []
        },
        description: ""
      },
      userPhotos: [],
      dob: new Date(),
      disabled: false
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
    this.setState({ userPhotos: this.props.userPhotos, dob: this.props.dob });
    const hasLocationPermissionFlag = await hasLocationPermission();
    if (hasLocationPermissionFlag) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            newMoment: {
              ...this.state.newMoment,
              location: {
                type: "Point",
                coordinates: [
                  position.coords.longitude,
                  position.coords.latitude
                ]
              }
            }
          });
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true
        }
      );
    } else {
      console.log("Permission Denied or revoked");
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userPhotos: nextProps.userPhotos, dob: nextProps.dob });
  }

  changedSelectedImage = index => {
    this.setState({
      newMoment: { ...this.state.newMoment, imageIndex: index }
    });
  };

  addNewMoment = () => {
    this.setState({
      disabled: true
    });

    // enable after 5 second
    setTimeout(() => {
      this.setState({
        disabled: false
      });
    }, 5000);

    this.props.initiateMomentUpload(this.state.newMoment);
  };

  render() {
    console.log(this.state);
    const { t, college } = this.props;
    return (
      <Fragment>
        <KeyboardAvoidingView
          style={styles.container1}
          behavior="padding"
          enabled
        >
          <TopBarHeader
            sectionTitle={t("momentUploadScreen:momentUpload")}
            action="close"
          />
          <View style={{ marginLeft: 20 }}>
            <PhotoSelection
              photos={this.state.userPhotos}
              currentSelectedImage={this.state.newMoment.imageIndex}
              changedSelectedImage={this.changedSelectedImage}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.warningText}>
              {t("momentUploadScreen:onlyOneSelect")}
            </Text>
            <Text style={styles.bio}>
              {t("momentUploadScreen:ageValue", {
                value: getAge(this.state.dob)
              })}
              , {college}{" "}
              <Image
                style={{
                  width: 11,
                  height: 6,
                  resizeMode: "contain"
                }}
                source={icOpenList}
              />
            </Text>
            <View style={styles.momentDetails}>
              <TextInput
                style={styles.momentDetailsInput}
                scrollEnabled={true}
                placeholder={t("momentUploadScreen:content")}
                multiline={true}
                autoCompleteType={"off"}
                autoCorrect={false}
                textAlignVertical={"top"}
                onChangeText={description =>
                  this.setState({
                    newMoment: { ...this.state.newMoment, description }
                  })
                }
                value={this.state.newMoment.description}
              />
            </View>
          </View>
          <ActionButton
            customStyle={{
              touchableStyle: styles.buttonStyle
            }}
            disabled={this.state.disabled}
            onPress1={() => this.addNewMoment()}
            text={t("common:app.complete")}
          />
        </KeyboardAvoidingView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  container1: {
    flex: 1,
    paddingHorizontal: 0,
    marginBottom: 0
  },
  bio: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    marginVertical: 10
  },
  momentDetails: {
    height: 152,
    backgroundColor: config.white,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    borderRadius: 4
  },
  momentDetailsInput: {
    flex: 1,
    marginLeft: 14
  },
  warningText: {
    textAlign: "left",
    lineHeight: 17,
    marginTop: -30,
    color: config.soft_blue,
    fontSize: 13
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 0
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.auth.loading,
    owner: state.auth.user._id,
    userPhotos: state.auth.user.photos,
    dob: state.auth.user.dob,
    college: state.auth.user.college
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateMomentUpload: moment => dispatch(initiateMomentUpload(moment))
  };
};

const MomentUploadHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(MomentUploadScreen));

export default withNamespaces(["common", "momentUploadScreen"], {
  wait: true
})(MomentUploadHOC);
