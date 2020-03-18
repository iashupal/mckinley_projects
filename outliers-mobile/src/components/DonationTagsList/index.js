import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function DonationTagsList(props) {
  const [tags, setTags] = useState(props.tags);
  const multiSelection = props.multiSelection ? props.multiSelection : false;
  const [selectedTag, setSelectedTag] = useState([]);
  const enabled = props.enabled !== undefined ? props.enabled : true;
  function handleStyleChange(key) {
    let tag = tags[key][0];
    let tempArr = [...selectedTag];
    if (multiSelection === true) {
      if (tempArr.includes("#" + tag)) {
        tempArr.splice(tempArr.indexOf("#" + tag), 1);
      } else {
        tempArr.push("#" + tag);
      }
    } else {
      tempArr = ["#" + tag];
    }
    setSelectedTag(tempArr);
    if (props.onchangeSelectedTags) props.onchangeSelectedTags(tempArr);
  }

  return (
    <View style={[styles.wrap, props.containerStyle]}>
      {Object.keys(tags).map(key => {
        if (!enabled) {
          return <Text style={styles.normalTag}>{tags[key][0]}</Text>;
        } else {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                if (enabled) handleStyleChange(key);
              }}
            >
              <Text
                style={
                  selectedTag.includes("#" + props.tags[key][0])
                    ? [styles.normalTag, styles.activeTag]
                    : styles.normalTag
                }
              >
                {tags[key][0]}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}