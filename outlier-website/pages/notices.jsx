import React, { Fragment } from 'react';

// Import components
import NoticeData from '../components/NoticeData';
import Layout from '../components/Layout';
import '../styles/notices.css';

class Notices extends React.Component {
  state = {
    notices: [
      {
        id: 1,
        title: '베타 서비스 런칭',
        date: '2019-11-27',
      },
    ],
  };

  render() {
    return (
      <Layout>
        <div className="notices-page">
          <div className="noticesContainer">
            {/* <h1 className="noticeHeroText">We are the 0.01%.<br /> We are the worlds outliers.</h1> */}
            <div className="noticesContent">
              {this.state.notices.map((notice, i) => (
                <NoticeData category={notice.id} title={notice.title} date={notice.date} onClick />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Notices;
