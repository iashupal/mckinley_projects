import React, { Component } from "react";
import {
  View,
  SectionList,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  AsyncStorage,
  TouchableHighlight,
  BackHandler,
  Dimensions
} from "react-native";

import config from "@src/config";
import { connect } from "react-redux";
import CloseIcon from "@assets/images/ic_close.png";
import { setTagsSearch, getTagsSearch, setRecentSearch } from "../store/actions";
import { withNamespaces } from "react-i18next";
import VibesFunc from '../services/VibesApiService';

class SearchVibeScreen extends Component {
  willFocusSubscription;
  textRef;
  navigationOptions = {
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchHistory: [],
      topSearches: [],
      listData: [{ title: "", data: ["여행"] }]
    };
    this.setSearchHistory = this.setSearchHistory.bind(this);
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      this.textRef.focus();
    });
    // var searchHistory = await AsyncStorage.getItem("@searchHistory:key");
    // searchHistory = JSON.parse(searchHistory);

    // if (!!searchHistory && searchHistory.length > 0) {
    //   this.setState({
    //     searchHistory,
    //     listData: [
    //       {
    //         title: this.props.t("searchVibeScr:recentSearchHeader"),
    //         data: searchHistory
    //       }
    //     ]
    //   });
    // } else {
    //   this.setState({
    //     searchHistory,
    //     listData: [{ title: this.props.t("searchVibeScr:recentSearchHeader"), data: [] }]
    //   });
    // }
    this.getSearchHistory();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  renderListItem = ({ item, index, section }) => {
    const hasClose = section.title !== "";
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.setState({
            search: item
          });
          this._handleSearch(item);
        }}
        style={styles.itemContainer}
      >
        <Text style={[styles.listItem, { color: config.greyishBrown, fontWeight: "normal" }]}>{item}</Text>
        {hasClose && (
          <TouchableHighlight
            onPress={() => {
              this.clearSearch(item, index);
            }}
          >
            <Image source={CloseIcon} style={styles.closeImg} />
          </TouchableHighlight>
        )}
      </TouchableOpacity>
    );
  };

  renderHeader = ({ section: { title } }) => {
    if (title === "") {
      return null;
    } else {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.listItem}>{title}</Text>
        </View>
      );
    }
  };

  clearSearch = (value, index) => {
    const { searchHistory } = this.state;

    console.log("searchHistory", searchHistory);

    // arr = searchHistory.filter(item => item !== value)

    var array = searchHistory.filter(item => item !== value);

    console.log("clearSearch", array);

    if (!!array && array.length > 0) {
      this.setState({
        searchHistory: array,
        listData: [
          {
            title: this.props.t("searchVibeScr:recentSearchHeader"),
            data: array
          }
        ]
      });
      AsyncStorage.setItem("@searchHistory:key", JSON.stringify(array));
    } else {
      this.setState({
        searchHistory: [],
        listData: [{ title: this.props.t("searchVibeScr:recentSearchHeader"), data: [] }]
      });
      AsyncStorage.setItem("@searchHistory:key", "");
    }
  };

  async setSearchHistory() {
    if (!!this.state.search.length) {
      var searchHistory = await AsyncStorage.getItem("@searchHistory:key");
      var array = JSON.parse(searchHistory);
      console.log("array", array);
      var newArray;

      if (!!array && array.length > 0) {
        newArray = [...array, this.state.search];
      } else {
        newArray = [this.state.search];
      }
      console.log("new array", newArray);
      AsyncStorage.setItem("@searchHistory:key", JSON.stringify(newArray));
    }
  }

  getSearchHistory = async () => {
    let token = await AsyncStorage.getItem("@token:key");
    const res = await VibesFunc.getSearchHistory(token);
    this.setState({ searchHistory: [...res.data.Body.recentSearches], topSearches: [...res.data.Body.popularSearches] });
  }

  _handleSearch = text => {
    this.setState({ search: text });
    this.props.navigation.state.params.search(text);
    this.props.navigation.navigate("VibesMain", {
      search: text
    });
  };

  removeSearchHistory = async (key, all) => {
    let token = await AsyncStorage.getItem("@token:key");
    if (all) {
      await VibesFunc.removeSearchHistory(token, 'clearAll');
      this.setState({ searchHistory: [] });
    }
    else {
      await VibesFunc.removeSearchHistory(token, key);
      const { searchHistory } = this.state;
      searchHistory.splice(searchHistory.indexOf(key), 1);
      this.setState({ searchHistory });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.flexContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={this.props.t("searchVibeScr:search")}
              placeholderTextColor={config.lightGrey}
              onChangeText={text => this.setState({ search: text })}
              onEndEditing={() => {
                this.setSearchHistory();
              }}
              value={this.state.search}
              ref={ref => (this.textRef = ref)}
            />
            <TouchableOpacity
              style={styles.clearSearchContainer}
              onPress={() => {
                this.setState({ search: "" });
                this.props.getTagsSearch({
                  search: ""
                });
                this.props.navigation.navigate("VibesMain", {
                  search: ""
                });
              }}
            >
              <Image source={CloseIcon} style={styles.clearSearchIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.searchButtonContainer}
            onPress={() => {
              this._handleSearch(this.state.search);
            }}
          >
            <Text style={styles.searchButtonText}>{this.props.t("searchVibeScr:search")}</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.searchList, { flex: 1 }]}>
          <FlatList
            data={this.props.tagSearchResults}
            renderItem={({ item, index }) => {
              return (
                <View key={index} style={styles.itemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this._handleSearch(item.tagsName);
                    }}
                  >
                    <Text style={[styles.listItem, { color: config.greyishBrown, fontWeight: "normal" }]}>{item.tagsName}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <SectionList
          style={styles.searchList}
          sections={this.state.listData}
          renderItem={this.renderListItem}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => `${index}`}
          renderSectionHeader={this.renderHeader}
        /> */}
        {/* <View style={{ marginTop: 8 }}>
          <View style={[styles.recentSearchTitleContainer, { paddingBottom: 4 }]}>
            <Text style={[styles.recentSearchTitle, styles.colorGreyText]}>{this.props.t("searchVibeScr:top5Header")}</Text>
          </View>
          <View style={[styles.recentSearchTitleContainer, { flexWrap: 'wrap', justifyContent: 'flex-start' }]}>
            {this.state.topSearches.length > 0 && this.state.topSearches.map((item, index) =>
              <View style={[styles.tagContainer, { marginLeft: index !== 0 ? 12 : 0 }]}>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    search: item
                  });
                  this._handleSearch(item);
                }}>
                  <Text style={[styles.recentSearchTitle, styles.colorCharcoalGrey, { fontWeight: "200" }]}>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View> */}
        <View>
          <View style={[styles.recentSearchTitleContainer, { paddingTop: 10, paddingBottom: 4 }]}>
            <Text style={[styles.recentSearchTitle, styles.colorGreyText]}>{this.props.t("searchVibeScr:recentSearchHeader")}</Text>
            <TouchableOpacity onPress={() => this.removeSearchHistory('all', true)}>
              <Text style={[styles.recentSearchTitle, styles.colorBlueText]}>{this.props.t("searchVibeScr:clearAll")}</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={this.state.searchHistory}
            renderItem={({ item, index }) => {
              return (
                <View style={[styles.recentSearchTitleContainer, { justifyContent: 'center', paddingVertical: 0 }]}>
                  <View style={[styles.recentSearchTitleContainer, { borderBottomWidth: 1, borderColor: '#e8e8e8', paddingHorizontal: 0, width: '100%' }]}>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        search: item
                      });
                      this._handleSearch(item);
                    }}>
                      <Text style={[styles.recentSearchTitle, styles.colorGreyishBrown, { fontWeight: "200" }]}>{item}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.removeSearchHistory(item, false)}>
                      <Image source={CloseIcon} style={styles.closeImg} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </SafeAreaView >
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    interestedHashtags: state.auth.user.interestedHashtags,
    tagSearchResults: state.vibes.tagSearchResults,
    searchHistory: state.vibes.searchHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateListVibes: params => dispatch(initiateListVibes(params)),
    initiateListMyVibes: params => dispatch(initiateListMyVibes(params)),
    getTagsSearch: params => dispatch(getTagsSearch(params)),
    setTagsSearch: data => dispatch(setTagsSearch(data)),
    setRecentSearch: data => dispatch(setRecentSearch(data))
  };
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  searchList: {
    backgroundColor: config.whiteGray,
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: config.lightGreyBg
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 0,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center"
  },
  inputContainer: {
    flex: 3,
    height: 34
  },
  searchInput: {
    height: 34,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: config.charcoalGrey,
    flex: 1,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 26,
    paddingTop: 7
  },
  searchButtonText: {
    flex: 1,
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: "500",
    color: config.white,
    paddingHorizontal: 10,
    height: 34,
    alignSelf: "center",
    paddingVertical: 6
  },
  searchButtonContainer: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: config.navyBlack,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: config.navyBlack
  },
  listItem: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    color: config.btnLine
  },
  itemContainer: {
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center"
  },
  closeImg: {
    width: 16,
    height: 16,
    marginLeft: 8
  },
  clearSearchContainer: {
    position: "absolute",
    right: 0,
    marginVertical: 2
  },
  clearSearchIcon: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginRight: 5
  },
  recentSearchTitleContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  recentSearchTitle: {
    fontSize: 16,
    fontFamily: config.regularFont,
    fontWeight: "600"
  },
  colorGreyText: {
    color: '#cccccc'
  },
  colorBlueText: {
    color: '#4fd0ff'
  },
  colorGreyishBrown: {
    color: config.greyishBrown
  },
  colorCharcoalGrey: { color: '#45494e' },
  tagContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 25,
    backgroundColor: '#4fd0ff',
    marginBottom: 6
  }
});

const SearchVibeScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchVibeScreen);

export default withNamespaces(["common", "searchVibeScr"], {
  wait: true
})(SearchVibeScreenHOC);
