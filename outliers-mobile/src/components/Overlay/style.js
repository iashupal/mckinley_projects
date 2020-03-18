import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  overlayContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(100,59,167, 0.5)",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  overlayText: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: "40%",
    fontSize: 24,
    letterSpacing: 0.5,
    fontWeight: "bold"
  }
}));
