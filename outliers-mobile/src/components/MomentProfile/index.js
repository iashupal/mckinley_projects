import React from "react";
import { View, Text } from "react-native";

import MomentImage from "@components/MomentImage";
import styles from "./styles";
import { getMiles } from "../../utils/utility";
import { getAge } from "@utils/utility";
import Level from "../Level";
import { withNamespaces } from "react-i18next";

function MomentProfile(props) {
  const profile = {
    uri: props.uri ? props.uri : "",
    distance: props.distance ? getMiles(props.distance).toFixed(2) : 0,
    level: props.level ? props.level : 12,
    org: props.org ? "" + props.org : "",
    age: props.dob ? getAge(props.dob) : 0,
    description: props.description ? props.description : props.t("momentProfileComponent:noDescAdded"),
    createdAt: props.createdAt ? props.createdAt : ""
  };

  return (
    <View style={styles.momentProfileContainer}>
      <View style={{ alignSelf: "center" }}>
        <MomentImage disabled uri={profile.uri} createdAt={profile.createdAt} />
      </View>
      <View style={[styles.userDetailsContainer, { width: "60%" }]}>
        <Text style={styles.userMileText}>
          {profile.distance} {props.t("momentProfileComponent:mile")}
        </Text>
        <View style={styles.userLevelContainer}>
          {/* <View style={styles.userLevel}>
						<Text style={styles.userLevelText}>{profile.level}</Text>
					</View> */}
          <Level level={profile.level} levelType={profile.levelType} />
          <Text style={styles.userOrgText}>
            {props.t("momentProfileComponent:ageValue", {
              value: profile.age
            })}
            {", "}
            {profile.org}
          </Text>
        </View>
        <Text style={styles.userBioText}>{profile.description}</Text>
      </View>
    </View>
  );
}

export default withNamespaces(["common", "momentProfileComponent"], {
  wait: true
})(MomentProfile);
