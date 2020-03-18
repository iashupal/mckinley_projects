import { put } from "redux-saga/effects";
import api from "@services/ProfileApiService";
import AuthActions from "../redux/auth";
import * as actions from "../actions/index";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "@services/NavigationService";
import { Alert } from "react-native";

function throwError(error) {
  AsyncStorage.getItem("@appLang:key").then(val => {
    let lang = val ? val : "en";
    console.log("error", error);
    switch (error) {
      case "ERRORS":
        Alert.alert(lang === "en" ? "Error" : "오류", lang === "en" ? "Invalid password." : "올바르지 않은 비밀번호입니다.");
        break;
      case `GOLD_COFFEE_CAN'T_BE_SENT_BEFORE_COFFEE`:
        Alert.alert(
          lang === "en" ? "Error" : "오류",
          lang === "en" ? "Cant spend gold coffee before coffee" : "커피 전에 골드 커피를 보낼 수 없습니다."
        );
        break;
      default:
        Alert.alert(lang === "en" ? "Error" : "오류", lang === "en" ? "There was a problem." : "문제가 발생했습니다.");
        break;
    }
  });
}

export function* getProfileById(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.getProfileById(token, action.params);
      if (response.ok) {
        yield put(actions.setProfileById(response.data));
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

export function* sendProfileLikeCoffee(action) {
  yield put(AuthActions.startLoading());
  yield put(actions.setSendProfileLikeCoffeeStatus({ success: true, status: 1 }));
  let response;
  try {
    let token = yield AsyncStorage.getItem("@token:key");

    // If token exists due to authentication, upload the moment
    if (token) {
      response = yield api.sendProfileLikeCoffee(token, action.profile);
    } else {
      NavigationService.navigate("LoginScreen");
    }
    if (response.ok) {
      yield put(
        actions.setSendProfileLikeCoffeeStatus({
          success: true,
          status: 2
        })
      );
    } else {
      console.log(response);
      throwError(response.data.Body);
    }
  } catch (error) {
    // yield put(actions.authFail(error));
    console.log(error);
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* getProfileNotification(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.getProfileNotification(token, action.params);
      if (response.ok) {
        yield put(actions.setProfileNotification(response.data.Body));
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

export function* getProfileMatchHistory(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.getProfileMatchHistory(token, action.params);
      if (response.ok) {
        yield put(actions.setProfileMatchHistory(response.data));
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

export function* initiateAppearanceVerification(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.verifyAppearance(token, action.data);
      if (response.ok) {
        yield put(actions.verifyAppearanceStatus(response.data));
        // yield put(actions.setProfileMatchHistory(response.data));
      } else {
        yield put(actions.verifyAppearanceStatus(response.data));
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

export function* addRequestStatus(action) {
  yield put(AuthActions.startLoading());
  yield put(actions.setRequestStatus({ success: true, status: 1 }));
  let response;
  try {
    let token = yield AsyncStorage.getItem("@token:key");

    // If token exists due to authentication, upload the moment
    if (token) {
      response = yield api.addRequestStatus(token, action.request);
    } else {
      NavigationService.navigate("LoginScreen");
    }
    if (response.ok) {
      yield put(actions.setRequestStatus({ success: true, status: 2 }));
    } else {
      throwError(response.data.Body);
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* getProfilePreference(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem("@token:key");
    if (token) {
      const response = yield api.getProfilePreference(token, action.params);
      if (response.ok) {
        yield put(actions.setProfilePreference(response.data.Body));
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

export function* updateProfilePreference(action) {
  yield put(AuthActions.startLoading());
  yield put(actions.setUpdateProfilePreferenceStatus({ success: true, status: 1 }));
  let response;
  try {
    let token = yield AsyncStorage.getItem("@token:key");

    // If token exists due to authentication, upload the moment
    if (token) {
      response = yield api.updateProfilePreference(token, action.updatePreferences);
    } else {
      NavigationService.navigate("LoginScreen");
    }
    console.log(response);
    if (response.ok) {
      AsyncStorage.getItem("@appLang:key").then(val => {
        let lang = val ? val : "en";
        Alert.alert("", lang === "en" ? "Submit successfully" : "성공적으로 제출.");
      });
      yield put(
        actions.setUpdateProfilePreferenceStatus({
          success: true,
          status: 2
        })
      );
    } else {
      throwError(response.data.Body);
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* initiateUpdateSeenStatus(action) {
  yield put(AuthActions.startLoading());

  let response;
  try {
    let token = yield AsyncStorage.getItem("@token:key");

    // If token exists due to authentication, upload the moment
    if (token) {
      console.log("token find");
      response = yield api.updateSeenStatus(token, action.data);
    } else {
      NavigationService.navigate("LoginScreen");
    }
    console.log(response);
    if (response.ok) {
      const response = yield api.getProfileNotification(token);
      if (response.ok) {
        yield put(actions.setProfileNotification(response.data.Body));
      } else {
        console.log("Response error", response);
      }
    } else {
      throwError(response.data.Body);
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

// Get coffee Coupon
export function* getCoffeeCoupon() {
  // console.log("Get coffee coupon saga called");
  // //yield put(actions.startLoading());
  // console.log("out of try");
  try {
    console.log("token ---- nin inside try");
    let token = yield AsyncStorage.getItem("@token:key");
    console.log("token ---- nin", token);
    if (token) {
      const response = yield api.getCoffeeCoupon(token);
      console.log("Api response", response);
      if (response.ok) {
        yield put(actions.setCoffeeCoupon(response.data.Body));
      } else {
        console.log("Response error", response);
      }
    } else {
      NavigationService.navigate("LoginScreen");
    }
  } catch (error) {
    yield put(actions.authFail(error));
  } finally {
    yield put(actions.endLoading());
  }
}

//Redeem coupons
export function* redeemCoupon() {
  let token = yield AsyncStorage.getItem("@token:key");
  console.log("redeem coupon saga called", token);
  // yield put(actions.startLoading());
  // try {
  //     let token = yield AsyncStorage.getItem("@token:key");
  //     if (token) {
  //         const response = yield api.redeemCoupon(token, action.coupons);
  //         // console.log("Api response", response);
  //         if (response.ok) {
  //             yield put(actions.setCoffeeCoupon(response.data.Body));
  //         } else {
  //             console.log("Response error", response);
  //         }
  //     } else {
  //         NavigationService.navigate("LoginScreen");
  //     }
  // } catch (error) {
  //     yield put(actions.authFail(error));
  // } finally {
  //     yield put(actions.endLoading());
  // }
}
