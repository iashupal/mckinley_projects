import { StyleSheet } from 'react-native';
import config from '@src/config';

const styles = StyleSheet.create({
	title: {
		fontSize: 15,
		color: config.greyishBrown
	},
	accordionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: config.whiteTwo
	},
	openAccordContainer: {
		height: 1,
		color: 'white',
		width: '100%'
	},
	accordChild: {
		fontSize: 13,
		color: config.brownishGrey,
		padding: 16,
		borderBottomWidth: 1,
		borderColor: config.whiteTwo
	},
	icon: {
		width: 14,
		height: 8
	}
});

export default styles;
