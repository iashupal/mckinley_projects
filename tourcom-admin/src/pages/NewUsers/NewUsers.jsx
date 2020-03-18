import React from 'react';
import { Row, Col } from 'antd';
import UserCard from '../../components/UserCard/UserCard';

function NewUsers() {
  return (
    <Row gutter={16}>
      <div>Table View / Card View</div>
      <Col md={12} lg={12}>
        <UserCard imageURL="http://mblogthumb2.phinf.naver.net/MjAxNzA4MTRfMTcg/MDAxNTAyNjQyOTI0OTEw.mersDZq0nKkXxtzz6_2WsxOT33hK0ZTyr9qu4kIBmZgg.eM_YGPVoXu7HU66f9szXzAQ9Vv63RyHujRDLwYg59LAg.JPEG.grace4088/IMG_20170812_130733.jpg?type=w800" />
      </Col>
      <Col md={12} lg={12}>
        <UserCard imageURL="https://dcamp.kr/api/sites/default/files/_1542630827.png" />
      </Col>
      <Col md={12} lg={12}>
        <UserCard imageURL="https://www.mckinleyrice.com/assets/images/home/values/7.jpg" />
      </Col>
      <Col md={12} lg={12}>
        <UserCard imageURL="http://mblogthumb1.phinf.naver.net/MjAxNzEyMTdfMjUg/MDAxNTEzNDgyNzQ0OTMw.oG0rkZWSUH1-xdhh1EmOf9zZrilDie-cQfFl59QSvjYg.58ReXaq57Be0QwISYQtbA1os9xEOclmQWQiA714npYgg.PNG.everyone114/image_2808396241513482708958.png?type=w800" />
      </Col>
    </Row>
  );
}

export default NewUsers;
