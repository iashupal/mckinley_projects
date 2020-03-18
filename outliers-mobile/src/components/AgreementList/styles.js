import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
	listOuter: {
		marginTop: 30,
		fontSize: 14,
		height: 240,
		borderWidth: 1,
		borderColor: config.whiteTwo,
		borderRadius: 3
	},
	listItem: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		borderColor: config.whiteTwo,
		borderBottomWidth: 1,
		paddingHorizontal: 14,
		paddingVertical: 11
	},
	listItemActive: {
		fontSize: 14,
		fontWeight: 'bold',
		color: config.greyishBrown
	},
	nextImage: {
		width: 6,
		height: 12
	}
}));
