import { put } from "redux-saga/effects";
import api from "@services/MomentsApiService";
import AuthActions from "../redux/auth";
import * as actions from "../actions/index";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "@services/NavigationService";
import { Alert } from "react-native";

function throwError(error) {
  AsyncStorage.getItem("@appLang:key").then(val => {
    let lang = val ? val : "en";

    switch (error) {
      case "ERRORS":
        Alert.alert(lang === "en" ? "Error" : "오류", lang === "en" ? "Invalid password." : "올바르지 않은 비밀번호입니다.");
        break;
      default:
        Alert.alert(lang === "en" ? "Error" : "오류", lang === "en" ? "Membership failed." : "회원가입에 실패하였습니다.");
        break;
    }
  });
}

export function* initiateMomentUpload(action) {
  yield put(AuthActions.startLoading());
  let response;
  try {
    let token = yield AsyncStorage.getItem("@token:key");

    // If token exists due to authentication, upload the moment
    if (token) {
      response = yield api.uploadMoment(token, action.moment);
    } else {
      NavigationService.navigate("LoginScreen");
    }
    if (response.ok) {
      NavigationService.navigate("MomentsMain");
    } else {
      throwError(response.data.Body);
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* initiateMomentList(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.listMoments(token, action.location);
      if (response.ok) {
        yield put(actions.setListMoments(response.data.Body));
      } else {
        console.log("Response error", response);
      }
    } else {
      NavigationService.navigate("LoginScreen");
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* initiateMyMomentList(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.listMyMoments(token, action.location);
      if (response.ok) {
        yield put(actions.setListMyMoments(response.data));
      } else {
        console.log("Response error", response);
      }
    } else {
      NavigationService.navigate("LoginScreen");
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* initiateMomentListDetails(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.listMomentDetails(token, action.detailParams);
      if (response.ok) {
        yield put(actions.setListMomentDetails(response.data));
      } else {
        console.log("Response error", response);
      }
    } else {
      NavigationService.navigate("LoginScreen");
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}
