import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

//Import assets
import NextImage from '@assets/images/btn_more_big.png';

//Import Components
import CheckBox from '@components/CheckBox';

export default function ListGrey(props) {
	return (
		<View style={styles.listOuter}>
			<View style={styles.listItem}>
				<Text style={styles.listItemActive}>모두 동의합니다.</Text>
				<CheckBox />
			</View>
			<TouchableOpacity style={styles.listItem}>
				<Text>[필수] 서비스 이용약관</Text>
				<Image source={NextImage} style={styles.nextImage} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.listItem}>
				<Text>[필수] 개인정보정책에 동의</Text>
				<Image source={NextImage} style={styles.nextImage} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.listItem}>
				<Text>[필수] 휴면정책 동의</Text>
				<Image source={NextImage} style={styles.nextImage} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.listItem}>
				<Text>[필수] 위치정보 수집 및 이용에 동의</Text>
				<Image source={NextImage} style={styles.nextImage} />
			</TouchableOpacity>
		</View>
	);
}
