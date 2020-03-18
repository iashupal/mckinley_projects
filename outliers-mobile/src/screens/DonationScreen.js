import React, { Fragment, Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler } from "react-native";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { connect } from "react-redux";
import { initiateDonation } from "../store/actions";
import { withNamespaces } from "react-i18next";
// Import components
import DonationTagsList from "@components/DonationTagsList";
import ActionButton from "@components/ActionButton";
import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";
import api from "@services/DonationApiService";
import AsyncStorage from "@react-native-community/async-storage";

// Import config and styles
class MyEditTagsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtags: ""
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  submitDonation = async () => {
    console.log(this.state.hashtags);

    let payload = {
      hashtags: this.state.hashtags.join(",")
    };
    try {
      let token = await AsyncStorage.getItem("@token:key");
      if (token) {
        const response = await api.submitDonation(token, payload);
        if (response.ok) {
          Alert.alert(this.props.t("common:app.donatedAlert"));
        } else {
          Alert.alert(response.data.Body);
        }
      } else {
        NavigationService.navigate("LoginScreen");
      }
    } catch (error) {
      // yield put(actions.authFail(error));
    }
    //this.props.initiateDonation(payload);
  };
  render() {
    const donationTags = {
      0: [`${this.props.t("common:app.nutrition")}`, false],
      1: [`${this.props.t("common:app.education")}`, false],
      2: [`${this.props.t("common:app.childRights")}`, false],
      3: [`${this.props.t("common:app.singleMother")}`, false],
      4: [`${this.props.t("common:app.singleParentFamily")}`, false],
      5: [`${this.props.t("common:app.elderlyLivingAlone")}`, false],
      6: [`${this.props.t("common:app.emergencyRelief")}`, false],
      7: [`${this.props.t("common:app.afterwards")}`, false]
    };
    return (
      <Fragment>
        <TopBarHeader sectionTitle={this.props.t("common:app.sponser")} action={"back"} isProfile />

        <View style={styles.container}>
          <Text style={styles.infoText}>
            {this.props.t("common:app.memberOfOutliers")} {"\n"}{" "}
            <Text style={styles.ctaText}>{this.props.t("common:app.selectFieldToParti")}</Text>
          </Text>
          <DonationTagsList
            tags={donationTags}
            multiSelection={true}
            onchangeSelectedTags={tags => {
              this.setState({
                hashtags: tags
              });
            }}
          />
        </View>
        <Text style={styles.info2Text}>{this.props.t("common:app.quaterlySelectedPeriod")}</Text>
        <ActionButton
          onPress1={() => this.submitDonation()}
          text={this.props.t("common:app.sponser")}
          customStyle={{
            touchableStyle: styles.bottomButtonStyle
          }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  infoText: {
    fontSize: 16,
    color: config.greyishBrown,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 29
  },
  ctaText: {
    color: "black",
    fontWeight: "900"
  },
  info2Text: {
    fontSize: 12,
    color: config.lightGrey,
    textAlign: "center",
    paddingBottom: 30
  },
  linkText: {
    fontSize: 12,
    color: config.brownishGrey,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontWeight: "900",
    paddingVertical: 15
  },
  bottomButtonStyle: {
    flex: 1,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.navyBlack,
    borderRadius: 0
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateDonation: donation => dispatch(initiateDonation(donation))
  };
};

const DonationScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(MyEditTagsScreen));
export default withNamespaces(["common"], {
  wait: true
})(DonationScreenHOC);
