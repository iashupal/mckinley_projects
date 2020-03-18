import React from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'helpers/ui';
import CardBox from 'components/CardBox/index';
import { Link } from 'react-router-dom';
import ic_main_15 from 'assets/images/icons/ic_main_15.png';
import { RU } from 'helpers/ramda';

const { mlMessage } = RU;

class Main extends React.Component {
  render() {
    // 주의 : 영문/한글이 동적으로 바뀔수 있어, render() 마다 계산해야 함.
    const list = [
      {
        name: '자문 조회',
        link: '/app/CaseList?caseType=A',
        icon: ic_main_15,
      },
      {
        name: '송무 조회',
        link: '/app/CaseList?caseType=L',
        icon: ic_main_15,
      },
    ];

    return (
      <div className="app-wrapper">
        <PageTitle title="법무법인관리" />
        <div className="row">
          {list &&
            list.map(i => (
              <CardBox styleName="col-lg-3 col-md-4" cardStyle="p-0" key={i.link}>
                <Link to={i.link} style={{ textDecoration: 'none' }}>
                  <div className="text-center pt-3 pb-3 main-page">
                    <img src={i.icon} alt="" />
                    <br />
                    <span style={{ color: 'black' }}>{i.name}</span>
                  </div>
                </Link>
              </CardBox>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, common }) => {
  const { authUser } = auth;
  const { isMC_MyCompanyMode } = common;
  const { multiCompanyUser } = authUser;

  return {
    isMC_MyCompanyMode,
    multiCompanyUser,
  };
};

export default connect(
  mapStateToProps,
  {},
)(Main);
