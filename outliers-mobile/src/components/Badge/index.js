import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { getProfileNotification } from "../../store/actions";

class Badge extends Component {
  componentDidMount() {
    this.props.getProfileNotification();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notifications !== nextProps.notifications) {
      console.log(this.props.notifications.filter(item => item.seen === false).length);
    }
  }

  render() {
    return (
      <View>
        {!!this.props.notifications && this.props.notifications.filter(item => item.seen === false).length > 0 ? (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{this.props.notifications.filter(item => item.seen === false).length}</Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    notifications: state.profile.notifications,
    matchHistory: state.profile.matchHistory,
    profileRequestStatus: state.profile.profileRequestStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileNotification: () => dispatch(getProfileNotification())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    top: -30,
    right: -8,
    backgroundColor: "#F83447",
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontFamily: "NotoSansKr-Bold",
    fontSize: 9,
    color: "#fff"
  }
});
