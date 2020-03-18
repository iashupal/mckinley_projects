import React, { Component } from 'react';
import { AppState, Text, View } from 'react-native';
import moment from 'moment';
import config from '@src/config.js';

export default class MyClock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: Date.now(),
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    this.updateCurrentTime();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      this.updateCurrentTime();
    } else {
      clearTimeout(this.timeoutId);
    }
    this.setState({ appState: nextAppState });

  };

  updateCurrentTime() {
    this.setState(state => ({
      ...state,
      currentTime: Date.now(),
    }));
    this.timeoutId = setTimeout(this.updateCurrentTime.bind(this), 1000);
  }

  render() {
    return (
      <View>
        <Text style={{
          fontSize: 32,
          fontFamily: config.regularFont,
          color: config.black,
        }} >
          {moment(this.state.currentTime).format("hh:mm A")}
        </Text>
      </View>
    );
  }

} 