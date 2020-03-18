import React from 'react';
import { View } from 'react-native';

import styles from './styles';

export default function DotSlider(props) {

	let dots = []
	if (props.numberOfSteps != undefined) {
		if (props.numberOfSteps <= 2) {
			if (props.active != undefined && props.active == 2) {
				dots = [<View style={styles.normalDot} />, <View style={styles.activeDot} />]
			} else {
				dots = [<View style={styles.activeDot} />, <View style={styles.normalDot} />]
			}
		} else {
			let active = props.active === undefined ? 1 : props.active
			for (i = 0; i < props.numberOfSteps; i++) {
				if (i == active - 1) {
					dots.push(<View style={styles.activeDot} />)
				} else {
					dots.push(<View style={styles.normalDot} />)
				}
			}
		}
	}

	return (
		<View style={{ ...styles.dotSlider , ...props.containerStyle }}>
			{/* <View style={firstDot} />
			<View style={secondDot} /> */}
			{dots}
		</View>
	);
}
