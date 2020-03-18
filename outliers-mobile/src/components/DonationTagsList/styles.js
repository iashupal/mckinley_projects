import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
  normalTag: {
    borderColor: config.selectBox,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 12,
    marginRight: 8,
    fontFamily: config.regularFont,
    fontSize: 15,
    flexDirection: "row"
    // paddingTop: 10
  },
  activeTag: {
    borderColor: config.charcoal_grey,
    color: config.charcoal_grey,
    fontWeight: "bold"
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  }
}));
