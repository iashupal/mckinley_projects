import { put } from "redux-saga/effects";
import api from "@services/VibesApiService";
import * as actions from "../actions/index";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "@services/NavigationService";
import { Alert } from "react-native";

// function throwError(error) {
//     switch (error) {
//         case "ERRORS":
//             Alert.alert("오류", "올바르지 않은 비밀번호입니다.");
//             break;
//         case "USER_ALREADY_HIDDEN":
//             Alert.alert("오류", "이미 숨겨진 사용자");
//             break;
//         case "VIBES_ALREADY_ADDED":
//             Alert.alert("오류", "이미 추가 된 바이브");
//             break;
//         case "EMPTY_HASHTAGS":
//             Alert.alert("오류", "빈 해시 태그");
//             break;
//         default:
//             Alert.alert("오류", "일시적 오류로 요청이 정상처리되지 못했습니다.");
//             break;
//     }
// }

export function* initiateEventUpload(action) {
    yield put(actions.startLoading());
    let response;
    console.log("upload saga", action);
    // try {
    //     let token = yield AsyncStorage.getItem("@token:key");
    //     // If token exists due to authentication, upload the vibe
    //     if (token) {
    //         response = yield api.uploadVibe(token, action.event);
    //     } else {
    //         NavigationService.navigate("LoginScreen");
    //     }
    //     if (response.ok) {
    //         console.log(response);
    //         NavigationService.navigate("VibesMain");
    //     } else {
    //         console.log(response);
    //         throwError(response.data.Body);
    //     }
    // } catch (error) {
    //     // yield put(actions.authFail(error));
    //     console.log(error);
    // } finally {
    //     yield put(actions.endLoading());
    // }
}

export function* initiateEventsList(action) {
    console.log("saga action", action);
    yield put(actions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.listVibes(token, action.params);
            console.log("Api resposne of vides");
            if (response.ok) {
                yield put(actions.setListEvents(response.data));
            } else {
                console.log("Response error", response);
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
