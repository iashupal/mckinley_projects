import { View, StyleSheet } from "react-native";
import React from "react";

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#e8e8e8",
    marginHorizontal: 15,
    marginVertical: 30
  }
});

export default Divider;
