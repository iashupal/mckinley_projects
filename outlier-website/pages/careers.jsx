import React from 'react';
import '../styles/careers.css';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import TitleDescGrid from '../components/TitleDescGrid';
import RolesSection from '../components/RolesSection';

import '../styles/global.css';

function Careers() {
  // const workEthics = {
  //   0: {
  //     title: 'Logical',
  //     content: '일을 하는 목적을 끊임 없이 생각하며 일합니다. 나의 생각을 한 문장으로 설명할 수 있을 때에 행동합니다.',
  //   },
  //   1: {
  //     title: 'Ownership',
  //     content: '누군가 일을 시키지 않습니다. 맡은 서비스와 역할에 대해 오너로서, 본인의 할 일은 스스로 판단합니다',
  //   },
  //   2: {
  //     title: 'Horizontal',
  //     content: "Nickname과 '님' 호칭을 통해 직급이 없는 수평적 기업문화를 갖춥니다.",
  //   },
  //   3: {
  //     title: 'Transparency',
  //     content: "불필요한 '보고'와 '승인' 절차를 없앱니다. 핵심에 집중할 수 있도록 모든 정보의 공유와 개방을 추구합니다.",
  //   },
  //   4: {
  //     title: 'Trust',
  //     content: '서로의 실력과 경험에 대해 신뢰하며, 신의를 지켜 팀 전체의 목표 달성에 주도적으로 기여합니다.',
  //   },
  // };

  const carouselData = {
    0: {
      title: 'Join 0.135%',
      imgSrc: '../static/images/careers/carousel-img.jpg',
    },
    1: {
      title: 'Join 0.135%',
      imgSrc: '../static/images/careers/img2.jpg',
    },
    2: {
      title: 'Join 0.135%',
      imgSrc: '../static/images/careers/carousel-img1.jpg',
    },
  };
  return (
    <Layout heroText="우리가 즐거워야 즐거운 서비스가 만들어집니다.">
      <div className="career-carousel">
        <Carousel data={carouselData} noOfTiles={3} />
      </div>
      {/* <div className="contact_image">
        <img className="team__image" src="../static/images/careers/img2.jpg" alt="" />
      </div> */}
      <Heading>
        Come join the global workforce that is changing how the world&#39;s 0.135% interact with
        each other.
      </Heading>
      <TitleDescGrid />
      <Heading>
        <strong>전체 / 진행 중 / 상시 채용</strong>
      </Heading>
      <RolesSection />
    </Layout>
  );
}

export default Careers;
