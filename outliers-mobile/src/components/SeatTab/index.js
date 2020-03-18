import { View, Text } from "react-native";
import React from "react";

function SeatTab(props) {
  return (
    <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
      <View style={{ backgroundColor: props.color || "#e4e4e4", height: 22 }}>
        <Text
          style={{ color: "white", fontWeight: "600", margin: 3, fontSize: 13 }}
        >
          {props.children}
        </Text>
      </View>
    </View>
  );
}

export default SeatTab;
