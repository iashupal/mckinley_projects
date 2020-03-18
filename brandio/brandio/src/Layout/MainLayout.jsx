import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className='App container'>
        <div className='container item--1 wrapper'>
          <Header />
        </div>
        <div className='container item--2'>
          <div className='menu'>
            <Navbar />
          </div>
        </div>
        {children}
        <div className='container item--10'>
          <div className='wrapper'>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default MainLayout;
