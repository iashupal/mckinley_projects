import React from 'react';
import { withStyles } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';

class UserRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating || null,
      temp_rating: null,
    };
  }

  handleMouseover(rating) {
    this.setState(prev => ({
      rating,
      temp_rating: prev.rating,
    }));
  }

  handleMouseout() {
    this.setState(prev => ({
      rating: prev.temp_rating,
    }));
  }

  rate(rating) {
    this.setState({
      rating,
      temp_rating: rating,
    });
  }

  render() {
    const { rating } = this.state;
    const { classes, top } = this.props;
    const stars = [];
    for (let i = 0; i < 10; i++) {
      console.log('i', i);
      let icons = 'fa fa-star-o';
      if (this.state.rating >= i && this.state.rating !== null) {
        icons = 'fa fa-star';
      }
      stars.push(
        <i
          style={{ display: 'inline-block', width: '7px', overflow: 'hidden', direction: i % 2 === 0 ? 'ltr' : 'rtl' }}
          className={icons}
          onMouseOver={() => this.handleMouseover(i)}
          onClick={() => this.rate(i)}
          onMouseOut={() => this.handleMouseout()}
        />,
      );
    }
    return (
      <div className={classes.rating} style={{ top }}>
        {stars}
      </div>
    );
  }
}
const styles = theme => ({
  rating: {
    position: 'relative',
    verticalAlign: 'middle',
  },
});
export default withStyles(styles)(UserRating);
