import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SetLS, GetLS, SmallIcon, styles } from './Utils';

class TimeButton extends React.Component {
  state = {
    time: GetLS(this.props.saveID, 0),
    start: 0,
    isOn: false,
  };

  startTimer = () => {
    const { time } = this.state;
    const { saveID } = this.props;
    // console.log(time);
    SetLS(saveID, time);

    this.setState({
      time,
      start: Date.now() - this.state.time,
      isOn: true,
    });
    this.timer = setInterval(() => {
      const time = Date.now() - this.state.start;
      // console.log(time);
      SetLS(saveID, time);

      this.setState({ time });
    }, 1);
  };

  stopTimer = () => {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    const { handleReset, saveID } = this.props;
    const { time } = this.state;
    if (handleReset) handleReset(time);

    SetLS(saveID, 0);
    this.setState({ time: 0 });
  };

  formatDuration = duration => {
    const format = a =>
      Math.floor(a)
        .toString(10)
        .padStart(2, '0');

    const hours = format(duration / 3.6e6);
    const minutes = format((duration % 3.6e6) / 6e4);
    const seconds = format((duration % 6e4) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  render() {
    const { classes, width } = this.props;
    const { timer, timerInr, heading } = classes;
    const { time, isOn } = this.state;

    const cond1 = !isOn && time === 0;
    const cond2 = !isOn && time !== 0;

    return (
      <div style={{ width: width || '160px' }}>
        <div className={timer}>
          <div className={timerInr}>
            {cond1 && <SmallIcon name="play_circle_outline" handler={this.startTimer} />}
            {isOn && <SmallIcon name="pause_circle_outline" handler={this.stopTimer} />}
            {cond2 && <SmallIcon name="play_circle_outline" handler={this.startTimer} />}
            <h3 className={heading}>{this.formatDuration(time)}</h3>
            {cond2 && <SmallIcon handler={this.resetTimer} />}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TimeButton);
