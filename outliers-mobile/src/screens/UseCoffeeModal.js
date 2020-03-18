import React, { Component } from 'react';
import { View, StyleSheet, Text, BackHandler } from 'react-native';

//Import Components
import ActionButton from '@components/ActionButton';
import Heading from '@components/Heading';
import config from '@src/config'
import { TextInput } from 'react-native-gesture-handler';

export default class UseCoffeeModal extends Component {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.goBack(null);
			return true;
		});
	}
	render() {
		return (
			<View style={styles.modalBackground}>
				<View style={styles.contentOuter}>
					<View style={styles.contentBox}>
						<Heading
							title={
								<Text>
									"커피 쿠폰 14개를 {'\n'}
									사용 하시겠습니까?"
								</Text>
							}
						/>
						<View style={styles.textBoxOuter}>
							<TextInput
								style={styles.textBox}
								scrollEnabled={true}
								placeholder="010-2345-1234"
								multiline={false}
							/>
						</View>
					</View>
					<View style={styles.twoButtons}>
						<ActionButton text="취소" />
						<ActionButton text="발송" />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	modalBackground: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	contentOuter: {
		backgroundColor: 'white',
		width: 320,
		height: 219
	},
	contentBox: {
		width: 320,
		height: 166,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 36
	},
	buttonBox: {
		height: 54
	},
	textBoxOuter: {
		backgroundColor: config.white_grey,
		borderWidth: 1,
		borderColor: config.whiteTwo,
		borderRadius: 4,
		width: '100%',
		height: 48,
		marginTop: 12,
		marginBottom: 30
	},
	textBox: {
		paddingLeft: 12,
		color: config.soft_blue,
		fontSize: 21,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	twoButtons: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	rightBorder: {
		borderRightColor: config.white,
		borderRightWidth: 1
	}
});
