import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function MomentImage(props) {
	return (
		<TouchableOpacity>
			<Image
				blurRadius={1}
				opacity={0.8}
				style={styles.momentImage}
				source={{
					uri:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZ9mEKcetDDaR2W66vc7qSOKt1sMYeGtS3WmPzmZ4FH3qUQ7W'
				}}
			/>
			<View style={styles.overlay} />
			<View style={styles.tagContainer}>
				<Text style={styles.countDown}>{props.tag}</Text>
			</View>
		</TouchableOpacity>
	);
}
