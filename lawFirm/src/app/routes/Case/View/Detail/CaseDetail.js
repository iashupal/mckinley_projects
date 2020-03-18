import React, { Component } from 'react';
import Fields, { FieldItem } from 'components/Fields';
import { RU, R } from 'helpers/ramda';
import classnames from 'classnames';
import { EditorW, BlankSpan } from 'helpers/ui';
import DragDropPopUp from 'components/FileUpload';
import ButtonN from 'components/ButtonN';
import CheckBox from 'components/CheckBox';
import { handleDetailBindFetch as handleContractDetailBindFetch } from 'app/routes/Contract/Redux/Action';
import { withStyles } from '@material-ui/core';

const { mlMessage } = RU;

class CaseDetail extends Component {
  componentWillUnmount = () => {
    const { clearCaseInfo } = this.props;
    clearCaseInfo();
  };

  render() {
    const { caseInfo, setSelectDialogTrue, setDetailDialogTrue, formMode, classes, MyLFID, clearCaseInfo } = this.props;

    const contractDES = caseInfo.contractID === null ? '없음' : `[${caseInfo.contractTitle}]`;
    const contractDetail =
      caseInfo.contractID === null ? (
        <div className="d-flex align-items-baseline" style={{ marginTop: '-6px' }}>
          <div>[없음]</div>
          <ButtonN
            color="inverted"
            label={mlMessage('pages.consultation.choiceContract')}
            onClick={e => {
              setSelectDialogTrue();
            }}
          />
        </div>
      ) : (
        <div
          role="button"
          tabIndex="0"
          className={classes.contractLink}
          onClick={e => {
            setDetailDialogTrue();
          }}
        >
          {`[${caseInfo.contractTitle}]`}
        </div>
      );

    const detailComponent = (
      <div className="row" style={{ paddingBottom: '13px' }}>
        <div className={classnames(classes.detailsSectionLeft, 'col-xs-12 col-md-6 pl-4')}>
          <Fields>
            <FieldItem title="고유 번호">{caseInfo.managementNo}</FieldItem>
            <FieldItem title={`${caseInfo.caseType === 'L' ? '송무' : '자문'}명`}>{caseInfo.title}</FieldItem>
            <FieldItem title="계약서">{formMode === 'des' ? contractDES : contractDetail}</FieldItem>
            <FieldItem title="설명" />
            <FieldItem isFull>
              <EditorW value={caseInfo.backgroundInfo} isReadOnly handleChange={value => {}} />
            </FieldItem>
          </Fields>
        </div>
        <div className="col-xs-12 col-md-6 pl-4">
          <Fields>
            <FieldItem title="상태">{caseInfo.caseStatus}</FieldItem>

            <FieldItem title="분류">
              {`${caseInfo.caseCategoryL1 ? caseInfo.caseCategoryL1 : ''}/${
                caseInfo.caseCategoryL2 ? caseInfo.caseCategoryL2 : ''
              }`}
            </FieldItem>

            {caseInfo.caseType === 'L' && (
              <>
                <FieldItem title="심급">{caseInfo.courtLevel}</FieldItem>
              </>
            )}
            <FieldItem title="수임일">{caseInfo.retainedDate}</FieldItem>
            <FieldItem title="자문/TC">
              <div>
                {Boolean(caseInfo.isTermContract) && <div>계약기간</div>}
                {Boolean(caseInfo.isTCContract) && <div>TC계약</div>}
              </div>
            </FieldItem>
            <FieldItem title="개시">{caseInfo.startDate}</FieldItem>
            <FieldItem title="종료">
              {caseInfo.isUnfixedEndDate === 1 ? <span>종료일 미지정</span> : <span>{caseInfo.endDate}</span>}
            </FieldItem>
            {caseInfo.caseType === 'A' && (
              <FieldItem title="파트너">
                {caseInfo.partner ? <span>{caseInfo.partner}</span> : <span>X</span>}
              </FieldItem>
            )}
            <FieldItem title="관련 파일">
              <DragDropPopUp files={caseInfo.files || []} LFID={MyLFID} showDownloadList hideButton />
            </FieldItem>
          </Fields>
        </div>
      </div>
    );

    return <div>{detailComponent}</div>;
  }
}

const styles = theme => ({
  // 사건 상세 정보 카드 섹션
  detailsSectionLeft: {
    borderRight: '1.5px dotted lightgray',
    '@media screen and (max-width: 767px)': {
      borderRight: '0',
    },
  },
  contractLink: {
    cursor: 'pointer',
    color: '#3F51B5',
    outline: 'none',
    width: 'fit-content',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default withStyles(styles)(CaseDetail);
