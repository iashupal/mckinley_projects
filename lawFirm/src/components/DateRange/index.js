import React, { Fragment } from 'react';
import { Popover } from '@material-ui/core';
import moment from 'moment';
import Select from 'components/Select';
import Button from 'components/Button';
import DatePicker from 'components/DatePicker';
import { RU } from 'helpers/ramda';

const { yearMonthDay } = RU;

class DateRange extends React.Component {
  state = {
    anchorEl: null,
    popoverOpen: false,
    selectedDateType: 12,
  };

  componentDidMount() {
    const { handleChange, handleSubmit } = this.props;

    const endDate = new Date();
    const startDate = moment()
      .subtract(12, 'months')
      .toDate();

    handleChange({
      endDate,
      startDate,
    });
    handleSubmit(yearMonthDay(startDate), yearMonthDay(endDate));
  }

  closePopover = () => {
    const { startDate, endDate, handleSubmit } = this.props;
    this.setState({ ...this.state, popoverOpen: false });
    handleSubmit(yearMonthDay(startDate), yearMonthDay(endDate));
  };

  render() {
    const { anchorEl, popoverOpen, selectedDateType } = this.state;
    const { label, startDate, endDate, handleChange, handleSubmit } = this.props;

    const placeholder = label || '등록일';
    return (
      <div style={{ display: 'flex' }}>
        <Select
          placeholder={placeholder}
          options={[
            { key: 1, text: '지난 1개월' },
            { key: 3, text: '지난 3개월' },
            { key: 6, text: '지난 6개월' },
            { key: 12, text: '지난 12개월' },
            { key: 0, text: '직접 선택' },
          ]}
          selectedKey={selectedDateType}
          onChange={(event, option, index) => {
            const { key } = option;
            const { target } = event;

            if (key === 0) {
              this.setState({ anchorEl: target, popoverOpen: true, selectedDateType: key });
            } else {
              this.setState({ selectedDateType: key });

              const endDate = new Date();
              const startDate = moment()
                .subtract(key, 'months')
                .toDate();

              handleChange({
                endDate,
                startDate,
              });
              handleSubmit(yearMonthDay(startDate), yearMonthDay(endDate));
            }
          }}
          onRenderTitle={items => `${placeholder}: ${items[0].text}`}
          style={{ width: 200 }}
        />
        {selectedDateType === 0 && (
          <div
            style={{
              paddingTop: '8px',
              paddingLeft: '8px',
              paddingRight: '8px',
              cursor: 'pointer',
              border: 'solid 1px lightgray',
              borderRadius: '5px',
              width: '180px',
            }}
            onClick={event => this.setState({ popoverOpen: true })}
            role="button"
            tabIndex="-1"
          >
            {yearMonthDay(startDate)} ~ {yearMonthDay(endDate)}
          </div>
        )}
        <Popover
          // open={Boolean(anchorEl)}
          open={popoverOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          // onClose={this.closePopover}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ width: '255px', paddingTop: '5px', paddingLeft: '5px' }}>
              <DatePicker inline value={startDate} onChange={date => handleChange({ startDate: date })} />
            </div>
            <div style={{ width: '250px', paddingTop: '5px', paddingLeft: '2px' }}>
              <DatePicker
                inline
                value={endDate}
                onChange={date => {
                  handleChange({ endDate: date });
                  // this.closePopover();
                }}
                minDate={startDate}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingBottom: '6px' }}>
            <Button color="primary" onClick={this.closePopover}>
              확인
            </Button>
          </div>
        </Popover>
      </div>
    );
  }
}

export default DateRange;
