import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
  container: {
    flexDirection: "row"
    // backgroundColor: config.navyBlack
  },
  button: {
    flex: 1,
    height: 54,
    backgroundColor: config.navyBlack,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  sideIconText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "100",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: config.white
  },
  buttonText: {
    color: "white",
    fontFamily: config.boldFont,
    fontWeight: "bold",
    fontSize: 17
  },
  hasTwoIconText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "100",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "white"
  },
  hasTwoIcon: {
    marginLeft: 5,
    width: 18,
    height: 18,
    resizeMode: "contain",
    tintColor: "white"
  }
}));
