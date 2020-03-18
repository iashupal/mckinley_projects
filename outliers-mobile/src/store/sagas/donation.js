import { put } from "redux-saga/effects";
import api from "@services/DonationApiService";
import * as actions from "../actions/index";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "@services/NavigationService";
import { Alert } from "react-native";

function throwError(error) {
  switch (error) {
    case "ERRORS":
      Alert.alert("오류", "올바르지 않은 비밀번호입니다.");
      break;
    default:
      Alert.alert("오류", "회원가입에 실패하였습니다.");
      break;
  }
}

export function* initiateDonation(action) {
  yield put(actions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.submitDonation(token, action.donation);
      if (response.ok) {
      } else {
        throwError(response.data.Body);
      }
    } else {
      NavigationService.navigate("LoginScreen");
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(actions.endLoading());
  }
}
