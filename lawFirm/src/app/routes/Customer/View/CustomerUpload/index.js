import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import InputBox from 'components/InputBox';
import Box from 'components/BoxOld';
import { DialogBtnBox } from 'helpers/ui';
import GridTable, { GridRow } from 'components/GridTable';
import ExcelImportTable from 'components/ExcelImportTable';
import PostCode from 'components/PostCode';
import Dialog from '@material-ui/core/Dialog';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import ListDetailContainer from 'components/ListDetailContainer';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import PageTitle from 'components/PageTitle';
import { R, RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import produce from 'immer';
import { handleSaveDraftCustomerUpload } from 'app/routes/Customer/Redux/Action';

class CustomerUpload extends Component {
  state = {
    tableData: [],
    isOpenDetail: false,
    addressDialog: false,
    editIndex: -1,
    editData: {
      Company: '',
      Name: '',
      MobilePhoneNumber: '',
      Email: '',
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
    const { classes, handleCommonAlertConfirmSet, handleSaveDraftCustomerUpload } = this.props;
    const { isOpenDetail, tableData, editData, editIndex } = this.state;

    const TableComponent = (
      <ExcelImportTable
        multiKey={['Company', 'Name', 'Email', 'PhoneNumber', 'FaxNumber', 'ZipCode', 'Address', 'Address2']}
        tableRows={[
          { id: 'Company', numeric: false, disablePadding: true, label: '회사명', width: '12%' },
          { id: 'Name', numeric: false, disablePadding: true, label: '이름', width: '12%' },
          { id: 'MobilePhoneNumber', numeric: false, disablePadding: true, label: '핸드폰', width: '10%' },
          { id: 'Email', numeric: true, disablePadding: false, label: '이메일', width: '11%' },
          { id: 'PhoneNumber', numeric: true, disablePadding: true, label: '전화번호', width: '7%' },
          { id: 'FaxNumber', numeric: true, disablePadding: true, label: '팩스번호', width: '7%' },
          { id: 'ZipCode', numeric: true, disablePadding: false, label: '우편번호', align: 'left', width: '5%' },
          { id: 'Address', numeric: true, disablePadding: false, label: '기본 주소', align: 'left', width: '13%' },
          {
            id: 'Address2',
            numeric: true,
            disablePadding: false,
            label: '상세 주소',
            align: 'left',
            width: '13%',
          },
        ]}
        fieldColumn={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']}
        sheetName="SheetJS"
        fileName="individualTest.xlsx"
        sampleData={[
          [
            '휴맥스 아이티',
            '김철수',
            '010-8794-8579',
            'hong@test.com',
            '02-8579-8795',
            '02-8579-1231',
            '06249',
            '서울시 강남구 압구정동',
            '슈퍼아파트 12동 101호',
          ],
          [
            '개인',
            '이정훈',
            '010-6123-1382',
            'lee@test.com',
            '02-8716-0192',
            '02-8716-0193',
            '06123',
            '경기도 분당시 큰대로 22길',
            '대로빌리지 1205호',
          ],
          [
            '(주) LG유플러스',
            '김기훈',
            '010-2311-5132',
            'kim@test.com',
            '02-1235-0192',
            '02-1234-0193',
            '06012',
            '경기도 분당시 개울가로',
            '개울아파트 202동 505호',
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
          await handleSaveDraftCustomerUpload({
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
              value={editData.Company}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.Company = e.target.value;
                  }),
                )
              }
            />
          </GridRow>
          <GridRow title="이름" redStar>
            <InputBox
              placeholder="이름"
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
          <GridRow title="핸드폰" redStar>
            <InputBox
              placeholder="010-0000-0000"
              value={editData.MobilePhoneNumber}
              onChange={e =>
                this.setState(
                  produce(this.state, draft => {
                    draft.editData.MobilePhoneNumber = e.target.value;
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
          <GridRow title="전화번호">
            <InputBox
              placeholder="전화번호"
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
          <GridRow title="팩스번호">
            <InputBox
              placeholder="팩스번호"
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
            await handleSaveDraftCustomerUpload({
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
          <PageTitle icon="class">고객 일괄 업로드</PageTitle>
        </Box>
        <div className={classes.content}>
          <ListDetailContainer
            TableComponent={TableComponent}
            DetailComponent={DetailComponent}
            DetailComponentTitle="고객수정"
            DetailComponentBtn={DetailComponentBtn}
            isOpenDetail={isOpenDetail}
            handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
            flexBasis="26%"
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
  handleSaveDraftCustomerUpload,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CustomerUpload));
