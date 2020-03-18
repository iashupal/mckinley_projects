import React from 'react';
import {
 ToastContainer, toast, Bounce, Slide, Flip, Zoom 
} from 'react-toastify';
import { withRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from '../components/axios';
import '../styles/events.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class Events extends React.Component {
  state = {
    eventDetail: {
      photos: [],
    },
  };

  componentDidMount() {
    const apiToken = localStorage.getItem('apiToken');
    const eventId = this.props.router.query.id;
    axios
      .get('/event', { headers: { Authorization: apiToken } })
      .then(async (response) => {
        const responseEvents = response.data;
        for (let i = 0; i < responseEvents.length; i++) {
          if (responseEvents[i]._id === eventId) {
            this.setState({ eventDetail: responseEvents[i] });
            break;
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          this.toastify('Server Error. Please reload the page!', 'error', 2500);
          return;
        }
        console.log(err);
      });
  }

  toastify = (message, type, duration = 5000) => toast(message, {
      transition: Bounce,
      closeButton: true,
      autoClose: duration,
      position: 'bottom-center',
      type,
      className: 'toastify',
    });

  getTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  applyEventHandler = () => {
    // let id = this.state.eventDetail._id;
    this.toastify('Work in Progress', 'info', 3500);
  };

  render() {
    const { eventDetail } = this.state;
    let date = '';
    let time = '';
    if (eventDetail.date !== undefined) {
      const eventDate = new Date(eventDetail.date);
      const year = eventDate.getFullYear();
      const monthNumber = eventDate.getMonth();
      let dt = eventDate.getDate();
      const dayNumber = eventDate.getDay();
      console.log(eventDate.getHours());
      const month = new Array();
      month[0] = 'January';
      month[1] = 'February';
      month[2] = 'March';
      month[3] = 'April';
      month[4] = 'May';
      month[5] = 'June';
      month[6] = 'July';
      month[7] = 'August';
      month[8] = 'September';
      month[9] = 'October';
      month[10] = 'November';
      month[11] = 'December';
      const monthString = month[monthNumber];

      const day = new Array();
      day[0] = 'Sunday';
      day[1] = 'Monday';
      day[2] = 'Tuesday';
      day[3] = 'Wednesday';
      day[4] = 'Thursday';
      day[5] = 'Friday';
      day[6] = 'Saturday';

      const dayString = day[dayNumber];

      if (dt < 10) {
        dt = `0${dt}`;
      }

      console.log(`${year}-${monthString}-${dt}`);
      date = `${dayString}, ${monthString} ${dt}, ${year}`;
      time = this.getTime(eventDate);
    }
    return (
      <React.Fragment>
        <Header />
        <div className="events-page">
          <div className="container">
            <h1 className="pageHeading">Event Detail</h1>
            <div className="eventSliderSection">
              <div className="eventSlider">
                <Carousel>
                  {eventDetail.photos.map((image, i) => (
                    <div key={i}>
                      <img src={image.url} />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="eventDetail">
                <div className="eventDetailHeading">
                  <h5>Happening now</h5>
                  <h4>{eventDetail.Title}</h4>
                  <div className="eventDetailPrice">
                    <p className="eventDetailPricePrev">{eventDetail.Previous_Price}</p>
                    <p className="eventDetailPriceNow">{eventDetail.PriceNow}</p>
                  </div>
                </div>
                <hr />
                <div className="eventDetailList">
                  <div className="iconList">
                    <img src="../static/images/icons/calendar.png" />
                    {date}
                  </div>
                  <div className="iconList">
                    <img src="../static/images/icons/location.png" />
                    {eventDetail.Location}
                  </div>
                  <div className="iconList">
                    <img src="../static/images/icons/user.png" />
                    {eventDetail.Capacity}
                  </div>
                </div>

                <hr />
                <div className="eventDetailOptions">
                  <button className="applyButton" onClick={this.applyEventHandler}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="eventDetailDescription">
              <div className="eventDetailContainer">
                <div className="eventDescription">
                  <h3>Details</h3>
                  <p>{eventDetail.Details}</p>
                </div>
                <div className="eventsInfoBox">
                  <div className="eventsInfoTime">
                    <div className="eventsInfoImage">
                      <img
                        style={{
                          width: '20px',
                          position: 'relative',
                          left: '3px',
                          top: '5px',
                        }}
                        src="../static/images/icons/clock.png"
                      />
                    </div>{' '}
                    <p>
                      <span className="block-span">{date}</span>
                      <span className="block-span">{time}</span>
                      {/* <span className="block-span">Every week on every day</span> */}
                    </p>
                  </div>
                  <div className="eventsInfoLocation">
                    <div className="eventsInfoImage">
                      <img style={{ position: 'relative', top: '4px' }} src="../static/images/icons/location.png" />
                    </div>{' '}
                    <p>{eventDetail.Location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="eventDetailImageContent">
              <img src="https://cdn.imweb.me/upload/S201805185afe3e72084e2/5b35a05dae8ed.png" alt="" />
            </div>
            <div className="eventDetailDummyContent">
              <p className="eventDetailHeading">[데이팅에이전시 러브콜 일대일 매칭서비스 약관]</p>
              <p className="eventDetailText">
                회사(이하 데이팅에이전시)는 러브콜 일대일 매칭서비스를 이용하시는 회원님의 인연을 찾아드리기 위해 진심과 정성을
                다하겠습니다.
              </p>
              <ul className="eventDetailTextList">
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
              </ul>
              <p className="eventDetailText">
                회원님이 회사가 정하는 방법으로 러브콜 매칭 서비스 비용을 결제하고 본 서비스 약관 통해 동의한 것으로 간주하며,
                회사는 회원님의 인연을 찾아드리기 위해 진심과 정성을 다할 것을 약속합니다.감사합니다.
              </p>
            </div>
            <div className="eventDetailDummyContent">
              <p className="eventDetailHeading">[데이팅에이전시 러브콜 일대일 매칭서비스 약관]</p>
              <p className="eventDetailText">
                회사(이하 데이팅에이전시)는 러브콜 일대일 매칭서비스를 이용하시는 회원님의 인연을 찾아드리기 위해 진심과 정성을
                다하겠습니다.
              </p>
              <ul className="eventDetailTextList">
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
              </ul>
              <p className="eventDetailText">
                회원님이 회사가 정하는 방법으로 러브콜 매칭 서비스 비용을 결제하고 본 서비스 약관 통해 동의한 것으로 간주하며,
                회사는 회원님의 인연을 찾아드리기 위해 진심과 정성을 다할 것을 약속합니다.감사합니다.
              </p>
            </div>
            <div className="eventDetailDummyContent">
              <p className="eventDetailHeading">[데이팅에이전시 러브콜 일대일 매칭서비스 약관]</p>
              <p className="eventDetailText">
                회사(이하 데이팅에이전시)는 러브콜 일대일 매칭서비스를 이용하시는 회원님의 인연을 찾아드리기 위해 진심과 정성을
                다하겠습니다.
              </p>
              <ul className="eventDetailTextList">
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
              </ul>
              <p className="eventDetailText">
                회원님이 회사가 정하는 방법으로 러브콜 매칭 서비스 비용을 결제하고 본 서비스 약관 통해 동의한 것으로 간주하며,
                회사는 회원님의 인연을 찾아드리기 위해 진심과 정성을 다할 것을 약속합니다.감사합니다.
              </p>
            </div>
            <div className="eventDetailDummyContent">
              <p className="eventDetailHeading">[데이팅에이전시 러브콜 일대일 매칭서비스 약관]</p>
              <p className="eventDetailText">
                회사(이하 데이팅에이전시)는 러브콜 일대일 매칭서비스를 이용하시는 회원님의 인연을 찾아드리기 위해 진심과 정성을
                다하겠습니다.
              </p>
              <ul className="eventDetailTextList">
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
                <li>러브콜 매칭 프로필 제공 (최소 1회)</li>
              </ul>
              <p className="eventDetailText">
                회원님이 회사가 정하는 방법으로 러브콜 매칭 서비스 비용을 결제하고 본 서비스 약관 통해 동의한 것으로 간주하며,
                회사는 회원님의 인연을 찾아드리기 위해 진심과 정성을 다할 것을 약속합니다.감사합니다.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(Events);
