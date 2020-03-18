import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import '../css/common.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;

    return (
      <Card title='캐스터 관리자 페이지 입니다.' headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}>
        <div>
          <Row gutter={16} loading={loading}>
            {/* go to cast page */}
            <Link to="/cast/add">
              <Col span={8}>
                <Card style={{ backgroundColor: '#3cbbf6', padding: '0.25rem', textAlign: 'center', borderRadius: '5px' }}>
                  <div className='d-flex-center'>
                    <span>
                      <div style={{ width: '40px', height: '40px', margin: '0 1.2rem 0 0' }}>
                        <div style={{ position: 'relative', border: '1.5px solid white', width: '30px', height: '15px', left: '3px', top: '13px', backgroundColor: '#3cbbf6', zIndex: '1', fontWeight: 'bolder' }} className='d-flex-center color-white'>+</div>
                        <div style={{ position: 'relative', border: '1.5px solid white', width: '30px', height: '15px', left: '7px', top: '-5px' }}></div>
                      </div>
                    </span>
                    <span style={{ fontSize: '1.2rem' }} className='color-white' >새로운 캐스트 등록</span>
                  </div>
                </Card>
              </Col>
            </Link>
            {/* go to reward page */}
            <Link to="/reward">
              <Col span={8}>
                <Card style={{ backgroundColor: '#3cbbf6', padding: '0.25rem', textAlign: 'center', borderRadius: '5px' }}>
                  <div className='d-flex-center'>
                    <span>
                      <div style={{ width: '40px', height: '40px', margin: '0 1.2rem 0 0', position: 'relative' }} className='d-flex-center'>
                        <div style={{ width: '30px', height: '30px', border: '1.5px solid #ffffff', borderRadius: '50%', fontSize: '1.2rem', fontWeight: 'bolder', zIndex: '2' }} className='d-flex-center color-white'>M</div>
                        <div style={{ position: 'absolute', width: '20px', border: '2px solid #ffffff', top: '18px', left: '25%' }}></div>
                        <div style={{ width: '15px', height: '15px', position: 'absolute', top: '31.25%', left: '31.25%', backgroundColor: '#3cbbf6' }}></div>
                      </div>
                    </span>
                    <span style={{ fontSize: '1.2rem' }} className='color-white' >리워드 관리</span>
                  </div>
                </Card>
              </Col>
            </Link>
            {/* go to banner page */}
            <Link to="/banner">
              <Col span={8}>
                <Card style={{ backgroundColor: '#3cbbf6', padding: '0.25rem', textAlign: 'center', borderRadius: '5px' }}>
                  <div className='d-flex-center'>
                    <span>
                      <div style={{ width: '40px', height: '40px', margin: '0 1.2rem 0 0' }} className='d-flex-center'>
                        <div style={{ width: '38px', height: '20px', border: '1.5px solid #ffffff', fontWeight: 'bolder', fontSize: '0.8rem' }} className='d-flex-center color-white'>AD</div>
                      </div>
                    </span>
                    <span style={{ fontSize: '1.2rem' }} className='color-white' >배너/광고 관리</span>
                  </div>
                </Card>
              </Col>
            </Link>
          </Row >
        </div >
      </Card >
    );
  }
}

export default Dashboard;
