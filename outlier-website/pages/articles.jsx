import React from 'react';

import HeadingSection from '../components/HeadingSection';
import Heading from '../components/Heading';
import InputSubscribe from '../components/InputSubscribe';
import Layout from '../components/Layout';
import Showcase from '../components/Showcase';

import '../styles/articles.css';

const Articles = () => (
  <Layout heroText="Important thoughts, cogent points and shiny new ideas.">
    <Showcase />
    <HeadingSection>
      <Heading>
        Get our latest news and insights delivered to your inbox.
      </Heading>
      <InputSubscribe />
    </HeadingSection>
  </Layout>
);

export default Articles;
