import React from 'react';

import '../styles/main-intro.css';
import Link from 'next/link';

function MainIntro() {
  return (
    <div className="main-intro slide-up-fade-in">
      <ul className="main-intro__links">
        <Link href="/about">
          <li>About</li>
        </Link>
        <Link href="/team">
          <li>Team</li>
        </Link>
        <Link href="/careers">
          <li>Careers</li>
        </Link>
      </ul>
      <ul className="main-intro__links">
        <Link href="/news">
          <li>News</li>
        </Link>
        <Link href="/contact">
          <li>Contact</li>
        </Link>
      </ul>
      {/* <div className="main-intro__content"> */}
      <div className="main-intro__heading">
        <h1>AINE</h1>
        <h3>
          <strong>A</strong>lmost <strong>I</strong>s <strong>N</strong>ever <strong>E</strong>nough
        </h3>
      </div>
      {/* <h2>
        <span style={{ color: 'white' }}>public class</span>
        <span style={{ color: 'white' }}>Outliers </span>
        <span style={{ color: 'white' }}>&#123;</span>
      </h2>
      <h4 style={{ color: 'white', paddingLeft: 20 }}>
				- 표본 중 다른 대상들과 확연히 구분되는 통계적 관측치
        <br />
				- 분포를 벗어난 변수 값의 사람들
        <br />- 성공의 기회를 얻어낸 사람들
      </h4>
      <h2>
        <span style={{ color: 'white' }}>&#125;</span>
      </h2> */}
      {/* </div> */}
      <div />
      <div />
    </div>
  );
}

export default MainIntro;
