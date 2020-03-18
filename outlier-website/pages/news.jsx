import React from 'react';
import Layout from '../components/Layout';
import NewsData from '../components/NewsData';
import '../styles/news-component.css';

class News extends React.Component {
  state = {
    news: [
      {
        id: 1,
        sourceURL:
          'https://www.notion.so/mckinleyrice/Project-Requirements-Checklist-072ed884e37c44169e63d12a122f5b61#d7978a0f121247be8586c16248318226',
        publisher: '드림위즈 뉴스',
        releaseDate: '2019.03.18',
        newsTitle: '아웃라이어스, IT기업 씨넥트로부터 투자유치',
      },
      {
        id: 2,
        sourceURL:
          'https://www.notion.so/mckinleyrice/Project-Requirements-Checklist-072ed884e37c44169e63d12a122f5b61#d7978a0f121247be8586c16248318226',
        publisher: '드림위즈 뉴스',
        releaseDate: '2019.03.16',
        newsTitle: '아웃라이어스, IT기업 씨넥트로부터 투자유치',
      },
      {
        id: 3,
        sourceURL:
          'https://www.notion.so/mckinleyrice/Project-Requirements-Checklist-072ed884e37c44169e63d12a122f5b61#d7978a0f121247be8586c16248318226',
        publisher: '드림위즈 뉴스',
        releaseDate: '2019.03.02',
        newsTitle: '아웃라이어스, IT기업 씨넥트로부터 투자유치',
      },
      {
        id: 4,
        sourceURL:
          'https://www.notion.so/mckinleyrice/Project-Requirements-Checklist-072ed884e37c44169e63d12a122f5b61#d7978a0f121247be8586c16248318226',
        publisher: '드림위즈 뉴스',
        releaseDate: '2019.02.20',
        newsTitle: '아웃라이어스, IT기업 씨넥트로부터 투자유치',
      },
      {
        id: 5,
        sourceURL:
          'https://www.notion.so/mckinleyrice/Project-Requirements-Checklist-072ed884e37c44169e63d12a122f5b61#d7978a0f121247be8586c16248318226',
        publisher: '드림위즈 뉴스',
        releaseDate: '2019.02.16',
        newsTitle: '아웃라이어스, IT기업 씨넥트로부터 투자유치',
      },
    ],
  };

  render() {
    return (
      <Layout isCompact>
        <h1 className="newsHeroText">Outliers Headlines</h1>
        {/* {this.state.news.map(row => (
          <NewsData
            sourceURL={row.sourceURL}
            publisher={row.publisher}
            releaseDate={row.releaseDate}
            newsTitle={row.newsTitle}
          />
        ))} */}
      </Layout>
    );
  }
}

export default News;
