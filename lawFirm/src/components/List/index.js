import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List as MaterialList } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto'
    },
    listSection: {
        backgroundColor: 'inherit'
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0
    }
});

function List({ items, classes }) {
    return (
        <MaterialList className={classes.root}>
            <ul>
                {items.map(item => (
                    <ListItem key={item.key}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </ul>
        </MaterialList>
    );
}

List.propTypes = {
    items: PropTypes.array.isRequired
};

List.defaultProps = {
    items: []
};

export default withStyles(styles)(List);
