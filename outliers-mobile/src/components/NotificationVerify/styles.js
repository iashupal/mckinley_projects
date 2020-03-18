import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
  itemRowContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // paddingTop: 3
  },
  profilePicStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  rightContentContainer: {
    flex: 5,
    flexDirection: "column"
  },
  firstRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  notificationTextContainer: {
    flex: 2.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 5,
    paddingHorizontal: 10,
    textAlign: "justify"
  },
  notificationText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: config.brownishGrey,
    justifyContent: "flex-start"
  },
  notificationTimeContainer: {
    flex: 1.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 5,
    paddingLeft: 10,
    textAlign: "justify"
  },
  notificationTime: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.hintText
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  rejectContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.white,
    marginVertical: 5,
    borderWidth: 1,
    // width: 143,
    height: 36,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: config.navyBlack
  },
  rejectText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.black
  },
  acceptButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.navyBlack,
    margin: 5,
    // width: 143,
    marginRight: "2%",
    height: 36,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: config.navyBlack
  },
  acceptText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.white
  }
}));
