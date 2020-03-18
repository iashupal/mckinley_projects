import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

// Import assets
import CloseIcon from "@assets/images/ic_close.png";
import BackIcon from "@assets/images/ic_back.png";
import config from "@src/config";
import styles from "./styles";
import NavigationService from "@services/NavigationService";
import { ISO_8601 } from "moment";
import Badge from "../Badge";

// @ onPressLeftAction: function
// @ profileImage
// @ sectionTitle: string
// @ section Header: JSX object
// @ rightNavIcon
// @ rightSecondIcon
// @ rightNavText

export default function TopBarHeader(props) {
  let onPressLeftAction = !props.onPressLeftAction ? NavigationService.goBack : props.onPressLeftAction;
  let iconSource = props.action === "close" ? CloseIcon : props.action === "back" ? BackIcon : "";
  let iconStyle = props.profileImage ? styles.profileImage : styles.topLeftIcon;
  iconSource = props.profileImage ? { uri: props.profileImage } : iconSource;
  iconSource = props.hiddenBack ? "" : iconSource;

  let sectionTitle = props.sectionHeader ? (
    props.sectionHeader
  ) : (
      <Text style={[styles.sectionTitle, props.tintColor && { color: props.tintColor }]}>{props.sectionTitle}</Text>
    );
  return (
    <View style={[styles.header, props.headerContainerStyle]}>
      <View style={[styles.sectionTitleContainer, props.sectionTitleContainerStyle]}>{sectionTitle}</View>
      <TouchableOpacity disabled={iconSource === ""} style={styles.topLeftIconButton} onPress={() => onPressLeftAction()}>
        <Image style={[iconStyle, { tintColor: props.tintColor }]} source={iconSource} />
      </TouchableOpacity>
      {props.isMoment && (
        <TouchableOpacity
          style={{
            zIndex: 1200,
            backgroundColor: "white",
            opacity: 1,
            position: "absolute",
            left: "2%"
          }}
          onPress={() => onPressLeftAction()}
        >
          <Image style={[iconStyle, { width: 32, height: 32, tintColor: props.tintColor }]} source={props.isMoment} />
        </TouchableOpacity>
      )}
      <View style={styles.rightNav}>
        {props.isMyCommentScreen && (
          <View style={{ flexDirection: "row" }}>
            <Text
              onPress={props.onProfileView}
              style={{
                fontFamily: config.regularFont,
                fontSize: 16,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "right",
                color: config.brownishGrey
              }}
            >
              {props.isMyCommentScreen} {" | "}
            </Text>
            <Text
              onPress={() => {
                props.onDelete;
              }}
              style={{
                fontFamily: config.regularFont,
                fontSize: 16,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "right",
                color: config.brownishGrey
              }}
            >
              {props.onDeleteText}
            </Text>
          </View>
        )}
        {props.rightNavSecondIcon && (
          <TouchableOpacity onPress={props.rightNavSecondIcon}>
            <Image
              style={{
                ...styles.topRightIcon,
                ...props.rightNavIconStyle,
                tintColor: props.tintColor
              }}
              source={props.rightNavSecondIcon}
            />
          </TouchableOpacity>
        )}
        {props.rightNavBlockIcon && (
          <TouchableOpacity onPress={props.onPressRightAction2}>
            <Image
              style={{
                ...styles.topRightIcon,
                ...props.rightNavBlockIconStyle,
                tintColor: props.tintColor
              }}
              source={props.rightNavBlockIcon}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={props.onPressRightAction}>
          <Image
            style={{
              ...styles.topRightIcon,
              ...props.rightNavIconStyle,
              tintColor: props.tintColor
            }}
            source={props.rightNavIcon}
          />
        </TouchableOpacity>

        {props.alarmIcon && (
          <TouchableOpacity onPress={() => NavigationService.navigate("Notification")}>
            <Image style={{ ...styles.alarmIcon, tintColor: props.tintColor }} source={props.alarmIcon} />
            <Badge />
          </TouchableOpacity>
        )}
        {props.isProfile && (
          <TouchableOpacity onPress={() => NavigationService.navigate("Report")}>
            <Image style={{ ...styles.rightSecondIcon, tintColor: props.tintColor }} source={props.rightSecondIcon} />
          </TouchableOpacity>
        )}
        {props.isVibe && (
          <TouchableOpacity onPress={props.onPressRightAction}>
            <Image style={styles.vibeProfile} source={{ uri: props.vibeProfile }} />
            {props.lockVibe && (
              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  ...styles.vibeProfile,
                  backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}
              >
                <Image style={{ width: 12, resizeMode: "contain" }} source={props.lockVibe} />
              </View>
            )}
          </TouchableOpacity>
        )}
        {props.isClover && (
          <TouchableOpacity style={styles.noOfCloves} onPress={props.onPressRightAction}>
            <Image style={{ ...styles.cloverIcon, tintColor: props.tintColor }} source={props.cloverIcon} />
            <Text style={{ ...styles.noOfClovesText, color: props.tintColor }}>{props.noOfClover}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.rightNavText}>{props.rightNavText}</Text>
      </View>
    </View>
  );
}
