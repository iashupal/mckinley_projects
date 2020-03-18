import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image,BackHandler } from 'react-native';

//Import assets
import PhotoImage from '@assets/images/photo.jpeg';
import config from '@src/config';

//Import Components
// import Heading from '@components/Heading';

export default function OutliersReviewPopScreen(props) {
	useEffect(()=>{
		BackHandler.addEventListener('hardwareBackPress', () => {
			props.navigation.goBack(null);
			return true;
		});
	})
	return (
		<View style={styles.modalBackground}>
			<View style={styles.contentOuter}>
				<Image source={PhotoImage} style={styles.roundPhoto} />
				{/* <Heading title={<Text>Jaykim4님과 시간이 어땠나요~?</Text>} /> */}
				<Text style={styles.lightGrey}>
					리뷰를 남겨주시면 클로버 1개를 드려요!
				</Text>

				<View style={styles.buttonsBox}>
					<TouchableOpacity style={styles.outlineButton}>
						<Text style={styles.textBlack}>안만났어요</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.darkButton}>
						<Text style={styles.textWhite}>대화만했어요</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.darkButton}>
						<Text style={styles.textWhite}>만나봤어요</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
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
		height: 264,
		paddingHorizontal: 13,
		paddingVertical: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	lightGrey: {
		fontSize: 14,
		color: config.lightGrey
	},
	buttonsBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 18
	},
	outlineButton: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: config.charcoal_grey,
		borderRadius: 2,
		paddingHorizontal: 14,
		paddingVertical: 10
	},
	textBlack: {
		color: config.black,
		fontSize: 13
	},
	darkButton: {
		backgroundColor: config.charcoal_grey,
		borderWidth: 1,
		borderColor: config.charcoal_grey,
		borderRadius: 2,
		paddingHorizontal: 14,
		paddingVertical: 10,
		marginLeft: 6
	},
	textWhite: {
		color: config.white,
		fontSize: 13
	},
	roundPhoto: {
		borderRadius: 50,
		width: 86,
		height: 86,
		marginBottom: 14
	}
});
