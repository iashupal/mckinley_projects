import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";

import AlarmIcon from "@assets/images/btn_alarm.png";
import AddVibeIcon from "@assets/images/btn_add_moment.png";
import EventsMyScreen from "@screens/EventsMyScreen";
import SegmentButtons from "@components/SegmentButtons";
import TopBarHeader from "@components/TopBarHeader";
import EventsTab from "@components/EventsTab";
import Events from "@components/Events";
import { connect } from "react-redux";
import { initiateListEvents } from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import EventsSlider from "@components/EventsSlider";

class EventListingScreen extends Component {
  willFocusSubscription;
  constructor(props) {
    super(props);
    this.state = {
      isMySelected: false,
      currentRate: 3,
      listEvents: [],
      listMyMoments: {},
      userPhotos: [],
      getParams: {
        offset: 0,
        sex: "",
        isFollow: 0,
        search: ""
      },
      location: {},
      city: "",
      tab: 0,
      imageIndex: 0,
      visible: false
    };
    this.changeTab = this.changeTab.bind(this);
  }
  changeTab(tab) {
    this.setState({ tab });
  }

  fetchData = async () => {
    this.setState({ getParams: { ...this.state.getParams } }, () => {
      console.log("fetch called");
      this.props.initiateListEvents(this.state.getParams);
    });
  };

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.fetchData();
      }
    );
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listEvents != nextProps.listEvents) {
      this.setState({ listEvents: nextProps.listEvents });
    }
    // if (this.props.listMyMoments != nextProps.listMyMoments) {
    //     this.setState({ listMyMoments: nextProps.listMyMoments });
    // }
    if (this.props.userPhotos != nextProps.userPhotos) {
      this.setState({ userPhotos: nextProps.userPhotos });
    }
    this.setState({ userPhotos: nextProps.userPhotos });
  }
  changedSelectedImage = index => {
    this.setState({ newEvent: { ...this.state.newEvent, imageIndex: index } });
  };

  render() {
    const userProfilePic =
      this.props.userPhotos.length > 0 ? this.props.userPhotos[0].url : "";

    const { isMySelected, visible, location, tab, listEvents } = this.state;
    console.log("list events", listEvents);
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TopBarHeader
            onPressLeftAction={() =>
              this.props.navigation.navigate("My", { backRoute: "EventsMain" })
            }
            // sectionTitle="Moment"
            sectionHeader={
              <SegmentButtons
                onPressSegement={selected => {
                  this.setState({ isMySelected: selected });
                }}
              />
            }
            profileImage={userProfilePic}
            alarmIcon={AlarmIcon}
          />

          {!isMySelected && (
            <ScrollView style={styles.scrollView}>
              <View style={{ marginBottom: 5 }}>
                <View
                  display="flex"
                  flexDirection="row"
                  //   paddingVertical={10}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <EventsTab
                    width={90}
                    selected={tab === 0}
                    text="All"
                    onPress={() => this.changeTab(0)}
                  />
                  <EventsTab
                    width={90}
                    selected={tab === 1}
                    text="Party"
                    onPress={() => this.changeTab(1)}
                  />
                  <EventsTab
                    width={90}
                    selected={tab === 2}
                    text="Activity"
                    onPress={() => this.changeTab(2)}
                  />
                  <EventsTab
                    width={90}
                    selected={tab === 3}
                    text="Personal"
                    onPress={() => this.changeTab(3)}
                  />
                </View>
                {tab === 0 && (
                  <View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("EventDetail")
                        }
                      >
                        <View style={{ marginVertical: 15, marginBottom: 10 }}>
                          <Events
                            eventImg="da"
                            eventHeading="Opening Wine Party"
                            eventTime="10.05 (토) 오후 06:30"
                            eventTag="#60명 #Saturday #Wine #Party #Datingagency"
                          />
                        </View>
                        <View style={styles.eventSlider}>
                          <EventsSlider
                            photos={this.state.userPhotos}
                            currentSelectedImage={this.state.imageIndex}
                            changedSelectedImage={this.changedSelectedImage}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("EventDetail")
                        }
                      >
                        <View style={{ marginTop: 15, marginBottom: 10 }}>
                          <Events
                            eventImg="da"
                            eventHeading="Opening Wine Party"
                            eventTime="10.05 (토) 오후 06:30"
                            eventTag="#60명 #Saturday #Wine #Party #Datingagency"
                          />
                        </View>
                        <View style={styles.eventSlider}>
                          <EventsSlider
                            photos={this.state.userPhotos}
                            currentSelectedImage={this.state.imageIndex}
                            changedSelectedImage={this.changedSelectedImage}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {this.state.visible && <Overlay overlayText="Sold out" />}
                  </View>
                )}
                {tab === 1 && (
                  <View>
                    <View style={{ marginVertical: 15, marginBottom: 10 }}>
                      <Events
                        eventImg="da"
                        eventHeading="Opening Wine Party"
                        eventTime="10.05 (토) 오후 06:30"
                        eventTag="#60명 #Saturday #Wine #Party #Datingagency"
                      />
                    </View>
                    <View style={styles.eventSlider}>
                      <EventsSlider
                        photos={this.state.userPhotos}
                        currentSelectedImage={this.state.imageIndex}
                        changedSelectedImage={this.changedSelectedImage}
                      />
                    </View>
                  </View>
                )}
                {tab === 2 && (
                  <View>
                    <View style={{ marginVertical: 15, marginBottom: 10 }}>
                      <Events
                        eventImg="da"
                        eventHeading="Opening Wine Party"
                        eventTime="10.05 (토) 오후 06:30"
                        eventTag="#60명 #Saturday #Wine #Party #Datingagency"
                      />
                    </View>
                    <View style={styles.eventSlider}>
                      <EventsSlider
                        photos={this.state.userPhotos}
                        currentSelectedImage={this.state.imageIndex}
                        changedSelectedImage={this.changedSelectedImage}
                      />
                    </View>
                  </View>
                )}
                {tab === 3 && (
                  <View>
                    <View style={{ marginVertical: 15, marginBottom: 10 }}>
                      <Events
                        eventImg="da"
                        eventHeading="Opening Wine Party"
                        eventTime="10.05 (토) 오후 06:30"
                        eventTag="#60명 #Saturday #Wine #Party #Datingagency"
                      />
                    </View>
                    <View style={styles.eventSlider}>
                      <EventsSlider
                        photos={this.state.userPhotos}
                        visible={true}
                        currentSelectedImage={this.state.imageIndex}
                        changedSelectedImage={this.changedSelectedImage}
                      />
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
        {!isMySelected && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewEvent")}
            style={styles.addVibeButton}
          >
            <Image source={AddVibeIcon} style={{ width: 58, height: 58 }} />
          </TouchableOpacity>
        )}
        {isMySelected && (
          <EventsMyScreen
            navigation={this.props.navigation}
            myEvents={this.state.myEvents}
            location={location}
          />
        )}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Event2Detail")}
        >
          <Text>Event2Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("EventRefund")}
        >
          <Text>EventRefund</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white"
  },
  addVibeButton: {
    width: 58,
    height: 58,
    alignSelf: "center",
    position: "absolute",
    bottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  container: {
    flex: 1
  },
  navBar: {
    // height: 96,
    backgroundColor: "white"
    // elevation: 3,
  },
  eventSlider: {
    // marginTop: 5,
    borderBottomColor: "rgb(228,228,228)",
    borderBottomWidth: 8
    // marginBottom: 0
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    listEvents: state.events.listEvents,
    // listMyMoments: state.moments.listMyMoments,
    userPhotos: state.auth.user.photos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateListEvents: params => dispatch(initiateListEvents(params))
    // initiateListMyVibes: (params) => dispatch(initiateListMyVibes(params)),
    // getMatchedVibes: (params) => dispatch(getMatchedVibes(params)),
    // setMatchedVibes: (data) => dispatch(setMatchedVibes(data)),
    // getUserInfo: () => dispatch(getUserInfo()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(EventListingScreen));
