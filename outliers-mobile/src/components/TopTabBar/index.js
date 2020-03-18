import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

// @activeTab: (int 1 || 2)
// @tab1Text: (string)
// @onPress1: (function)
// @tab2Text: (string)
// @onPress2: (function)

export default (TopTabBar = props => {
	let tab1 = (tab2 = {
		tabStyle: styles.inactiveTab,
		tabTextStyle: styles.inactiveTabText
	});

	if (props.activeTab === 1) {
		tab1 = {
			tabStyle: styles.activeTab,
			tabTextStyle: styles.activeTabText
		};
	} else if (props.activeTab === 2) {
		tab2 = {
			tabStyle: styles.activeTab,
			tabTextStyle: styles.activeTabText
		};
	}

	return (
		<View style={styles.secondTabBar}>
			<TouchableOpacity
				onPress={() => props.onPress1()}
				style={tab1.tabStyle}
			>
				<Text style={tab1.tabTextStyle}>{props.tab1Text}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => props.onPress2()}
				style={tab2.tabStyle}
			>
				<Text style={tab2.tabTextStyle}>{props.tab2Text}</Text>
			</TouchableOpacity>
		</View>
	);
});
