import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

//Import assets
import NormalCheckbox from '@assets/images/ic_blank_checkbox.png';
import ActiveCheckbox from '@assets/images/ic_filled_checkbox.png';

import styles from './styles';

export default function CheckBox(props) {
	const [selected, setSelected] = useState(props.selected);

	const normalImage = props.normalImage ? props.normalImage : NormalCheckbox;

	function onPressHandle() {
		setSelected(!selected);
		// if (props.onPress) onPress(props.onPress());
		!!props.onPress && props.onPress()
	}

	return (
		<View>
			<TouchableOpacity hitSlop={props.hitSlop} onPress={() => onPressHandle()}>
				<Image
					source={selected ? ActiveCheckbox : normalImage}
					style={styles.checkBox}
				/>
			</TouchableOpacity>
		</View>
	);
}
