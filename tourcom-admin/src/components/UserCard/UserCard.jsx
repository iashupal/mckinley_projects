import React from "react";
import { Card, Row, Col, Descriptions, Button, Tooltip } from "antd";
import "./UserCard.css";

function UserCard({ username, imageURL, education, company, email, status, age, address, pNumber }) {
  return (
    <Card className="usercard">
      <Row gutter={16}>
        {/* <Col lg={12}>
          <img className="usercard__images" src={imageURL} alt="Profile" />
        </Col> */}
        <Col lg={12}>
          <Descriptions column={1} title="User Info">
            <Descriptions.Item label="Full Name">{username}</Descriptions.Item>
            <Descriptions.Item label="Email">{email}</Descriptions.Item>
            <Descriptions.Item label="Status">{status}</Descriptions.Item>
            <Descriptions.Item label="Age">{age}</Descriptions.Item>
            <Descriptions.Item label="Education">{education}</Descriptions.Item>
            <Descriptions.Item label="Company Name">{company}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{pNumber}</Descriptions.Item>
            <Descriptions.Item label="Address">{address}</Descriptions.Item>
          </Descriptions>
          {/* <Tooltip title="Accept User">
            <Button shape="circle" icon="check" />
          </Tooltip>
          &nbsp;
          <Tooltip title="Pending">
            <Button shape="circle" icon="question" />
          </Tooltip>
          &nbsp;
          <Tooltip title="Reject User">
            <Button shape="circle" icon="close" />
          </Tooltip>
          &nbsp;
          <Tooltip title="Learn More">
            <Button shape="circle" icon="more" />
          </Tooltip> */}
        </Col>
        {/* <div>User Rating here</div> */}
      </Row>
    </Card>
  );
}

export default UserCard;
