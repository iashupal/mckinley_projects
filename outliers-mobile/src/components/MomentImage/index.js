import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';

import styles from './styles';
import moment from 'moment';

export default function MomentImage(props) {
  const uri = props.uri ? props.uri : '';
  const createdAt = props.createdAt ? props.createdAt : '';
  const x = moment();
  const y = moment(createdAt);
  let d = x.diff(y);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const ismargin = props.ismargin ? props.ismargin : '';

  if (d < 1800000) {
    // 	let timer = setInterval(() => {
    // 		d = d - 1000;
    const durationObj = moment.duration(1800000 - d);
    setTimeout(() => {
      setMinutes(('0' + durationObj._data.minutes).slice(-2));
      setSeconds(('0' + durationObj._data.seconds).slice(-2));
    }, 1000);
    // 	}, 1000);
  } // less than 30 minutes
  console.log('ismargin', props.ismargin);
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Image
        style={ismargin === true ? styles.newMargin : styles.momentImage}
        source={{ uri }}
      />
      {/* <View style={styles.overlayBox}>
				<View style={styles.overlay} />
				<Text style={styles.countDown}>{minutes}: {seconds}</Text>
			</View> */}
    </TouchableOpacity>
  );
}
