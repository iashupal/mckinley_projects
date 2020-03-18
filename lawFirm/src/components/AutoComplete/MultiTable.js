import React, { Fragment } from 'react';
import { R } from 'helpers/ramda';
import Button from 'components/Button';
import RadioButton from 'components/RadioButton';
import GridTable, { GridRow } from 'components/GridTable';

const MultiTable = ({ selectedOptions, handleRemove, handleRadioChange, useTable, readOnly }) => {
  if (readOnly) {
    return (
      selectedOptions &&
      selectedOptions.length > 0 &&
      selectedOptions.map((item, idx) => {
        return (
          <div key={idx} style={{ marginRight: '3px', marginLeft: '3px' }}>
            {item.label}
          </div>
        );
      })
    );
  }

  return (
    selectedOptions &&
    selectedOptions.length > 0 && (
      <GridTable colWidth1={80} colWidth2={200}>
        {selectedOptions.length !== 0 && (
          <GridRow title="대표자" center>
            <div style={{ textAlign: 'center' }}>이름</div>
          </GridRow>
        )}
        {selectedOptions.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <GridRow
                title={
                  <div style={{ textAlign: 'center', marginRight: '-30px' }}>
                    <RadioButton
                      name="isMain"
                      value={idx.toString()}
                      checked={item.isMain}
                      onChange={async () => {
                        const newData = R.clone(selectedOptions);
                        newData.forEach((data, index) => {
                          const isMain = index === idx;
                          data.isMain = isMain;
                        });
                        await handleRadioChange({ value: newData, useTable });
                      }}
                    />
                  </div>
                }
                center
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="text-left">{item.label}</div>
                  <Button
                    onClick={
                      handleRemove
                        ? () => {
                            const newArr = [...selectedOptions].filter(option => option.value !== item.value);
                            handleRemove({ value: newArr, useTable });
                          }
                        : null
                    }
                  >
                    X
                  </Button>
                </div>
              </GridRow>
            </Fragment>
          );
        })}
      </GridTable>
    )
  );
};

export default MultiTable;
