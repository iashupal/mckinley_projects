import React, { Fragment } from 'react';
import '../styles/global.css';
import ContactGrid from '../components/ContactGrid';
import ContactSection from '../components/ContactSection';
import ContactSectionTitle from '../components/ContactSectionTitle';
import ContactSectionFlatAction from '../components/ContactSectionFlatAction';
import ContactSectionDetail from '../components/ContactSectionDetail';
import Layout from '../components/Layout';

import '../styles/contact-component.css';

function Contact() {
  return (
    <Layout>
      <h1 className="contactHeroText">Contact Us.</h1>
      {/* <div className="contact_image">
            <img className="team__image" src="../static/images/contact.jpg" alt="" />
          </div> */}
      <ContactGrid>
        <ContactSection>
          <ContactSectionTitle>문의</ContactSectionTitle>
          <ContactSectionFlatAction link="mailto:assets@globaloutliers.com">
            일반 문의
          </ContactSectionFlatAction>
          <ContactSectionFlatAction link="mailto:assets@globaloutliers.com">
            제휴/미디어 관련 문의
          </ContactSectionFlatAction>
        </ContactSection>
        <ContactSection>
          <ContactSectionTitle>Follow Us</ContactSectionTitle>
          <ContactSectionFlatAction>Instagram</ContactSectionFlatAction>
          <ContactSectionFlatAction>Facebook</ContactSectionFlatAction>
          <ContactSectionFlatAction>YouTube</ContactSectionFlatAction>
        </ContactSection>
        <ContactSection>
          <ContactSectionTitle>Find us</ContactSectionTitle>
          <ContactSectionDetail>
            18F, 51, Jong-ro, Jongno-gu, Seoul, Republic of Korea, 03161
          </ContactSectionDetail>
        </ContactSection>
      </ContactGrid>
    </Layout>
  );
}

export default Contact;
