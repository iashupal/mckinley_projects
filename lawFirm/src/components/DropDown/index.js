import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropDown extends React.Component {
  state = {
    dropdownOpen: false,
  };

  toggle = e => {
    this.setState({
      ...this.state,
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  render() {
    const { label, value, items, handleChange, isSignedContractStatus } = this.props;

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="badge-light">
          {value}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            value=""
            key=""
            onClick={e => {
              handleChange(e);
            }}
          >
            {label}
          </DropdownItem>
          {!isSignedContractStatus &&
            items &&
            items.map(n => {
              return (
                <DropdownItem
                  key={n.value}
                  onClick={e => {
                    handleChange(e);
                  }}
                  value={n.value}
                >
                  {n.name}
                </DropdownItem>
              );
            })}

          {isSignedContractStatus &&
            items &&
            items.map(n => {
              return (
                <DropdownItem
                  key={n.value}
                  onClick={e => {
                    handleChange(e);
                  }}
                  value={n.value}
                >
                  {n.name}
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default DropDown;
