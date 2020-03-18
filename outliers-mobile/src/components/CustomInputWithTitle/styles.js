import { StyleSheet } from "react-native";
import config from "@src/config.js";

export default (styles = StyleSheet.create({
  inputContiner: {
    minHeight: 48,
    backgroundColor: config.white_grey,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E9E9E9'
  },
  icon: {
    width: 16,
    height: 18,
    marginRight: 12
  },
  iconRight: {
    width: 12,
    height: 9,
    position: "absolute",
    right: 10
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "black",
    fontFamily: config.boldFont,
    fontWeight: 'bold'
  },
  title: {
    fontFamily: config.regularFont,
    color: 'black'
  }
}));
