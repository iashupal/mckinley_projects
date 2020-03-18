import React, { Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Clipboard,
  AsyncStorage,
  BackHandler
} from "react-native";
import Dash from "react-native-dash";
import DeviceInfo from "react-native-device-info";
import Modal from "@components/CustomModal";
//Importing assets
import icCopyCode from "@assets/images/icCopyCode.png";
import Clover from "./../assets/images/ic_clover_black.png";
import Pass1Month from "./../assets/images/ic_1_month_pass.png";
import Pass2Week from "./../assets/images/ic_2_weeks_pass.png";
import Pass14days from "./../assets/images/ic_pass_14.png";
import Pass30days from "./../assets/images/ic_pass_30.png";
import CloverIcon from "@assets/images/icCloverTitle.png";

//Import components
import StoreItem from "@components/StoreItem";
import InputBox from "@components/InputBox";
import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";
import { withNamespaces } from "react-i18next";
import _ from "lodash";
import api from "@services/AuthApiService";
import RNIap, {
  Product,
  ProductPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener
} from "react-native-iap";

import { connect } from "react-redux";
import { getPaymentInfo, setPaymentInfo, savePaymentInfo } from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { getDaysLeft } from "../utils/utility";

const itemSkus = Platform.select({
  ios: [
    "7_Clovers",
    "12_Clovers",
    "29_Clovers",
    "51_Clovers",
    "105_Clovers",
    "210_Clovers",
    "com.outliers.2week", //WARNING: DO NOT CHANGE POSITION IN ARRAY
    "com.outliers.1month" //WARNING: DO NOT CHANGE POSITION IN ARRAY
  ],
  android: [
    "7_clovers",
    "12_clovers",
    "29_clovers",
    "51_clovers",
    "105_clovers",
    "210_clovers",
    "com.outliers.2week", //WARNING: DO NOT CHANGE POSITION IN ARRAY
    "com.outliers.1month" //WARNING: DO NOT CHANGE POSITION IN ARRAY
    // 'android.test.purchased', //TODO: REMOVE
  ]
});

const PAYMENT_SAVE_SUCCESS = "PAYMENT_SAVED_SUCCESSFULLY";

class StoreScreen extends React.Component {
  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;

  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      storeItems: [],
      passItems: [],
      receipt: "",
      availableItemsMessage: "",
      leftClovers: 0,
      weeklyPassLeft: 0,
      monthlyExpireDate: 0,
      paymentMdeForClvr: 0,
      userDetails: [],
      showCopyCodeModal: false
    };
    this.selectedAmount = "";
    this.selectedCurrency = "";
  }

  getUserInfo = async () => {
    let token = await AsyncStorage.getItem("@token:key");
    const response = await api.getUserDetails(token);
    if (response.status === 200) {
      this.setState({ userDetails: response.data.Body });
    }
  };
  writeToClipboard = async () => {
    //To copy the text to clipboard
    await Clipboard.setString(this.state.userDetails.referralCode);
    //alert('Referral code copied!');
    this.setState({ showCopyCodeModal: true });
  };
  saveTransactionInServer = async data => {
    const response = await this.props.setPaymentInfo(data);
    return response.ok && response.data.Body == PAYMENT_SAVE_SUCCESS;
  };

  endIapTransaction = async purchase => {
    if (Platform.OS === "ios") {
      await RNIap.finishTransactionIOS(purchase.transactionId);
    } else if (Platform.OS === "android") {
      // If consumable (can be purchased again)
      await RNIap.consumeAllItemsAndroid();
      // RNIap.consumePurchaseAndroid(purchase.purchaseToken);
      // If not consumable
      await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
    }
    this.setState({
      paymentMdeForClvr: 0
    });
  };

  // productId: string;
  // transactionId ?: string;
  // transactionDate: number;
  // transactionReceipt: string;
  // purchaseToken ?: string;
  // dataAndroid ?: string;
  // signatureAndroid ?: string;
  // autoRenewingAndroid ?: boolean;
  // purchaseStateAndroid ?: number;
  // originalTransactionDateIOS ?: string;
  // originalTransactionIdentifierIOS ?: string;
  // isAcknowledgedAndroid ?: boolean;

  _savePaymentWeekMonth = async (purchase, type) => {
    const { paymentData } = this.props;
    let data;
    switch (type) {
      case "com.outliers.2week":
        console.log("com.outliers.2week");
        data = {
          ...paymentData[0],
          weeklyPassDate: purchase.transactionDate,
          amount: this.selectedAmount,
          currency: this.selectedCurrency,
          likesLeft: parseInt(!!paymentData[0] && !!paymentData[0].likesLeft ? paymentData[0].likesLeft : 0) + 7,
          weeklyReceipt:
            !!paymentData[0] && !!paymentData[0].weeklyReceipt[0]
              ? [
                  ...paymentData[0].weeklyReceipt,
                  {
                    productId: type,
                    transactionReceipt: purchase.transactionReceipt,
                    transactionId: purchase.transactionId,
                    transactionDate: purchase.transactionDate
                  }
                ]
              : [
                  {
                    productId: type,
                    transactionReceipt: purchase.transactionReceipt,
                    transactionId: purchase.transactionId,
                    transactionDate: purchase.transactionDate
                  }
                ]
        };
        break;
      case "com.outliers.1month":
        console.log("com.outliers.1month");
        data = {
          ...this.props.paymentData[0],
          amount: this.selectedAmount,
          currency: this.selectedCurrency,
          monthlyPassDate: purchase.transactionDate,
          likesLeft: parseInt(!!paymentData[0] && !!paymentData[0].likesLeft ? paymentData[0].likesLeft : 0) + 15,
          monthlyReceipt:
            !!paymentData[0] && !!paymentData[0].monthlyReceipt[0]
              ? [
                  ...paymentData[0].monthlyReceipt,
                  {
                    productId: type,
                    transactionReceipt: purchase.transactionReceipt,
                    transactionId: purchase.transactionId,
                    transactionDate: purchase.transactionDate
                  }
                ]
              : [
                  {
                    productId: type,
                    transactionReceipt: purchase.transactionReceipt,
                    transactionId: purchase.transactionId,
                    transactionDate: purchase.transactionDate
                  }
                ]
        };

        break;
      default:
        break;
    }

    console.log("data to send week/month", data.likesLeft);
    console.log("likes", parseInt(!!paymentData[0] && !!paymentData[0].likesLeft ? paymentData[0].likesLeft : 0) + 7);
    const saved = await this.saveTransactionInServer(data);
    if (saved) {
      await this.endIapTransaction(purchase);
    }
    // TODO : If not saved, then retry or show error message to user
  };

  _savePaymentData = async purchase => {
    let data = {
      ...this.props.paymentData[0],
      amount: this.selectedAmount,
      currency: this.selectedCurrency,
      purchasedate: purchase.transactionDate,
      cloversleft:
        parseInt(
          !!this.props.paymentData[0] && !!this.props.paymentData[0].cloversleft ? this.props.paymentData[0].cloversleft : 0
        ) + this.state.paymentMdeForClvr
    };
    // End iap transaction depending on API POST/PUT Response
    const saved = await this.saveTransactionInServer(data);
    if (saved) {
      await this.endIapTransaction(purchase);
    }
    // TODO : If not saved, then retry or show error message to user
  };

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
    console.log("======================================");
    console.log(DeviceInfo.getDeviceCountry());
    try {
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.log("result", result);
    } catch (err) {
      console.warn(err.code, err.message);
    }

    this.props.getPaymentInfo();
    this.getUserInfo();
    await this.getItems();
    this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
      console.log("purchaseUpdatedListener", purchase);
      const receipt = purchase.transactionReceipt;

      console.log("======================================");
      console.log(purchase);
      console.log("======================================");
      if (receipt) {
        let savePayment;
        if (purchase.productId === itemSkus[6]) {
          //TODO: 2 WEEK PASS CHANGE TO 6
          savePayment = this._savePaymentWeekMonth(purchase, itemSkus[6]);
        } else if (purchase.productId === itemSkus[7]) {
          //TODO: 1 MONTH PASS CHANGE TO 7
          savePayment = this._savePaymentWeekMonth(purchase, itemSkus[7]);
        } else {
          savePayment = this._savePaymentData(purchase);
        }
        savePayment
          .then(() => {})
          .catch(e => {
            console.warn("savePayment", e);
          });
      }
    });

    this.purchaseErrorSubscription = purchaseErrorListener(error => {
      console.warn("purchaseErrorListener", error);
      Alert.alert("Error", error.message);
      this.setState({
        paymentMdeForClvr: 0
      });
    });
    // this.getAvailablePurchases()
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  getItems = async () => {
    try {
      Platform.OS === "ios" && RNIap.clearProductsIOS();
      const products = await RNIap.getProducts(itemSkus);
      console.log("Products", products);
      const storeItems = _.sortBy(
        _.filter(products, this.isStoreItem).map(item => {
          const clover = this.extractCloverFromSKU(item.productId);
          return {
            ...item,
            clover
          };
        }),
        ["clover"]
      );
      const passItems = _.filter(products, this.isPassItem);
      this.setState({
        productList: products,
        storeItems: storeItems,
        passItems
      });
    } catch (err) {
      // Platform.OS === "ios" && RNIap.clearProductsIOS()
      console.warn(err.code, err.message);
    }
  };

  getAvailablePurchases = async () => {
    try {
      console.info("Get available purchases (non-consumable or unconsumed consumable)");
      const purchases = await RNIap.getAvailablePurchases();
      console.info("Available purchases :: ", purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  requestPurchase = async sku => {
    console.log(sku);
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  requestSubscription = async sku => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  getDays = () => {};

  // USED FOR ONLY STORE ITEM (ex. 7_Clover)
  extractCloverFromSKU = sku => sku && sku.indexOf("_") > 0 && _.parseInt(sku.split("_")[0]);

  isStoreItem = item => _.indexOf(itemSkus, item.productId) <= 5;

  renderStoreItem = ({ price, localizedPrice, productId, currency, title, description, introductoryPrice, clover }) => {
    debugger;
    return (
      <StoreItem
        clovers={`${clover}`}
        amount={localizedPrice}
        hot={false}
        onPress={() => {
          this.selectedAmount = price;
          this.selectedCurrency = currency;
          this.setState(
            {
              paymentMdeForClvr: clover
            },
            () => {
              this.requestPurchase(productId);
            }
          );
        }}
      />
    );
  };

  isPassItem = item => _.indexOf(itemSkus, item.productId) > 5;

  renderPassItem = ({ price, localizedPrice, productId, currency, title, description, introductoryPrice }) => {
    const icon = productId.match(/2week/) ? Pass2Week : Pass1Month;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            paymentMdeForClvr: 0
          });
          this.requestPurchase(productId);
        }}
        style={styles.pass}
      >
        <View style={styles.passDetail}>
          <Image source={icon} style={styles.calIcon} resizeMode={"contain"} />
          <View style={{ flex: 1 }}>
            <Text style={styles.passTitle}>{title}</Text>
            <Text style={styles.passDesc}>{description}</Text>
          </View>
          <Dash
            style={{
              width: 1,
              height: 56,
              flexDirection: "column",
              marginHorizontal: 8
            }}
            // dashThickness={1}
            dashColor={config.goldYellow}
          />
          <View style={styles.passAmount}>
            <Text style={styles.amount}>{localizedPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { t, paymentData } = this.props;
    const { leftClovers, weeklyPassLeft, monthlyExpireDate, storeItems, passItems } = this.state;
    console.log(this.props.paymentData, this.props.loading);
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t("storeLang:header")}
          action={"back"}
          // action='close'
          cloverIcon={CloverIcon}
          isClover={true}
          noOfClover={parseInt(
            !!this.props.paymentData[0] && !!this.props.paymentData[0].cloversleft ? this.props.paymentData[0].cloversleft : 0
          )}
        />
        <ScrollView style={{ backgroundColor: "#f6f6f6" }}>
          {/* Store sub heading */}
          {/* <View style={styles.subHead}>
            <TouchableOpacity style={styles.oneRow}>
              <Image source={Clover} style={styles.subHeadImage} />
              <Text style={styles.subHeadText}>{t('storeLang:cloversLeft', {
                value: !!paymentData[0]
                  && !!paymentData[0].cloversleft
                  ? paymentData[0].cloversleft
                  : 0
              })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oneRow}>
              <Image source={Pass14days} style={[styles.subHeadImage, { tintColor: config.hintText }]} />
              <Text style={styles.subHeadTextInactive}>
                {t('storeLang:weeklyLeft', {
                  value: !!paymentData[0]
                    && !!paymentData[0].weeklyReceipt[0]
                    ? paymentData[0].weeklyReceipt.length
                    : 0
                })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oneRow}>
              <Image source={Pass30days} style={styles.subHeadImage} />
              <Text style={styles.subHeadText}>
                D-{
                  !!paymentData[0]
                    && !!paymentData[0].monthlyPassDate
                    ? getDaysLeft(paymentData[0].monthlyPassDate)
                    : 0
                }
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* Store container */}

          <View style={styles.mainConatiner}>
            {/* <Text
              style={{
                fontFamily: config.regularFont,
                fontSize: 14,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.25,
                color: config.brownishGrey,
                marginBottom: 11
              }}
            >
              {t('storeLang:passNote')}
            </Text> */}
            {_.chunk(storeItems, 2).map(pair => (
              <View style={{ flexDirection: "row" }}>
                {this.renderStoreItem(pair[0])}
                {pair.length > 0 && this.renderStoreItem(pair[1])}
              </View>
            ))}

            <TouchableOpacity
              onPress={() => {
                this.writeToClipboard();
              }}
              style={styles.btnBlack}
            >
              {/* <Text style={styles.btnText}>커피쿠폰 사용하기</Text> */}
              <Text style={styles.btnText}>
                {t("storeLang:copycode")}
                {this.state.userDetails ? " (" + this.state.userDetails.referralCode + ")" : ""}
              </Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              hasTwo
              shouldHideActionButton={false}
              visible={this.state.showCopyCodeModal}
              buttonText1={t("profileSenfCoffeeLang:sendlikeModal.cancel")}
              buttonText2={t("common:app.confirm")}
              onPress1={() => this.setState({ showCopyCodeModal: false })}
              onPress2={() => this.setState({ showCopyCodeModal: false })}
            >
              <View style={styles.innerModalContainer}>
                <Image style={styles.headerImage} source={icCopyCode} />
                <Text style={styles.boldTextHeader}>
                  {/* {t('common:myScreen.promoCopied')} */}
                  {t("common:myScreen.promoCopied")}
                </Text>
                <Text style={styles.infoText1}>{t("common:myScreen.whenNewMember")}</Text>

                <Text style={styles.noteText}>{t("common:myScreen.promoAppReview")}</Text>
              </View>
            </Modal>
            {passItems.length > 0 && <Text style={styles.passText}>{t("storeLang:passNote2")}</Text>}
            {/* {passItems.map(this.renderPassItem)} */}
            {/* Last button */}
            {/*<View style={styles.oneRow}>*/}
            {/*  <View style={{ flex: 4, paddingRight: 10 }}>*/}
            {/*    <InputBox placeholder={t('storeLang:inputPrmCode')} />*/}
            {/*  </View>*/}
            {/*  <View style={{ flex: 2 }}>*/}
            {/*    <TouchableOpacity style={styles.btnBlack}>*/}
            {/*      <Text style={styles.btnText}>*/}
            {/*        {t('storeLang:apply')}*/}
            {/*      </Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*  </View>*/}
            {/*</View>*/}
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  subHead: {
    backgroundColor: config.paleGrey,
    paddingHorizontal: 15,

    flexDirection: "row",
    justifyContent: "space-between"
  },
  subHeadImage: {
    height: 20,
    width: 20,
    marginRight: 5
  },
  mainConatiner: {
    backgroundColor: config.lightGreyBg,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  //flex direction row sub head
  // oneRow: {
  //   flexDirection: 'row',
  //   paddingVertical: 10,
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  subHeadText: {
    color: config.charcoal_grey,
    fontSize: 15
  },
  subHeadTextInactive: {
    fontSize: 15,
    color: config.hintText
  },
  pass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fffbdf",
    borderRadius: 8,
    marginBottom: 10
  },
  passAmount: {
    width: 76,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 0,
    margin: 0
  },
  passDetail: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 6
  },
  passTitle: {
    fontSize: 16,
    color: config.black
  },
  calIcon: {
    height: 24,
    width: 26,
    marginRight: 11
  },
  passDesc: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 14
  },
  amount: {
    color: config.goldYellow,
    fontSize: 17,
    fontWeight: "bold"
  },
  passText: {
    paddingVertical: 10,
    color: "#666666",
    lineHeight: 18
  },
  oneRow: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },
  btnText: {
    color: config.white,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  btnBlack: {
    backgroundColor: config.charcoal_grey,
    borderRadius: 3,
    height: 44,
    justifyContent: "center"
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  headerImage: {
    height: 60,
    aspectRatio: 2 / 1,
    marginBottom: 10,
    resizeMode: "contain"
  },

  boldTextHeader: {
    marginBottom: 5,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  infoText1: {
    marginBottom: 5,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  noteText: {
    marginTop: 5,
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "center",
    color: config.pointRed
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    paymentData: state.store.paymentData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPaymentInfo: data => dispatch(setPaymentInfo(data)),
    getPaymentInfo: () => dispatch(getPaymentInfo()),
    savePaymentInfo: data => dispatch(savePaymentInfo(data))
  };
};

const StoreScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(StoreScreen));

export default withNamespaces(["common", "storeLang"], {
  wait: true
})(StoreScreenHOC);
