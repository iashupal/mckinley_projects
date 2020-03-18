import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';

// Import assets
import Clover from '@assets/images/ic_clover_black.png';
import HotDeal from '@assets/images/ic_flag_hot.png';

// @onPress: function
// @clovers: string => clover count
// @hot: boolean
// @amount: string => clover price

export default function StoreItem(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.oneRow}>
      <View style={styles.cloverNum}>
        <Image source={Clover} style={styles.cloverImage} />
        <Text style={styles.numText}>X {props.clovers}</Text>
      </View>
      <View style={styles.seperatorLine} />
      <View style={styles.priceHot}>
        {props.hot && <Image source={HotDeal} style={styles.hotIcon} />}
        <Text style={styles.numPrice}>{props.amount}</Text>
      </View>
    </TouchableOpacity>
  );
}
