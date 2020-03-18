import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import EditTable from 'components/EditTable';
import ContentCard from 'components/ContentCard';
import ListDetailContainer from 'components/ListDetailContainer';
import InputBoxNumber from 'components/InputBoxNumber';

const { mlMessage } = RU;

class MultipleRegistration extends Component {
  state = {
    data: [],
  };

  componentDidMount = () => {};

  render() {
    const { data } = this.state;
    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <h2>복수 등록 목록</h2>
          </div>
        }
        contents={[
          <EditTable
            data={data}
            newRowDefault={{}}
            rows={[
              {
                id: 'category',
                type: 'code',
                label: '항목',
                width: '5%',
                align: 'left',
                options: [
                  { key: '0010', text: '서류작성' },
                  { key: '0020', text: '미팅준비' },
                  { key: '0030', text: '직접입력' },
                ],
              },
              { id: 'time', type: 'timePicker', label: '시간', align: 'left', width: '5%' },
              {
                id: 'case',
                type: 'autoComplete',
                label: '사건',
                align: 'left',
                width: '20%',
                options: [
                  { value: '0010', label: '테스트 사건1' },
                  { value: '0020', label: '테스트 사건2' },
                  { value: '0030', label: '테스트 사건3' },
                ],
              },
              { id: 'contents', type: 'text', label: '내용', align: 'left', width: '25%' },
              { id: 'excutor', type: 'autoComplete', label: '실행인', align: 'left', width: '15%' },
              { id: 'rate', type: 'money', label: '청구 요율 (원/h)', align: 'left', width: '10%' },
              { id: 'cost', type: 'text', label: '청구 비용', align: 'left', width: '10%' },
              { id: 'excuteDate', type: 'date', label: '실행일', align: 'left', width: '5%' },
            ]}
            setData={data => this.setState({ data })}
            saveData={data => {
              alert(JSON.stringify(data, null, 4));
            }}
          />,
        ]}
      />
    );

    return <ListDetailContainer TableComponent={TableComponent} handleDialogClose={() => {}} />;
  }
}

const mapStateToProps = ({ auth }) => {
  const { MyLFID } = auth.authUser;
  return {
    MyLFID,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleRegistration);
