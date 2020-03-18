import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, BackHandler } from 'react-native';

//Import assets
import PhotoImage from '@assets/images/photo.jpeg';
import config from '@src/config';

//Import Components
// import Heading from '@components/Heading';

export default class OutliersReviewPopTwoScreen extends Component {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.goBack(null);
			return true;
		});
	}
	render() {
		return (
			<View style={styles.modalBackground}>
				<View style={styles.contentOuter}>
					{/* <Heading title="Jaykim4님의 매너는 어땠나요?" /> */}
					<View style={styles.smileyIconOuter}>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>별로에요</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>&nbsp;</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>보통</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>&nbsp;</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>좋아요</Text>
						</View>
					</View>

					{/* <Heading title="Jaykim4님은 사진과 동일했나요?" /> */}
					<View style={styles.smileyIconOuter}>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>별로에요</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>&nbsp;</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>비슷해요</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>&nbsp;</Text>
						</View>
						<View style={styles.smileyBox}>
							<Image
								source={PhotoImage}
								style={styles.smileyIcon}
							/>
							<Text style={styles.medium_grey_txt}>
								실물이 나아요
							</Text>
						</View>
					</View>

					<View style={styles.buttonsBox}>
						<TouchableOpacity style={styles.darkButton}>
							<Text style={styles.textWhite}>
								리뷰제출하고 클로버 받기
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
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
		height: 'auto',
		paddingHorizontal: 20,
		paddingVertical: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	medium_grey_txt: {
		fontSize: 11,
		color: config.brownishGrey
	},
	buttonsBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 18
	},
	darkButton: {
		backgroundColor: config.charcoal_grey,
		borderWidth: 1,
		borderColor: config.charcoal_grey,
		borderRadius: 2,
		paddingHorizontal: 14,
		paddingVertical: 10,
		marginLeft: 6,
		width: '100%'
	},
	textWhite: {
		color: config.white,
		fontSize: 13,
		textAlign: 'center'
	},
	smileyIconOuter: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 14
	},
	smileyBox: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	smileyIcon: {
		borderRadius: 50,
		width: 32,
		height: 32
	}
});
