import React, { Fragment, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  BackHandler
} from 'react-native';

const { width } = Dimensions.get('window');

// Import components
import TopBarHeader from '@components/TopBarHeader';
import MomentProfile from '@components/MomentProfile';
import config from '@src/config';
import SegmentButtons from '@components/SegmentButtons';
// Import assets
import AlarmIcon from '@assets/images/btn_alarm.png';
import icVisitor from '@assets/images/icVisitor.png';
import ReplyIcon from '@assets/images/ic_reply.png';

import moment from 'moment';
import { withNamespaces } from 'react-i18next';

function MomentsMyScreen(props) {
  // const userProfilePic = this.state.userPhotos.length > 0 ? this.state.userPhotos[0].url : config.dafaultUser;
  const myMoments = props.myMoments.Body ? props.myMoments.Body : [];
  const userPhotos =
    !!props.myMoments.user && props.myMoments.user.photos
      ? props.myMoments.user.photos
      : [];
  const user = props.myMoments.user ? props.myMoments.user : {};
  const location = props.location
    ? props.location
    : {
      latitude: 0,
      longitude: 0
    };
  const { t } = props;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <Fragment>
      {/* <TopBarHeader
					sectionTitle="Moment"
					profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZ9mEKcetDDaR2W66vc7qSOKt1sMYeGtS3WmPzmZ4FH3qUQ7W"
					alarmIcon={AlarmIcon}
				/> */}
      {/* <View style={styles.secondBar}>
          <Text
            style={{
              fontFamily: config.regularFont,
              fontSize: 16,
              fontWeight: "300",
              fontStyle: "normal",
              letterSpacing: 0,
              color: config.navyBlack
            }}
          >
            {("0" + moment().month()).slice(-2)}.{("0" + moment().date()).slice(-2)}
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("MomentsMain")}>
            <Text style={{ fontSize: 13 }}>Moments 전체보기</Text>
          </TouchableOpacity>
        </View> */}

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.myMomentContainer}>
            <FlatList
              data={myMoments}
              extraData={props.myMoments}
              keyExtractor={(item, index) => item._id}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('MomentsDetail', {
                        id: item._id,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        ownerId: item.owner
                      });
                    }}
                    style={styles.myMomentContainer}
                  >
                    {userPhotos.length > 0 && (
                      <MomentProfile
                        uri={userPhotos[item.imageIndex].url}
                        distance={item.dist.calculated}
                        description={item.description}
                        dob={user.dob}
                        createdAt={item.createdAt}
                        org={user.college}
                        level={user.level}
                      />
                    )}
                    <View style={styles.replyButton}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('MomentsDetail', {
                            id: item._id,
                            latitude: location.latitude,
                            longitude: location.longitude,
                            ownerId: item.owner
                          });
                        }}
                      >
                        <View style={styles.replyButtonContainer}>
                          <Image style={styles.replyIcon} source={ReplyIcon} />
                          <Text style={styles.replyCount}>
                            {item.numberOfComments}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('MomentsDetail', {
                            id: item._id,
                            latitude: location.latitude,
                            longitude: location.longitude,
                            ownerId: item.owner
                          });
                        }}
                      >
                        <View style={styles.replyButtonContainer}>
                          <Image style={styles.replyIcon} source={icVisitor} />
                          <Text style={styles.replyCount}>
                            {item.numberOfFollowers}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: width,
                      height: 1,
                      backgroundColor: config.whiteTwo
                    }}
                  />
                </View>
              )}
              ListEmptyComponent={
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: Dimensions.get('window').height * 0.75
                  }}
                >
                  <Text>{t('momenysMyScreen:noData')}</Text>
                </View>
              }
            // ItemSeparatorComponent={
            //   <View style={{ width: width, height: 1, backgroundColor: config.whiteTwo }} />}
            />
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
}

export default withNamespaces(['common', 'momenysMyScreen'], {
  wait: true
})(MomentsMyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: 'row',
    backgroundColor: '#f6f6f6'
    // paddingHorizontal: 20,
  },
  navBar: {
    // height: 96,
    backgroundColor: 'white',
    elevation: 3
  },
  secondBar: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 30,
    backgroundColor: config.lightGreyBg,
    paddingHorizontal: 15
  },
  myMomentContainer: {
    // backgroundColor: "#f6f6f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 5,
    alignSelf: 'center'
  },
  replyButton: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    borderColor: config.whiteTwo,
    marginTop: 8
  },
  replyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  replyIcon: {
    width: 20,
    height: 20
  },
  replyCount: {
    color: config.greyishBrown,
    fontSize: 16,
    marginLeft: 10
  }
});
