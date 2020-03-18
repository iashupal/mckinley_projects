import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import moment from "moment";
import { withNamespaces } from 'react-i18next';


function NotificationAccountApproved(props) {
    const notification = props.notification;
    return (
        <TouchableOpacity
            onPress={() => {
                props.updateSeenStatus({ id: notification._id })
            }}
            style={styles.itemRowContainer}>
            <View style={styles.rightContentContainer}>
                <View style={styles.firstRowContainer}>
                    <View style={styles.notificationTextContainer}>
                        <Text style={styles.notificationText}>
                            {props.t('noticeScreenLang:photoApproved')}
                        </Text>
                    </View>
                    <View style={styles.notificationTimeContainer}>
                        <Text style={styles.notificationTime}>
                            {/* 1분 전 */}
                            {moment(notification.createdAt).fromNow()}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default withNamespaces(["common", "noticeScreenLang"], {
    wait: true
})(NotificationAccountApproved)