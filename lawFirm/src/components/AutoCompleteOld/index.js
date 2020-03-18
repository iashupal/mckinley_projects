import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { BlankSpan } from 'helpers/ui';
import Chip from '@material-ui/core/Chip';
import { R, RU } from 'helpers/ramda';
import { connect } from 'react-redux';

const { changeURL, parseQueryStr, mlMessage, getRoleAuth } = RU;

function renderInputComponent(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputref: ref,
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts &&
          parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
      </div>
    </MenuItem>
  );
}

const styles = theme => ({
  root: {
    // height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
    width: '45%',
  },
  paperContainer: {
    position: 'relative',
    width: '45%',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    width: '100%',
  },
  suggestion: {
    display: 'block',
    width: '100%',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationAutosuggest extends React.Component {
  state = {
    name: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const getSuggestions = value => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;

      return inputLength === 0
        ? []
        : this.props.allUserList.filter(suggestion => {
            const keep = count < 5 && suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;
            if (keep) {
              count += 1;
            }

            return keep;
          });
    };

    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      name: newValue,
    });
  };

  render() {
    const { classes, handleOnSelected, selectedValue, isReadOnly } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: (e, v) => {
        handleOnSelected(e, v);
        this.setState({ ...this.state, name: '' });
      },
      getSuggestionValue: suggestion => suggestion.name,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <div className="d-flex flex-row align-items-end">
          {!isReadOnly && (
            <React.Fragment>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  classes,
                  label: mlMessage('component.autoComplate.single'),
                  value: this.state.name,
                  onChange: this.handleChange,
                }}
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                  containerOpen: classes.paperContainer,
                }}
                renderSuggestionsContainer={options => (
                  <Paper {...options.containerProps} square>
                    {options.children}
                  </Paper>
                )}
              />
              <BlankSpan num={2} />
              {selectedValue && Object.keys(selectedValue).length > 0 && (
                <Chip tabIndex={-1} label={selectedValue.name} />
              )}
              {this.props.children && (
                <React.Fragment>
                  <BlankSpan num={2} />
                  {this.props.children}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          {isReadOnly && selectedValue.name}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { allUserList } = common;
  return { allUserList };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(IntegrationAutosuggest));
