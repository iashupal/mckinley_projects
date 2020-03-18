import React from 'react';
import { RU } from 'helpers/ramda';
import DocumentMng from 'app/routes/Document/View';

const { mlMessage } = RU;
class Document extends React.Component {
  render() {
    return (
      <DocumentMng
        bizCode={{ key: 'BIZCODE_B03-C04', value: '송무/문서' }}
        selectedCase={this.props.selectedCase}
        inputBoxPlaceHolder={mlMessage('pages.litigation.document.searchInput.placeholder')}
        hideInfluxSelectBoxAndInputBox
        hideProviderSelectBox
        rows={[
          { id: 'name', type: 'text', label: mlMessage('pages.document.file'), align: 'left', width: '30%' },
          { id: 'categoryCode', type: 'text', label: mlMessage('pages.document.fileChart'), width: '14%' },
          { id: 'bizCode', type: 'text', label: mlMessage('pages.document.fileInflux'), width: '14%' },
          { id: 'size', type: 'text', label: mlMessage('pages.document.fileSize'), align: 'right', width: '14%' },
          { id: 'createDate', type: 'date', label: mlMessage('pages.document.createDate'), width: '14%' },
          { id: 'createUser', type: 'text', label: mlMessage('pages.document.createUser'), width: '14%' },
        ]}
      />
    );
  }
}

export default Document;
