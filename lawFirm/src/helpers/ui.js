import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { R, RU } from 'helpers/ramda';
import ContainerHeader from 'components/ContainerHeader/index';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from '@material-ui/core/DialogActions';
import Fab from '@material-ui/core/Fab';
import Editor from 'components/Editor';

const { checkedNames, mlMessage } = RU;

export const EditorW = Editor;

export const DialogBtnBox = ({ children }) => (
  <DialogActions>
    <div className="col-md-12 text-center pb-2">{children}</div>
  </DialogActions>
);
export const BlankSpan = ({ num, innerText, style }) => (
  <span style={style} className={`pl-${num} pr-${num}`}>
    {innerText}
  </span>
);

export const LoadingBox = ({ isLoading }) => {
  return (
    <Dialog open={isLoading}>
      <DialogContent className="d-flex flex-row bd-highlight">
        <CircularProgress size={50} color="primary" className="p-2 bd-highlight" />
        <div className="p-3 bd-highlight">Please Wait...</div>
      </DialogContent>
    </Dialog>
  );
};

export const PageTitle = ({ title, match, renderComponent }) => {
  match = match || { path: '' };
  return <ContainerHeader renderComponent={renderComponent} match={match} title={title} />;
};

export const SelectW = ({
  name,
  value,
  items,
  handleChange,
  isReadOnly,
  isUseAll = true,
  label,
  style,
  readStyle,
  ordering,
}) => {
  const flag = false;
  // if (name === 'currency') {
  //   flag = true;
  // }
  let valueText = '';
  if (isReadOnly) {
    try {
      valueText = R.filter(a => a.value === value, items)[0].name;
    } catch (e) {
      // no work
    }
  }

  if (ordering === 'name' && items) {
    items.sort((a, b) => {
      const isCurrency = name === 'currency';
      const name_a = isCurrency ? a.name.split(' ')[1] : a.name;
      const name_b = isCurrency ? b.name.split(' ')[1] : b.name;

      const compareValue = name_a > name_b ? 1 : -1;
      return name_a === name_b ? 0 : compareValue;
    });
  }

  const selectComponent = (
    <Select
      style={style}
      value={value || 0}
      name={name}
      onChange={handleChange}
      displayEmpty
      disabled={isReadOnly}
      inputProps={
        {
          // name: 'age',
          // id: 'age-simple',
        }
      }
    >
      {isUseAll && (
        <MenuItem value="" key="">
          <em>-- All --</em>
        </MenuItem>
      )}
      {items &&
        items.map(i => {
          return (
            <MenuItem value={i.value} key={i.value}>
              {flag === false ? i.name : `[${i.code}] ${i.name}`}
            </MenuItem>
          );
        })}
    </Select>
  );

  return (
    <>
      {!isReadOnly && !label && selectComponent}
      {!isReadOnly && label && (
        <FormControl>
          <InputLabel shrink>{label}</InputLabel>
          {selectComponent}
        </FormControl>
      )}
      {isReadOnly && <span style={readStyle}>{valueText}</span>}
    </>
  );
};

export const CheckboxW = ({ list, handleChange, option, isReadOnly }) => {
  let style;
  if (!option || option === '1') {
    style = {};
  }

  if (option === '2') {
    style = {
      backgroundColor: 'lightGray',
      color: 'white',
      paddingRight: '10px',
      marginLeft: '0px',
      marginTop: '5px',
      borderRadius: '5px',
    };
  }

  // style.borderStyle = 'solid';
  // style.borderColor = 'red';

  let valueText = '';
  if (isReadOnly) {
    try {
      const names = checkedNames(list);
      valueText = names.join(', ');
    } catch (e) {
      // no work
    }
  }

  return (
    <>
      {!isReadOnly && (
        <FormGroup row>
          {list &&
            list.map(i => {
              return (
                <FormControlLabel
                  key={i.id}
                  control={
                    <Checkbox
                      color="secondary"
                      checked={i.value}
                      onChange={handleChange}
                      value={i.id}
                      style={option === '2' ? { width: '35px', height: '35px' } : {}}
                      disabled={isReadOnly}
                    />
                  }
                  label={i.name}
                  style={style}
                />
              );
            })}
        </FormGroup>
      )}
      {isReadOnly && <span>{valueText}</span>}
    </>
  );
};

export const ButtonW = ({
  name,
  nameID,
  handleClick,
  option,
  customBtnStyle,
  children,
  toolTipMsg,
  toolTipMsgPlacement,
  disabled,
}) => {
  let colorOption = 'default';
  let classNameOption = 'jr-btn text-white';
  let sizeOption = 'medium';

  switch (option) {
    case '1':
      customBtnStyle = 'fab';
      classNameOption = 'bg-light-green jr-fab-btn text-white jr-btn-fab-sm';
      break;
    case '2':
      colorOption = 'secondary';
      break;
    case '3':
      classNameOption = 'btn bg-gray';
      sizeOption = 'small';
      break;
    case '4':
      colorOption = 'primary';
      break;
    default:
      customBtnStyle = 'fab';
      classNameOption = 'bg-light-green jr-fab-btn text-white jr-btn-fab-sm';
      break;
  }

  switch (nameID) {
    case 'TEMP':
      name = mlMessage('pages.common.button.tempSave');
      children = <i className="zmdi zmdi-plus zmdi-hc-lg" />;
      break;
    case 'SAVE':
      name = mlMessage('pages.common.button.save');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'BACK':
      name = mlMessage('pages.common.button.back');
      children = <i className="zmdi zmdi-long-arrow-return" />;
      break;
    case 'MOD':
      name = mlMessage('pages.common.button.mod');
      children = <i className="zmdi zmdi-edit zmdi-hc-lg" />;
      break;
    case 'FINISH':
      name = mlMessage('pages.common.button.finish');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'SKIP':
      name = mlMessage('pages.common.button.skip');
      break;
    case 'TRANSFER':
      name = mlMessage('pages.common.button.transfer');
      break;
    case 'CANCEL':
      name = mlMessage('pages.common.button.cancel');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'RESTART':
      name = mlMessage('pages.common.button.restart');
      children = <i className="zmdi zmdi-replay zmdi-hc-lg" />;
      break;
    case 'COMPLATE':
      name = mlMessage('pages.common.button.complate');
      children = <i className="zmdi zmdi-floppy zmdi-hc-lg" />;
      break;
    case 'DEL':
      name = mlMessage('pages.common.button.del');
      children = <i className="zmdi zmdi-delete zmdi-hc-lg" />;
      break;
    case 'REJECT':
      name = mlMessage('pages.common.button.reject');
      break;
    case 'REVISE':
      name = mlMessage('pages.common.button.revise');
      children = <i className="zmdi zmdi-edit zmdi-hc-lg" />;
      break;
    default:
      break;
  }

  let buttonComponent = null;

  if (customBtnStyle === 'fab') {
    buttonComponent = (
      <Fab color={colorOption} className={classNameOption} size={sizeOption} onClick={handleClick} disabled={disabled}>
        {children && (
          <>
            {children}
            {name && <BlankSpan num={1} />}
          </>
        )}
        {name}
      </Fab>
    );
  } else {
    buttonComponent = (
      <Button
        variant={customBtnStyle || 'contained'} // 'text', 'flat', 'outlined', 'contained', 'fab', 'extendedFab'
        color={colorOption}
        className={classNameOption}
        size={sizeOption}
        onClick={handleClick}
        disabled={disabled}
      >
        {children && (
          <>
            {children}
            {name && <BlankSpan num={1} />}
          </>
        )}
        {name}
      </Button>
    );
  }

  return (
    <>
      {!toolTipMsg && buttonComponent}
      {toolTipMsg && (
        <Tooltip title={<span style={{ fontSize: 15 }}>{toolTipMsg}</span>} placement={toolTipMsgPlacement || 'right'}>
          {buttonComponent}
        </Tooltip>
      )}
    </>
  );
};
