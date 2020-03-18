import { StyleSheet } from 'react-native';
import config from '@src/config';

export default (styles = StyleSheet.create({
	profileList: {
		height: 140
	},
	profileImage: {
		width: 96,
		height: 96,
		borderRadius: 48,
		borderWidth: 3,
		borderColor: 'white',
		marginRight: 12
	},
	selectedImage: {
		borderColor: config.soft_blue
	}
}));
