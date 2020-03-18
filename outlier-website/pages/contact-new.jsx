import React, { Fragment } from 'react';
import Footer from '../components/Footer';

import Header from '../components/Header';
import ContactCard from '../components/ContactCard';
import '../styles/contact.css';

class Contact extends React.Component {
    state = {

    }

    render() {
      return (
        <Fragment>
          <Header />


          <div className="contact-page">
            <div className="contactContainer">
              <h1>Contact Us</h1>
              <div className="contactContent">
                <ContactCard title="Get in Touch">
                  <p>General Inqueries</p>
                </ContactCard>
                <ContactCard title="Follow us">
                  <p>General Inqueries</p>
                </ContactCard>
                <ContactCard title="Find us">
                  <p>General Inqueries</p>
                  <p>General Inqueries</p><br />
                  <p>General Inqueries</p>
                </ContactCard>
              </div>
            </div>
          </div>

          <Footer />
        </Fragment>
      );
    }
}

export default Contact;
