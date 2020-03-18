import React from 'react';
import Layout from '../components/Layout';
import axios from '../components/axios';
import '../styles/events.css';
import Link from 'next/link';

class Events extends React.Component {
  state = {
    events: [],
  };

  componentDidMount() {
    const apiToken = localStorage.getItem('apiToken');
    axios
      .get('/event', { headers: { Authorization: apiToken } })
      .then((response) => {
        console.log('events', response.data.Body);
        this.setState({ events: response.data.Body });
      })
      .catch((err) => {
        if (err.response.status === 500) {
          this.toastify('Server Error. Please reload the page!', 'error', 2500);
          return;
        }
        console.log(err);
      });
  }

  render() {
    let allEvents = '';

    if (this.state.events.length !== 0) {
      allEvents = this.state.events.map((event, index) => (
        <div className="eventTab" key={index}>
          <Link href={`/eventdetail?id=${event._id}`}>
            <div className="eventImage">
              <img src={event.photos[0].url ? event.photos[0].url : ''} alt="event-images" />
            </div>
          </Link>
          <h3>
            <Link href={`/eventdetail?id=${event._id}`}>
              <a>{event.Title}</a>
            </Link>
          </h3>
        </div>
      ));
    }

    return (
      <Layout>
        <div className="events-page">
          <div className="evnentsContainer">
            <h1>Events</h1>
            <div className="eventRow">{allEvents}</div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Events;
