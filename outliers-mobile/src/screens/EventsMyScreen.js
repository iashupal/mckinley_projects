import React, { Component } from "react";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, FlatList, BackHandler } from "react-native";
import AddVibeIcon from "@assets/images/btn_add_moment.png";
import EventsSlider from "@components/EventsSlider";
import EventsTab from "@components/EventsTab";
import Events from "@components/Events";
import config from "@src/config";
import { connect } from "react-redux";
// import { initiateListMoments, initiateListMyMoments } from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import Geolocation from "react-native-geolocation-service";
import { hasLocationPermission } from "../utils/geolocation";

class EventsMyScreen extends Component {
  willFocusSubscription;
  constructor(props) {
    super(props);
    this.state = {
      isMySelected: false,
      currentRate: 3,
      //   listMyMoments: {},
      userPhotos: [],
      location: {},
      city: "",
      tab: 0,
      newEvent: {
        imageIndex: 0
      }
    };
    this.changeTab = this.changeTab.bind(this);
  }
  changeTab(tab) {
    this.setState({ tab });
  }

  //   fetchData = async () => {
  //     const hasLocationPermissionFlag = await hasLocationPermission();
  //     if (hasLocationPermissionFlag) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           this.props.initiateListMoments({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //             offset: 0,
  //             sex: "",
  //             isFollow: 0
  //           });
  //           this.props.initiateListMyMoments({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //             offset: 0
  //           });
  //           // offset , sex
  //           this.setState({ location: position.coords });
  //           fetch(
  //             "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //               position.coords.latitude +
  //               "," +
  //               position.coords.longitude +
  //               "&key=" +
  //               "AIzaSyA6F51dbSh00Ok4zKu0rP6b3YaYwRSs4H0"
  //           )
  //             .then(response => response.json())
  //             .then(responseJson => {
  //               responseJson.results[0].address_components.forEach(addresscomponent => {
  //                 addresscomponent.types.forEach(type => {
  //                   if (type == "locality") {
  //                     this.setState({ city: addresscomponent.long_name });
  //                   }
  //                 });
  //               });
  //             });
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 15000,
  //           maximumAge: 10000,
  //           distanceFilter: 50,
  //           forceRequestLocation: true
  //         }
  //       );
  //     } else {
  //       console.log("Permission Denied or revoked");
  //     }
  //   };

  //   async componentDidMount() {
  //     this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
  //       this.fetchData();
  //     });
  //   }

  //   componentWillUnmount() {
  //     this.willFocusSubscription.remove();
  //   }

  componentWillReceiveProps(nextProps) {
    // if (this.props.listMoments != nextProps.listMoments) {
    //   this.setState({ listMoments: nextProps.listMoments });
    // }
    // if (this.props.listMyMoments != nextProps.listMyMoments) {
    //   this.setState({ listMyMoments: nextProps.listMyMoments });
    // }
    if (this.props.userPhotos != nextProps.userPhotos) {
      this.setState({ userPhotos: nextProps.userPhotos });
    }
    this.setState({ userPhotos: nextProps.userPhotos });
  }
  changedSelectedImage = index => {
    this.setState({ newEvent: { ...this.state.newEvent, imageIndex: index } });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  render() {
    const { isMySelected, tab } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          {!isMySelected && (
            <ScrollView style={styles.scrollView}>
              <View style={{ marginBottom: 5 }}>
                <View
                  display="flex"
                  flexDirection="row"
                  //   paddingVertical={20}
                  alignItems="center"
                  // width="100%"
                  justifyContent="space-between"
                >
                  <EventsTab width={185} selected={tab === 0} text="All" onPress={() => this.changeTab(0)} />
                  <EventsTab width={185} selected={tab === 1} text="Party" onPress={() => this.changeTab(1)} />
                </View>
                {tab === 0 && (
                  <View>
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
                          currentSelectedImage={this.state.newEvent.imageIndex}
                          changedSelectedImage={this.changedSelectedImage}
                        />
                      </View>
                    </View>
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
                          currentSelectedImage={this.state.newEvent.imageIndex}
                          changedSelectedImage={this.changedSelectedImage}
                        />
                      </View>
                    </View>
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
              </View>
            </ScrollView>
          )}
        </View>
        {!isMySelected && (
          <TouchableOpacity onPress={() => this.props.navigation.navigate("NewEvent")} style={styles.addVibeButton}>
            <Image source={AddVibeIcon} style={{ width: 58, height: 58 }} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white"
  },
  container: {
    flex: 1
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
  navBar: {
    // height: 96,
    backgroundColor: "white"
    // elevation: 3,
  },
  eventSlider: {
    // marginTop: 10,
    borderBottomColor: "rgb(228,228,228)",
    borderBottomWidth: 8
    // marginBottom: 0
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    // listMoments: state.moments.listMoments,
    // listMyMoments: state.moments.listMyMoments,
    userPhotos: state.auth.user.photos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // initiateListMoments: location => dispatch(initiateListMoments(location)),
    // initiateListMyMoments: location => dispatch(initiateListMyMoments(location))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(EventsMyScreen));
