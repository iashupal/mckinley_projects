import React, { Component } from 'react';
import Button from 'components/Button';
import Box from 'components/BoxOld';

export const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
};

class CustomToolbar extends Component {
  componentDidMount() {
    const { view } = this.props.view;
    console.log(view);
  }

  render() {
    const { label } = this.props;
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <Button size="small" variant="outlined" color="inverted" onClick={this.navigate.bind(null, navigate.TODAY)}>
            Today
          </Button>
          <Button
            size="small"
            variant="outlined"
            icon="keyboard_arrow_left"
            position="relative"
            color="gray"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          />
          <Button
            position="relative"
            size="small"
            variant="outlined"
            icon="keyboard_arrow_right"
            color="gray"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          />
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group right-btn-grp__2">
          <Button size="large" mode="regular" color="primary">
            <img
              style={{ width: '28px' }}
              src="https://img.icons8.com/color/48/000000/ms-excel.png"
              alt="google excel sheet"
            />
            <Box pl={3} pr={3} pt={0.5}>
              Excel
            </Box>
          </Button>
          <Button onClick={this.view.bind(null, 'agenda')}>
            <Box pt={0.2} pb={0.2}>
              Agenda
            </Box>
          </Button>
          <Button onClick={this.view.bind(null, 'day')}>
            <Box pt={0.2} pb={0.2}>
              Day
            </Box>
          </Button>
          <Button onClick={this.view.bind(null, 'week')}>
            <Box pt={0.2} pb={0.2}>
              Week
            </Box>
          </Button>
          <Button onClick={this.view.bind(null, 'month')}>
            <Box pt={0.2} pb={0.2}>
              Month
            </Box>
          </Button>
          <Button size="large" mode="regular">
            <Box pl={3} pr={3} pt={0.8} pb={0.8}>
              Event
            </Box>
          </Button>
        </span>
      </div>
    );
  }

  navigate = action => {
    this.props.onNavigate(action);
  };

  view = action => {
    this.props.onView(action);
  };
}
export default CustomToolbar;
