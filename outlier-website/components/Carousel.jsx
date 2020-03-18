import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import '../styles/carousel.css';

// Debounce Function
function debounce(func, wait, immediate) {
  let timeout;
  return function resfunc(...args) {
    const context = this;
    const later = function laterfunc() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Class Timer:
 * Runs a function at a set interval.
 */
class Timer {
  constructor(func, interval) {
    this.timerGenerator = () => setInterval(func, interval);
    this.timerID = null;
  }

  startTimer() {
    this.timerID = !this.timerID ? this.timerGenerator() : this.timerID;

    return this.timerID;
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();
  }

  stopTimer() {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }
}

class Carousel extends Component {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.object).isRequired,
  };

  static CarouselText = [
    '우리는 상식적인 생각과 논리로 일합니다.',
    '우리는 일하는게 재밌습니다.',
    '우리는 하나입니다.',
  ]

  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      currentTile: 0,
      data: props.data,
    };
    this.move = this.move.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.handleWheel = debounce(this.handleWheel, 300, true).bind(this);
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
    this.timer = new Timer(() => this.move(1), 5000);
    this.timer.startTimer();
  }

  componentWillUnmount() {
    this.timer.stopTimer();
    window.removeEventListener('resize', this.updateSize);
  }

  move(steps) {
    const { currentTile, data } = this.state;
    const dataLength = Object.keys(data).length;

    if (currentTile + steps >= dataLength) {
      this.setState({ currentTile: 0 });
    } else if (currentTile + steps < 0) {
      this.setState({ currentTile: dataLength - 1 });
    } else {
      this.setState({ currentTile: currentTile + steps });
    }
  }

  updateSize() {
    this.setState({ size: window.innerWidth });
  }

  /**
   * Handler that makes sure tiles snap to grid
   * at the end of a Drag Action.
   */
  // handleDragEnd(e, data) {
  //   const { lastX } = data;
  //   const { size } = this.state;
  //   const direction = lastX > 0 ? -1 : 1;
  //   const steps = Math.abs(lastX);
  //   console.log(lastX);
  // }

  /**
   * Handler for wheel actions
   */
  handleWheel({ deltaX }) {
    const steps = Math.abs(deltaX) / (deltaX || 1);
    if (steps !== 0) {
      this.timer.resetTimer();
      this.move(steps);
    }
  }

  render() {
    const { data, size, currentTile } = this.state;

    return (
      <div className="carousel-wrapper" onWheel={this.handleWheel}>
        <Draggable
          axis="x"
          bounds={{
            /**
             * Initial position displays the leftmost tile.
             * `left` defined as the size of all tiles save one,
             *  to limit when the last tile is reached.
             * `right` defined as 0, as you don't want to move any
             *  further towards right from the initial position.
             */
            left: -size * (data.length - 1),
            right: 0,
          }}
          defaultClassName="react-drag"
          position={{ x: -size * currentTile, y: 0 }}
          // onStop={this.handleDragEnd}
          disabled
        >
          <div className="carousel">
            {Object.keys(data).map(key => (
              <div key={key} className="carousel__tile">
                <img src={data[key].imgSrc} alt={key} />
              </div>
            ))}
          </div>
        </Draggable>
        <h1 className="carousel__text-overlay">
          {ReactHtmlParser(data[currentTile].title)}
        </h1>
      </div>
    );
  }
}

export default Carousel;
