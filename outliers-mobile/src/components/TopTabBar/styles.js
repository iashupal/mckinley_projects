import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
	secondTabBar: {
		flexDirection: 'row',
		height: 42,
		width: '100%',
		borderBottomWidth: 0.5,
		borderColor: config.whiteTwo
	},
	activeTab: {
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2
	},
	activeTabText: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 16,
		color: config.charcoal_grey
	},
	inactiveTab: {
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inactiveTabText: {
		fontSize: 16,
		color: config.charcoal_grey
	}
}));
