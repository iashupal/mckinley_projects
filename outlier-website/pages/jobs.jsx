import React, { Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Footer from '../components/Footer';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/jobs.css';
import '../styles/main-page.css';
import '../styles/global.css';

import Header from '../components/Header';

const tabsJson = [
  {
    title: 'Development',
    value: 18,
    content: [
      {
        title: 'LEAD DEVELOPER',
        content: {
          header: 'Lorem Ipsum LEAD DEVELOPER',
          content: [
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Design',
    value: 15,
    content: [
      {
        title: 'Creative Director',
        content: {
          header: 'Lorem Ipsum Creative Director',
          content: [
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
          ],
        },
      },
      {
        title: 'UI/UX Designer',
        content: {
          header: 'Lorem Ipsum UI/UX Designer',
          content: [
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Marketing',
    value: 10,
    content: [
      {
        title: 'Contents Marketer(PD)',
        content: {
          header: 'Lorem Ipsum Contents Marketer(PD)',
          content: [
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
          ],
        },
      },
      {
        title: 'Contents Marketer',
        content: {
          header: 'Lorem Ipsum Contents Marketer',
          content: [
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Internship',
    value: 12,
    content: [
      {
        title: 'Student Incumbent',
        content: {
          header: 'Lorem Ipsum Student Incumbent',
          content: [
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur',
            },
          ],
        },
      },
    ],
  },
];
class Jobs extends React.Component {
    state = {
      selectedTab: 0,
      selectedAcc: 0,
      jobsCardContent: [
        {
          title: 'share.',
          detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
          title: 'share.',
          detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
          title: 'share.',
          detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
          title: 'share.',
          detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
      ],
    }

    selectTabHandler = (event, index) => {
      this.setState({
        selectedTab: index,
        selectedAcc: 0,
      });
    }

    selectAccHandler = (event, accIndex) => {
      this.setState({
        selectedAcc: accIndex,
      });
    }

    render() {
      const tabContent = tabsJson.map((tab, index) => {
        if (this.state.selectedTab === index) {
          const accHeader = tab.content.map((acc, accIndex) => (
            <div className={`accordionHeaderTabs ${this.state.selectedAcc === accIndex ? this.state.selectedTab === index ? 'selectedAccTab' : '' : ''}`} onClick={e => this.selectAccHandler(e, accIndex)}>{acc.title} <span className={`accordionSpan  ${this.state.selectedAcc === accIndex ? this.state.selectedTab === index ? 'selectedAccSpan' : '' : ''}`}>></span></div>
          ));
          return (
            <div className="accordionHeader">{accHeader}</div>
          );
        }
        return '';
      });

      const tabAccContent = tabsJson.map((tab, index) => {
        if (this.state.selectedTab === index) {
          const acc = tab.content.map((acc, accIndex) => {
            if (this.state.selectedAcc === accIndex) {
              const list = acc.content.content.map((item, i) => (<li>{item.title}</li>));
              return (
                <div className="accordionContent">
                  <h2>{acc.content.header}</h2>
                  <ul>{list}</ul>
                                </div>
              );
            }
          });
          return acc;
        }
      });

      const tabsHeaderContent = tabsJson.map((tab, index) => (
        <div className={`${this.state.selectedTab === index ? 'tabSelected' : ''} tabHeader`} onClick={e => this.selectTabHandler(e, index)}>
          {tab.title} <span className={`${this.state.selectedTab === index ? 'tabSelectedSpan' : ''} tabValue`}>{tab.value}</span>
        </div>
      ));

      const jobsCardContents = this.state.jobsCardContent.map((item, i) => (
        <div className="jobsCard">
          <p className="jobsCardHeader">
          {item.title}
        </p>
          <p className="jobsCardContent">
          {item.detail}
        </p>
        </div>
      ));

      return (
        <Fragment>
          <Header />

          <div className="jobsFirstSection">
          <Carousel showThumbs={false}>
              <div>
                  <img src="../static/images/slider/slider1.jpg" />
                </div>
              <div>
                  <img src="../static/images/slider/slider2.jpg" />
                </div>
              <div>
                  <img src="../static/images/slider/slider3.jpg" />
                </div>
            </Carousel>
        </div>

          <div className="jobsSecondSection">
          <div className="jobsSecondSectionContainer">
              {jobsCardContents}
            </div>
        </div>

          <div className="jobsThirdSection">
          <div className="jobsThirdSectionContainer">
              <div className="jobsThirdSectionHeader">
                  {tabsHeaderContent}
                </div>
              <div className="tabsContent">

                  <div className="accordionContainer">

                      {tabContent}
                      <div className="accordionContentContainer">
                          {tabAccContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>

          <Footer />
        </Fragment>
      );
    }
}

export default Jobs;
