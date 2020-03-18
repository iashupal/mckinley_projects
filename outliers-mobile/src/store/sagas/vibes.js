import { put } from "redux-saga/effects";
import api from "@services/VibesApiService";
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
            case "USER_ALREADY_HIDDEN":
                Alert.alert(
                    lang === "en" ? "Error" : "오류",
                    lang === "en" ? "User already hidden" : "이미 숨겨진 사용자"
                );
                break;
            case "VIBES_ALREADY_ADDED":
                Alert.alert(
                    lang === "en" ? "Error" : "오류",
                    lang === "en" ? "Vibe already added" : "이미 추가 된 바이브"
                );
                break;
            case "EMPTY_HASHTAGS":
                Alert.alert(
                    lang === "en" ? "Error" : "오류",
                    lang === "en" ? "Empty hashtag" : "빈 해시 태그"
                );
                break;
            default:
                Alert.alert(
                    lang === "en" ? "Error" : "오류",
                    lang === "en" ? "Something is wrong" : "일시적 오류로 요청이 정상처리되지 못했습니다."
                );
                break;
        }
    });
}

export function* initiateVibeUpload(action) {
    yield put(AuthActions.startLoading());
    let response;
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        // If token exists due to authentication, upload the vibe
        if (token) {
            response = yield api.uploadVibe(token, action.vibe);
        } else {
            NavigationService.navigate("LoginScreen");
        }
        if (response.ok) {
            console.log(response);
            NavigationService.navigate("VibesMain");
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

export function* initiateVibeList(action) {
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.listVibes(token, action.params);
            if (response.ok) {
                yield put(actions.setListVibes(response.data));
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

export function* initiateMyVibeList(action) {
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.listMyVibes(token, action.params);
            if (response.ok) {
                yield put(actions.setListMyVibes(response.data));
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

export function* initiateVibeListDetails(action) {
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.listVibeDetails(
                token,
                action.detailParams
            );
            if (response.ok) {
                console.log("Response success", response);
                yield put(actions.setListVibeDetails(response.data));
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

export function* blockUserDetails(action) {
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");
        let param = {
            blockedUserId: action.userId
        };
        if (token) {
            const response = yield api.blockUser(token, param);
            if (response.ok) {
                NavigationService.navigate("Home");
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

export function* hideUserDetails(action) {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");
        let param = {
            hiddenUserId: action.userId
        };
        if (token) {
            const response = yield api.hideUser(token, param);
            if (response.ok) {
                NavigationService.navigate("Home");
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

export function* followVibe(action) {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");
        let param = {
            followTo: "vibe",
            id: action.id
        };
        if (token) {
            const response = yield api.followVibe(token, param);
            if (response.ok) {
                // NavigationService.navigate('Home');
                //FIXME: call initiateListVibeDetails
                console.log("FOLLOWING_VIBE");
            } else if (response.data.Body === "ALREADY_FOLLOWING_VIBE") {
                console.log("ALREADY_FOLLOWING_VIBE");
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

export function* getMatchedVibesList(action) {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.getMatchedVibesList(
                token,
                action.params
            );
            if (response.ok) {
                yield put(actions.setMatchedVibes(response.data.Body));
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

export function* getUserVibeList(action) {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.getUserVibeList(token, action.params);
            if (response.ok) {
                yield put(actions.setUserVibeList(response.data.body));
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

export function* fetchTagsSearch(action) {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");
        if (token) {
            const response = yield api.getTagsSearch(token, action.params);
            if (response.ok) {
                yield put(actions.setTagsSearch(response.data.Body));
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

export function* initiateSetRecentSearch() {
    yield put(AuthActions.startLoading());
    try {
        let searchHistory = yield AsyncStorage.getItem("@searchHistory:key");
        if (searchHistory) {
            yield put(actions.setRecentSearch(searchHistory));
        } else {
            yield put(actions.setRecentSearch([]));
        }
    } catch (error) {
        // yield put(actions.authFail(error));
    } finally {
        yield put(AuthActions.endLoading());
    }
}

export function* initiateFollowVibeUser(action) {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");

        if (token) {
            const response = yield api.followVibeUser(token, action.params);
            if (response.ok) {
                const response2 = yield api.getUserVibeList(token, {
                    id: action.params.toUser,
                    offset: 0
                });

                yield put(actions.setUserVibeList(response2.data.body));
                console.log("FOLLOWING_VIBE_USER", response);
            } else if (response.data.Body === "ALREADY_FOLLOWING_THE_USER") {
                console.log("ALREADY_FOLLOWING_THE_USER");
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

export function* initiateGetFollowingList() {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");

        if (token) {
            const response = yield api.getFollowingList(token);
            if (response.ok) {
                // const response2 = yield api.getUserVibeList(token, { id: action.params.toUser, offset: 0 });
                yield put(actions.setFollowingUserList(response.data.Body));
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

export function* initiateGetBlockedUser() {
    yield put(AuthActions.startLoading());
    try {
        let token = yield AsyncStorage.getItem("@token:key");

        if (token) {
            const response = yield api.getBlockedList(token);
            if (response.ok) {
                // const response2 = yield api.getUserVibeList(token, { id: action.params.toUser, offset: 0 });
                yield put(actions.setBlockedListUser(response.data.Body));
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

export function* initiateUnblockUser(action) {
    yield put(AuthActions.startLoading());

    try {
        let token = yield AsyncStorage.getItem("@token:key");

        if (token) {
            const response = yield api.unblockUser(token, action.params);
            if (response.ok) {
                const response2 = yield api.getBlockedList(token);
                yield put(actions.setBlockedListUser(response2.data.Body));
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

export function* initiateReportUser(action) {
    yield put(AuthActions.startLoading());
    console.log("Init block");
    try {
        let token = yield AsyncStorage.getItem("@token:key");

        if (token) {
            const response = yield api.reportUser(
                token,
                action.params,
                action.image
            );
            if (response.ok) {
                // const response2 = yield api.getBlockedList(token);
                // yield put(actions.setBlockedListUser(response2.data.Body));
                console.log(response.data.response);
                AsyncStorage.getItem("@appLang:key").then(val => {
                    let lang = val ? val : "en";
                    Alert.alert(
                        "",
                        lang === "en"
                            ? "Submitted successfully"
                            : "성공적으로 제출되었습니다."
                    );
                });
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
