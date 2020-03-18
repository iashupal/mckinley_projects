import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: "white",
    paddingBottom: 10,
    borderBottomColor: config.whiteTwo,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  targetContainer: {
    flexDirection: "row",
    flex: 6
  },
  targetImage: {
    width: 48,
    height: 48,
    borderRadius: 48,
    marginTop: 10,
    marginRight: 12
  },
  notificationText: {
    fontSize: 13,
    fontFamily: "NotoSansKR-Bold",
    color: config.brownishGrey,
    justifyContent: "flex-start"
  },
  timeStamp: {
    fontSize: 13,
    textAlign: "right",
    fontFamily: "NotoSansKR-Bold",
    color: config.hintText,
    flex: 3
  }
}));
