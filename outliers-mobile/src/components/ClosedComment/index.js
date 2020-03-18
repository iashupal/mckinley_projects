import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import Modal from '@components/CustomModal';

import LockIcon from '@assets/images/ic_lock.png';
import icLockGrey from '@assets/images/icLockGrey.png';
import CloverIcon from '@assets/images/ic_clover.png';

import styles from './styles';

export default function ClosedComment(props) {
  const [showModal, toggleModal] = useState(false);
  return (
    <View style={styles.commentContainer}>
      <View
        style={{
          ...styles.commentContentContainer,
          width: '100%',
          paddingLeft: 22,
          paddingRight: 20,
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.lockIcon} source={icLockGrey} />
          <Text style={styles.commentText}>댓글 열람 권한이 없습니다.</Text>
        </View>
        <TouchableOpacity style={styles.viewProfileButton}>
          <Text style={styles.text1}>보기{` `}</Text>
          <Image style={styles.cloverIcon} source={CloverIcon} />
          <Text style={styles.text2}> x 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
