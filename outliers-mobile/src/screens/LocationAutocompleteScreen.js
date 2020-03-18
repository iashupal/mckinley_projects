import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Alert,
  BackHandler
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import config from '@src/config.js';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage1 from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import AuthActions from '../store/redux/auth';

// IMport Images
import BackIcon from '@assets/images/ic_back.png';
import DeleteIcon from '@assets/images/ic_delete.png';
import CautionBlue from '@assets/images/ic-circle-caution.png';
// Import Components
import TopBarHeader from '@components/TopBarHeader';

class LocationAutocompleteScreen extends React.Component {
  // const [search, setSearch] = useState('');
  constructor(props) {
    super(props);
    this.hasLocationPermission = false;

    this.state = {
      places: [],
      query: '',
      token: '',
      preplace: []
    };
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return Geolocation.requestAuthorization();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Outliers App',
            message: 'Outliers need access to your location '
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          // alert("You can use the location");
          this.getLocation();
        } else {
          console.log('location permission denied');
          // alert("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  async componentWillMount() {
    const direct = await this.props.navigation.getParam('direct', false);
    if (!direct) {
      this.hasLocationPermission = await this.requestLocationPermission();
    }
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        //alert(JSON.stringify(position));
        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            position.coords.latitude +
            ',' +
            position.coords.longitude +
            '&key=' +
            'AIzaSyA6F51dbSh00Ok4zKu0rP6b3YaYwRSs4H0'
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log('ADDRESS GEOCODE' + responseJson.results);
            const results = responseJson.results;
            var mappedPlaces = [];
            results.forEach(element => {
              mappedPlaces = [
                ...mappedPlaces,
                {
                  id: element.place_id,
                  locationName: element.formatted_address,
                  latitude: element.geometry.location.lat,
                  longitude: element.geometry.location.lng
                }
              ];
            });

            /* this.setState({
              places: [...mappedPlaces]
            });*/
            this.setState(
              {
                preplace: [...mappedPlaces]
              },
              () => {
                if (this.state.preplace.length > 3) {
                  let x = this.state.preplace.reverse();
                  let y = [];
                  for (let i = 0; i <= 3; i++) {
                    y.push(this.state.preplace[i]);
                  }
                  this.setState({
                    places: y.reverse()
                  });
                } else {
                  this.setState({
                    places: [...mappedPlaces]
                  });
                }
              }
            );
          });
      },
      error => {
        // See error code charts below.
        this.requestLocationPermission();
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  componentDidMount() {
    // Instead of navigator.geolocation, just use Geolocation.adb
    const direct = this.props.navigation.getParam('direct', false);
    if (!direct) {
      this.getLocation();
    } else {
      //this.fetchData("")
      this.getLocation();
    }

    this.setState({
      token: this.props.auth.user.token
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  async fetchData(text) {
    this.setState({ query: text });
    const token1 = await AsyncStorage.getItem('@token:key'); //FIXME: NOT GETTING TOKEN FROM PROPS
    const url = config.apiURL + '/location?keyword=';
    fetch(url + text, {
      headers: new Headers({
        Authorization: token1,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log([url + text, responseJson]);
        this.setState({
          places: [
            ...responseJson.Body,
            {
              id: 'personal',
              locationName: this.state.query
            }
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  findPlaces(query) {
    if (query === '') {
      return [];
    }

    const { places } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    // return places.filter(place => place >= 0);
    return places.filter(place => place.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    // const places = this.findPlaces(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const { t } = this.props;

    return (
      <View style={styles.flexContainer}>
        {/* <View style={styles.topbar}>
          <TouchableOpacity
            onPress={() => {
              const isProfile = this.props.navigation.getParam(
                "isProfile",
                false
              );
              if (isProfile) {
                this.props.navigation.navigate("EditProfile");
              } else {
                this.props.navigation.navigate("BasicDetails");
              }
            }}
          >
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.inputContiner}>
            <TextInput
              style={styles.searchInput}
              defaultValue={query}
              value={query}
              onChangeText={text => {
                // setSearch (text);
                this.setState({ query: text });
                // this.findPlaces(text);
                this.fetchData(text);
              }}
            />
            {query.length > 0 &&
              <TouchableOpacity onPress={() => this.setState({ query: '' })}>
                <Image source={DeleteIcon} style={styles.deleteBtn} />
              </TouchableOpacity>}
          </View>
        </View> */}
        <View style={styles.navBar}>
          <TopBarHeader
            action='back'
            sectionTitle={t(
              'common:register.basicDetailsScreen.locationScreenHeader'
            )}
            onPressLeftAction={() => {
              const isProfile = this.props.navigation.getParam(
                'isProfile',
                false
              );
              if (isProfile) {
                this.props.navigation.navigate('EditProfile');
              } else {
                this.props.navigation.navigate('BasicDetails');
              }
            }}
          />
        </View>
        <View style={styles.blueSubHeader}>
          <View style={styles.blueSubHeaderInnerContainer}>
            <Image source={CautionBlue} style={styles.blueCaution} />
            <Text style={styles.blueSubHeaderText}>
              Your current location must be in Seoul or NYC
            </Text>
          </View>
        </View>
        <FlatList
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.locationList}
          // data={places}
          data={this.state.places}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemContainer}>
                <Text
                  onPress={() => {
                    const isProfile = this.props.navigation.getParam(
                      'isProfile',
                      false
                    );

                    this.props.saveUserInfo({
                      location: item.locationName,
                      locationName: item.locationName,
                      latitude: item.latitude ? item.latitude : '',
                      longitude: item.longitude ? item.longitude : ''
                    });

                    if (isProfile) {
                      this.props.navigation.navigate('EditProfile');
                    } else {
                      this.props.navigation.navigate('BasicDetails');
                    }
                  }}
                  style={styles.locationText}
                >
                  {item.locationName}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationAutocompleteScreen);

const styles = StyleSheet.create({
  // Entire screen container
  flexContainer: {
    flex: 1,
    backgroundColor: '#fefdfb'
  },
  navBar: {
    width: '100%',
    backgroundColor: 'white'
  },
  topbar: {
    flexDirection: 'row',
    marginHorizontal: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: DeviceInfo.hasNotch() ? 55 : 40
  },
  backIcon: {
    height: 24,
    width: 24
  },
  inputContiner: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    backgroundColor: config.white_grey,
    borderColor: config.whiteTwo,
    borderWidth: 1,
    borderRadius: 3,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 12
  },
  deleteBtn: {
    height: 30,
    width: 20
  },
  searchInput: {
    flex: 1,
    color: config.black,
    fontSize: 15,
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    height: 48,
    marginRight: 8
  },
  itemContainer: {
    flex: 1,
    marginVertical: 0,
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 20
  },
  locationText: {
    fontSize: 15,
    fontFamily: config.regularFont,
    color: config.black
  },
  locationList: {
    marginLeft: 0,
    marginHorizontal: 0
    // marginTop: 10
  },
  blueSubHeader: {
    // flex: 1,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#E9E9E9',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 10
  },
  blueSubHeaderInnerContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueCaution: {
    width: 24,
    aspectRatio: 1,
    marginHorizontal: 8
  },
  blueSubHeaderText: {
    fontSize: 15,
    fontFamily: config.regularFont,
    color: '#09ABF3'
  }
});
