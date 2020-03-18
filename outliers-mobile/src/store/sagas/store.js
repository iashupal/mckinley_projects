import { put } from 'redux-saga/effects';
import api from '@services/storeApiService';
import AuthActions from '../redux/auth';
import * as actions from '../actions/index';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '@services/NavigationService';
import { Alert } from "react-native"

function throwError(error) {
  AsyncStorage.getItem('@appLang:key').then((val) => {
    let lang = val ? val : 'en'

    switch (error) {
      case 'ERRORS':
        Alert.alert(lang === 'en' ? "Error" : "오류",
          lang === 'en' ? 'Invalid password.' : '올바르지 않은 비밀번호입니다.');
        break;
      default:
        Alert.alert(lang === 'en' ? "Error" : "오류",
          lang === 'en' ? 'Membership failed.' : '회원가입에 실패하였습니다.');
        break;
    }
  })
}

export function* initiateGetPaymentInfo() {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem('@token:key');
    if (token) {
      const response = yield api.getPaymentInfo(token);
      if (response.ok) {
        console.log('response', response.data.Body)
        yield put(actions.savePaymentInfo(response.data.Body));
      } else {
        console.log('Response error', response);
      }
    } else {
      NavigationService.navigate('LoginScreen');
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* initiateSetPaymentInfo(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem('@token:key');
    if (token) {
      const response = yield api.setPaymentInfo(token, action.data);
      if (response.ok) {
        const reponse2 = yield api.getPaymentInfo(token);
        console.log('reponse2', reponse2.data.Body)
        yield put(actions.savePaymentInfo(reponse2.data.Body));
      } else {
        console.log('Response error', response);
      }
    } else {
      NavigationService.navigate('LoginScreen');
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}

export function* initiateUpdatePaymentInfo(action) {
  yield put(AuthActions.startLoading());
  try {
    let token = yield AsyncStorage.getItem('@token:key');
    if (token) {
      const response = yield api.updatePaymentInfo(token, action.data);
      if (response.ok) {
        const reponse2 = yield api.getPaymentInfo(token);
        console.log('reponse2', reponse2.data.Body)
        yield put(actions.savePaymentInfo(reponse2.data.Body));
      } else {
        console.log('Response error', response);
      }
    } else {
      NavigationService.navigate('LoginScreen');
    }
  } catch (error) {
    // yield put(actions.authFail(error));
  } finally {
    yield put(AuthActions.endLoading());
  }
}
