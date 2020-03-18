import React, { Fragment, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import config from '@src/config';

// Import components
import AgreementList from '@components/AgreementList';
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';

export default function RegisterAgreeScreen(props) {
	useEffect(()=>{
		BackHandler.addEventListener('hardwareBackPress', () => {
			props.navigation.goBack(null);
			return true;
		});
	})
	return (
		<Fragment>
			<TopBarHeader action={'back'} sectionTitle="약관동의" />
			<View style={styles.container}>
				<View style={[styles.innerContent, styles.whiteBg]}>
					<Text style={styles.black_txt}>
						000님의 로그인 ID는
						{'\n'}
						<Text style={styles.loginID}>
							abcd@outliers.com
						</Text>{' '}
						입니다
					</Text>
					<Text style={styles.lightGrey}>
						이메일주소는 로그인 ID로만 활용되며 타인에게 공개되지
						않습니다. 재가입회원의 경우 이전 이메일 주소를 사용해야
						중복매칭을 방지할 수 있습니다.
					</Text>

					<AgreementList />

					<Text style={styles.alert}>
						※기혼자는 가입하실 수 없습니다. {'\n'} 이를 어길시
						법적조치가 취해질 수 있습니다.
					</Text>
				</View>
			</View>
			<ActionButton
				onPress1={() => props.navigation.navigate('Home')}
				text="확인 후 가입 진행"
			/>
		</Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	innerContent: {
		paddingHorizontal: 20,
		flex: 1
	},
	loginID: {
		color: config.soft_blue,
		fontSize: 16
	},
	black_txt: {
		color: config.black,
		fontSize: 16,
		lineHeight: 22,
		marginTop: 12
	},
	lightGrey: {
		color: config.lightGrey,
		fontSize: 14,
		lineHeight: 18,
		marginTop: 14
	},
	alert: {
		color: config.watermelon,
		fontSize: 13,
		marginTop: 9,
		marginBottom: 45
	}
});
