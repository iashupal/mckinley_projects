import React, { Component } from 'react';
import { withStyles, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import InputBox from 'components/InputBox';
import PostCode from 'components/PostCode';
import GridTable, { GridRow } from 'components/GridTable';
import ExcelImportTable from 'components/ExcelImportTable';
import Dialog from '@material-ui/core/Dialog';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import ListDetailContainer from 'components/ListDetailContainer';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import Box from 'components/BoxOld';
import { DialogBtnBox } from 'helpers/ui';
import PageTitle from 'components/PageTitle';
import { NotificationManager } from 'react-notifications';
import { R, RU } from 'helpers/ramda';
import produce from 'immer';
import { handleSaveDraftCompanyUpload } from 'app/routes/Customer/Redux/Action';

class CompanyUpload extends Component {
  state = {
    tableData: [],
    isOpenDetail: false,
    addressDialog: false,
    editIndex: -1,
    editData: {
      Name: '',
      RepresentativeName: '',
      Email: '',
      CorRegNumber: '',
      PhoneNumber: '',
      FaxNumber: '',
      ZipCode: '',
      Address: '',
      Address2: '',
      resultMsg: '',
    },
  };

  addressDialog = () => {
    this.setState({
      addressDialog: !this.state.addressDialog,
    });
  };

  handleAddress = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    this.setState(
      produce(this.state, draft => {
        draft.editData.ZipCode = data.zonecode;
        draft.editData.Address = fullAddress;
      }),
    );

    this.addressDialog();
  };

  handleTableData = (nowData, type, isSuccess) => {
    let resultData = [];

    const temp = nowData[0];

    if (type === 'one') {
      if (isSuccess === true) {
        this.setState(
          produce(this.state, draft => {
            draft.tableData.splice(this.state.editIndex, 1);
          }),
        );
      } else {
        this.setState(
          produce(this.state, draft => {
            draft.tableData[this.state.editIndex] = temp;
          }),
        );
      }
    }
    if (type === 'total') {
      resultData = nowData;

      this.setState({
        ...this.state,
        tableData: resultData,
      });
    }
  };

  render() {
    const { classes, handleCommonAlertConfirmSet, handleSaveDraftCompanyUpload } = this.props;
    const { isOpenDetail, tableData, editData, editIndex } = this.state;

    const TableComponent = (
      <ExcelImportTable
        multiKey={[
          'Name',
          'RepresentativeName',
          'Email',
          'CorRegNumber',
          'PhoneNumber',
          'FaxNumber',
          'ZipCode',
          'Address',
          'Address2',
        ]}
        tableRows={[
          { id: 'Name', numeric: false, disablePadding: false, label: '회사명', width: '12%' },
          { id: 'RepresentativeName', numeric: false, disablePadding: false, label: '대표명', width: '9%' },
          { id: 'Email', numeric: false, disablePadding: false, label: '이메일', width: '14%' },
          { id: 'CorRegNumber', numeric: true, disablePadding: false, label: '사업자 번호', width: '7%' },
          { id: 'PhoneNumber', numeric: false, disablePadding: false, label: '대표 전화', width: '7%' },
          { id: 'FaxNumber', numeric: true, disablePadding: false, label: '대표 팩스', width: '7%' },
          { id: 'ZipCode', numeric: true, disablePadding: false, label: '우편번호', width: '5%' },
          { id: 'Address', numeric: true, disablePadding: false, label: '기본 주소', align: 'left', width: '15%' },
          {
            id: 'Address2',
            numeric: true,
            disablePadding: false,
            label: '상세 주소',
            align: 'left',
            width: '15%',
          },
        ]}
        fieldColumn={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']}
        sheetName="SheetJS"
        fileName="companyTest.xlsx"
        sampleData={[
          [
            '(주) LG유플러스',
            '전병기',
            'humaxit@humaxit.com',
            '651-87-01360',
            '031-7765-6112',
            '031-7765-6113',
            '13595',
            '경기도 성남시 분당구 황새울로 216',
            '휴맥스빌리지',
          ],
          [
            '(주) 내담씨앤씨',
            '홍길동',
            'hong@test.com',
            '167-87-87954',
            '031-8571-0182',
            '031-8571-0185',
            '17592',
            '서울시 강남구 태헤란로 22길',
            '휴빌리지',
          ],
        ]}
        tableData={tableData}
        handleClickEdit={async (rows, index) => {
          await this.setState(
            produce(this.state, draft => {
              draft.isOpenDetail = true;
              draft.editIndex = index;
              draft.editData = rows;
            }),
          );
        }}
        handleSave={async () => {
          await handleSaveDraftCompanyUpload({
            totalData: tableData,
            handleTableData: this.handleTableData,
            type: 'total',
          });
        }}
        handleImport={e => {
          this.setState({ ...this.state, tableData: [...tableData, ...e] });
        }}
        handleRemove={index => {
          this.setState(
            produce(this.state, draft => {
              draft.tableData.splice(index, 1);
            }),
          );
        }}
        handleClear={e => {
          this.setState({ ...this.state, tableData: [] });
        }}
      />
    );

    const DetailComponent = (
      <>
        <h3 className="text-danger mb-3">{editData.resultMsg === undefined ? '' : editData.resultMsg}</h3>
        <GridTable colWidth1="30%" colWidth2="70%">
          <GridRow title="회사명" redStar>
            <InputBox
              placeholder="회사명"
              value={editData.Name}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.Name = e.target.value;
                  }),
                )
              }
            />
          </GridRow>
          <GridRow title="대표명" redStar>
            <InputBox
              placeholder="대표명"
              value={editData.RepresentativeName}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.RepresentativeName = e.target.value;
                  }),
                )
              }
            />
          </GridRow>
          <GridRow title="이메일" redStar>
            <InputBox
              placeholder="example@example.com"
              value={editData.Email}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.Email = e.target.value;
                  }),
                )
              }
            />
          </GridRow>
          <GridRow title="사업자 번호" redStar>
            <InputBox
              placeholder="XXX-XX-XXXX"
              value={editData.CorRegNumber}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.CorRegNumber = e.target.value;
                  }),
                )
              }
            />
          </GridRow>
          <GridRow title="대표전화" redStar>
            <InputBox
              placeholder="대표전화"
              value={editData.PhoneNumber}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.PhoneNumber = e.target.value;
                  }),
                )
              }
            />
          </GridRow>
          <GridRow title="대표팩스">
            <InputBox
              placeholder="대표팩스"
              value={editData.FaxNumber}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.FaxNumber = e.target.value;
                  }),
                )
              }
            />
          </GridRow>
          <GridRow title="주소" redStar>
            <div>
              <AlignBox>
                <InputBox placeholder="우편번호" disabled maxLength={10} width="50%" value={editData.ZipCode} />
                <ButtonN color="primary" label="주소찾기" onClick={e => this.addressDialog()} />
              </AlignBox>
              <br />
              <InputBox placeholder="주소" disabled maxLength={255} width="100%" value={editData.Address} />
              <br />
              <InputBox
                placeholder="상세주소"
                maxLength={256}
                width="100%"
                value={editData.Address2}
                onChange={e =>
                  this.setState(
                    produce(this.state, draft => {
                      draft.editData.Address2 = e.target.value;
                    }),
                  )
                }
              />
            </div>
          </GridRow>
        </GridTable>
      </>
    );

    const DetailComponentBtn = (
      <>
        <Button
          size="large"
          color="primary"
          onClick={async () => {
            await this.setState(
              produce(this.state, draft => {
                draft.isOpenDetail = false;
              }),
            );
            await handleSaveDraftCompanyUpload({
              totalData: [this.state.editData],
              handleTableData: this.handleTableData,
              type: 'one',
            });
          }}
        >
          <Box pl={5} pr={5}>
            업로드
          </Box>
        </Button>
        <Button color="inverted" size="large" onClick={() => this.setState({ ...this.state, isOpenDetail: false })}>
          <Box pl={5} pr={5}>
            닫기
          </Box>
        </Button>
      </>
    );

    return (
      <div className={classes.container}>
        <Box
          mb={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <PageTitle icon="class">단체/회사 일괄 업로드</PageTitle>
        </Box>
        <div className={classes.content}>
          <ListDetailContainer
            TableComponent={TableComponent}
            DetailComponent={DetailComponent}
            DetailComponentTitle="단체/회사 수정"
            DetailComponentBtn={DetailComponentBtn}
            isOpenDetail={isOpenDetail}
            handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
            flexBasis="24%"
          />
        </div>
        <Dialog open={this.state.addressDialog} onClose={e => this.addressDialog()} fullWidth disableBackdropClick>
          <DialogContent>
            <PostCode autoClose handleAddress={this.handleAddress} />
          </DialogContent>
          <DialogBtnBox>
            <Button
              color="inverted"
              size="large"
              mode="regular"
              onClick={e => {
                this.addressDialog();
              }}
            >
              <Box pl={5} pr={5}>
                취소
              </Box>
            </Button>
          </DialogBtnBox>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  handleCommonAlertConfirmSet,
  handleSaveDraftCompanyUpload,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CompanyUpload));
