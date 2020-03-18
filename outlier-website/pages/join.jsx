import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import '../styles/join.css';

import Header from '../components/Header';

const Join = () => (
  <Fragment>
    <Header />

    <div className="registrationSection">
      <div className="formContent">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdLqoIlTWsTvumeFw_1gOP6BZc1Qo16pzxg_TaDVjvAFu9FfA/viewform?embedded=true"
          width="640"
          height="982"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
            Loading…
        </iframe>
      </div>
    </div>

    <Footer />
  </Fragment>
);

export default Join;
