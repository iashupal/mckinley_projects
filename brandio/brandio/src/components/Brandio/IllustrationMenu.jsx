import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Icon, Button } from 'antd';

import './IllustrationMenu.css';
import HeaderContext from './../../context/HeaderContext';

const { Panel } = Collapse;

class IllustrationMenu extends Component {
  static contextType = HeaderContext;

  constructor(props) {
    super(props);

    this.state = {
      selectedBrands: ['Fandio']
    };
  }

  handleBrandSelect = name => {
    this.setState(prevState => ({
      selectedBrands: prevState.selectedBrands.includes(name)
        ? prevState.selectedBrands.filter(x => x !== name)
        : [...prevState.selectedBrands, name]
    }));
  };

  render() {
    const { lng, i18n } = this.context;
    const { selectedBrands } = this.state;
    return (
      <div className='illustration__main__sidebar'>
        <div className='div__illustration__menu'>
          <div className='div__illustration__title'>
            {i18n.t('brandioIllustration.myBrand', { lng })}
          </div>
          <div className='div__illustration__product__section'>
            <ul className='ant-menu  ant-menu-sub ant-menu-inline sidenavlist'>
              <li>
                <Collapse
                  defaultActiveKey={['1']}
                  bordered={false}
                  expandIconPosition='right'
                  expandIcon={({ isActive }) => (
                    <Icon
                      type='up'
                      rotate={isActive ? 180 : 0}
                      className='illustration__dropdown__expand__icon'
                    />
                  )}
                  className='illustration__dropdown'
                >
                  <Panel
                    header={i18n.t('brandioIllustration.brandList', { lng })}
                    key='1'
                    className='illustration__panel'
                  >
                    <ul className='div__illustration__submenu'>
                      <li>Justin Bieber Jeans</li>
                      <li>Kidsmart</li>
                      <li>Fandio</li>
                    </ul>
                  </Panel>
                </Collapse>
              </li>
              <li>
                <Link
                  className={`div__illustration__menu__title cursor-pointer user-select-none ${
                    selectedBrands.includes('navigation.collaboration')
                      ? 'div__illustration__submenu__selected'
                      : ''
                  }`}
                  // onClick={() =>
                  //     this.handleBrandSelect(
                  //         "navigation.collaboration"
                  //     )
                  // }
                  to='/products/new'
                >
                  {i18n.t('navigation.collaboration', {
                    lng
                  })}
                </Link>
              </li>
              <li>
                <span
                  className={`div__illustration__menu__title cursor-pointer user-select-none ${
                    selectedBrands.includes(
                      'brandioIllustration.illustrationList'
                    )
                      ? 'div__illustration__submenu__selected'
                      : ''
                  }`}
                  onClick={() => (window.location.href = `/illustrations`)}
                >
                  {i18n.t('brandioIllustration.illustrationList', {
                    lng
                  })}
                  <Icon
                    type='close-circle'
                    theme='filled'
                    className='div__illustration__submenu__closeButton'
                  />
                </span>
              </li>

              <li>
                <span
                  className={`div__illustration__menu__title cursor-pointer user-select-none ${
                    selectedBrands.includes('brandioIllustration.msg')
                      ? 'div__illustration__submenu__selected'
                      : ''
                  }`}
                  onClick={() => (window.location.href = `/inbox`)}
                >
                  {i18n.t('brandioIllustration.msg', {
                    lng
                  })}
                  <Icon
                    type='close-circle'
                    theme='filled'
                    className='div__illustration__submenu__closeButton'
                  />
                </span>
              </li>

              <li>
                <Button
                  type='secondary'
                  className='d-flex align-items-center justify-content-between'
                  onClick={() => (window.location.href = '/illustrations/new')}
                >
                  {i18n.t('uploadIllustration.upload', {
                    lng
                  })}
                  <img
                    src={require('../../assets/images/icon-upload.svg')}
                    alt='upload'
                  />
                </Button>
              </li>
              <li>
                <Button
                  type='secondary'
                  className='d-flex align-items-center justify-content-between'
                  onClick={e => e.preventDefault()}
                >
                  {i18n.t('brandioIllustration.applyWithdrawal', { lng })}
                  <img
                    src={require('../../assets/images/icon-piggybank.svg')}
                    alt='upload'
                    className='toggle-menu-icon'
                  />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default IllustrationMenu;
