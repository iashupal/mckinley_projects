import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

//Importing assets
import OpenArrow from '@assets/images/ic_open_list.png';
import CloseArrow from '@assets/images/ic_close_list.png';

// Importing style
import styles from './styles';

export default function Accordian(props) {
  const [expanded, toggleExpand] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.accordionContainer}
        onPress={() => toggleExpand(!expanded)}
      >
        <Text style={styles.title}>{props.title}</Text>
        <Image source={expanded ? CloseArrow : OpenArrow} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.openAccordContainer} />
      {expanded && (
        <View style={styles.accordChild}>
          <Text>{props.data}</Text>
        </View>
      )}
    </View>
  );
}
