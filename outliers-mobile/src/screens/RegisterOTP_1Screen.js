// React
import React, { Fragment, useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, BackHandler } from 'react-native';
import config from '@src/config.js';

// Import components
import ActionButton from '@components/ActionButton';
import DotSlider from '@components/DotSlider';
import TopBarHeader from '@components/TopBarHeader';

export default function RegisterOTP_1Screen(props) {

	const [phoneNumber, setPhoneNumber] = useState('');
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			props.navigation.goBack(null);
			return true;
		});
	})
	return (
		<Fragment>
			<TopBarHeader sectionTitle="휴대폰 번호 인증" action={'back'} />
			<DotSlider numberOfSteps={2} active={1} />
			<View style={styles.container}>
				<View style={styles.inputBox}>
					<TextInput
						style={{ height: 50, padding: 5, }}
						value={phoneNumber}
						keyboardType="numeric"
						placeholder="01012345678"
						textContentType="telephoneNumber"
						onChangeText={(text) => setPhoneNumber(text)}
					/>
				</View>

				<ActionButton
					text="인증번호 전송"
					onPress1={() => props.navigation.navigate('OTP_2')}
				/>
			</View>
		</Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		paddingHorizontal: 20
	},
	inputBox: {
		width: config.component_width,
		backgroundColor: config.white_grey,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: config.whiteTwo,
		marginVertical: 30
	}
});
