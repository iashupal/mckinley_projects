import React, { Fragment } from 'react';
import { Chip } from '@material-ui/core';

const MultiLabel = ({ selectedOptions, handleRemove, chipWidth }) => {
  return (
    selectedOptions &&
    selectedOptions.length > 0 && (
      <div style={{ width: chipWidth ? 'max-content' : '100%' }}>
        {selectedOptions.map((item, index) => {
          const { value, label } = item;
          return (
            <Fragment key={index}>
              <Chip
                key={value}
                name={value}
                label={label}
                onDelete={
                  handleRemove
                    ? () => {
                        const newArr = [...selectedOptions].filter(option => option.value !== value);
                        handleRemove({ value: newArr, useTable: false });
                      }
                    : null
                }
                style={{ marginRight: '3px', marginLeft: '3px', marginBottom: '5px' }}
              />
              {(index + 1) % 5 === 0 && <br />}
            </Fragment>
          );
        })}
      </div>
    )
  );
};

export default MultiLabel;
