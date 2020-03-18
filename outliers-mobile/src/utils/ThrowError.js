import React, {Component} from 'react';

import { Alert } from 'react-native';

export function throwError(error) {
	switch (error) {
		case 'ERRORS':
			Alert.alert('오류', '올바르지 않은 비밀번호입니다.');
			break;
		case 'EMAIL_ALREADY_REGISTERED':
			Alert.alert('오류', '중복된 이메일입니다.');
			break;
		case 'INCORRECT_PASSWORD':
			Alert.alert('오류', '올바르지 않은 비밀번호입니다.');
			break;
		case 'PASSWORD_MUST_MATCH':
			Alert.alert('오류', '암호가 일치해야합니다');
			break;
		case 'EMAIL_NOT_FOUND':
			Alert.alert('오류', '계정 정보를 찾을 수 없습니다.');
			break;
		case 'EMAIL_INVALID':
			Alert.alert('오류', '잘못된 이메일');
			break;
		default:
			Alert.alert('오류', '회원가입에 실패하였습니다.');
			break;
	}
}
