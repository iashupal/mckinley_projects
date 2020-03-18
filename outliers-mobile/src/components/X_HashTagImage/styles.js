import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
	overlay: {
		flex: 1,
		position: 'absolute',
		borderRadius: 50,
		backgroundColor: 'black',
		width: 96,
		height: 96,
		opacity: 0.5
	},
	tagContainer: {
		flex: 1,
		position: 'absolute',
		borderRadius: 50,
		width: 96,
		height: 96,
		alignItems: 'center',
		justifyContent: 'center'
	},
	momentImage: {
		width: 96,
		height: 96,
		borderRadius: 50
	},
	countDown: {
		position: 'absolute',
		fontSize: 20,
		color: 'white',
		fontFamily: 'NotoSansKR-Bold',
		fontWeight: 'bold',
		marginLeft: 25
	}
}));
