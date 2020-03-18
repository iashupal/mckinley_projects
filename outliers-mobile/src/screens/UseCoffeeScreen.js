import React, { Fragment, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, Alert, BackHandler } from "react-native";
import api from "@services/ProfileApiService";
import AsyncStorage from "@react-native-community/async-storage";

// Import components
import CheckBox from "@components/CheckBox";
import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
import { ScrollView } from "react-native-gesture-handler";
import config from "@src/config";
import Modal from "@components/CustomModal";
import IconInput from "@components/IconInput";
import CheckboxIcon from "@assets/images/ic_outline_checkbox.png";
const { width } = Dimensions.get("window");
import { connect } from "react-redux";
//Import assets
import Divider from "./../assets/images/ic_devider.png";
import CoffeeCoupon from "./../assets/images/ic_coffe_coupon.png";
import { withNamespaces } from "react-i18next";
import { getPaymentInfo, getCoffeeCoupon, redeemCoupon } from "../store/actions";
import moment from "moment";

class StoreCoffeeCouponScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      coffeeCoupon: [],
      totalCoupon: "",
      availableCoupon: "",
      couponIds: []
    };
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      this.props.getCoffeeCoupon();
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription && this.willFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    //console.log("recived new props", nextProps);
    if (this.props.coffeeCoupon != nextProps.coffeeCoupon) {
      this.setState({
        coffeeCoupon: nextProps.coffeeCoupon.availableCoupons,
        totalCoupon: nextProps.coffeeCoupon.totalCouponsCount,
        availableCoupon: nextProps.coffeeCoupon.availableCouponsCount
      });
    }
  }
  //Redeem coupon request
  redeemCouponLocal = async id => {
    // console.log("recived id", id);
    this.setState({
      couponIds: [...this.state.couponIds, id]
    });
  };

  // Handle Submit button
  handleSubmit = () => {
    if (this.state.couponIds.length > 0) {
      this.setState({
        showModal: true
      });
    } else {
      Alert.alert(`${this.props.t("common:app.error")}`, `${this.props.t("common:app.selectCoupon")}`);
    }
  };

  //Request to redeem
  redeemRequest = async () => {
    let token = await AsyncStorage.getItem("@token:key");
    let response;
    if (token) {
      response = await api.redeemCoupon(token, this.state.couponIds);
      console.log("Api response", response);
      if (response.ok) {
        await this.props.getCoffeeCoupon();
        this.setState({
          showModal: false
        });
      } else {
        console.log("Response error", response);
      }
    } else {
      console.log("Called else");
    }
  };
  render() {
    const { t, paymentData } = this.props;
    console.log("in render function", this.state.couponIds);
    return (
      <Fragment>
        <Modal
          transparent={true}
          hasTwo
          visible={this.state.showModal}
          buttonText1={t("useCoffeeLang:modal.cancel")}
          buttonText2={t("useCoffeeLang:modal.send")}
          onPress2={() => {
            this.redeemRequest();
          }}
          onClose={() => {
            this.setState({
              showModal: false
            });
          }}
        >
          <View style={sendLikeCoffe.innerModalContainer}>
            <Text style={sendLikeCoffe.boldTextHeader}>
              {t("useCoffeeLang:modal.priceText", {
                value: 1
              })}
            </Text>
            <TextInput
              editable={false}
              style={sendLikeCoffe.textInputStyle}
              // inputStyle={sendLikeCoffe.textInputContainer}
              value={!!this.props.userDetails ? this.props.userDetails.phoneNumber : "N/A"}
            // onChangeText={(message) => { this.setState({ message }) }}
            // textAlignVertical={'top'}
            />
          </View>
        </Modal>
        <TopBarHeader action="close" sectionTitle={t("useCoffeeLang:header")} />
        <ScrollView
          contentContainerStyle={{
            backgroundColor: config.lightGreyBg,
            flex: 1
          }}
        >
          <View style={styles.mainContainer}>
            <View style={styles.cupBox}>
              <Image source={CoffeeCoupon} style={styles.cup} />
            </View>
            <View style={styles.balance}>
              <View style={styles.lpart}>
                <Text style={{ textAlign: "center" }}>{t("useCoffeeLang:usableCpn")}</Text>
                <Text style={styles.boldBlack}> {this.state.availableCoupon} </Text>
              </View>
              <Image source={Divider} style={styles.divider} />
              <View style={styles.rpart}>
                <Text style={{ textAlign: "center" }}>{t("useCoffeeLang:AllCpnRcv")}</Text>
                <Text style={styles.boldGray}>
                  {/* {!!paymentData[0] &&
                                    !!paymentData[0].coffeeCouponLeft
                                        ? paymentData[0].coffeeCouponLeft
										: 0} */}
                  {this.state.totalCoupon}
                </Text>
              </View>
            </View>

            {this.state.coffeeCoupon
              ? this.state.coffeeCoupon.map((item, index) => (
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardTitle}>
                      {t("useCoffeeLang:cpnSntBy", {
                        value: item.sender[0].username
                      })}
                    </Text>
                    <Text style={styles.cardDesc}>
                      {t("useCoffeeLang:expiryDate", {
                        value: moment(item.expiryDate).format("YYYY-MM-DD")
                      })}

                      {}
                    </Text>
                  </View>
                  <View style={styles.checkBox}>
                    <CheckBox normal={CheckboxIcon} onPress={() => this.redeemCouponLocal(item._id)} />
                  </View>
                </View>
              ))
              : null}
          </View>
        </ScrollView>
        <ActionButton
          onPress1={() => {
            this.handleSubmit();
          }}
          text={t("useCoffeeLang:use")}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  // console.log("recoved", state);
  return {
    loading: state.auth.loading,
    userDetails: state.auth.user,
    paymentData: state.store.paymentData,
    coffeeCoupon: state.profile.coffeeCoupon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPaymentInfo: () => dispatch(getPaymentInfo()),
    getCoffeeCoupon: () => dispatch(getCoffeeCoupon()),
    redeemCoupon: () => dispatch(redeemCoupon())
  };
};

const StoreCoffeeCouponScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreCoffeeCouponScreen);

export default withNamespaces(["common", "useCoffeeLang"], {
  wait: true
})(StoreCoffeeCouponScreenHOC);

const sendLikeCoffe = StyleSheet.create({
  noteText: {
    marginTop: 5,
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    color: config.pointRed
  },
  textInputStyle: {
    height: 60,
    borderWidth: 1,
    width: width * 0.7,
    marginVertical: 5,
    textAlign: "center",
    backgroundColor: config.white,
    borderColor: config.whiteTwo,
    fontFamily: config.regularFont,
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    flexWrap: "wrap",
    lineHeight: 24,
    letterSpacing: 0,
    color: config.clearBlue
  },
  textInputContainer: {
    height: 60,
    width: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: config.white,
    borderColor: config.whiteTwo
  },
  infoText1: {
    width,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: config.lightGrey
  },
  boldTextHeader: {
    fontFamily: config.regularFont,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  headerImage: {
    height: 60,
    aspectRatio: 2 / 1,
    marginBottom: 10,
    resizeMode: "contain"
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: config.lightGreyBg
  },
  cup: {
    height: 175,
    width: 175
  },
  balance: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: config.white,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: config.black
  },
  cardDesc: {
    fontSize: 15,
    color: config.lightGrey
  },
  cupBox: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 25
  },
  divider: {
    height: 50,
    width: 17
  },
  lpart: {
    paddingHorizontal: 16
  },
  rpart: {
    paddingHorizontal: 16
  },
  checkBox: {
    alignSelf: "flex-end",
    paddingBottom: 10
  },
  boldBlack: {
    fontSize: 32,
    fontWeight: "bold",
    color: config.black,
    textAlign: "center"
  },
  boldGray: {
    fontSize: 32,
    fontWeight: "bold",
    color: config.btnLine,
    textAlign: "center"
  }
});
