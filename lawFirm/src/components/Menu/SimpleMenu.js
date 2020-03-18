import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class SimpleMenu extends React.Component {
    state = {
        notFound: false,
        value: false,
        anchorEl: null,
       
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      }
    
      handleClose = () => {
        this.setState({ 
          anchorEl: null,
        });
      }
  render(){
    const {anchorEl} = this.state;
  return (
    <div>
  

       
       <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={this.handleClick}
      >
        Open Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>
      
    </div>
  );
  }
}

export default SimpleMenu;

// const SimpleMenu = ({ title, children, onClose, onClick }) => {
//   return(
//     <div>
//       <Button
//           aria-controls="customized-menu"
//           aria-haspopup="true"
//           variant="contained"
//           color="primary"
//           onClick={this.handleClick}
//         >
//           {title}
//       </Button>
//       <StyledMenu
//         id="customized-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={this.handleClose}
//       >
//         {children}
//       </StyledMenu>
//     </div>
//   )
// }
// export default SimpleMenu;