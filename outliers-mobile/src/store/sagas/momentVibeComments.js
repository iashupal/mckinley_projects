import { put } from "redux-saga/effects";
import api from "@services/MomentVibeCommentsApiService";
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
                Alert.alert(
                    lang === "en" ? "Error" : "오류",
                    lang === "en"
                        ? "Invalid password."
                        : "올바르지 않은 비밀번호입니다."
                );
                break;
            default:
                Alert.alert(
                    lang === "en" ? "Error" : "오류",
                    lang === "en"
                        ? "Membership failed."
                        : "회원가입에 실패하였습니다."
                );
                break;
        }
    });
}

export function* initiateMomentVibeComments(action) {
    console.log("init calleed");
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.listMomentVibeComments(
                token,
                action.params
            );
            if (response.ok) {
                yield put(
                    actions.setMomentVibeComments(response.data.allComments)
                );
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

export function* addMomentVibeComment(action) {
    yield put(
        actions.setAddMomentVibeCommentsStatus({ success: true, status: 1 })
    );
    yield put(AuthActions.startLoading());
    let response;
    try {
        let token = yield AsyncStorage.getItem("@token:key");

        // If token exists due to authentication, upload the moment
        if (token) {
            response = yield api.addMomentVibeComment(token, action.comment);
        } else {
            NavigationService.navigate("LoginScreen");
        }
        if (response.ok) {
            yield put(
                actions.setAddMomentVibeCommentsStatus({
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

export function* addMomentVibeCommentReply(action) {
    yield put(
        actions.setAddMomentVibeCommentsStatus({ success: true, status: 1 })
    );
    yield put(AuthActions.startLoading());
    let response;
    try {
        let token = yield AsyncStorage.getItem("@token:key");

        // If token exists due to authentication, upload the moment
        if (token) {
            response = yield api.addMomentVibeCommentReply(token, action.reply);
        } else {
            NavigationService.navigate("LoginScreen");
        }
        if (response.ok) {
            yield put(
                actions.setAddMomentVibeCommentsStatus({
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
export function* deleteMomentVibeCommentReply(action) {
    yield put(
        actions.setDeleteMomentVibeCommentsStatus({ success: true, status: 1 })
    );
    yield put(AuthActions.startLoading());
    let response;
    try {
        let token = yield AsyncStorage.getItem("@token:key");

        // If token exists due to authentication, upload the moment
        if (token) {
            response = yield api.deleteMomentVibeCommentReply(
                token,
                action.delete
            );
        } else {
            NavigationService.navigate("LoginScreen");
        }
        if (response.ok) {
            yield put(
                actions.setDeleteMomentVibeCommentsStatus({
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

export function* addMomentVibeFollow(action) {
    yield put(
        actions.setAddMomentVibeFollowStatus({ success: true, status: 1 })
    );
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.addMomentVibeFollow(
                token,
                action.momentVibe
            );
            if (response.ok) {
                yield put(
                    actions.setAddMomentVibeFollowStatus({
                        success: true,
                        status: 2
                    })
                );
            } else {
                throwError(response.data.Body);
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

export function* addMomentVibeUnFollow(action) {
    yield put(
        actions.setAddMomentVibeUnFollowStatus({ success: true, status: 1 })
    );
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.addMomentVibeUnFollow(
                token,
                action.momentVibe
            );
            if (response.ok) {
                yield put(
                    actions.setAddMomentVibeUnFollowStatus({
                        success: true,
                        status: 2
                    })
                );
            } else {
                throwError(response.data.Body);
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
