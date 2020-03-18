import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

function EventsTab({ text, selected, onPress, width }) {
  return (
    <View style={[styles.tabContainer, selected ? styles.active : {}]} width={width}>
      <TouchableOpacity style={styles.tabs} onPress={onPress}>
        <Text style={[styles.tabText, selected ? styles.activeText : {}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

EventsTab.defaultProps = {
  selected: false
};

export default EventsTab;
