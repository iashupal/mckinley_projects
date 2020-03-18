import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
	inputBox: {
		height: 45,
		flexDirection: 'row',
		alignItems: 'center'
	},
	textInput: {
		fontWeight: 'bold',
		fontSize: 15,
		width: '100%',
		backgroundColor: config.white_grey,
		borderRadius: 3,
		paddingLeft: 14,
		borderColor: config.whiteTwo,
		borderWidth: 1
	}
}));
