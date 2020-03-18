import React, { Component, Fragment } from "react";

import "../styles/roles-section.css";
import FlatAction from "./FlatAction";
import Modal from "./Modal";

class RolesSection extends Component {
  // Description of Roles
  static roles = [
    {
      id: "LD",
      title: "LEAD DEVELOPER",
      content: (
        <Fragment>
          <br />
          <h2>Task</h2>
          <ul>
            <li>React Native MERN lead-based application stacks team</li>
          </ul>
          <br />
          <h2>Qualifications</h2>
          <ul>
            <li>Proficient in Agile and Scrum development processMinutes you</li>
            <li>Your English is fluent enough to be a reference Stack Overflow minute</li>
            <li>React Native career development for more than one year</li>
            <li>MERN stack more than three years of development experience</li>
            <li>Redux, ServiceWorker, DNS settings (AWS, Route52) Experienced min.</li>
            <li>
              Server configuration and security settings career (AWS EC2 / S3) have two minutes.Experience deploying
              applications using such Docker
            </li>
            <li>Those who communicate smoothly</li>
          </ul>
          <br />
          <h2>Preferential Conditions</h2>
          <ul>
            <li>Good experience in app development team belongs</li>
            <li>Java development experience and Swift</li>
            <li>TensorFlow career development</li>
          </ul>
        </Fragment>
      )
    },
    {
      id: "CD",
      title: "CREATIVE DIRECTOR",
      content: (
        <Fragment>
          <br />
          <h2>Task</h2>
          <ul>
            <li>BX / BI Design and design direction established</li>
            <li>Out rayieoseu branding strategy development and implementation</li>
            <li>Out of the car, only rayieoseuEstablish a differentiated brand image</li>
            <li>A variety of online and offline branding, customer contact activities in the planning</li>
          </ul>
          <br />
          <h2>Qualifications</h2>
          <ul>
            <li>Leading brand storytelling / experience haebosin minutes</li>
            <li>I have Successful experience of planning and executing branding activities</li>
            <li>illustration, Graphic Design, Typography, Excellent minutes on icons and Visualize</li>
            <li>ATL / BTL / SNS Various commutation, etc.With branding experience through the channel nikeyisyeon minutes</li>
            <li>Possible minute collaboration and communication with relevant departments</li>
            <li>Who understand the direction of branding minutes from the business perspective</li>
            <li>Sketch or photoshopthrough app / web UI Design is available min</li>
          </ul>
          <br />
          <h2>Preferential Conditions</h2>
          <ul>
            <li>
              Brand experience, Products, such as its work experience 3Years or more (or the equivalent thereof capabilities)
            </li>
            <li>T Branding in industries Progress haebosin minutes</li>
            <li>
              experience in evaluating Google Analytics or Mixpanel, Appsflyer including design through data collection /
              analysis tools and A / B testing tools and improved product
            </li>
            <li>Writing and Rich minute copywriting experience</li>
          </ul>
        </Fragment>
      )
    },
    {
      id: "MGD",
      title: "UI / UX DESIGNER",
      content: (
        <Fragment>
          <br />
          <h2>Task</h2>
          <ul>
            <li>service UX Design and prototyping</li>
            <li>UIDesign</li>
            <li>Products and derived and solved business problems</li>
            <li>
              onlyThe customer's needs, rather than putting sunhage fill in the information to interpret focused customer uses
              the facility
            </li>
          </ul>
          <br />
          <h2>Qualifications</h2>
          <ul>
            <li>Configuration UI screen where users are easy to understand and use effectivelyThe available minutes</li>
            <li>ased on strategyDameusi against the intended design experience to provide the minutes </li>
            <li>Qualitative / quantitative data based on the customer's problem in a concrete grasp and solveWho can be</li>
            <li>App / Web UI designed by Sketch or PhotoshopProficient minutes</li>
            <li>
              can be produced through the Prototype contextual team materialize quickly and communicate ideas inThe minutes
            </li>
          </ul>
          <br />
          <h2>Preferential Conditions</h2>
          <ul>
            <li>Increase the efficiency of development by designing and implementing a structured UIOne who can</li>
            <li>Understanding the Web UI (HTML / CSS / JS based)</li>
            <li>I can read and understand the development documents minute</li>
            <li>Who can explain why this design is whether you need</li>
          </ul>
        </Fragment>
      )
    },
    {
      id: "CM",
      title: "CONTENTS MARKETER (PD)",
      content: (
        <Fragment>
          <br />
          <h2>Task</h2>
          <ul>
            <li>
              YoutubeOut rayieoseu services growth in the channel Advertising hypothesis testing (Out rayieoseu increased
              customer non-subscribers to your channel)
            </li>
            <li>It produces images with minimal resources one to test the hypothesis and to improve</li>
            <li>Build business processes that can quickly test the hypothesis through video</li>
            <li>Production outside of the proven hypothesis AgencyAnd to collaborate in the production quality in video</li>
          </ul>
          <br />
          <h2>Qualifications</h2>
          <ul>
            <li>video Marketing Experience 3Years later</li>
            <li>When creating content Adobe Photoshop, After Effects, Premiere If you have any experience with minutes</li>
            <li>
              Possible minute video made with a minimum of resources, such as smart phones shooting for hypothesis testing
            </li>
            <li>Youngsyang content planning, shooting, Edit proficient minutes</li>
          </ul>
          <br />
          <h2>Preferential Conditions</h2>
          <ul>
            <li>
              And the image is Minute to think that no matter what resources put into production depends on the structure of the
              content
            </li>
            <li>Those who think that the picture quality is not necessarily proportional to the performance</li>
            <li>If you do not have the aversion to minimize resources</li>
          </ul>
        </Fragment>
      )
    },
    {
      id: "CDAM",
      title: "CONTENTS DESIGNER ASSISTANT MANAGER",
      content: (
        <Fragment>
          <br />
          <h2>Task</h2>
          <ul>
            <li>
              Activities to run quickly through the content to verify the hypothesis a small (The increase in non-customer-out
              rayieoseu growth of the media)
            </li>
            <li>Through content Acquisition point, Call to Action Excavation message</li>
          </ul>
          <br />
          <h2>Qualifications</h2>
          <ul>
            <li>Marketing Experience 3Years later</li>
            <li>With content creation skills minutes</li>
            <li>This collaboration can themselves set the goals and strategies through logical communications minute</li>
          </ul>
          <br />
          <h2>Preferential Conditions</h2>
          <ul>
            <li>Not the complete contentimpact (Additional growth of the service)Obtain minutes</li>
            <li>Based on intuition than logic you work on content creation min</li>
            <li>
              From the most basic tasks deploy this if you have experience creating content and the product directly to the
              minutes
            </li>
          </ul>
        </Fragment>
      )
    },
    {
      id: "MSAM",
      title: "STUDENT / INCUMBENT CAN",
      content: (
        <Fragment>
          <br />
          <h2>Task</h2>
          <ul>
            <li>Out identify and propagate the mission team as the capacity of rayieoseu</li>
            <li>Proposed the part you want to directly after the orientation</li>
          </ul>
          <br />
          <h2>Qualifications</h2>
          <ul>
            <li>Those who are longing for the start-up ecosystem rather than a vague interest in start-up</li>
            <li>I am a logical person who can explain why this job</li>
            <li>Communication is seamless minutes</li>
          </ul>
        </Fragment>
      )
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      selectedRole: 0,
      showModal: false
    };
    this.switch = this.switch.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  switch(page) {
    this.setState({ selectedRole: page });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { selectedRole, showModal } = this.state;
    const { title, content } = RolesSection.roles[selectedRole];
    return (
      <div className="roles-section">
        <div className="roles-section__side-menu">
          {RolesSection.roles.map((role, index) => (
            <FlatAction key={role.id} onClick={() => this.switch(index)}>
              <span style={{ color: "#333" }}>{role.title}</span>
            </FlatAction>
          ))}
        </div>
        <div className="roles-section__main">
          <h1>{title}</h1>
          {content}
          <FlatAction primary onClick={this.openModal}>
            <span className="applyButton">Apply</span>
          </FlatAction>
        </div>
        <Modal show={showModal} target={title} onExit={this.closeModal} />
      </div>
    );
  }
}

export default RolesSection;
