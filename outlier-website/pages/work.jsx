import React, { Fragment } from 'react';

import Navbar from '../components/Navbar';
import CaseStudyTitleBar from '../components/CaseStudyTitleBar';
import CaseStudyIntro from '../components/CaseStudyIntro';
import FeaturedMedia from '../components/FeaturedMedia';
import CaseStudyOverview from '../components/CaseStudyOverview';
import ParagraphWithTitle from '../components/ParagraphWithTitle';
import Callout from '../components/Callout';
import PageSeparator from '../components/PageSeparator';

export default function Work() {
  return (
    <Fragment>
      <Navbar transparent />
      <CaseStudyTitleBar title="Sunbrella: Design + Performance" />
      <PageSeparator fullWidth />
      <CaseStudyIntro />
      <FeaturedMedia src="/static/sunbrella-dp-header-3.jpg" />
      <CaseStudyOverview />
      <FeaturedMedia src="/static/sunbrella-dp-header-3.jpg" />
      <ParagraphWithTitle centered />
      <PageSeparator />
      <Callout />
    </Fragment>
  );
}
