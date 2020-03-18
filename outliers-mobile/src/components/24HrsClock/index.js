import React, { Component } from 'react';
import { AppState, Text, View } from 'react-native';
import moment from 'moment';
import config from '@src/config.js';

export default class Clock24Hrs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: Date.now(),
            appState: AppState.currentState,
            showTime: '07:00 AM'
        };
    }

    componentDidMount() {
        this.updateCurrentTime();
        this.getTime();
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

    getTime = () => {
        setInterval(() => {
            let startTime = moment('07:00 AM', "HH:mm a");
            let endTime = moment('07:00 PM', "HH:mm a");
            let showTime = this.state.showTime;
            if (moment(this.state.currentTime).format('hh:mm A') === '07:00 AM' || moment(this.state.currentTime).isBetween(startTime, endTime)) {
                this.setState({ showTime: '07:00 PM' }, () => {
                    if (showTime !== this.state.showTime) {
                        this.props.switchVibes();
                    }
                });
            }
            if (moment(this.state.currentTime).format('hh:mm A') === '07:00 PM' || moment(this.state.currentTime).isBetween(endTime, startTime)) {
                this.setState({ showTime: '07:00 AM' }, () => {
                    if (showTime !== this.state.showTime) {
                        this.props.switchVibes();
                    }
                });
            }
        }, 1000);
    }

    render() {
        return (
            <View>
                <Text style={{
                    fontSize: 32,
                    fontFamily: config.regularFont,
                    color: config.black,
                }} >
                    {`${this.state.showTime}`}
                </Text>
            </View>
        );
    }

} 