import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core';
import { BlankSpan } from 'helpers/ui';
import { connect } from 'react-redux';
import { R, RU } from 'helpers/ramda';
import classnames from 'classnames';
import ContentCard from 'components/ContentCard';
import FieldRow from 'components/FieldRow';
import Button from 'components/Button';
import AlignBox from 'components/AlignBox';
import File from 'components/File';
import FileImage from 'components/FileImage';
import profile from 'assets/images/profile.png';
import numeral from 'numeral';
import Box from 'components/BoxOld';
import { setReduxValues, updatePhotoURL } from '../../Redux/Action';

const { mlMessage, convertEditorText, imageURL_prefix } = RU;

// ////////////////////////////////////////
// ////////////////////////////////////////
// 현재 사용하지 않는 페이지!!!!
// ////////////////////////////////////////
// ////////////////////////////////////////

class UserSearchDetail extends Component {
  handleFileAdd = e => {
    const { setReduxValues, updatePhotoURL } = this.props;
    const newKey = e[0].key;
    const newImageURL = imageURL_prefix + newKey;

    setReduxValues({ _path: 'save', PhotoURL: newImageURL });

    updatePhotoURL();
  };

  render() {
    const { classes, userMng, common } = this.props;

    const { allCodes } = common;

    const {
      FirstName,
      LastName,
      Profile,
      Email,
      EmployeeTypeCode,
      OfficeMobilePhoneNumber,
      TimeCharge,
      TCShareLevelCode,
      ZipCode,
      Address,
      Address2,
      WorkingStatusCode,
      OfficePhoneNumber,
      CreateDate,
      PhotoURL,
      RoleCodeList,
    } = userMng.save;

    return (
      <>
        <Paper className="pb-3">
          <div className="ml-5 mr-4">
            <AlignBox>
              <div className="row mt-3 mb-3" style={{ width: '100%' }}>
                <div className="mb-3 col-md-2">
                  <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <div className={classnames('ml-2', 'mt-3')}>
                      <img
                        style={{ width: '170px', height: '210px' }}
                        src={PhotoURL !== '' ? PhotoURL : profile}
                        alt="프로필 사진"
                      />

                      <Box className="mt-3" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                        {/* <div style={{width:'90%'}} className="mt-3">
                            프로필 이미지 수정
                            </div> */}

                        {/* <File files={[]} handleFileAdd={target => this.handleFileAdd(target)} isPublicFile /> */}
                        <FileImage
                          title="프로필 수정"
                          files={[]}
                          handleFileAdd={target => this.handleFileAdd(target)}
                          isPublicFile
                        />
                      </Box>
                    </div>
                  </Box>
                </div>
                <div className="ml-1 mt-3 col-md-7">
                  <Box>
                    <b>
                      {LastName}
                      {FirstName}
                    </b>
                    <br />
                    <br />
                    <div className="pl-2">
                      <div
                        // className="col-12 row"
                        style={{
                          height: '15em',
                          border: '1px solid #eee',
                          wordBreak: 'break-all',
                          overflowY: 'scroll',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: convertEditorText(Profile !== '' ? Profile : '자기소개가 없습니다.'),
                        }}
                      />
                    </div>
                  </Box>
                </div>
              </div>
            </AlignBox>

            <ContentCard
              title={mlMessage('pages.UserMng.userInfo')}
              contents={[
                <div className={classes.detailsSectionLeft}>
                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.email')}>
                    {Email}
                  </FieldRow>
                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.employeeType')}>
                    {EmployeeTypeCode && R.filter(a => a.FullCode === EmployeeTypeCode, allCodes.EMPTYPE)[0].CodeName}
                  </FieldRow>
                  <FieldRow width="15%" rowTitle={mlMessage('user.profile.name.phone')}>
                    {OfficeMobilePhoneNumber}
                  </FieldRow>
                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.OfficePhoneNumber')}>
                    {OfficePhoneNumber !== '' ? OfficePhoneNumber : '업무전화가 없습니다.'}
                  </FieldRow>

                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.address')}>
                    {ZipCode} <br />
                    {Address} <br />
                    {Address2}
                  </FieldRow>
                </div>,
                <div className={classes.detailsSectionRight}>
                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.group')}>
                    법무부
                  </FieldRow>
                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.workingStatus')}>
                    {WorkingStatusCode && R.filter(a => a.FullCode === WorkingStatusCode, allCodes.WORKST)[0].CodeName}
                  </FieldRow>
                  <FieldRow className="col-md-5" width="15%" rowTitle="청구비용">
                    {TimeCharge}￦ (
                    {TCShareLevelCode && R.filter(a => a.FullCode === TCShareLevelCode, allCodes.TCSRLVL)[0].CodeName})
                  </FieldRow>
                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.createDate')}>
                    {CreateDate}
                  </FieldRow>
                  <FieldRow width="15%" rowTitle={mlMessage('pages.common.auth')}>
                    {RoleCodeList.length === 0
                      ? '권한이 없습니다'
                      : RoleCodeList &&
                        RoleCodeList.map((role, index) => (
                          <div key={index}>{R.filter(a => a.RoleCode === role, common.roleList)[0].RoleNameKor}</div>
                        ))}
                  </FieldRow>
                </div>,
              ]}
            />
            <ContentCard
              title="활동 이력"
              contents={[
                <Box className="mb-3">
                  <div className="row mb-3">
                    <div className="col-md-8">
                      {LastName}
                      {FirstName}님이 사건을 생성했습니다("주주권 확인",3시간 전)
                    </div>

                    <div className="col-md-4">2019/03/04 15:30</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-8 ">
                      {LastName}
                      {FirstName}님이 사건을 생성했습니다("주주권 확인",3시간 전)
                    </div>

                    <div className="col-md-4">2019/03/04 15:30</div>
                  </div>
                </Box>,
              ]}
            />
          </div>
        </Paper>
      </>
    );
  }
}

const styles = theme => ({
  // 구성원 정보 정보 카드 섹션
  detailsSectionLeft: {
    width: '95%',
    height: '100%',
    position: 'relative',
    borderRight: '1px solid lightgray',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0',
    },
  },
  detailsSectionRight: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {},
  },
});

const mapStateToProps = ({ userMng, common }) => {
  return { userMng, common };
};

const mapDispatchToProps = {
  setReduxValues,
  updatePhotoURL,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserSearchDetail));
