import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

export default function InputBox(props) {
	return (
		<View style={styles.inputBox}>
			<TextInput {...props} />
		</View>
	);
}
