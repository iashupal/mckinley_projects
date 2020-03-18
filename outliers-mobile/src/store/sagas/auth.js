import React, { Component } from "react";

import { Alert } from "react-native";
import { put, call, delay } from "redux-saga/effects";
import api from "../../services/AuthApiService";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "@services/NavigationService";
import jwtDecode from "jwt-decode";
import _ from "lodash";

import * as actions from "../actions/index";
import AuthActions from "../redux/auth";
import { generateOtp, uuidv4 } from "../../utils/utility";

function throwError(error) {
  const errorCase = _.get(error, ["password"], error);
  AsyncStorage.getItem("@appLang:key").then(val => {
    let lang = val ? val : "en";

    switch (errorCase) {
      case "ACCOUNT_DEACTIVATED.PLEASE_CONTACT_ADMIN":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en"
            ? "Account deactivated. Please contact admin"
            : "계정이 비활성화되었습니다. 관리자에게 문의하십시오"
        );
        break;
      case "ACCOUNT_REJECETD_PLEASE_CONTACT_ADMIN":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en"
            ? "Account rejected. Please contact admin"
            : "계정이 거부되었습니다. 관리자에게 문의하십시오"
        );
        break;
      case "INCORRECT_PASSWORD":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Incorrect password" : "잘못된 비밀번호"
        );
        break;
      case "EMAIL_NOT_FOUND":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Email not found" : "이메일을 찾을 수 없습니다"
        );
        break;
      case "EMAIL_ALREADY_REGISTERED":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Email already registered" : "이미 등록 된 이메일"
        );
        break;
      case "EMAIL_REQUIRED":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Email required" : "이메일 필요"
        );
        break;
      case "EMAIL_INVALID":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Email invalid" : "잘못된 이메일"
        );
        break;
      case "PASSWORD_REQUIRED":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Password required" : "암호 필요"
        );
        break;
      case "CONFIRM_PASSWORD_REQUIRED":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Confirm password required" : "필요한 비밀번호 확인"
        );
        break;
      case "PASSWORD_MUST_MATCH":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Password must match" : "암호가 일치해야합니다"
        );
        break;
      case "PASSWORD_MUST_BE_AT_LEAST_EIGHT_CHARACTER":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en"
            ? "Password must be at least eight character"
            : "비밀번호는 8 자 이상이어야합니다"
        );
        break;
      case "PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_DIGIT":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en"
            ? "Password must contain atleast one digit"
            : "비밀번호는 한 자리 이상이어야합니다"
        );
        break;
      case "PASSWORD_MUST_CONTAIN_ONE_CHARACTER":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en"
            ? "Password must contain one character"
            : "암호는 하나의 문자를 포함해야합니다"
        );
        break;
      case "SPECIAL_CHARACTER_NOT_ALLOWED":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en"
            ? "Special character not allowed"
            : "특수 문자가 허용되지 않음"
        );
        break;
      case "PASSWORD_MUST_CONTAIN_ONE_LOWERCASE_CHARACTER":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en"
            ? "Password must contain one lowercase character"
            : "비밀번호는 하나의 소문자를 포함해야합니다"
        );
        break;
      case "ERRORS":
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Invalid Password" : "유효하지 않은 비밀번호"
        );
        break;
      default:
        Alert.alert(
          lang === "en" ? "Error:" : "오류 :",
          lang === "en" ? "Invalid Password" : "유효하지 않은 비밀번호"
        );
        break;
    }
  });
}

export function* initiateLaunch() {
  yield put(AuthActions.startLoading());
  try {
    // NavigationService.navigate('Report');
    const token = yield AsyncStorage.getItem("@token:key");
    const deviceToken = yield AsyncStorage.getItem("@deviceToken:key");
    const isRegister = yield AsyncStorage.getItem("@isRegister:key");

    if (token) {
      const response = yield api.getUserDetails(token);
      console.log("UESR DETAILS", response);

      if (response.data.Body === "USER_NOT_FOUND") {
        AsyncStorage.setItem("@token:key", "");
        if (isRegister && isRegister === "true") {
          NavigationService.navigate("Login");
        } else {
          NavigationService.navigate("Register");
        }
        yield put(AuthActions.endLoading());
        return;
      }

      const isRegistered = response.data.Body.isRegistered;
      const isVerified = response.data.Body.isVerified;
      const userStatus = response.data.Body.userStatus;
      const currentScreen = response.data.Body.registrationStatus;

      const phoneVerified = response.data.Body.phoneVerified;

      if (isVerified || isRegistered) {
        if (userStatus === "accepted") {
          const userLevel = response.data.Body.level.toString();
          //console.log("user lavel", userLevel);
          yield AsyncStorage.setItem("@userLevel:key", userLevel);
          // yield AsyncStorage.setItem("@deviceToken:key", deviceToken);
          NavigationService.navigate("Home");
        } else {
          if (isRegister && isRegister === "true") {
            NavigationService.navigate("Login");
          } else {
            NavigationService.navigate("Register");
          }
        }
      } else if (
        currentScreen === undefined ||
        currentScreen === "incomplete" ||
        currentScreen === "OTP_1"
      ) {
        NavigationService.navigate("MyCategory");
      } else if (currentScreen === "ModalPhotoUpload") {
        NavigationService.navigate("PhotoUpload", {
          showModal: true
        });
      } else {
        NavigationService.navigate(currentScreen);
      }

      yield put(AuthActions.setUserInfo(response.data.Body));
    } else {
      if (isRegister && isRegister === "true") {
        NavigationService.navigate("Login");
      } else {
        NavigationService.navigate("Register");
      }
    }

    yield put(AuthActions.endLoading());
  } catch (error) {
    yield put(AuthActions.endLoading());
    if (isRegister && isRegister === "true") {
      NavigationService.navigate("Login");
    } else {
      NavigationService.navigate("Register");
    }
  }
}

export function* initiateAuthSaga(action) {
  console.log("initiateAuthSaga action", action);
  yield put(AuthActions.startLoading());

  var deviceToken = yield AsyncStorage.getItem("@deviceToken:key");

  if (deviceToken === "" || deviceToken === null || deviceToken === undefined) {
    deviceToken = uuidv4();
    yield AsyncStorage.setItem("@deviceToken:key", deviceToken);
  }
  console.log("Device Token", deviceToken);

  let authData, response, token, userUpdateResponse, currentScreen;
  try {
    // NavigationService.navigate ('OTP_1');
    // // Invoke authentication api
    if (action.isRegistration) {
      authData = {
        email: action.email,
        password: action.password,
        passwordConfirm: action.passwordConfirm,
        registrationStatus: "MyCategory",
        deviceToken: deviceToken
      };

      response = yield api.register(authData);
    } else {
      authData = {
        email: action.email,
        password: action.password
      };
      response = yield api.login(authData);
    }

    // Compare response
    if (response.ok) {
      console.log("Auth Success Response:", response);
      token = response.data.Body;

      yield AsyncStorage.setItem("@token:key", token);
      yield put(AuthActions.authSuccess(token));
      yield put(AuthActions.authUserEmail(action.email));
      yield put(AuthActions.setUserInfo({ email: action.email }));
      if (action.isRegistration) {
        const profileResponse = yield api.getUserDetails(token);
        console.log("profileResponse:", profileResponse.data.Body);
        const isRegistered = profileResponse.data.Body.isRegistered;
        const isVerified = profileResponse.data.Body.isVerified;
        const currentScreen = profileResponse.data.Body.registrationStatus;
        const userStatus = profileResponse.data.Body.userStatus;
        const phoneVerified = profileResponse.data.Body.phoneVerified;
        const userID = profileResponse.data.Body._id;
        if (isVerified || isRegistered) {
          if (userStatus === "accepted") {
            NavigationService.navigate("Home");
          } else {
            NavigationService.navigate("Login");
          }
        } else if (
          currentScreen === "incomplete" ||
          currentScreen === "" ||
          currentScreen === undefined ||
          currentScreen === "OTP_1"
        ) {
          userUpdateResponse = yield api.putUserDetails(
            { registrationStatus: "MyCategory" },
            token
          );
          NavigationService.navigate("MyCategory");
        } else if (currentScreen === "ModalPhotoUpload") {
          NavigationService.navigate("PhotoUpload", {
            showModal: true
          });
        } else {
          NavigationService.navigate(currentScreen);
        }

        yield put(AuthActions.setUserInfo(profileResponse.data.Body));
      } else {
        const profileResponse = yield api.getUserDetails(token);
        const userID = profileResponse.data.Body._id;
        const isRegistered = profileResponse.data.Body.isRegistered;
        const isVerified = profileResponse.data.Body.isVerified;
        const currentScreen = profileResponse.data.Body.registrationStatus;
        const userStatus = profileResponse.data.Body.userStatus;
        const phoneVerified = profileResponse.data.Body.phoneVerified;
        console.log("profile resposne", profileResponse);
        if (isVerified || isRegistered) {
          if (userStatus === "accepted") {
            yield AsyncStorage.setItem("@userid:key", userID);
            NavigationService.navigate("Home");
          } else {
            NavigationService.navigate("Login");
          }
        } else if (
          currentScreen === "incomplete" ||
          currentScreen === "OTP_1"
        ) {
          NavigationService.navigate("MyCategory");
        } else if (currentScreen === "ModalPhotoUpload") {
          NavigationService.navigate("PhotoUpload", {
            showModal: true
          });
        } else {
          NavigationService.navigate(currentScreen);
        }

        yield put(AuthActions.setUserInfo(profileResponse.data.Body));

        // NavigationService.navigate ('ReferralScreen');
      }
    } else {
      console.log("Auth Failure Response:", response);
      throwError(response.data.Body);
      yield put(AuthActions.invalidateToken());
      yield put(AuthActions.authFail(response.data.Body));
    }
    yield put(AuthActions.endLoading());
  } catch (error) {
    console.error("Auth Error:", error.stack);
    yield put(AuthActions.invalidateToken());
    yield put(AuthActions.authFail("SERVER_ERROR"));
    yield put(AuthActions.endLoading());
  }
}

export function* setUserDetails(action) {
  yield put(AuthActions.startLoading());
  const token = yield AsyncStorage.getItem("@token:key");
  let payload, response, getResponse;
  try {
    payload = {
      ...action
    };
    response = yield api.putUserDetails(token, payload);

    // Compare response
    if (response.ok) {
      console.log("Update User success reponse:", response.data.Body);
      yield put(AuthActions.setUserInfo(response.data.Body));
    } else {
      console.log("Update User Failure Response:", response);
      throwError(response.data.Body);
      // yield put(AuthActions.invalidateToken());
      yield put(AuthActions.authFail(response.data.Body));
    }
    yield put(AuthActions.endLoading());
  } catch (error) {
    console.error("Update User Error:", error.stack);
    // yield put(AuthActions.invalidateToken());
    yield put(AuthActions.authFail("SERVER_ERROR"));
    yield put(AuthActions.endLoading());
  }
}

export function* initiateUserProfileUpdate(action) {
  yield put(AuthActions.startLoading());
  const token = yield AsyncStorage.getItem("@token:key");
  let payload, response, getResponse;

  console.log("user action", action);
  try {
    payload = {
      ...action.data
    };
    response = yield api.updateProfileDetails(
      token,
      payload,
      action.uri ? action.uri : null
    );
    // Compare response
    if (response.ok) {
      console.log("Update User success reponse:", response.data.Body);
      const profileResponse = yield api.getUserDetails(token);
      console.log(profileResponse);
      yield put(AuthActions.setUserInfo(profileResponse.data.Body));
      AsyncStorage.getItem("@appLang:key").then(val => {
        let lang = val ? val : "en";

        Alert.alert(
          lang === "en" ? "Success" : "성공",
          lang === "en"
            ? "Your profile has been updated successfully"
            : "프로필이 성공적으로 업데이트되었습니다"
        );
      });
    } else {
      console.log("Update User Failure Response:", response);
      throwError(response.data.Body);
      // yield put(AuthActions.invalidateToken());
      yield put(AuthActions.authFail(response.data.Body));
    }
    yield put(AuthActions.endLoading());
  } catch (error) {
    console.error("Update User Error:", error.stack);
    // yield put(AuthActions.invalidateToken());
    yield put(AuthActions.authFail("SERVER_ERROR"));
    yield put(AuthActions.endLoading());
  }
}

export function* invalidateTokenSaga(action) {
  try {
    yield AsyncStorage.removeItem("@token:key");
  } catch (error) {
    console.log(error);
  }
}

export function* requestOTP(action) {
  const randomOtp = generateOtp(6);
  const token = yield AsyncStorage.getItem("@token:key");
  yield put(AuthActions.startLoading());
  yield put(AuthActions.setOtpServerCode(randomOtp));
  try {
    console.log("OTP Requesting", randomOtp, token);
    const response = yield api.requestOTP(action.phoneNumber, randomOtp, token);
    if (response.ok) {
      console.log(response.data.Body);
      AsyncStorage.getItem("@appLang:key").then(val => {
        let lang = val ? val : "en";

        Alert.alert(
          lang === "en" ? "Success" : "성공",
          lang === "en" ? "Code sent to device" : "기기로 전송 된 코드"
        );
      });
      yield put(AuthActions.setOtpServerCode(randomOtp));
    } else {
      console.log(response);
      yield put(AuthActions.setOtpServerCode(randomOtp));
    }
    yield put(AuthActions.endLoading());
  } catch (error) {
    console.log(error);
    yield put(AuthActions.endLoading());
  }
}

export function* savePhone(action) {
  yield put(AuthActions.startLoading());
  try {
    yield AsyncStorage.setItem("@phoneNumber:key", action.phoneNumber);
    yield put(AuthActions.addPhone(action.phoneNumber));
  } catch (error) {
    console.log(error);
    yield put(AuthActions.endLoading());
  }
}

export function* initiateGetUserDetails() {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.getUserDetails(token);
      if (response.ok) {
        console.log("initiateGetUserDetails", response.data.Body);
        yield put(AuthActions.setUserInfo(response.data.Body));
      } else {
        console.log("Response error", response);
      }
    } else {
      NavigationService.navigate("LoginScreen");
    }
  } catch (error) {
    // yield put(AuthActions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* initiateDeleteUser() {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.deleteUser(token);
      if (response.ok) {
        console.log("delete User", response.data.Body);
        yield put(AuthActions.setUserInfo({}));
        NavigationService.navigate("LoginScreen");
      } else {
        console.log("Response error", response);
      }
    } else {
      NavigationService.navigate("LoginScreen");
    }
  } catch (error) {
    // yield put(AuthActions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}
