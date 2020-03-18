import React, { Fragment } from 'react';

const FormComponent = ({ title }) => (
  <Fragment>
    <h1>Create Account</h1>
    <div className="registrationSection">
      <div className="formContent">
        <div className="formContainer">
          <div className="formContent formDisplay">
            <div className="formContentFields formName">
              <label htmlFor="firstName">First Name</label>
              <input type="text" placeholder="First Name" name="firstName" id="fistName" />
            </div>

            <div className="formContentFields formName">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" placeholder="Last Name" name="lastName" id="lastName" />
            </div>
          </div>


          <div className="formContent">
            <div className="formContentFields">
              <label htmlFor="email">Email Address</label>
              <input type="email" placeholder="Email" name="email" id="email" />
            </div>
          </div>

          <div className="formContent">
            <div className="formContentFields">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" name="password" id="password" />
            </div>
          </div>

          <div className="formContentButton">
            <button type="submit" className="submit-button">Create Account</button>
            <span onClick={e => this.openLoginModal(e, 'already')}>Already Have and Account?</span>
          </div>
        </div>

      </div>
    </div>
  </Fragment>
);


export default FormComponent;
