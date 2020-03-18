import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core';

const Accordian = ({ title, classes, leftIcon, contents, padding, boxShadow }) => {
  return (
    <ExpansionPanel className={classes.expansionPanelWrapper} style={{ boxShadow }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={([leftIcon ? classes.ExpandLeftIcon : classes.expandRightIcon], classes.panelBorder)}
        style={{ padding }}
      >
        <Typography className={classes.accordTitle}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.contents}>
        {contents.map((content, index) => (
          <div className={classes.content} key={index}>
            {content}
          </div>
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const styles = {
  expansionPanelWrapper: {
    borderRadius: '10px',
    marginTop: 10,
    marginBotton: 10,
  },
  ExpansionPanel: {
    backgroundColor: 'transparent',
  },
  ExpandLeftIcon: {
    right: '308px',
  },
  expandRightIcon: {
    right: '8px',
  },
  accordTitle: {
    fontSize: '16px',
    color: '#373930',
  },
  panelBorder: {
    borderBottom: '1px solid lightgray',
  },
  contents: {
    flex: 1,
    padding: 0,
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
};

Accordian.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
};

Accordian.defaultProps = {
  title: 'Accordian Title Here',
  contents: [],
};

export default withStyles(styles)(Accordian);
