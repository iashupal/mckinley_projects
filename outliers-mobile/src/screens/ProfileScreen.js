import React, { Fragment, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, BackHandler } from 'react-native';

// Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import Slider from '@components/ImageSlider';

// Import assets
import ReportIcon from '@assets/images/ic_report3.png';
import ShareIcon from '@assets/images/ic_share.png';
import VerifiedIcon from '@assets/images/ic_verified.png';
import LockIcon from '@assets/images/ic_lock.png';
import config from '@src/config';

export default function ProfileScreen(props) {
	useEffect(()=>{
		BackHandler.addEventListener('hardwareBackPress', () => {
			props.navigation.goBack(null);
			return true;
		});
	})
	return (
		<Fragment>
			<TopBarHeader
				sectionTitle="프로필 상세"
				action={'back'}
				rightNavIcon={ShareIcon}
				rightSecondIcon={ReportIcon}
				isProfile={true}
			/>
			<ScrollView style={styles.scrollView}>
				<View>
					<Slider
						style={styles.slider}
						images={[
							'http://i2.linkoooo.com/1905/20190514165039_15ce3f8cac31d3f5c3ac9cbfc6167f3d_6cyy.jpg',
							'https://fimg4.pann.com/new/download.jsp?FileID=47429666',
							'http://star.fnnews.com/fnwdpress/wp-content/uploads/2017/06/201706300825147666.jpg'
						]}
					/>
					<View style={styles.badgeContainer}>
						<View style={styles.badge}>
							<Text style={styles.badgeText}>실물인증</Text>
						</View>
						<Text style={styles.userName}>레드벨벳 예리, 21세</Text>
					</View>
				</View>
				<View style={styles.userDetails}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>지역</Text>
						<Text style={styles.rowData}>서울시 서초구</Text>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>학교</Text>
						<Text style={styles.rowData}>
							서울대학교{' '}
							<Image
								style={styles.verifiedIcon}
								source={VerifiedIcon}
							/>
						</Text>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>직업</Text>
						<Text style={styles.rowData}>연예인</Text>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>체형&키</Text>
						<Text style={styles.rowData}>마름, 162cm</Text>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>인종</Text>
						<Text style={styles.rowData}>Asian</Text>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>흡연</Text>
						<Text style={styles.rowData}>흡연</Text>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>운동</Text>
						<Text style={styles.coveredData}>
							<Image style={styles.lockIcon} source={LockIcon} />{' '}
							정보를 추가해야 볼 수 있습니다.
						</Text>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>관심사</Text>
						<View style={styles.tagData}>
							<View style={styles.tagContainer}>
								<Text style={styles.tag}>운동</Text>
							</View>
							<View style={styles.tagContainer}>
								<Text style={styles.tag}>여행</Text>
							</View>
							<View style={styles.tagContainer}>
								<Text style={styles.tag}>맥킨리라이스</Text>
							</View>
							<View style={styles.tagContainer}>
								<Text style={styles.tag}>김정우</Text>
							</View>
							<View style={styles.tagContainer}>
								<Text style={styles.tag}>McKinley & Rice</Text>
							</View>
						</View>
					</View>
					<View style={styles.rowContainer}>
						<Text style={styles.rowName}>자기소개</Text>
						<Text style={styles.rowData}>
							안녕하세요, 자기소개글입니다. 가나다라마바사.
							서울대학교를 졸업 공무원으로 일하고 있어요 :)
							{` `}
						</Text>
					</View>
				</View>
			</ScrollView>
			<ActionButton hasTwo={true} text="커피보내기" text2="좋아요" />
		</Fragment>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: 'white'
	},
	badgeContainer: {
		position: 'absolute',
		marginLeft: 20,
		marginTop: 340
	},
	badge: {
		borderColor: config.aqua_marine,
		width: 55,
		height: 22,
		borderRadius: 13,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	badgeText: {
		color: config.aqua_marine,
		fontSize: 11
	},
	userName: {
		color: 'white',
		fontSize: 16,
		marginTop: 6,
		fontWeight: 'bold'
	},
	slider: {
		width: '100%',
		height: 400
	},
	userDetails: {
		marginTop: 10,
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 20
	},
	rowContainer: {
		flexDirection: 'row',
		paddingVertical: 5
	},
	rowName: {
		flex: 2,
		color: config.hintText,
		fontSize: 15,
		fontWeight: 'bold'
	},
	coveredData: {
		flex: 4,
		color: config.soft_blue,
		fontSize: 15
	},
	rowData: {
		flex: 4,
		color: config.black,
		fontSize: 15
	},
	verifiedIcon: {
		width: 20,
		height: 20
	},
	lockIcon: {
		width: 12,
		height: 16,
		tintColor: config.soft_blue
	},
	tagData: {
		flex: 4,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	tagContainer: {
		paddingHorizontal: 8,
		height: 26,
		backgroundColor: config.lightGreyBg,
		borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 8,
		marginBottom: 10
	},
	tag: {
		color: config.black,
		fontSize: 14
	}
});
