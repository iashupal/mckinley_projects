import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import produce from 'immer';
import { R } from 'helpers/ramda';

const DocLink = ({ link, title }) => {
  return (
    <div style={{ fontWeight: 'bold' }}>
      <a href={`/manuals/${link}`} target="_blank">
        {title}
      </a>
    </div>
  );
};

class ManualDialog extends Component {
  state = {
    dialogOpen: false,
    manualData: [
      {
        groupName: '공통',
        open: true,
        data: [
          { link: '신규계정추가.pdf', name: '신규 계정 추가' },
          { link: '기본UI매뉴얼.pdf', name: '기본 UI 메뉴얼' },
          { link: '로그인및세션정책.pdf', name: '로그인 및 세션정책' },
          { link: '메일이력관리.pdf', name: '메일 이력 관리' },
          { link: '사용자관리.pdf', name: '사용자 관리' },
          { link: '통합검색.pdf', name: '통합 검색' },
        ],
      },
      {
        groupName: '계약검토',
        open: false,
        data: [
          { link: '계약검토_도움말.pdf', name: '계약 검토 도움말' },
          { link: '계약검토_프로세스.pdf', name: '계약 검토 프로세스' },
          { link: '체결계약서_도움말.pdf', name: '체결 계약서 도움말' },
        ],
      },
    ],
  };

  render() {
    const { dark, main, light, contrastText } = this.props.theme.palette.primary;
    return (
      <>
        <Button
          onClick={e => {
            this.setState({ dialogOpen: true });
          }}
        >
          <i className="material-icons " style={{ color: 'white' }}>
            help
          </i>
        </Button>
        <Dialog
          open={this.state.dialogOpen}
          fullWidth
          maxWidth="xs"
          style={{ width: '300' }}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
        >
          <DialogTitle style={{ backgroundColor: dark }}>
            <span style={{ color: contrastText }}>Manual</span>
          </DialogTitle>
          <DialogContent>
            <br />
            <List dense>
              {this.state.manualData.map((group, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    onClick={() => {
                      const { groupName } = group;
                      this.setState(
                        produce(this.state, draft => {
                          draft.manualData = R.map(a => {
                            if (a.groupName === groupName) {
                              return { ...a, open: !a.open };
                            }
                            return a;
                          }, this.state.manualData);
                        }),
                      );
                    }}
                  >
                    <ListItemIcon>
                      <i className="zmdi zmdi-folder zmdi-hc-fw zmdi-hc-lg" />
                    </ListItemIcon>
                    <ListItemText inset primary={group.groupName} />
                    {group.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={group.open} timeout="auto" unmountOnExit>
                    <List disablePadding dense>
                      {group.data.map((item, index2) => (
                        <ListItem button key={index2}>
                          <ListItemText inset primary={<DocLink link={item.link} title={item.name} />} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
            <br />
            <div style={{ textAlign: 'right', fontSize: '12px' }}>업데이트 : 2019-01-29</div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTheme(ManualDialog);
