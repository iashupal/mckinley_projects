import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';

// Import components
import Tag from '@components/Tag';
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import Modal from '@components/CustomModal';
import InputBox from '@components/InputBox';

// Import config and styles
import config from '@src/config';
import tagStyles from '@components/Tag/styles';

export default function MyEditTagsScreen(props) {
	const [tag, setTag] = useState('');
	const [tags, setTags] = useState([
		'맥킨리',
		'라이스',
		'여행',
		'독서',
		'테스트'
	]);
	const [modalVisible, toggleModal] = useState(false);
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			props.navigation.goBack(null);
			return true;
		});
	})
	return (
		<Fragment>
			{modalVisible && (
				<Modal
					heading="관심태그를 추가해주세요"
					onClose={() => {
						if (tag.trim()) setTags(tags.concat(tag));
						setTag('');
						toggleModal(false);
					}}
				>
					<View style={styles.inputContainer}>
						<InputBox
							onChangeText={text => setTag(text)}
							placeholder="관심태그를 입력하세요 ex) 고양이"
						/>
					</View>
				</Modal>
			)}
			<TopBarHeader sectionTitle="관심태그 선택" action={'back'} isProfile />
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					{tags.map((tag, i) => {
						return <Tag key={i} tagText={tag} />;
					})}
					<TouchableOpacity
						style={[tagStyles.normalTag, styles.addTagButton]}
						onPress={() => toggleModal(true)}
					>
						<Text style={styles.addTagButtonText}>+ 추가하기</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ActionButton text="취소" hasTwo={true} text2="선택완료" />
		</Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	addTagButton: {
		backgroundColor: config.charcoal_grey
	},
	addTagButtonText: {
		color: 'white',
		fontSize: 15
	},
	inputContainer: {
		backgroundColor: config.white_grey,
		paddingLeft: 12,
		borderRadius: 3,
		marginTop: 12,
		borderWidth: 0.5,
		borderColor: config.whiteTwo
	}
});
