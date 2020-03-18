import React, { Component } from "react";
import {
    Modal,
    View,
    Text,
    Image,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions
} from "react-native";

import styles from "./styles";

//Import Components
import ActionButton from "@components/ActionButton";

const screenWidth = Dimensions.get("screen").width;
// icon: jsx component
// @buttonText1: string
// @heading: string
// @onClose: function
// @children: jsx component
// @hasTwo: boolean
// @buttonText2: string
// @onPress2: function
export default class HashtagModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.visible != nextProps.visible) {
            this.setState({ visible: nextProps.visible });
        }
    }

    handleCloseModal = () => {
        this.setState({ visible: !this.state.visible });
        if (this.props.onClose) this.props.onClose();
    };

    handleCancelModal = () => {
        this.setState({ visible: !this.state.visible });
        if (this.props.onCancel) this.props.onCancel();
    };

    render() {
        const { visible } = this.state;
        const {
            icon,
            children,
            heading,
            buttonText1,
            sideIcon,
            sideIconText,
            onPress1,
            hasTwo,
            hasTwoIcon,
            hasTwoIconText,
            modalFooterText,
            modalFooterStyle,
            modalTextColor,
            buttonText2,
            shouldHideActionButton,
            outerPadding,
            containerPadding,
            transparent,
            onPress2
        } = this.props;

        return (
            <Modal animationType="fade" transparent={transparent} visible={visible}>
                <View style={styles.modalBackground}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        style={[styles.modalBackground, { backgroundColor: "transparent" }]}
                    >
                        <View
                            style={[
                                styles.contentOuter,
                                {
                                    width:
                                        outerPadding !== undefined
                                            ? screenWidth - outerPadding * 2
                                            : screenWidth - 60
                                }
                            ]}
                        >
                            <View
                                style={[
                                    styles.contentBox,
                                    {
                                        padding:
                                            containerPadding !== undefined ? containerPadding : 30
                                    }
                                ]}
                            >
                                {icon && (
                                    <Image
                                        source={icon}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                )}
                                {heading && <Text style={styles.heading}>{heading}</Text>}
                                <View style={styles.childComponent}>{children}</View>
                            </View>
                            {modalFooterText && (
                                <View style={[styles.modalFooterStyle, modalFooterStyle]}>
                                    <Text style={{ ...styles.modalText, color: modalTextColor }}>
                                        {modalFooterText}
                                    </Text>
                                </View>
                            )}
                            {!shouldHideActionButton && (
                                <ActionButton
                                    text={buttonText1 ? buttonText1 : "확인"}
                                    onPress1={() => this.handleCancelModal()}
                                    customStyle={{
                                        touchableStyle: styles.buttonStyle
                                    }}
                                    sideIcon={sideIcon}
                                    sideIconText={sideIconText}
                                    hasTwo={hasTwo}
                                    hasTwoIcon={hasTwoIcon}
                                    hasTwoIconText={hasTwoIconText}
                                    text2={buttonText2}
                                    onPress2={() => this.handleCloseModal()}
                                />
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        );
    }
}
