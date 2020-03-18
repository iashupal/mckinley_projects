import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import DatePicker from 'components/DatePicker';
import Heading from 'components/Heading';
import Toggle from 'components/Toggle';
import AlignBox from 'components/AlignBox';
import Accordian from 'components/Accordian';
import Picker from 'components/Picker';
import ScheduleBigCalendar from 'components/ScheduleBigCalendar';
import Search from 'components/Search/Search';
import SearchNumber from 'components/SearchNumber';
import AgendaPopup from 'components/AgendaPopup';
import ic_control_p from '../../../../assets/images/icons/ic_control_p.png';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkA: true,
      searchText: '',
    };
  }

  handleSubmit = () => {
    const { searchText } = this.state;
    alert(`검색 입력값 : ${searchText}`);
  };

  onChange = e => {
    this.setState({
      [e.target.value]: !e.target.checked,
    });
  };

  updateSearchText = evt => {
    this.setState({ searchText: evt.target.value });
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    const backgroundColor = event.hexColor;
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  render() {
    const { classes } = this.props;
    const { checkA, searchText } = this.state;
    return (
      <div className="app-wrapper">
        <div className={classes.scheduleContainer}>
          <Box
            mb={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <PageTitle icon="event">한국 애자일 / 0001-주주권 확인</PageTitle>
            <Box
              mb={1}
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading>DatePicker : </Heading>
              <DatePicker
                selected={new Date()}
                onChange={date => console.log('Date:', date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <div className={classes.difference}>~</div>
              <DatePicker
                selected={new Date()}
                onChange={date => console.log('Date:', date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </Box>
          </Box>
          <AlignBox>
            <AlignBox />
            <AlignBox>
              <Heading padding="0 0 0 10px" margin="0 10px 0px 0">
                Switch
              </Heading>
              <Toggle checked={checkA} onChange={e => this.onChange(e)} value="checkA" />
            </AlignBox>
          </AlignBox>
        </div>
        <div className={classes.scheduleContainer}>
          <ContentCard
            boxShadow="0 0 0 0"
            border="1px solid lightgray"
            title="fghj"
            customHeader={
              <AlignBox pb={1}>
                <AlignBox style={{ border: '1px solid lightgray', borderRadius: '5px', width: '250px' }}>
                  <Search
                    placeholder="placeholder 입니다."
                    value={searchText}
                    onChange={this.updateSearchText}
                    handleSubmit={this.handleSubmit}
                    RightIcon
                    color="black"
                  />
                </AlignBox>
                <AlignBox mr={-0.5}>
                  <Button leftIcon size="large" color="inverted">
                    <i className="material-icons">event</i>
                    <Box pl={2} pr={2} pt={0.2} pb={0.2}>
                      사건 수정하기
                    </Box>
                  </Button>
                </AlignBox>
              </AlignBox>
            }
            contents={[
              <div>
                <Box>
                  <ScheduleBigCalendar
                    // onSelectSlot={slotInfo =>
                    //   alert(
                    //     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                    //       `\nend: ${slotInfo.end.toLocaleString()}`,
                    //   )
                    // }

                    // onSelect={this.handleSelect}
                    // onSelectSlot={slotInfo => this.onSlotChange(slotInfo)}
                    // onSelectEvent={event => alert(event.title)}
                    // defaultDate={new Date(2019, 3, 12)}
                    // startAccessor="start"
                    // endAccessor="end"
                    // defaultView="agenda"
                    // eventPropGetter={this.eventStyleGetter}
                  />
                </Box>
              </div>,
            ]}
          />
          <div>
            <ContentCard
              boxShadow="0 0 0 0"
              border="1px solid lightgray"
              padding="5px 0px"
              contents={[
                <div>
                  <Box>
                    <Picker />
                  </Box>
                </div>,
              ]}
            />
            <Box mt={1.5}>
              <ContentCard
                boxShadow="0 0 0 0"
                border="1px solid lightgray"
                noMargin
                contents={[
                  <div>
                    <Accordian
                      title="대법원 나의 사건"
                      boxShadow="0 0 0 0"
                      padding="0 24px 0 0"
                      leftIcon
                      contents={[
                        <div className={classes.accordionFull}>
                          <AlignBox pb={2}>
                            <AlignBox>
                              <SearchNumber backgroundColor="#3d7be4" borderRadius="7px" padding="2px 12px" />
                              <Heading padding="0 10px" fontSize="15px">
                                Heading 1
                              </Heading>
                            </AlignBox>
                            <Box>
                              <img src={ic_control_p} alt="" />
                            </Box>
                          </AlignBox>
                          <AlignBox pb={2}>
                            <AlignBox>
                              <SearchNumber backgroundColor="#E70000" borderRadius="7px" padding="2px 12px" />
                              <Heading padding="0 10px" fontSize="15px">
                                Heading 2
                              </Heading>
                            </AlignBox>
                            <img src={ic_control_p} alt="" />
                          </AlignBox>
                          <AlignBox pb={2}>
                            <AlignBox>
                              <SearchNumber backgroundColor="#00C592" borderRadius="7px" padding="2px 12px" />
                              <Heading padding="0 10px" fontSize="15px">
                                Heading 3
                              </Heading>
                            </AlignBox>
                            <img src={ic_control_p} alt="" />
                          </AlignBox>
                          <AlignBox pb={2}>
                            <AlignBox>
                              <SearchNumber backgroundColor="#FACB00" borderRadius="7px" padding="2px 12px" />
                              <Heading padding="0 10px" fontSize="15px">
                                Heading 4
                              </Heading>
                            </AlignBox>
                            <img src={ic_control_p} alt="" />
                          </AlignBox>
                        </div>,
                      ]}
                    />
                    <Box mt={2}>
                      <Accordian
                        title="대법원 나의 사건"
                        boxShadow="0 0 0 0"
                        padding="0 24px 0 0"
                        leftIcon
                        contents={[
                          <div className={classes.accordionFull}>
                            <AlignBox pb={2} ml={-1.2} mr={-1.2}>
                              <AlignBox>
                                <SearchNumber backgroundColor="#3d7be4" borderRadius="7px" padding="2px 12px" />
                                <Heading padding="0 10px" fontSize="15px">
                                  Heading 1
                                </Heading>
                              </AlignBox>
                              <Box>
                                <img src={ic_control_p} alt="" />
                              </Box>
                            </AlignBox>
                            <AlignBox pb={2}>
                              <AlignBox>
                                <SearchNumber backgroundColor="#E70000" borderRadius="7px" padding="2px 12px" />
                                <Heading padding="0 10px" fontSize="15px">
                                  Heading 2
                                </Heading>
                              </AlignBox>
                              <img src={ic_control_p} alt="" />
                            </AlignBox>
                            <AlignBox pb={2}>
                              <AlignBox>
                                <SearchNumber backgroundColor="#00C592" borderRadius="7px" padding="2px 12px" />
                                <Heading padding="0 10px" fontSize="15px">
                                  Heading 3
                                </Heading>
                              </AlignBox>
                              <img src={ic_control_p} alt="" />
                            </AlignBox>
                            <AlignBox pb={2}>
                              <AlignBox>
                                <SearchNumber backgroundColor="#FACB00" borderRadius="7px" padding="2px 12px" />
                                <Heading padding="0 10px" fontSize="15px">
                                  Heading 4
                                </Heading>
                              </AlignBox>
                              <img src={ic_control_p} alt="" />
                            </AlignBox>
                          </div>,
                        ]}
                      />
                    </Box>
                  </div>,
                ]}
              />
            </Box>
          </div>
          {/* </Splitter> */}
        </div>
        {/* <AgendaPopup date="19 September, 2019" /> */}
        <br />
        <br /> ==요청사항== <br />
        [컴포넌트] 일정보기/일별/주별/월별 캘린더 기능 (구글 켈린더와 유사, 캘린터별로 구분해서 관리 가능)
        <br />
        <a href="http://sian.giantsoft.co.kr/?c=HUMAXIT2" target="_blank">
          http://sian.giantsoft.co.kr/?c=HUMAXIT2
        </a>
        <br />
        (p.13)일정 관리 화면 UI-일정관리
        <br />
      </div>
    );
  }
}

const styles = theme => ({
  scheduleContainer: {
    display: 'grid',
    gridTemplateColumns: '8fr 4fr',
    gridTemplateRows: '1fr',
    gridGap: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  difference: {
    alignItems: 'center',
    display: 'inherit',
    margin: '0 10px',
  },
  accordionFull: {
    width: '100%',
    marginTop: '10px',
  },
});

export default withStyles(styles)(Test);
