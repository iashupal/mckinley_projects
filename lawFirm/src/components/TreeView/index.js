import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

// const data = [
//   {
//     id: '1',
//     label: 'Applications',
//     children: [{ id: '2', label: 'Calendar' }, { id: '3', label: 'Chrome' }, { id: '4', label: 'Webstorm' }],
//   },
//   {
//     id: '5',
//     label: 'Documents',
//     children: [
//       {
//         id: '6',
//         label: 'Material-UI',
//         children: [
//           { id: '7', label: 'src', children: [{ id: '8', label: 'index.js' }, { id: '9', label: 'tree-view.js' }] },
//         ],
//       },
//     ],
//   },
// ];

const convertToComponent = (obj, handleItemClick) => {
  if (!obj) return <></>;

  const { id, label, children } = obj;
  if (!id || !label) return <></>;

  if (!children) return <TreeItem nodeId={id} label={label} onClick={e => handleItemClick(id)} />;

  return (
    <TreeItem nodeId={id} label={label}>
      {children.map((a, index) => (
        <React.Fragment key={index}>{convertToComponent(a, handleItemClick)}</React.Fragment>
      ))}
    </TreeItem>
  );
};

export default ({ data, handleGroupToggle, handleItemClick }) => {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeToggle={(nodeId, expanded) => handleGroupToggle(nodeId, expanded)}
    >
      {/* <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" onClick={e => handleItemClick('2')} />
        <TreeItem nodeId="3" label="Chrome" onClick={e => handleItemClick('3')} />
        <TreeItem nodeId="4" label="Webstorm" onClick={e => handleItemClick('4')} />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" onClick={e => handleItemClick('8')} />
            <TreeItem nodeId="9" label="tree-view.js" onClick={e => handleItemClick('9')} />
          </TreeItem>
        </TreeItem>
      </TreeItem> */}
      {data.map((a, index) => (
        <React.Fragment key={index}>{convertToComponent(a, handleItemClick)}</React.Fragment>
      ))}
    </TreeView>
  );
};
