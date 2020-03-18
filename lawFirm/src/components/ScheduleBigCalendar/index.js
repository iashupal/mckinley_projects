import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Button from 'components/Button';
import Modal from '@material-ui/core/Modal';
import Box from 'components/BoxOld';
// import { withStyles } from '@material-ui/core';
import events from './events';
import './react-big-calendar.css';
import './style.css';
import CustomToolbar from '../CustomToolbar';
import AgendaPopup from '../AgendaPopup';

moment.locale('en');
BigCalendar.momentLocalizer(moment);

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const CustomEvent = event => {
  return (
    <span>
      <strong> {event.title} </strong>
    </span>
    // <AgendaPopup date="19 September, 2019" />
  );
};
const colors = ['#3D7BE3', '#9C00D5', '#265985'];
class ScheduleBigCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  returnColor = () => colors[Math.floor(Math.random() * colors.length)];

  // handleSelect = ({ start, end }) => {
  //   console.log('selected');
  //   console.log('startTimetartDate', start); // shows the start time chosen
  //   console.log('endTimendDate', end); // shows the end time chosen
  //   const title = window.prompt('New Event name');
  //   if (title)
  //     this.setState({
  //       events: [
  //         ...this.state.events,
  //         {
  //           start,
  //           end,
  //           title,
  //         },
  //       ],
  //     });
  // };

  onSelectEvent = ({ event }) => {
    console.log('popup');
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  eventStyleGetter = ({ event, start, end, isSelected }) => {
    console.log(event);
    // const backgroundColor = `#${event.hexColor}`;
    const style = {
      backgroundColor: this.returnColor(),
      borderRadius: '0px',
      opacity: 0.8,
      color: '#fff',
      border: '0px',
      display: 'block',
      position: 'relative',
    };
    return {
      style,
    };
  };

  render() {
    // onSelectSlot,
    // onSelectEvent,
    // defaultView,
    // startAccessor,
    // eventStyleGetter,
    // endAccessor,
    const { modalIsOpen } = this.state;
    return (
      <div>
        <BigCalendar
          selectable
          popup={false}
          localizer={localizer}
          events={events}
          // scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2019, 3, 12)}
          startAccessor="start"
          endAccessor="end"
          defaultView="agenda"
          // onSelectEvent={event => alert(event.title)}
          onSelectEvent={this.onSelectEvent}
          // onSelectSlot={this.handleSelect}
          popupOffset={30}
          views={['day', 'week', 'month', 'agenda']}
          onView={() => {}}
          components={{
            toolbar: CustomToolbar,
            event: CustomEvent,
            // agenda: {
            //   event: AgendaPopup
            // }
          }}
          eventPropGetter={this.eventStyleGetter}
        />
        {modalIsOpen ? <AgendaPopup date="19 September, 2019" /> : null}
      </div>
    );
  }
}
export default ScheduleBigCalendar;
