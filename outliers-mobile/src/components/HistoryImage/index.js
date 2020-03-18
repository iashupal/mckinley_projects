import React from 'react';

import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';

export default function HistoryImage(props) {
	return (
		<TouchableOpacity>
			<Image
				style={styles.image}
				source={{
					uri: 'http://jjalbang.today/jj1PK.jpg'
				}}
			/>
		</TouchableOpacity>
	);
}
