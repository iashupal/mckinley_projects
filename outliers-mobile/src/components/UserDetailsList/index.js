import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	Picker,
	Dimensions
} from 'react-native';
import DatePicker from 'react-native-date-picker';

// Import Components
import Modal from '@components/CustomModal';
import ActionButton from '@components/ActionButton';
import IconInput from '@components/IconInput';

import InputWithTitle from '@components/InputWithTitle';
import DotSlider from '@components/DotSlider';
import GenderSelection from '@components/GenderSelection';
import DonationTagsList from '@components/DonationTagsList';
import CurrentLocationIcon from '@assets/images/ic_current_location.png';
// Import styles and assets
import styles from './styles';
import GenderImage from '@assets/images/ic_gender.png';
import BirthDateImage from '@assets/images/ic_age.png';
import UserImage from '@assets/images/ic_nick.png';
import LocationImage from '@assets/images/ic_location.png';
import BodyTypeImage from '@assets/images/ic_bodyshape.png';
import HeightImage from '@assets/images/ic_height.png';
import UniversityImage from '@assets/images/ic_univ.png';
import JobImage from '@assets/images/ic_job.png';
import RaceImage from '@assets/images/ic_race.png';
import SmokeImage from '@assets/images/ic_smoke.png';
import icSmoke from '@assets/images/icSmoke.png';
import AddImage from '@assets/images/icAddPaper.png';
import icSetArrow from '@assets/images/icSetArrow.png';
import config from '@src/config';
import moment from 'moment';

const { width } = Dimensions.get("window");

export function SelectRace(props) {

	const [race, setRace] = useState(!!props.userDetails ? props.userDetails.race : 'Asian');
	const callSetRace = props.callSetRace ? props.callSetRace : false;
	const [showRacePicker, setRacePicker] = useState(false);
	const { t, i18n } = props;
	return (
		<View style={styles.cardListOuter}>
			<View style={styles.lhsBox}>
				<Image source={RaceImage} style={styles.icon} />
				<Text style={styles.label}>
					{t('common:idealSettingScreen.raceModal.title')}
				</Text>
			</View>

			<TouchableOpacity
				style={styles.rhsBox}
				onPress={() => setRacePicker(true)}
			>
				{showRacePicker && (
					<Modal
						buttonText1={t('common:app.confirm')}
						heading={t('common:idealSettingScreen.raceModal.heading')}
						visible={showRacePicker}
						onClose={() => {
							setRacePicker(false);
						}}
					>
						<Picker
							selectedValue={race}
							style={styles.internalPickerContainer}
							onValueChange={(itemValue, itemIndex) => {
								setRace(itemValue);
								if (callSetRace) {
									props.setRaceFn(itemValue);
								}
							}}
						>
							<Picker.Item
								label={t('common:idealSettingScreen.pleaseEnter')}
								value={t('common:idealSettingScreen.pleaseEnter')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.raceModal.asian')}
								value={t('common:idealSettingScreen.raceModal.asian')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.raceModal.nativeAmerican')}
								value={t('common:idealSettingScreen.raceModal.nativeAmerican')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.raceModal.african')}
								value={t('common:idealSettingScreen.raceModal.african')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.raceModal.Hawaiian')}
								value={t('common:idealSettingScreen.raceModal.Hawaiian')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.raceModal.hispanic')}
								value={t('common:idealSettingScreen.raceModal.hispanic')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.raceModal.caucasian')}
								value={t('common:idealSettingScreen.raceModal.caucasian')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.raceModal.white')}
								value={t('common:idealSettingScreen.raceModal.white')}
							/>
						</Picker>
					</Modal>
				)}
				<Text style={styles.value}>{race}</Text>
			</TouchableOpacity>
		</View>
	);
}

export function SelectSmoke(props) {
	const [doSmoke, setDoSmoke] = useState(!!props.userDetails ? props.userDetails.doSmoke : '입력해주세요');
	const callSetDoSmoke = props.callSetDoSmoke ? props.callSetDoSmoke : false;
	const [showDoSmokePicker, setDoSmokePicker] = useState(false);
	const { t } = props;
	return (
		<View style={styles.cardListOuter}>
			<View style={styles.lhsBox}>
				<Image source={SmokeImage} style={styles.icon} />
				<Text
					style={styles.label}>
					{t('common:register.basicDetailsScreen.smoking')}
				</Text>
			</View>

			<TouchableOpacity
				style={styles.rhsBox}
				onPress={() => setDoSmokePicker(true)}
			>
				{showDoSmokePicker && (
					<Modal
						buttonText1={t('common:app.confirm')}
						heading={t('common:idealSettingScreen.smokingModal.header')}
						visible={showDoSmokePicker}
						onClose={() => {
							setDoSmokePicker(false);
						}}
					>
						<Picker
							selectedValue={doSmoke}
							style={styles.internalPickerContainer}
							onValueChange={(itemValue, itemIndex) => {
								setDoSmoke(itemValue);
								if (callSetDoSmoke) {
									props.setDoSmokeFn(itemValue);
								}
							}}
						>
							<Picker.Item
								label={t('common:idealSettingScreen.pleaseEnter')}
								value={t('common:idealSettingScreen.pleaseEnter')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.smokingModal.smoke')}
								value={t('common:idealSettingScreen.smokingModal.smoke')}
							/>
							<Picker.Item
								label={t('common:idealSettingScreen.smokingModal.nonSmoking')}
								value={t('common:idealSettingScreen.smokingModal.nonSmoking')}
							/>
						</Picker>
					</Modal>
				)}
				<Text style={styles.value}>{doSmoke}</Text>
			</TouchableOpacity>
		</View>
	);
}

export function SelectGender(props) {
	const [showGenderPicker, setGenderPicker] = useState(false);
	const [gender, setGender] = useState(!!props.userDetails ? props.userDetails.sex : '입력해주세요');
	const callSetGender = props.callSetGender ? props.callSetGender : false;
	const { t, i18n } = props;
	return (
		<View style={styles.cardListOuter}>
			<View style={styles.lhsBox}>
				<Image source={GenderImage} style={styles.icon} />
				<Text style={styles.label}>{t('common:register.basicDetailsScreen.sex')}</Text>
			</View>

			<TouchableOpacity
				style={styles.rhsBox}
				onPress={() => {
					setGenderPicker(true);
				}}
			>
				{showGenderPicker && (
					<Modal
						buttonText1={t('common:app.confirm')}
						heading={t('common:idealSettingScreen.selectGender')}
						onClose={() => {
							setGenderPicker(false);
						}}
					>
						<Picker
							selectedValue={gender}
							style={styles.internalPickerContainer}
							onValueChange={(itemValue, itemIndex) => {
								setGender(itemValue);
								if (callSetGender) {
									props.setGenderFn(itemValue);
								}
							}}
						>
							<Picker.Item
								label={t('common:idealSettingScreen.pleaseEnter')}
								value={t('common:idealSettingScreen.pleaseEnter')}
							/>
							<Picker.Item label={t('common:app.male')} value={t('common:app.male')} />
							<Picker.Item label={t('common:app.female')} value={t('common:app.female')} />
						</Picker>
					</Modal>
				)}
				<Text style={styles.value}>{gender}</Text>
			</TouchableOpacity>
		</View>
	);
}
export function SelectLocation(props) {

	const [locationModalVisible, setLocationModalVisible] = useState(false)
	const { userDetails } = props;
	const { t, i18n } = props;
	return (
		<View>
			<Modal
				shouldHideActionButton
				visible={locationModalVisible}
				buttonText1={t('common:idealSettingScreen.complete')}
				onClose={() => {
					setLocationModalVisible(false)
				}}
			>
				<Text style={styles.alertTitle}>{t('common:idealSettingScreen.region')}</Text>
				<TouchableOpacity
					style={styles.locationSelectionBtn}
					onPress={() => {
						setLocationModalVisible(false)
						navigation.navigate('LocationAutocomplete', {
							direct: true,
							isProfile: true
						});
					}}
				>
					<Text style={styles.locationBtnTitle}>{t('common:idealSettingScreen.title')}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.locationSelectionBtn, { flexDirection: 'row' }]}
					onPress={() => {
						setLocationModalVisible(false)
						props.navigation.navigate('LocationAutocomplete', {
							direct: false,
							isProfile: true
						});
					}}
				>
					<Image
						source={CurrentLocationIcon}
						style={{ width: 10, height: 10, marginRight: 5 }}
					/>
					<Text style={styles.locationBtnTitle}>현재위치로 선택</Text>
				</TouchableOpacity>
			</Modal>
			<TouchableOpacity
				onPress={() => {
					setLocationModalVisible(!locationModalVisible)
				}}
			>
				<InputWithTitle
					multiline
					numberOflines={0}
					icon={LocationImage}
					title="지역"
					placeholder="선택해주세요"
					containerStyle={{ marginTop: 10, height: 'auto' }}
					editable={false}
					value={!!userDetails ? userDetails.location : "서울시 서초구"}
					pointerEvents="none"
				/>
			</TouchableOpacity>
		</View>

	);
}

export function PickerImpConditionModal(props) {
	const [showPicker, togglePicker] = useState(false);
	const [pickerValue, setPickerValue] = useState(!!props.userDetails ? props.userDetails.impCondition : 'sex');
	const callSetImpCondition = props.callSetImpCondition ? props.callSetImpCondition : false;
	const { t } = props;
	return (
		<View style={styles.cardListOuter}>
			<View style={styles.lhsBox}>
				<Text style={styles.label}>우선 조건</Text>
			</View>

			<TouchableOpacity
				style={styles.rhsBox}
				onPress={() => {
					togglePicker(true);
				}}
			>
				{showPicker && (
					<Modal
						buttonText1={t('common:app.confirm')}
						heading={t('common:idealSettingScreen.conditionModal.header')}
						onClose={() => {
							togglePicker(false);
						}}
					>
						<Picker
							selectedValue={pickerValue}
							style={styles.internalPickerContainer}
							onValueChange={(itemValue, itemIndex) => {
								setPickerValue(itemValue);
								if (callSetImpCondition) {
									props.setImpConditionFn(itemValue);
								}
							}}
						>
							<Picker.Item
								label={t('common:register.basicDetailsScreen.sex')}
								value={t('common:register.basicDetailsScreen.sex')} 
								/>
							<Picker.Item
								label={t('common:register.basicDetailsScreen.height')}
								value={t('common:register.basicDetailsScreen.height')}
								/>
							<Picker.Item
								label={t('common:idealSettingScreen.distance')}
								value={t('common:idealSettingScreen.distance')}
								/>
						</Picker>
					</Modal>
				)}
				<Text style={styles.value}>{pickerValue}</Text>
			</TouchableOpacity>
		</View>
	);
}

export function PickerModal() {
	const [showPicker, togglePicker] = useState(false);
	const [pickerValue, setPickerValue] = useState('입력해주세요');

	return (
		<View style={styles.cardListOuter}>
			<View style={styles.lhsBox}>
				<Text style={styles.label}>{t('common:idealSettingScreen.condition')}</Text>
			</View>

			<TouchableOpacity
				style={styles.rhsBox}
				onPress={() => {
					togglePicker(true);
				}}
			>
				{showPicker && (
					<Modal
						heading="가장 중요한 조건을 선택하세요"
						onClose={() => {
							togglePicker(false);
						}}
					>
						<Picker
							selectedValue={pickerValue}
							style={styles.internalPickerContainer}
							onValueChange={(itemValue, itemIndex) => {
								setPickerValue(itemValue);
							}}
						>
							<Picker.Item
								label="입력해주세요"
								value="입력해주세요"
							/>
							<Picker.Item label="키" value="키" />
							<Picker.Item label="얼굴" value="얼굴" />
							<Picker.Item label="재산" value="재산" />
							<Picker.Item label="성격" value="성격" />
						</Picker>
					</Modal>
				)}
				<Text style={styles.value}>{pickerValue}</Text>
			</TouchableOpacity>
		</View>
	);
}

// Main component
export default function CardList(props) {
	// const [dob, setDob] = useState(new Date());
	// const [showDobPicker, setDobPicker] = useState(false);

	const [physique, setPhysique] = useState('마른근육');
	// const [showPhysiquePicker, setPhysiquePicker] = useState(false);
	const { userDetails } = props;
	const [modalVisible, setModalVisible] = useState(false)
	const [newInterest, setNewInterest] = useState(false)

	const [interestedHashtags, setInterestedHashtags] = useState([])

	useEffect(() => {
		setPhysique(!!userDetails ? userDetails.physique : physique)

		const array = !!userDetails && userDetails.interestedHashtags
		if (array.length > 0) {
			var newInterests = [];
			array.forEach(element => {
				newInterests = [
					{
						name: element,
						isSelected: true
					},
				];
			});
			setInterestedHashtags(newInterests)
		}


	})

	function calculate_age(birthday) {
		// birthday is a date
		let formattedDate = moment(birthday).format('LL');
		let dateDiff = moment().diff(formattedDate, 'years');
		console.log(dateDiff);
		return dateDiff;
	}

	return (
		<View>
			{/* Real-name card */}
			{/* <Text style={styles.value1}>기본정보</Text> */}

			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={UserImage} style={styles.icon} />
					<Text style={styles.label}>닉네임</Text>
				</View>

				<View style={styles.rhsBox}>
					<TextInput
						style={styles.inputType}
						value={!!userDetails ? userDetails.firstName : ""}
						maxLength={5}
					/>
				</View>
			</View> */}

			{/* Gender card */}
			{/* <SelectGender /> */}

			{/* Age card */}
			{/* <View style={{ ...styles.cardListOuter, borderWidth: 0 }}>
				<View style={styles.lhsBox}>
					<Image
						source={BirthDateImage}
						style={{ ...styles.icon, tintColor: config.btnLine }}
					/>
					<Text style={{ ...styles.label, color: config.btnLine }}>나이</Text>
				</View>

				<TouchableOpacity
					disabled
					style={styles.rhsBox}
				// onPress={() => setDobPicker(true)}
				>
					{showDobPicker && (
						<Modal
							heading="생년월일을 입력하세요"
							visible={showDobPicker}
							onClose={() => {
								setDobPicker(false);
							}}
						>
							<DatePicker
								style={{ width: 200 }}
								format="YYYY-MM-DD"
								mode="date"
								date={dob}
								onDateChange={date => {
									setDob(date);
								}}
							/>
						</Modal>
					)}
					<Text style={{ ...styles.value, color: config.btnLine }}>
						{!!userDetails && userDetails.dob !== "" ? `만 ${calculate_age(userDetails.dob)} 세` : dob.toISOString().split('T')[0]}
					</Text>
				</TouchableOpacity>
			</View> */}

			{/* Location card */}
			{/* <SelectLocation {...props} /> */}


			{/* Username card */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={UserImage} style={styles.icon} />
					<Text style={styles.label}>닉네임</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<TextInput
						style={styles.inputType}
						placeholder="ex) 아웃라이어스123 "
						maxLength={15}
					/>
				</TouchableOpacity>
			</View> */}


			{/* Body Type card */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={BodyTypeImage} style={styles.icon} />
					<Text style={styles.label}>체형</Text>
				</View>

				<TouchableOpacity
					style={styles.rhsBox}
					onPress={() => setPhysiquePicker(true)}
				>
					{showPhysiquePicker && (
						<Modal
							heading="체형을 선택하세요"
							visible={showPhysiquePicker}
							onClose={() => {
								setPhysiquePicker(false);
							}}
						>
							<Picker
								selectedValue={physique}
								style={styles.internalPickerContainer}
								onValueChange={(itemValue, itemIndex) => {
									setPhysique(itemValue);
								}}
							>
								<Picker.Item
									label="마른근육"
									value="마른근육"
								/>
								<Picker.Item
									label="마른근육"
									value="마른근육"
								/>
								<Picker.Item label="근육질" value="근육질" />
								<Picker.Item label="글래머" value="글래머" />
								<Picker.Item label="슬림" value="슬림" />
								<Picker.Item label="마른" value="마른" />
								<Picker.Item label="보통" value="보통" />
								<Picker.Item label="통통한" value="통통한" />
							</Picker>
						</Modal>
					)}
					<Text style={styles.value}>{physique}</Text>
				</TouchableOpacity>
			</View> */}

			{/* Height card */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={HeightImage} style={styles.icon} />
					<Text style={styles.label}>키</Text>
				</View>

				<View style={styles.rhsBox}>
					<TextInput
						value={!!userDetails ? userDetails.height : ""}
						style={styles.inputType}
						placeholder="ex)168 "
						maxLength={3}
						keyboardType="numeric"
					/>
					<Text style={styles.value}>cm</Text>
				</View>
			</View> */}

			{/* University card */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={UniversityImage} style={styles.icon} />
					<Text style={styles.label}>학교</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}> {!!userDetails ? userDetails.college : "서울대학교"} </Text>
				</TouchableOpacity>
			</View> */}

			{/* Job card */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={JobImage} style={styles.icon} />
					<Text style={styles.label}>직업</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}>{!!userDetails ? userDetails.company : "대학원생"}</Text>
				</TouchableOpacity>
			</View> */}

			{/* Race card */}
			{/* <SelectRace userDetails={userDetails} /> */}

			{/* Smoking */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={icSmoke} style={styles.icon} />
					<Text style={styles.label}>흡연여부</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}>{!!userDetails ? userDetails.doSmoke : "비흡연"}</Text>
				</TouchableOpacity>
			</View> */}

			{/* Religion */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Text style={styles.label}>종교</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}>선택하기</Text>
				</TouchableOpacity>
			</View> */}

			{/* Exercise */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={JobImage} style={styles.icon} />
					<Text style={styles.label}>운동</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}>선택하기</Text>
				</TouchableOpacity>
			</View> */}

			{/* Exercise */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Image source={JobImage} style={styles.icon} />
					<Text style={styles.label}>술</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}>선택하기</Text>
				</TouchableOpacity>
			</View> */}

			{/* Thoughts about marriage */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Text style={styles.label}>결혼에 대한 생각</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}>선택하기</Text>
				</TouchableOpacity>
			</View> */}

			{/* Appeal Priority */}
			{/* <View style={styles.cardListOuter}>
				<View style={styles.lhsBox}>
					<Text style={styles.label}>어필우선순위</Text>
				</View>

				<TouchableOpacity style={styles.rhsBox}>
					<Text style={styles.value}>키</Text>
					<Image source={icSetArrow} style={styles.downArrowIcon} />
				</TouchableOpacity>
			</View> */}

			{/* <Text style={styles.value1}>이상형 태그</Text>

			<ActionButton
				iconStyle={styles.addImageIcon}
				icon={AddImage}
				customStyle={{
					touchableStyle: styles.addImageButton,
					buttonTextStyle: styles.addImageText,
				}}
				onPress1={() => { }}
				text={' 추가하기'}
			/>

			<Text style={styles.value1}>관심 태그</Text>

			<ActionButton
				iconStyle={styles.addImageIcon}
				icon={AddImage}
				customStyle={{
					touchableStyle: styles.addImageButton,
					buttonTextStyle: styles.addImageText,
				}}
				onPress1={() => {
					setModalVisible(true)
				}}
				text={' 추가하기'}
			/>

			<View style={styles.selectItemList}>
				{interestedHashtags.map((item, index) => (
					<TouchableOpacity
						onPress={() => {
							// this.getin (index);
							var array = interestedHashtags;
							console.log("old array", JSON.stringify(array))
							array[index] = {
								name: item.name,
								isSelected: !item.isSelected,
							};
							setInterestedHashtags(array)
							console.log(JSON.stringify(interestedHashtags))
						}}
						key={index}
						style={[
							styles.itemContainer,
							item.isSelected && { borderColor: config.black },
						]}
					>
						<Text style={styles.itemText}>
							{' '}{item.name}{' '}
						</Text>
					</TouchableOpacity>
				))}

			</View> */}

			<Text style={styles.value1}>{props.t('common:editProfileScreen.introduction')}</Text>

			<IconInput
			  clearTextOnFocus={false}
              autoCorrect={true}
			  autoFocus={false}
				multiline
				isRightImage={false}
				iconStyle={{ width: 0, margin: -10 }}
				insetShadowStyle={{ height: 0 }}
				value={props.introduction}
				inputStyle={styles.textInputContainerTwo}
				textInputStyle={styles.textInputStyle}
				onChangeText={(text) => {
					props.setIntroduction(text)
				}}
				placeholder={props.t('common:editProfileScreen.aboutSelf')}
			// type="emailAddress"
			// keyboardType="email-address"
			/>

			{/* Smoke  card */}
			{/* <SelectSmoke /> */}
			<Text />
			{
				<Modal
					visible={modalVisible}
					transparent={true}
					// icon={SendConfirmIcon}
					// heading="관심태그를 입력해 주세요."
					onClose={() => {
						setModalVisible(false)
						setInterestedHashtags([
							...interestedHashtags,
							{
								name: newInterest,
								isSelected: true,
							},
						])
						console.log(
							interestedHashtags
						)
					}}
					buttonText1={'추가하기'}
				>
					<Text
						style={{
							fontFamily: config.regularFont,
							fontSize: 18,
							fontWeight: 'bold',
							fontStyle: 'normal',
							lineHeight: 26,
							letterSpacing: 0,
							color: config.black,
							marginBottom: 12,
						}}
					>
						관심태그를 입력해 주세요.
            </Text>
					<IconInput
						isRightImage={false}
						iconStyle={{ width: 0, margin: -10 }}
						insetShadowStyle={{ height: 0 }}
						inputStyle={{
							width: width * 0.7,
							fontFamily: config.regularFont,
							fontSize: 15,
							fontWeight: 'bold',
							alignSelf: 'center',
							borderWidth: 1,
							borderColor: config.whiteTwo,
							fontStyle: 'normal',
							lineHeight: 20,
							letterSpacing: 0,
							color: config.black,
						}}
						onChangeText={text =>
							setNewInterest(text)
						}
						placeholder="재태크"
						type="emailAddress"
						keyboardType="email-address"
					/>
				</Modal>}
		</View>
	);
}
