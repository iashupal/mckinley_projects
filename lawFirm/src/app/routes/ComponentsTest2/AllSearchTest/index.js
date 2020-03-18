import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import ContentCard from 'components/ContentCard';
import classnames from 'classnames';
import PageTitle from 'components/PageTitle';
import TotalSearch from 'components/TotalSearch';
import Heading from 'components/Heading';
import SearchNumber from 'components/SearchNumber';
import Avatar from 'components/Avatar';
import AllSearchPdf from 'components/AllSearchPdf';
import SearchDescription from 'components/SearchDescription';
import attachment from '../../../../assets/images/icons/attachment.png';

const SearchItem = ({ icon, color, title, content, fileName, date, name, classes }) => {
  return (
    <div style={{ margin: '12px 0' }}>
      <ContentCard
        boxShadow="0 0 0 0"
        border="1px solid lightgray"
        contents={[
          <div>
            <div className={classes.searchInfo}>
              {icon && (
                <Avatar className={classes.avatar} color="transparent">
                  <img src={attachment} className={classnames(classes.attachment, classes.saturate)} alt="attachment" />
                </Avatar>
              )}
              <SearchNumber backgroundColor={color || '#FACB00'} padding="0 7px" margin="0 12px" />
              <div className={classes.allSearchContent} style={{ fontSize: '19px' }}>
                {title}
              </div>
            </div>
            <div className={classes.allSearchContent}>{content}</div>
            <AllSearchPdf borderColor={color || '#FACB00'} color={color || '#FACB00'}>
              {fileName}
            </AllSearchPdf>
            <div>
              <SearchDescription descriptionTag="Date" descriptionInfo={date} />
              <SearchDescription descriptionTag="Name" descriptionInfo={name} />
            </div>
          </div>,
        ]}
      />
    </div>
  );
};

const SearchTab = ({ name, color, number, isActive }) => {
  if (isActive) {
    return (
      <TotalSearch
        contents={[
          <div>
            <Heading fontWeight="400" fontSize="16" color={color}>
              {name}
            </Heading>
            <SearchNumber backgroundColor={color}>{number}</SearchNumber>
          </div>,
        ]}
      />
    );
  }

  return (
    <TotalSearch
      contents={[
        <div>
          <Heading fontWeight="400" fontSize="16">
            {name}
          </Heading>
          <SearchNumber backgroundColor={color || '#9C00D5'}>{number}</SearchNumber>
        </div>,
      ]}
    />
  );
};

class Test extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <div className={classes.container}>
          <PageTitle>All Search</PageTitle>
          <div style={{ margin: '12px 0' }}>
            <ContentCard
              boxShadow="0 0 0 0"
              border="1px solid lightgray"
              contents={[
                <div>
                  <div className={classes.allSearchContent}>타임시트 (타임 항목과 청구 현황)</div>
                  <div className={classes.totalSearchWrapper}>
                    <SearchTab name="Task" color="#3D7BE3" number={10} isActive />
                    <SearchTab name="Task" color="#9C00D5" number={1} />
                    <SearchTab name="Task" color="#FACB00" number={1} />
                    <SearchTab name="Task" color="#00D219" number={1} />
                    <SearchTab name="Task" color="#3270DC" number={1} />
                    <SearchTab name="Task" color="#FE8200" number={1} />
                    <SearchTab name="Task" color="#F800D3" number={1} />
                    <SearchTab name="Task" color="#4D00D3" number={1} />
                    <SearchTab name="Task" color="#E70000" number={1} />
                    <SearchTab name="Task" color="#00C592" number={1} />
                    <SearchTab name="Task" color="#17D000" number={1} />
                  </div>
                </div>,
              ]}
            />
          </div>
          <SearchItem
            icon
            color=""
            title="타임시트 (타임 항목과 청구 현황)"
            content="타임시트 (타임 항목과 청구 현황)"
            fileName="타임시트 (타임 항목과 청구 현황) 타임시트 (타임 항목과 청구 현황)"
            date="2019-06-19"
            name="Seog Ki Son"
            classes={classes}
          />
          <SearchItem
            icon
            color="#F800D3"
            title="타임시트 (타임 항목과 청구 현황)"
            content="타임시트 (타임 항목과 청구 현황)"
            fileName="타임시트 (타임 항목과 청구 현황) 타임시트 (타임 항목과 청구 현황)"
            date="2019-06-19"
            name="Seog Ki Son"
            classes={classes}
          />
          <SearchItem
            icon
            color="#9C00D5"
            title="타임시트 (타임 항목과 청구 현황)"
            content="타임시트 (타임 항목과 청구 현황)"
            fileName="타임시트 (타임 항목과 청구 현황) 타임시트 (타임 항목과 청구 현황)"
            date="2019-06-19"
            name="Seog Ki Son"
            classes={classes}
          />
          <SearchItem
            icon
            color="#FACB00"
            title="타임시트 (타임 항목과 청구 현황)"
            content="타임시트 (타임 항목과 청구 현황)"
            fileName="타임시트 (타임 항목과 청구 현황) 타임시트 (타임 항목과 청구 현황)"
            date="2019-06-19"
            name="Seog Ki Son"
            classes={classes}
          />
          <SearchItem
            icon
            color="#00C592"
            title="타임시트 (타임 항목과 청구 현황)"
            content="타임시트 (타임 항목과 청구 현황)"
            fileName="타임시트 (타임 항목과 청구 현황) 타임시트 (타임 항목과 청구 현황)"
            date="2019-06-19"
            name="Seog Ki Son"
            classes={classes}
          />
        </div>
      </div>
    );
  }
}
const styles = theme => ({
  container: {
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  allSearchContent: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
  },
  totalSearchWrapper: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0 0',
    width: '75%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr',
    gridGap: '10px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  attachment: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 25,
    height: 25,
  },
  saturate: {
    filter: 'invert(50%)',
  },
  searchInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
});
export default withStyles(styles)(Test);
