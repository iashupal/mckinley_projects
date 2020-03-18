import React, { Fragment, Component } from "react";
import HeaderContext from "./../../context/HeaderContext";
import moment from "moment";
import countdown from "moment-countdown";
import { Tag } from "antd";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {},
            seconds: this.props.seconds
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        //console.log("recived secs", secs);
        let days = isNaN(Math.floor(secs / 24 / 60 / 60))
            ? 0
            : Math.floor(secs / 24 / 60 / 60);

        let hours = isNaN(Math.floor(secs / (60 * 60) - days * 86400))
            ? 0
            : Math.floor((secs - days * 86400) / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            d: days,
            h: hours,
            m: minutes,
            s: seconds
        };
        return obj;
    }
    static contextType = HeaderContext;
    componentDidMount = async () => {
        let startDate = new Date();
        // Do your operations
        let dueDate = this.props.dueDate;
        console.log("recived props", this.props);
        let endDate = new Date(dueDate);
        let seconds = parseInt(
            (endDate.getTime() - startDate.getTime()) / 1000
        );
        console.log("diff second", seconds);
        await this.setState({ seconds: seconds });
        let timeLeftVar = this.secondsToTime(seconds);
        await this.setState({ time: timeLeftVar });
        this.startTimer();
    };

    startTimer() {
        // console.log("state seconds", this.state.seconds);
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        const { lng, i18n } = this.context;
        return (
            <Tag
                style={{ fontSize: "10px" }}
                color={
                    moment(this.props.dueDate).countdown().days < 1 ? "red" : ""
                }
            >
                {moment(this.props.dueDate)
                    .countdown()
                    .toString()}
            </Tag>
        );
    }
}
