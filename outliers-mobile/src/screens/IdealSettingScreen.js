import React, { Fragment, useState, Component } from "react";
import { View, ScrollView, Text, StyleSheet, Picker, BackHandler } from "react-native";

//Component Import
import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { SelectGender, SelectRace, SelectSmoke, PickerImpConditionModal } from "@components/UserDetailsList";

// Import config
import config from "@src/config";

import { connect } from "react-redux";
import { getProfilePreference, updateProfilePreference } from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { withNamespaces } from "react-i18next";

// function RangeMarker(props) {
// 	const [markerValue, setMarkerValue] = useState(props.initialRange);

// 	const markerTitle = props.markerTitle;
// 	const markerUnit = props.markerUnit;
// 	const markerRange = props.markerRange;

// 	return (
// 		<View style={styles.markerContainer}>
// 			<View style={styles.markerDescriptionContainer}>
// 				<Text style={styles.markerTitle}>{markerTitle}</Text>
// 				<Text style={styles.markerValue}>
// 					{markerValue[0]} - {markerValue[1]}
// 					{markerUnit}
// 				</Text>
// 			</View>
// 			<MultiSlider
// 				values={markerValue}
// 				sliderLength={config.component_width}
// 				onValuesChange={value => setMarkerValue(value)}
// 				min={markerRange[0]}
// 				max={markerRange[1]}
// 				step={1}
// 				selectedStyle={styles.markerBackground}
// 				unselectedStyle={styles.markerInactive}
// 				markerStyle={styles.marker}
// 			// allowOverlap
// 			// snapped
// 			/>
// 		</View>
// 	);
// }

class IdealSettingScreen extends Component {
  willFocusSubscription;
  initialPreferences;
  constructor(props) {
    super(props);
    this.initialPreferences = {
      owner: props.owner,
      minAge: 18,
      maxAge: 18,
      minHeight: 150,
      maxHeight: 150,
      minDistance: 0,
      maxDistance: 0,
      sex: "입력해주세요",
      race: "Asian",
      doSmoke: "입력해주세요",
      impCondition: "sex" // height,sex or distance
    };
    this.state = {
      canScroll: true,
      preferencesLoaded: false,
      preferences: this.initialPreferences
    };
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      this.props.getProfilePreference();
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.preferences != nextProps.preferences) {
      if (nextProps.preferences != null) {
        this.setState({ preferences: nextProps.preferences });
      } else {
        this.setState({
          preferences: this.initialPreferences
        });
      }
      this.setState({ preferencesLoaded: true });
    }
    if (
      this.props.profilePreferenceStatus.status != nextProps.profilePreferenceStatus.status &&
      nextProps.profilePreferenceStatus.status == 2
    ) {
      this.props.getProfilePreference();
    }
    this.setState({ owner: nextProps.owner });
  }

  setMarkerValue = (value, type) => {
    if (type === "age") {
      this.setState({ preferences: { ...this.state.preferences, minAge: value[0], maxAge: value[1] } });
    } else if (type === "height") {
      this.setState({ preferences: { ...this.state.preferences, minHeight: value[0], maxHeight: value[1] } });
    } else if (type === "distance") {
      this.setState({ preferences: { ...this.state.preferences, minDistance: value[0], maxDistance: value[1] } });
    }
  };

  setGender = value => {
    this.setState({ preferences: { ...this.state.preferences, sex: value } });
  };

  setRace = value => {
    this.setState({ preferences: { ...this.state.preferences, race: value } });
  };

  setDoSmoke = value => {
    this.setState({ preferences: { ...this.state.preferences, doSmoke: value } });
  };

  setimpCondition = value => {
    this.setState({ preferences: { ...this.state.preferences, impCondition: value } });
  };

  submitForm = () => {
    this.props.updateProfilePreference(this.state.preferences);
  };

  render() {
    const { canScroll, preferences, preferencesLoaded } = this.state;
    const { t, i18n } = this.props;
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t("common:idealSettingScreen.setPref")}
          onPressLeftAction={() => this.props.navigation.navigate(this.props.navigation.getParam("backRoute", "My"))}
        />
        {preferencesLoaded && (
          <ScrollView style={styles.ScrollView} contentContainerStyle={styles.contentContainer} scrollEnabled={canScroll}>
            <View style={styles.markerContainer}>
              <View style={styles.markerDescriptionContainer}>
                <Text style={styles.markerTitle}>{t("common:register.basicDetailsScreen.age")}</Text>
                <Text style={styles.markerValue}>
                  {preferences.minAge} - {preferences.maxAge}
                  {t("common:idealSettingScreen.three")}
                </Text>
              </View>
              <MultiSlider
                values={[+preferences.minAge, +preferences.maxAge]}
                sliderLength={config.component_width}
                onValuesChange={value => this.setMarkerValue(value, "age")}
                min={18}
                max={40}
                step={1}
                selectedStyle={styles.markerBackground}
                unselectedStyle={styles.markerInactive}
                markerStyle={styles.marker}
              />
            </View>

            <View style={styles.markerContainer}>
              <View style={styles.markerDescriptionContainer}>
                <Text style={styles.markerTitle}>{t("common:register.basicDetailsScreen.height")}</Text>
                <Text style={styles.markerValue}>
                  {preferences.minHeight} - {preferences.maxHeight}
                  {t("common:idealSettingScreen.cm")}
                </Text>
              </View>
              <MultiSlider
                values={[+preferences.minHeight, +preferences.maxHeight]}
                sliderLength={config.component_width}
                onValuesChange={value => this.setMarkerValue(value, "height")}
                min={150}
                max={180}
                step={1}
                selectedStyle={styles.markerBackground}
                unselectedStyle={styles.markerInactive}
                markerStyle={styles.marker}
              />
            </View>

            <View style={styles.markerContainer}>
              <View style={styles.markerDescriptionContainer}>
                <Text style={styles.markerTitle}>{t("common:idealSettingScreen.distance")}</Text>
                <Text style={styles.markerValue}>
                  {preferences.minDistance} - {preferences.maxDistance}
                  {t("common:idealSettingScreen.Km")}
                </Text>
              </View>
              <MultiSlider
                values={[+preferences.minDistance, +preferences.maxDistance]}
                sliderLength={config.component_width}
                onValuesChange={value => this.setMarkerValue(value, "distance")}
                min={0}
                max={15}
                step={1}
                selectedStyle={styles.markerBackground}
                unselectedStyle={styles.markerInactive}
                markerStyle={styles.marker}
              />
            </View>

            <SelectGender t={t} i18n={i18n} callSetGender={true} setGenderFn={this.setGender} userDetails={preferences} />
            <SelectRace t={t} i18n={i18n} callSetRace={true} setRaceFn={this.setRace} userDetails={preferences} />
            <SelectSmoke t={t} i18n={i18n} callSetDoSmoke={true} setDoSmokeFn={this.setDoSmoke} userDetails={preferences} />
            <PickerImpConditionModal
              t={t}
              callSetImpCondition={true}
              setImpConditionFn={this.setimpCondition}
              userDetails={preferences}
            />

            <Text style={styles.infoText}>{t("common:idealSettingScreen.done")} </Text>
          </ScrollView>
        )}
        {preferencesLoaded && <ActionButton text={t("common:idealSettingScreen.done")} onPress1={() => this.submitForm()} />}
      </Fragment>
    );
  }
}

var styles = StyleSheet.create({
  scollView: {
    backgroundColor: config.white,
    flex: 1
  },
  contentContainer: {
    padding: 20
  },
  // Range marker
  markerContainer: {
    marginBottom: 30
  },
  markerDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  markerTitle: {
    fontSize: 15,
    color: config.charcoal_grey
  },
  markerValue: {
    fontSize: 15,
    color: config.clearBlue
  },
  markerBackground: {
    backgroundColor: config.charcoal_grey
  },
  markerInactive: {
    backgroundColor: "#eeeeee"
  },
  marker: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: config.white,
    borderColor: config.charcoal_grey
  },
  // Info Text
  infoText: {
    color: config.lightGrey,
    fontSize: 14,
    paddingVertical: 20
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    preferences: state.profile.preferences,
    owner: state.auth.user._id,
    profilePreferenceStatus: state.profile.profilePreferenceStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfilePreference: () => dispatch(getProfilePreference()),
    updateProfilePreference: preference => dispatch(updateProfilePreference(preference))
  };
};

const IdealSettingsWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(IdealSettingScreen));

export default withNamespaces(["common"], { wait: true })(IdealSettingsWrap);
