import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import LensIcon from '@material-ui/icons/LensOutlined';

const styles = theme => ({
  root: {
    width: 300,
    display: 'inline-block',
  },
  slider: {
    padding: '22px 0px',
  },
  sliderTrack: {
    height: '4px',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    backgroundColor: 'white',
  },
  lensIcon: {
    color: theme.palette.primary.main,
    width: 20,
    height: 20,
    position: 'absolute',
    top: -5,
  },
  track: {
    height: 4.2,
    borderRadius: 30,
  },
  trackBefore: {
    height: 4.2,
    borderRadius: 30,
  },
  trackAfter: {
    height: 4.2,
    borderRadius: 30,
  },
  sliderValue: {
    display: 'inline-block',
    verticalAlign: 'text-bottom',
    paddingLeft: '15px',
  },
});

function RangeSlider({ classes, value, disabled, onChange }) {
  return (
    <div className={classes.RangeSliderWrapper}>
      <div className={classes.root}>
        <Slider
          value={value}
          disabled={disabled}
          aria-labelledby="slider-icon"
          onChange={onChange}
          step={1}
          classes={{
            root: classes.slider,
            thumbIconWrapper: classes.thumbIconWrapper,
            track: classes.track,
          }}
          thumb={<LensIcon className={classes.lensIcon} />}
        />
      </div>
      <p className={classes.sliderValue}>{value}</p>
    </div>
  );
}

export default withStyles(styles)(RangeSlider);
