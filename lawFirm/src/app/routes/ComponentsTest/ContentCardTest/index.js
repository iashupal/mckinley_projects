import React, { Component } from 'react';
import ContentCard from 'components/ContentCard';
import { Button } from '@material-ui/core';
import CaseScreen from 'containers/CaseScreen/index';

class ContentCardTest extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <ContentCard title="title" contents={['value1','value2','value3']} noMargin actionButton={<Button>hi</Button>} />
        <CaseScreen />
      </div>
    );
  }
}

export default ContentCardTest;
