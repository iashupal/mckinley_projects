import { StyleSheet } from 'react-native';
import config from '@src/config.js';

export default (styles = StyleSheet.create({
	dotSlider: {
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	normalDot: {
		backgroundColor: config.hintText,
		borderColor: config.hintText,
		borderWidth: 1,
		borderRadius: 50,
		width: 8,
		height: 8,
		margin: 2
	},
	activeDot: {
		backgroundColor: config.charcoal_grey,
		borderColor: config.charcoal_grey,
		borderWidth: 1,
		borderRadius: 4,
		width: 8,
		height: 8,
		margin: 2
	}
}));
