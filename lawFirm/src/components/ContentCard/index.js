import React, { Fragment } from 'react';
import Box from 'components/BoxOld';
import { Paper, withStyles, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    padding: 20,
    // marginBottom: '15px', => 상단 좌우는 margin 이 없음, 통일을 위해 삭제함.
    // display: 'grid', => grid 불필요 하다고 판단 -> 제거
    // gridTemplateRows: '40px 1fr',
    borderRadius: '8px',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: '35px',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '100%',
    },
  },
  noMarginContent: {
    display: 'flex',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      // display: 'block', => 브라우저 줄였을 시 이슈 발생 -> 제거
      width: '100%',
    },
  },
  divider: {
    marginTop: 10,
    marginBottom: '20px',
  },
  contents: {
    flex: 1,
  },
});

function ContentCard({ classes, title, padding, position, actionButton, boxShadow, border, contents, customHeader }) {
  return (
    <Paper className={classes.container} style={{ boxShadow, border, padding, position }}>
      <div>
        {customHeader ||
          ((title || actionButton) && (
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              {title && <h2>{title}</h2>}
              {actionButton && <div>{actionButton}</div>}
            </Box>
          ))}
      </div>
      {(customHeader || title || actionButton) && <Divider className={classes.divider} />}
      <div className={classes.noMarginContent}>
        {contents.map((content, index) => (
          <div key={index} className={classes.contents}>
            {content}
          </div>
        ))}
      </div>
    </Paper>
  );
}

ContentCard.propTypes = {
  title: PropTypes.string,
  actionButton: PropTypes.element,
  contents: PropTypes.arrayOf(PropTypes.element).isRequired,
};

ContentCard.defaultProps = {
  title: '',
  actionButton: null,
};

export default withStyles(styles)(ContentCard);
