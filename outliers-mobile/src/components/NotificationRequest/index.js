import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import NavigationService from "@services/NavigationService";
import styles from "./styles";
import moment from "moment";
import lockVibe from "@assets/images/icLockPhoto.png";
import { withNamespaces } from "react-i18next";
import { Config } from "@jest/types";

function NotificationRequest(props) {
  const notification = props.notification;
  console.log(notification);
  const [currentstatus, setCurrentStatus] = useState(notification.status);
  return (
    <View style={styles.itemRowContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          props.updateSeenStatus({
            id: notification._id
          });
          NavigationService.navigate("ProfileSendLikeCoffee", {
            id: notification.senderId,
            backRoute: "NoticeScreen"
          });
        }}
      >
        <Image
          source={{
            uri: !!notification && notification.senderInfo[0].photos.length > 0 ? notification.senderInfo[0].photos[0].url : ""
          }}
          style={styles.profilePicStyle}
        />
        {!!notification && !!notification.senderInfo[0] && notification.senderInfo[0].profileStatus !== "public" && (
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              width: 36,
              height: 36,
              top: 11,
              borderRadius: 18,
              // backgroundColor: "rgba(0, 0, 0, 0.5)"
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
                //   status === "pending")
              ) {
              } else <Image style={{ width: 12, resizeMode: "contain" }} source={lockVibe} />;
            })}
            <Image style={{ width: 12, resizeMode: "contain" }} source={lockVibe} />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.rightContentContainer}>
        <View style={styles.firstRowContainer}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>
              {!!notification && !!notification.senderInfo[0] && notification.senderInfo[0].username}
              {props.t("noticeScreenLang:requestedNotif")}
            </Text>
          </View>
          <View style={styles.notificationTimeContainer}>
            <Text style={styles.notificationTime}>
              {/* 3분 전 */}
              {moment(notification.createdAt).fromNow()}
            </Text>
          </View>
        </View>

        {notification.status === "pending" || currentstatus === "pending" ? (
          <View style={styles.buttonsContainer}>
            {/* <TouchableOpacity
              style={styles.rejectContainer}
              onPress={() => {
                setCurrentStatus("rejected");
                props.addRequestStatus({
                  itemSentId: notification._id,
                  status: "rejected"
                });
              }}
            >
              <Text style={styles.rejectText}>
                {props.t("noticeScreenLang:reject")}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                setCurrentStatus("accepted");
                props.addRequestStatus({
                  itemSentId: notification._id,
                  status: "accepted"
                });
              }}
            >
              <Text style={styles.acceptText}>{props.t("noticeScreenLang:accept")}</Text>
            </TouchableOpacity>
          </View>
        ) : notification.status === "accepted" || currentstatus === "accepted" ? (
          <Text
            style={{
              color: "green",
              paddingLeft: 10
            }}
          >
            {props.t("noticeScreenLang:youAccept")}
          </Text>
        ) : notification.status === "rejected" || currentstatus === "rejected" ? (
          <Text
            style={{
              color: "red",
              paddingLeft: 10
            }}
          >
            {props.t("noticeScreenLang:youRefuse")}
          </Text>
        ) : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.rejectContainer}
              onPress={() => {
                props.addRequestStatus({
                  itemSentId: notification._id,
                  status: "rejected"
                });
              }}
            >
              <Text style={styles.rejectText}>{props.t("noticeScreenLang:reject")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                props.addRequestStatus({
                  itemSentId: notification._id,
                  status: "accepted"
                });
              }}
            >
              <Text style={styles.acceptText}>{props.t("noticeScreenLang:accept")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default withNamespaces(["common", "noticeScreenLang"], {
  wait: true
})(NotificationRequest);
