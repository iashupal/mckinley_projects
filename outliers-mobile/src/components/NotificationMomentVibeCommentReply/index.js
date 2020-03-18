import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import NavigationService from "@services/NavigationService";
import moment from "moment";
import lockVibe from "@assets/images/icLockPhoto.png";
import { withNamespaces } from "react-i18next";

function NotificationMomentVibeCommentReply(props) {
  const notification = props.notification;
  return (
    <View style={styles.itemRowContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          console.log({ id: notification._id });
          props.updateSeenStatus({ id: notification._id });
          NavigationService.navigate("ProfileSendLikeCoffee", {
            id: notification.senderId,
            backRoute: "NoticeScreen"
          });
        }}
      >
        <Image
          source={{
            uri:
              !!notification.senderInfo[0] && notification.senderInfo[0].photos.length > 0
                ? notification.senderInfo[0].photos[0].url
                : ""
          }}
          style={styles.profilePicStyle}
        />
        {!!notification.senderInfo[0] && notification.senderInfo[0].profileStatus !== "public" && (
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              width: 36,
              height: 36,
              borderRadius: 18,
              // backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundColor:
                !!notification && !!notification.senderInfo[0] && notification.senderInfo[0].profileStatus !== "public"
                  ? "rgba(0,0,0,0)"
                  : "rgba(0, 0, 0, 0.5)"
            }}
          >
            {notification.profileRequest.map(request => {
              if (
                request.receiverId === props.user_id &&
                request.senderId === notification.senderInfo[0]._id &&
                status === "accepted"
                //   ||
                // (request.receiverId === props.user_id &&
                //   request.senderId === notification.senderInfo[0]._id &&
                //   status === "accepted")
              ) {
              } else <Image style={{ width: 12, resizeMode: "contain" }} source={lockVibe} />;
            })}
            {/* <Image style={{ width: 12, resizeMode: "contain" }} source={lockVibe} /> */}
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rightContentContainer}
        onPress={() => {
          props.updateSeenStatus({ id: notification._id });
          NavigationService.navigate("ProfileComments", {
            id: notification.momentOrVibeId,
            ownerId: notification.receiverId,
            backRoute: "NoticeScreen"
          });
        }}
      >
        <View style={styles.firstRowContainer}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>
              {!!notification.senderInfo[0] && notification.senderInfo[0].username}
              {props.t("noticeScreenLang:commented")}
            </Text>
          </View>
          <View style={styles.notificationTimeContainer}>
            <Text style={styles.notificationTime}>
              {/* 10분 전 */}
              {moment(notification.createdAt).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default withNamespaces(["common", "noticeScreenLang"], {
  wait: true
})(NotificationMomentVibeCommentReply);
