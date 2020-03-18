import React, { Component } from 'react';
import ConsultationMng from 'app/routes/Consultation/View';

class Consultation extends Component {
  render() {
    const { selectedCase } = this.props;
    return (
      <ConsultationMng bizCode={{ key: 'BIZCODE_B03-C06', value: '송무/상담' }} CaseUUID={selectedCase.caseUUID} />
    );
  }
}

export default Consultation;

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { RU } from 'helpers/ramda';
// import { withStyles } from '@material-ui/core';
// import Box from 'components/BoxOld';
// import PageTitle from 'components/PageTitle';
// import ConsultationComponent from 'components/Consultation';
// import produce from 'immer';
// import { handleCommonAlertConfirmSet } from 'actions/Default/Common';

// const { mlMessage } = RU;

// class Consultation extends Component {
//   state = {
//     checkContract: true,
//     checkCase: true,
//     selectCase: '',
//     isContractOpen: '',
//     isCaseOpen: '',
//     startDate: '',
//     endDate: '',
//     client: '',
//     owner: '',
//     title: '',
//     contents: '',
//   };

//   handleChangeCheckBox = async (name, event, checked) => {
//     await this.setState(
//       produce(this.state, draft => {
//         draft[name] = checked;
//         draft.selectCase = '';
//       }),
//     );
//   };

//   handleChange = async (_path, e) => {
//     // const { setReduxValues } = this.props;
//     // setReduxValues({
//     //   _path,
//     //   [e.target.name]: e.target.value,
//     // });
//   };

//   handleTimeChange = async (_path, name, value) => {
//     // const { setReduxValues } = this.props;
//     // setReduxValues({
//     //   _path,
//     //   [name]: moment(value),
//     // });
//   };

//   handlePriceChange = async (_path, name, e) => {
//     // const { setReduxValues } = this.props;
//     // setReduxValues({
//     //   _path,
//     //   [name]: e.value,
//     // });
//   };

//   handleChangeSelect = async (name, e, o) => {
//     // await this.setState(
//     //   produce(this.state, draft => {
//     //     draft[name] = o.key;
//     //   }),
//     // );
//   };

//   handleChangeDateRange = async (_path, obj) => {
//     // const { setReduxValues } = this.props;
//     // if (obj.startDate) {
//     //   setReduxValues({
//     //     _path,
//     //     startDate: obj.startDate,
//     //   });
//     // }
//     // if (obj.endDate) {
//     //   setReduxValues({
//     //     _path,
//     //     endDate: obj.endDate,
//     //   });
//     // } else {
//     //   setReduxValues({
//     //     _path,
//     //     date: obj,
//     //   });
//     // }
//   };

//   handleSubmit = async (startDate, endDate) => {
//     // const { search, setListFetch } = this.props;
//     // const { searchValue } = search;
//     // setListFetch({
//     //   startDate,
//     //   endDate,
//     //   searchValue,
//     // });
//   };

//   handleKeyPress = async () => {
//     // const { search, setListFetch } = this.props;
//     // const { startDate, endDate, searchValue } = search;
//     // setListFetch({
//     //   startDate,
//     //   endDate,
//     //   searchValue,
//     // });
//   };

//   handleDelete = () => {
//     // const { handleCommonAlertConfirmSet } = this.props;
//     // handleCommonAlertConfirmSet({
//     //   msgObj: {
//     //     title: mlMessage('alertDialog.delete'),
//     //     contents: '',
//     //     isConfirm: true,
//     //   },
//     //   waitDatas: {
//     //     name: '',
//     //     value: {},
//     //   },
//     // });
//   };

//   handleSave = formMode => {
//     // const { handleCommonAlertConfirmSet, save } = this.props;
//     // handleCommonAlertConfirmSet({
//     //   msgObj: {
//     //     title: mlMessage('alertDialog.save'),
//     //     contents: '',
//     //     isConfirm: true,
//     //   },
//     //   waitDatas: {
//     //     name: 'consultation',
//     //     value: { save, formMode },
//     //   },
//     // });
//   };

//   handleFileAdd = target => {
//     // const { save, setReduxValues } = this.props;
//     // const { files } = save;
//     // const result = files.concat(target);
//     // setReduxValues({
//     //   _path: 'save',
//     //   files: result,
//     // });
//   };

//   handleFileRemove = target => {
//     // const { save, setReduxValues } = this.props;
//     // const { files } = save;
//     // const result = files.filter(file => file.key !== target);
//     // setReduxValues({
//     //   _path: 'save',
//     //   files: result,
//     // });
//   };

//   handleSetDetail = (id, formMode) => {
//     // const { setDetailBind } = this.props;
//     // setDetailBind({
//     //   consultationID: id,
//     //   formMode,
//     // });
//   };

//   render() {
//     const {
//       checkContract,
//       checkCase,
//       selectCase,
//       isContractOpen,
//       isCaseOpen,
//       startDate,
//       endDate,
//       client,
//       owner,
//       title,
//       contents,
//     } = this.state;

//     return (
//       <ConsultationComponent
//         checkContract={checkContract}
//         checkCase={checkCase}
//         selectCase={selectCase}
//         isContractOpen={isContractOpen}
//         isCaseOpen={isCaseOpen}
//         startDate={startDate}
//         endDate={endDate}
//         client={client}
//         owner={owner}
//         title={title}
//         contents={contents}
//         handleChangeCheckBox={this.handleChangeCheckBox}
//         handleChange={this.handleChange}
//         handleTimeChange={this.handleTimeChange}
//         handlePriceChange={this.handlePriceChange}
//         handleChangeDateRange={this.handleChangeDateRange}
//         handleSubmit={this.handleSubmit}
//         handleKeyPress={this.handleKeyPress}
//         handleChangeSelect={this.handleChangeSelect}
//         handleFileAdd={this.handleFileAdd}
//         handleFileRemove={this.handleFileRemove}
//         handleDelete={this.handleDelete}
//         handleSave={this.handleSave}
//         handleSetDetail={this.handleSetDetail}
//       />
//     );
//   }
// }

// export default Consultation;
