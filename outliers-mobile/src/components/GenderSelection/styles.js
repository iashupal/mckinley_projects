import { StyleSheet } from "react-native";
import config from "@src/config.js";

export default (styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginVertical: 10
  },
  button: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 3,
    height: 44
  },
  buttonTitle: {
    textAlign: "center",
    fontFamily: config.regularFont,
    fontSize: 15
  },
  buttonTitleBold: {
    textAlign: "center",
    fontFamily: config.semiboldFont,
    color: config.navyBlack,
    fontSize: 15,
    fontWeight: "bold"
  }
}));
