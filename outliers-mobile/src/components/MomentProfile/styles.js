import { StyleSheet } from "react-native";
import config from "@src/config";

export default (styles = StyleSheet.create({
    momentProfileContainer: {
        flexDirection: "row",
        width: config.component_width
    },
    userDetailsContainer: {
        marginLeft: 14
    },
    userMileText: {
        color: config.watermelon,
        fontFamily: "NotoSansKr-Regular",
        fontSize: 12
    },
    userLevelContainer: {
        flexDirection: "row",
        marginTop: 2
    },
    userLevel: {
        width: 16,
        height: 16,
        backgroundColor: config.white,
        borderRadius: 8,
        marginRight: 6,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "rgba(233,233,233,1)"
    },
    userLevelText: {
        fontSize: 8,
        color: config.brownishGrey,
        fontWeight: "bold",
        marginBottom: 1
    },
    levelText: {
        marginBottom: 2,
        color: "white"
    },
    userOrgText: {
        color: config.black,
        fontWeight: "bold",
        fontSize: 13,
        minWidth: 121,
        marginLeft: 0,
        marginBottom: 2,
        flexShrink: 1
    },
    userBioText: {
        width: 210,
        fontFamily: "NotoSansKr-Regular",
        fontSize: 12,
        lineHeight: 20,
        color: config.greyishBrown,
        marginTop: 0
    }
}));
