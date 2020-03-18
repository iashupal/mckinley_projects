import { StyleSheet, Dimensions } from 'react-native';
import config from '@src/config';

const itemWidth = (Dimensions.get('window').width * 0.5) - (1.5 * 3);
export default (styles = StyleSheet.create({
	vibeContainer: {
		backgroundColor: 'white',
		width: itemWidth,
	},
	vibeHeader: {
		flexDirection: 'row',
		marginLeft: 8,
		marginVertical: 6,
	},
	userLevel: {
		width: 24,
		height: 24,
		backgroundColor: config.navyBlack,
		borderRadius: 12,
		marginRight: 6,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 4,
		borderColor: '#596068'
		
	},
	userLevelText: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 1
	},
	userInfo: {
		fontSize: 13,
		marginTop: 2,
		color: "white"
	},
	vibeImage: {
		width: itemWidth,
		height: itemWidth
	},
	vibeAction: {
		flexDirection: 'row',
		left: 10,
	},
	commentCount: {
		color: 'white',
		fontSize: 13,
		marginRight: 10,
		marginLeft: 5
	},
	replyIcon: {
		width: 20,
		height: 20
	},
	likeCount: {
		color: 'white',
		fontSize: 13,
		marginLeft: 5
	},
	likeIcon: {
		width: 20,
		height: 20
	},
	gradientImage: {
		width: itemWidth,
		paddingTop: 20,
		paddingBottom: 10,
		position: 'absolute',
		bottom: 0
	},
	vibeLikes: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	vibeComment: {
		flexDirection: 'row',
		alignItems: 'center'
	}
}));
