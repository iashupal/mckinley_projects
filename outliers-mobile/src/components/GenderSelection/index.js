import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { withNamespaces } from "react-i18next";
import config from "@src/config";

function GenderSelection(props) {
  const { t } = props;
  const [male, setMale] = useState(props.value.toLowerCase() === "Male".toLowerCase() ? true : false);
  const [female, setFemale] = useState(props.value.toLowerCase() === "Female".toLowerCase() ? true : false);
  const [other, setOther] = useState(props.value.toLowerCase() === "Others".toLowerCase() ? true : false);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[styles.button, { borderColor: female ? config.navyBlack : config.selectBox }]}
        onPress={() => {
          setMale(false);
          setFemale(true);
          setOther(false);
          props.onSelectGender && props.onSelectGender("Female");
        }}
      >
        <Text style={[styles.buttonTitle, female ? styles.buttonTitleBold : styles.buttonTitle]}>
          {t("common:register.basicDetailsScreen.female")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: male ? config.navyBlack : config.selectBox,
            marginHorizontal: 10
          }
        ]}
        onPress={() => {
          setMale(true);
          setFemale(false);
          setOther(false);
          props.onSelectGender && props.onSelectGender("Male");
        }}
      >
        <Text style={[styles.buttonTitle, male ? styles.buttonTitleBold : styles.buttonTitle]}>
          {t("common:register.basicDetailsScreen.male")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { borderColor: other ? config.navyBlack : config.selectBox }]}
        onPress={() => {
          setMale(false);
          setFemale(false);
          setOther(true);
          props.onSelectGender && props.onSelectGender("Others");
        }}
      >
        <Text style={[styles.buttonTitle, other ? styles.buttonTitleBold : styles.buttonTitle]}>
          {t("common:register.basicDetailsScreen.other")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default withNamespaces(["common"], { wait: true })(GenderSelection);
