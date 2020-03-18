import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
  profileList: {
    height: 125,
  },
  profileImage: {
    width: 120,
    height: "100%",
    // borderRadius: 48,
    // borderWidth: 3,
    borderColor: "white",
    marginRight: 0
  },
  selectedImage: {
    borderColor: config.soft_blue
  }
}));
