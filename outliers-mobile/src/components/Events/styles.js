import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
  events: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  eventImg: {
    color: "#fff",
    fontFamily: config.regularFont,
    fontSize: 15,
    backgroundColor: "rgb(238,113,130)",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10
  },
  eventPartyContent: {},
  eventHeading: {
    fontFamily: config.boldFont,
    fontSize: 15,
    color: "#000000",
    fontWeight: "bold"
  },
  eventHashtag: {
    color: "rgb(170,170,170)",
    fontSize: 14
    // paddingVertical: 5
  },
  eventTime: {
    fontSize: 14
  }
}));
