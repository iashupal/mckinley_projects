import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
  NavigationActions
} from "react-navigation";
import {
  Image, View, BackHandler, Platform, Alert, Linking, TouchableOpacity, NativeModules,
  DeviceEventEmitter
} from "react-native";
import axios from "axios";
import DeviceInfo from "react-native-device-info";
import RNPreventScreenshot from 'react-native-prevent-screenshot';
import { setCustomText } from "react-native-global-props";
// import NetInfo, {
//   NetInfoState,
//   NetInfoSubscription
// } from "@react-native-community/netinfo";
// Redux + Saga
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { connect } from "react-redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./src/store/reducers";
import {
  watchAuth,
  watchMoment,
  watchVibe,
  watchMomentVibeComments,
  watchProfile,
  watchStore,
  watchDonation
} from "./src/store/sagas";
import i18n from "./src/constants/i18n";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
import { withNamespaces } from "react-i18next";
import RNSplashScreen from "react-native-splash-screen";

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchMoment);
sagaMiddleware.run(watchVibe);
sagaMiddleware.run(watchMomentVibeComments);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchStore);
sagaMiddleware.run(watchDonation);

import * as HOC from "@components/HOC";

const FullScreenHOC = HOC.FullScreenHoc(View);

// Authentication-related screens
import SplashScreen from "@screens/SplashScreen";
import RegisterScreen from "@screens/RegisterScreen";
import RegisterOTP_1Screen from "@screens/RegisterOTP_1Screen";
import RegisterOTP_2Screen from "@screens/RegisterOTP_2Screen";
import RegisterAgreeScreen from "@screens/RegisterAgreeScreen";
import RegisterCategoryScreen from "@screens/RegisterCategoryScreen";
import RegisterDetailsScreen from "@screens/RegisterDetailsScreen";
import VerifyJobScreen from "@screens/VerifyJobScreen";
import VerifySchoolScreen from "@screens/VerifySchoolScreen";
import RegisterPhotoScreen from "@screens/RegisterPhotoScreen";
import FindAccountScreen from "@screens/FindAccountScreen";
import LoginScreen from "@screens/LoginScreen";
import ReEntryScreen from "@screens/ReEntryScreen";
import BasicDetailsScreen from "@screens/BasicDetailsScreen";
import SelfIntroductionScreen from "@screens/SelfIntroductionScreen";
import LocationAutocompleteScreen from "@screens/LocationAutocompleteScreen";
import EnterHighschoolNameScreen from "@screens/EnterHighschoolNameScreen";
import UnivercityNameScreen from "@screens/UnivercityNameScreen";
import SelectOccupationScreen from "@screens/SelectOccupationScreen";
import CareerChoiceScreen from "@screens/CareerChoiceScreen";
import ReferralScreen from "@screens/ReferralScreen";
import PickInterest from "@src/screens/PickInterest";
import VerificationNetWorth from "@src/screens/VerificationNetWorth";
import NicknameScreen from "@src/screens/NicknameScreen";

// Vibe-related screens
import VibesScreen from "@screens/VibesScreen";
import VibeDetailsScreen from "@screens/VibeDetailsScreen";
import VibeUploadScreen from "@screens/VibeUploadScreen";
import VibeMyScreen from "@screens/VibeMyScreen";
import SearchVibeScreen from "@screens/SearchVibeScreen";
import FollowingListScreen from "@screens/FollowingListScreen";

// Moments-related-screens
import MomentScreen from "@screens/MomentsScreen";
import MomentsDetailScreen from "@screens/MomentsDetailScreen";
import ProfileScreen from "@screens/ProfileScreen";
import MomentUploadScreen from "@screens/MomentUploadScreen";
import MomentsMyScreen from "@screens/MomentsMyScreen";
import ReportScreen from "@screens/ReportScreen";
import MomentLocation from "@screens/MomentLocation";

// Events-related screens
import EventListingScreen from "@screens/EventListingScreen";
import EventsMyScreen from "@screens/EventsMyScreen";
import NewEventScreen from "@screens/NewEventScreen";
import EventDetailScreen from "@screens/EventDetailScreen";
import EventReviewListScreen from "@screens/EventReviewListScreen";
import EventWriteReviewScreen from "@screens/EventWriteReviewScreen";
import EventPayScreen from "@screens/EventPayScreen";
import EventGoldDetailScreen from "@screens/EventGoldDetailScreen";
import EventNormalDetailScreen from "@screens/EventNormalDetailScreen";
import EventDetailMyScreen from "@screens/EventDetailMyScreen";

// More-related screens
import MoreScreen from "@screens/MoreScreen";
import ServiceCenterScreen from "@screens/ServiceCenterScreen";
import DeactivateScreen from "@screens/DeactivateScreen";
import DonationScreen from "@screens/DonationScreen";
import FaqScreen from "@screens/FaqScreen";
import TermsOfServiceScreen from "@screens/TermsOfServiceScreen";
import EditProfileScreen from "@screens/EditProfileScreen";
import EditMyTagsScreen from "@screens/EditMyTagsScreen";
import NotificationScreen from "@screens/NotificationScreen";
import MyScreen from "@screens/MyScreen";
import HidePeopleScreen from "@screens/HidePeopleScreen";
import StoreScreen from "@screens/StoreScreen";
import UseCoffeeScreen from "@screens/UseCoffeeScreen";
import IdealSettingScreen from "@screens/IdealSettingScreen";
import MobileNumberVerificationScreen from "@screens/MobileNumberVerificationScreen";
import RefuseScreen from "@screens/RefuseScreen";
import AgreeTermsScreen from "@screens/AgreeTermsScreen";
import ChangePasswordScreen from "@screens/ChangePasswordScreen";
import PersonalInformationScreen from "@screens/PersonalInformationScreen";
import NoInternetScreen from "@screens/NoInternetScreen";

// Alarm Navigations
import NoticeScreen from "@screens/NoticeScreen";
import ProfileMatched from "@screens/ProfileMatched";

// TabBar Icons
import VibesTabIcon from "@assets/images/ic_vibes.png";
import MomentsTabIcon from "@assets/images/ic_moments.png";
import StoreIcon from "@assets/images/ic_clover.png";

import NavigationService from "@services/NavigationService";
import config from "@src/config";
import ProfileViewRequest from "@src/screens/ProfileViewRequest";
import ProfileComments from "@src/screens/ProfileComments";
import ProfileSend from "@src/screens/ProfileSend";
import ProfileSendLikeCoffee from "@src/screens/ProfileSendLikeCoffee";
import AuthenticateInKind from "@src/screens/AuthenticateInKind";
import IdentityVerfication from "@src/screens/IdentityVerification";
import SubscribedID from "@src/screens/SubscribedID";
import MyMomentCommentScreen from "@src/screens/MyMomentCommentScreen";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";
import LocationTermsOfUse from "./src/screens/LocationTermsOfUse";
import ChangeEmailPhoneScreen from "@src/screens/ChangeEmailPhoneScreen";
import AsyncStorage from "@react-native-community/async-storage";

console.disableYellowBox = true;

// const customTextProps = {
//   style: {
//     fontFamily:
//       Platform.OS === 'ios' && i18n.language === 'ko'
//         ? 'AppleSDGothicNeo-Bold'
//         : ''
//   }
// };

// setCustomText(customTextProps);

const AuthenticationNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    OTP_1: RegisterOTP_1Screen,
    OTP_2: withNamespaces(["common"], { wait: true })(RegisterOTP_2Screen),
    MyCategory: withNamespaces(["common"], { wait: true })(RegisterCategoryScreen),
    MyDetails: RegisterDetailsScreen,
    VerifyJob: VerifyJobScreen,
    VerifySchool: VerifySchoolScreen,
    TermsOfService: TermsOfServiceScreen,
    PersonalInformation: PersonalInformationScreen,
    LocationTerms: LocationTermsOfUse,
    PhotoUpload: withNamespaces(["common"], { wait: true })(RegisterPhotoScreen),
    Agreement: RegisterAgreeScreen,
    VerfiyNetworth: withNamespaces(["common"], { wait: true })(VerificationNetWorth),
    ForgotPassword: withNamespaces(["common"], { wait: true })(FindAccountScreen),
    IdentityVerify: IdentityVerfication,
    SubscribedID: withNamespaces(["common"], { wait: true })(SubscribedID),
    ReEntry: withNamespaces(["common"], { wait: true })(ReEntryScreen),
    MobileNumberVerification: withNamespaces(["common"], { wait: true })(MobileNumberVerificationScreen),
    Refuse: withNamespaces(["common"], { wait: true })(RefuseScreen),
    AgreeTerms: withNamespaces(["common"], { wait: true })(AgreeTermsScreen),
    BasicDetails: withNamespaces(["common"], { wait: true })(BasicDetailsScreen),
    LocationAutocomplete: withNamespaces(["common"], { wait: true })(LocationAutocompleteScreen),
    EnterHighschoolName: EnterHighschoolNameScreen,
    PrivacyPolicy: PrivacyPolicy,
    UnivercityName: withNamespaces(["common"], { wait: true })(UnivercityNameScreen),
    SelectOccupation: withNamespaces(["common"], { wait: true })(SelectOccupationScreen),
    CareerChoice: CareerChoiceScreen,
    ReferralScreen: ReferralScreen,
    AuthenticateInKind: AuthenticateInKind
  },
  {
    initialRouteName: "Register",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AlarmNavigator = createStackNavigator(
  {
    NoticeScreen: NoticeScreen,
    ProfileViewRequest: ProfileViewRequest,
    ProfileMatched: ProfileMatched,
    ProfileSendLikeCoffee
  },
  {
    initialRouteName: "NoticeScreen",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const VibeNavigator = createStackNavigator(
  {
    VibesMain: VibesScreen,
    VibeDetails: VibeDetailsScreen,
    VibeUpload: VibeUploadScreen,
    EditProfile: EditProfileScreen,
    VibeMy: VibeMyScreen,
    Notification: AlarmNavigator,
    LocationAutocomplete: LocationAutocompleteScreen,
    VibeReport: ReportScreen,
    MoreMain: MoreScreen,
    Deactivate: DeactivateScreen,
    Faq: FaqScreen,
    NoInternet: NoInternetScreen,
    VerifyJob: VerifyJobScreen,
    VerifySchool: VerifySchoolScreen,
    TermsOfService: TermsOfServiceScreen,
    PrivacyPolicy: PrivacyPolicy,
    Report: ReportScreen,
    HidePeople: HidePeopleScreen,
    ServiceCenter: ServiceCenterScreen,
    SearchVibe: SearchVibeScreen,
    Store: StoreScreen,
    Donation: DonationScreen,
    ProfileComments: ProfileComments,
    VerfiyNetworth: VerificationNetWorth,
    AuthenticateInKind: AuthenticateInKind,
    UnivercityName: UnivercityNameScreen,
    SelectOccupation: SelectOccupationScreen,
    My: MyScreen,
    FollowingList: FollowingListScreen,
    ChangePassword: ChangePasswordScreen,
    ChangeEmailPhoneScreen: ChangeEmailPhoneScreen,
    ProfileMatched: ProfileMatched,
    ProfileSendLikeCoffee,
    Nickname: withNamespaces(["common"], { wait: true })(NicknameScreen),
    PickInterest: PickInterest,
    SelfIntroductionScreen: SelfIntroductionScreen
  },
  {
    initialRouteName: "VibesMain",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

VibeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const MomentUploadStack = createStackNavigator({
  MomentUploadStack: MomentUploadScreen
  /* any other route you want to render above the tab bar */
});

MomentUploadStack.navigationOptions = ({ navigation }) => {
  return (tabBarVisible = false);
};

const MomentsNavigator = createStackNavigator(
  {
    MomentsMain: MomentScreen,
    MomentsDetail: MomentsDetailScreen,
    MyMomentsComment: MyMomentCommentScreen,
    VerifyJob: VerifyJobScreen,
    VerifySchool: VerifySchoolScreen,
    EditProfile: EditProfileScreen,
    ProfileViewRequest: ProfileViewRequest,
    Faq: FaqScreen,
    NoInternet: NoInternetScreen,
    PrivacyPolicy: PrivacyPolicy,
    TermsOfService: TermsOfServiceScreen,
    UnivercityName: UnivercityNameScreen,
    SelectOccupation: SelectOccupationScreen,
    LocationAutocomplete: LocationAutocompleteScreen,
    VerfiyNetworth: VerificationNetWorth,
    // Profile: ProfileScreen,
    ServiceCenter: ServiceCenterScreen,
    Profile: ProfileSend,
    AuthenticateInKind: AuthenticateInKind,
    Store: StoreScreen,
    MoreMain: MoreScreen,
    MomentUpload: MomentUploadScreen,
    Donation: DonationScreen,
    Notification: AlarmNavigator,
    HidePeople: HidePeopleScreen,
    MomentsMy: MomentsMyScreen,
    My: MyScreen,
    Report: ReportScreen,
    MomentLocation: MomentLocation,
    ProfileMatched: ProfileMatched,
    ProfileSendLikeCoffee
  },
  {
    initialRouteName: "MomentsMain",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

MomentsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const MoreNavigator = createStackNavigator(
  {
    MoreMain: MoreScreen,
    ServiceCenter: ServiceCenterScreen,
    SelfIntroduction: SelfIntroductionScreen,
    Deactivate: DeactivateScreen,
    NoInternet: NoInternetScreen,
    Donation: DonationScreen,
    Faq: FaqScreen,
    VerifyJob: VerifyJobScreen,
    VerifySchool: VerifySchoolScreen,
    Report: ReportScreen,
    TermsOfService: TermsOfServiceScreen,
    EditProfile: EditProfileScreen,
    EditTags: EditMyTagsScreen,
    // Notification: NotificationScreen,
    Notification: AlarmNavigator,
    AuthenticateInKind: AuthenticateInKind,
    My: MyScreen,
    IdealSetting: IdealSettingScreen,
    HidePeople: HidePeopleScreen,
    Store: StoreScreen,
    MyCoffee: UseCoffeeScreen
  },
  {
    initialRouteName: "Store",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

MoreNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Vibes: {
      screen: VibeNavigator,
      navigationOptions: {
        tabBarLabel: "Vibe",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={VibesTabIcon}
            style={{
              height: 34,
              width: 34,
              tintColor: tintColor
            }}
          />
        )
      }
    },
    Moments: {
      screen: MomentsNavigator,
      navigationOptions: {
        tabBarLabel: "Moment",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={MomentsTabIcon}
            style={{
              height: 34,
              width: 34,
              tintColor: tintColor
            }}
          />
        )
      }
    },

    // Events: {
    //   screen: EventsNavigator,
    //   navigationOptions: {
    //     tabBarLabel: "Events",
    //     tabBarIcon: ({ tintColor }) => (
    //       <Image
    //         source={EventIcon}
    //         style={{
    //           height: 25,
    //           width: 25,
    //           tintColor: tintColor
    //         }}
    //       />
    //     )
    //   }
    // },

    More: {
      screen: MoreNavigator,
      navigationOptions: {
        tabBarLabel: "Store",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={StoreIcon}
            style={{
              height: 34,
              width: 34,
              tintColor: tintColor
            }}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Vibes",
    tabBarOptions: {
      activeTintColor: config.navyBlack,
      inactiveTintColor: config.hintText,
      labelStyle: {
        fontSize: 11,
        fontFamily: "NotoSansKr-Bold",
        fontWeight: "bold"
      },
      style: {
        backgroundColor: config.white_grey
      }
    }
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthenticationNavigator,
    Alarm: AlarmNavigator,
    Home: TabNavigator
  },
  {
    initialRouteName: "Splash"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const WrappedStack = ({ t }) => (
  <AppContainer
    ref={navigationRef => NavigationService.setTopLevelNavigator(navigationRef)}
    screenProps={{ t }}
    style={{ color: "yellow" }}
  />
);

const Layout = withNamespaces("common", {
  bindI18n: "languageChanged",
  bindStore: false
})(WrappedStack);

export default class App extends Component {
  didBlurSubscription;
  componentWillUnmount() {
    this.screenshotObserver.remove();
  }
  componentDidMount() {
    this.screenshotObserver = DeviceEventEmitter.addListener('ScreenshotObserver', () => { alert('Screenshot Captured!') });
    RNSplashScreen.hide();
    // alert(JSON.stringify(RNPreventScreenshot));
    console.log("app version - ", DeviceInfo.getVersion());
    axios.get(`https://api.globaloutliers.com/appDetails?version=${DeviceInfo.getVersion()}`).then(response => {
      console.log("upgrade msg---------", response.data);
      response.data.Body === "success"
        ? Alert.alert(
          "App needs to be upgrade",
          [
            {
              text: "ok",
              onPress:
                Platform.OS === "ios" ? (
                  // <TouchableOpacity
                  //   onPress={() => {
                  <Text>Linking.openURL("https://apps.apple.com/kr/app/outliers/id1481019315");</Text>
                ) : (
                    // }}
                    // >
                    // <Text>ok</Text>
                    // </TouchableOpacity>
                    // <TouchableOpacity
                    // onPress={() => {
                    <Text>Linking.openURL("https://play.google.com/store/apps/details?id=com.globaloutliers&hl=ko");</Text>
                    // }}
                    // >
                    // <Text>ok</Text>
                    // </TouchableOpacity>
                  )
            }
          ],
          { cancelable: false }
        )
        : "";
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
