import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function NotificationItem(props) {
  return (
    <TouchableOpacity style={styles.notificationContainer}>
      <View style={styles.targetContainer}>
        {props.image && <Image style={styles.targetImage} source={props.image} />}
        <Text style={styles.notificationText}>
          {props.notification}
          {/* 아웃라이어스님이 회원님의 바이브 #태그에서 프로필 더보기를
					신청했습니다. */}
        </Text>
      </View>
      <Text style={styles.timeStamp}>{props.time}</Text>
    </TouchableOpacity>
  );
}
