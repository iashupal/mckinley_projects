import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import like from '@assets/images/ic_noti_like.png';
import coffee from '@assets/images/ic_noti_coffee.png';
import goldCoffee from '@assets/images/btnCoffee3.png';
import NavigationService from '@services/NavigationService';
import styles from './styles';
import moment from "moment";
import { withNamespaces } from 'react-i18next';

function NotificationLikeCoffeeGold(props) {
    const notification = props.notification;
    const sentTypeImage = notification.sentType == 'like' ? like : notification.sentType == 'coffee' ? coffee : goldCoffee;
    return (
        <TouchableOpacity
            style={styles.itemRowContainer}
            onPress={() => {
                console.log({ id: notification._id })
                props.updateSeenStatus({ id: notification._id })
                NavigationService.navigate('ProfileSendLikeCoffee', { id: notification.senderId, backRoute: 'NoticeScreen' })
            }}>
            <View style={styles.imageContainer}>
                <Image source={sentTypeImage} style={styles.profilePicStyle} />
            </View>
            <View style={styles.rightContentContainer}>
                <View style={styles.firstRowContainer}>
                    <View style={styles.notificationTextContainer}>
                        <Text style={styles.notificationText}>
                            {!!notification
                                && notification.senderInfo[0]
                                && notification.senderInfo[0].username}{" "}{props.t('noticeScreenLang:likedYou')}
                        </Text>
                    </View>
                    <View style={styles.notificationTimeContainer}>
                        <Text style={styles.notificationTime}>
                            {/* 5분 전 */}
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
})(NotificationLikeCoffeeGold)