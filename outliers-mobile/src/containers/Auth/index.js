import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { createStackNavigator, NavigationActions } from "react-navigation";
import { withNamespaces } from 'react-i18next';

import RegisterScreen from '../../screens/RegisterScreen';
import RegisterOTP_1Screen from '../../screens/RegisterOTP_1Screen';
import RegisterOTP_2Screen from '../../screens/RegisterOTP_2Screen';
import RegisterAgreeScreen from '../../screens/RegisterAgreeScreen';
import RegisterCategoryScreen from '../../screens/RegisterCategoryScreen';
import RegisterDetailsScreen from '../../screens/RegisterDetailsScreen';
import VerifyJobScreen from '../../screens/VerifyJobScreen';
import VerifySchoolScreen from '../../screens/VerifySchoolScreen';
import RegisterPhotoScreen from '../../screens/RegisterPhotoScreen';
import FindAccountScreen from '../../screens/FindAccountScreen';
import LoginScreen from '../../screens/LoginScreen';
import ReEntryScreen from '../../screens/ReEntryScreen';
import BasicDetailsScreen from '../../screens/BasicDetailsScreen';
import LocationAutocompleteScreen from '../../screens/LocationAutocompleteScreen';
import EnterHighschoolNameScreen from '../../screens/EnterHighschoolNameScreen';
import UnivercityNameScreen from '../../screens/UnivercityNameScreen';
import SelectOccupationScreen from '../../screens/SelectOccupationScreen';
import CareerChoiceScreen from '../../screens/CareerChoiceScreen';
import ReferralScreen from '../../screens/ReferralScreen';
import PickInterest from '../../screens/PickInterest';
import VerificationNetWorth from '../../screens/VerificationNetWorth';

import TermsOfServiceScreen from '../../screens/TermsOfServiceScreen';
import MobileNumberVerificationScreen
  from '../../screens/MobileNumberVerificationScreen';
import RefuseScreen from '../../screens/RefuseScreen';
import AgreeTermsScreen from '../../screens/AgreeTermsScreen';

import AuthenticateInKind from '../../screens/AuthenticateInKind';
import IdentityVerfication from '../../screens/IdentityVerification';
import SubscribedID from '../../screens/SubscribedID';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import LocationTermsOfUse from '../../screens/LocationTermsOfUse';

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
    PickInterest: PickInterest,
    TermsOfService: TermsOfServiceScreen,
    LocationTerms: LocationTermsOfUse,
    PhotoUpload: withNamespaces(["common"], { wait: true })(RegisterPhotoScreen),
    Agreement: RegisterAgreeScreen,
    VerfiyNetworth: VerificationNetWorth,
    ForgotPassword: withNamespaces(["common"], { wait: true })(FindAccountScreen),
    IdentityVerify: IdentityVerfication,
    SubscribedID: SubscribedID,
    ReEntry: ReEntryScreen,
    MobileNumberVerification: withNamespaces(["common"], { wait: true })(MobileNumberVerificationScreen),
    Refuse: RefuseScreen,
    AgreeTerms: withNamespaces(["common"], { wait: true })(AgreeTermsScreen),
    BasicDetails: withNamespaces(["common"], { wait: true })(BasicDetailsScreen),
    LocationAutocomplete: LocationAutocompleteScreen,
    EnterHighschoolName: EnterHighschoolNameScreen,
    PrivacyPolicy: PrivacyPolicy,
    UnivercityName: withNamespaces(["common"], { wait: true })(UnivercityNameScreen),
    SelectOccupation: withNamespaces(["common"], { wait: true })(SelectOccupationScreen),
    CareerChoice: CareerChoiceScreen,
    ReferralScreen: ReferralScreen,
    AuthenticateInKind: AuthenticateInKind,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default class AuthStack extends Component {

  backHandler

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressed
    );
  }

  componentWillUnmount() {
    this.backHandler && this.backHandler.remove();
  }

  onBackButtonPressed = () => {
    const backAction = NavigationActions.back();
    this.navigator.dispatch(backAction);
    return true
  }

  render() {
    return <AuthenticationNavigator ref={ref => this.navigator = ref} />
  }
}
