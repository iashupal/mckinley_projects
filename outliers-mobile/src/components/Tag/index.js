import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../DonationTagsList/styles';

export default function Tag(props) {
	const [isActive, toggleActive] = useState(false);

	return (
		<View style={styles.wrap}>
			<TouchableOpacity onPress={() => toggleActive(!isActive)}>
				<Text
					style={[
						styles.normalTag,
						isActive ? styles.activeTag : null
					]}
				>
					{props.tagText}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
