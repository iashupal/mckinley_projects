import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    // width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderBottomColor: "rgb(228,228,228)",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    textAlign: "center"
  },
  tabs: {
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  tabText: {
    fontSize: 15,
    color: "rgb(48,54,59)",
    fontFamily: config.regularFont
    // fontWeight: "bold"
  },
  active: {
    borderBottomColor: "#000000",
    borderWidth: 2
  },
  activeText: {
    color: "rgb(48,54,59)",
    fontFamily: config.boldFont,
    fontWeight: "bold"
  }
}));
