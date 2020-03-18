import React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { withStyles } from '@material-ui/core/styles';
import produce from 'immer';
import '../../styles/pages/_case.scss';

class Select extends React.Component {
  checkUseAll = () => {
    const { options, isUseAll } = this.props;
    const options2 = produce(options, draft => {
      if (isUseAll) {
        draft = draft.splice(0, 0, { key: '', text: '-- ALL --' });
      }
    });

    return options2;
  };

  render() {
    const { placeholder, label, styles, onChange, selectedKey, padding, classes, style, readOnly } = this.props;
    const options = this.checkUseAll();
    const defaultWidth = 150;
    let applyStyle;
    if (style) {
      applyStyle = style.width ? style : { ...style, width: defaultWidth };
    } else {
      applyStyle = { width: defaultWidth };
    }

    if (readOnly) {
      const result = options.filter(option => option.key === selectedKey);
      return <div>{result && result.length > 0 && result[0].text}</div>;
    }

    return (
      <Dropdown
        {...this.props}
        placeholder={placeholder}
        label={label}
        options={options}
        style={{ ...applyStyle, padding }}
        //  styles={styles}
        onChange={(event, option, index) => onChange(event, option, index)}
        selectedKey={selectedKey}
        className={classes.select}
      />
    );
  }
}
const styles = {
  select: {
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
};
export default withStyles(styles)(Select);
// export default Select;
