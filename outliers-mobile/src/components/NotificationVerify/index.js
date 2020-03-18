import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import checkmark from "@assets/images/ic_send_confirm_b.png";
import NavigationService from "@services/NavigationService";
import styles from "./styles";
import { withNamespaces } from "react-i18next";
import moment from "moment";

function NotificationVerify(props) {
  const notification = props.notification;
  return (
    <View style={styles.itemRowContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          props.updateSeenStatus({
            id: notification._id
          });
          NavigationService.navigate("EditProfile", {
            // id: notification.senderId,
            backRoute: "NoticeScreen"
          });
        }}
      >
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            width: 36,
            height: 36
          }}
        >
          <Image style={{ width: 36, resizeMode: "contain" }} source={checkmark} />
        </View>
      </TouchableOpacity>
      <View style={styles.rightContentContainer}>
        <View style={styles.firstRowContainer}>
          <View style={styles.notificationTextContainer}>
            {notification.sentType === "university-verify-accepted" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationTwo")}</Text>
            ) : notification.sentType === "university-verify-rejected" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationSeven")}</Text>
            ) : notification.sentType === "occupation-verify-accepted" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationThree")}</Text>
            ) : notification.sentType === "occupation-verify-rejected" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationEight")}</Text>
            ) : notification.sentType === "wealth-verify-accepted" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationOne")}</Text>
            ) : notification.sentType === "wealth-verify-rejected" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationSix")}</Text>
            ) : notification.sentType === "face-verify" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationNine")}</Text>
            ) : notification.sentType === "user-img-update" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationTen")}</Text>
            ) : notification.sentType === "profile-img-update" ? (
              <Text style={styles.notificationText}>{props.t("noticeScreenLang:notificationEleven")}</Text>
            ) : (
              <Text />
            )}
          </View>
          <View style={styles.notificationTimeContainer}>
            <Text style={styles.notificationTime}>
              {/* 3분 전 */}
              {moment(notification.createdAt).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default withNamespaces(["common", "noticeScreenLang"], {
  wait: true
})(NotificationVerify);
