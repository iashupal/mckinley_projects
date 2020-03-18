import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: '350px',
    },
    padding: 5,
  },

  searchRightIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
  searchLeftIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    cursor: 'pointer',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});
class Search extends React.Component {
  state = {
    placeholderFlag: true,
  };

  focustIn = () => {
    this.setState({
      placeholderFlag: false,
    });
  };

  focusOut = () => {
    this.setState({
      placeholderFlag: true,
    });
  };

  render() {
    const { classes, onChange, placeholder, color, handleSubmit, leftIcon, value } = this.props;
    const passProps = { classes, placeholder, onChange };
    const { placeholderFlag } = this.state;

    return (
      <div className={classes.search}>
        <div
          className={leftIcon ? classes.searchLeftIcon : classes.searchRightIcon}
          onClick={handleSubmit}
          role="button"
          tabIndex={-1}
        >
          <SearchIcon />
        </div>
        <InputBase
          {...passProps}
          inputProps={{ value }}
          placeholder={placeholderFlag ? placeholder : ''}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          onFocus={this.focustIn}
          onBlur={this.focusOut}
          color={color}
          style={leftIcon ? { marginLeft: '40px' } : {}}
        />
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(Search);
