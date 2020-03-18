import React, { Fragment } from 'react';
import Footer from '../components/Footer';

import Header from '../components/Header';
import '../styles/news.css';

class News extends React.Component {
    state = {
      news: [
        {
          id: 1,
          title: '외부보도자료 링크로 바로 연결',
          time: '2019.01',
          description: '제목 클릭시 우측으로 열리고 다시 닫히는 형태 (채용 페이지에서 상세정보 방식과 동일)',
        },
        {
          id: 2,
          title: '외부보도자료 링크로 바로 연결',
          time: '2019.01',
          description: '제목 클릭시 우측으로 열리고 다시 닫히는 형태 (채용 페이지에서 상세정보 방식과 동일)',
        },
        {
          id: 3,
          title: '외부보도자료 링크로 바로 연결',
          time: '2019.01',
          description: '제목 클릭시 우측으로 열리고 다시 닫히는 형태 (채용 페이지에서 상세정보 방식과 동일)',
        },
        {
          id: 4,
          title: '외부보도자료 링크로 바로 연결',
          time: '2019.01',
          description: '제목 클릭시 우측으로 열리고 다시 닫히는 형태 (채용 페이지에서 상세정보 방식과 동일)',
        },
        {
          id: 5,
          title: '외부보도자료 링크로 바로 연결',
          time: '2019.01',
          description: '제목 클릭시 우측으로 열리고 다시 닫히는 형태 (채용 페이지에서 상세정보 방식과 동일)',
        },
        {
          id: 6,
          title: '외부보도자료 링크로 바로 연결',
          time: '2019.01',
          description: '제목 클릭시 우측으로 열리고 다시 닫히는 형태 (채용 페이지에서 상세정보 방식과 동일)',
        },
      ],
    }

    render() {
      return (
        <Fragment>
          <Header />


          <div className="news-page">
            <div className="newsContainer">
              <h1>News</h1>
              <div className="newsContent">

                {this.state.news.map((item, i) => (
                  <div className="newsContentRow" key={item.id}>
                    <div className="newsContentTitleContainer">
                      <div className="newsContentTitle">
                        {item.title}
                      </div>
                      <div className="newsContentTime">
                        {item.time}
                      </div>
                    </div>
                    <div className="newsContentTitleDescription">
                      {item.description}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          <Footer />
        </Fragment>
      );
    }
}

export default News;
