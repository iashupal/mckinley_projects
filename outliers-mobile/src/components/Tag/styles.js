import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
	normalTag: {
		borderColor: config.selectBox,
		borderWidth: 1,
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 4,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		marginTop: 12,
		marginRight: 8
	},
	activeTag: {
		borderColor: config.charcoal_grey,
		borderWidth: 1.5,
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 4,
		fontWeight: 'bold',
		color: config.charcoal_grey,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		marginTop: 12,
		marginRight: 8
	},
	wrap: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
}));
