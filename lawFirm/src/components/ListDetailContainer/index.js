import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Dialog from 'components/Dialog';
import ContentCard from 'components/ContentCard';
import PropTypes from 'prop-types';

class ListDetailContainer extends Component {
  render() {
    const {
      TableComponent,
      DetailComponent,
      DetailComponentTitle,
      DetailComponentTitleButton,
      DetailComponentBtn,
      DetailComponentWidth,
      isOpenDetail,
      handleDialogClose,
      appDialogMode,
      dialogBoxMaxWidth,
      dialogfullWidth,
      flexBasis,
    } = this.props;

    const isAutoMode = appDialogMode === 'auto';
    const width = window.innerWidth;
    const baseWidth = 1600; // 임의값.
    const isAuto_PopupMode = isAutoMode && width < baseWidth;
    const isAuto_DefaultMode = isAutoMode && width >= baseWidth;

    const isPopupMode = appDialogMode === 'popup' || isAuto_PopupMode;
    const isDefaultMode = appDialogMode === 'default' || isAuto_DefaultMode;

    const DetailComponent2 = (
      <ContentCard
        noMargin
        title={DetailComponentTitle}
        actionButton={DetailComponentTitleButton}
        contents={[
          <div>
            {DetailComponent}
            <div style={{ height: '10px' }}>&nbsp;</div>
            <div style={{ textAlign: 'center', paddingTop: '10px' }}>{DetailComponentBtn}</div>
          </div>,
        ]}
      />
    );

    const detailStyle = { padding: '10px', flexGrow: 1, flexBasis: flexBasis !== null ? flexBasis : 'auto' };
    if (DetailComponentWidth) detailStyle.width = DetailComponentWidth;

    return (
      <Fragment>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ padding: '10px 0px', flexGrow: 2 }}>{TableComponent}</div>
          {isDefaultMode && isOpenDetail && <div style={detailStyle}>{DetailComponent2}</div>}
        </div>
        <Dialog
          open={isPopupMode && isOpenDetail}
          // fullWidth  maxWidth="xs" style={{ width: '300' }}
          maxWidth={dialogBoxMaxWidth || 'sm'}
          onClose={handleDialogClose}
          fullWidth={dialogfullWidth}
        >
          {DetailComponentWidth ? (
            <div style={{ width: DetailComponentWidth }}>{DetailComponent2}</div>
          ) : (
            DetailComponent2
          )}
        </Dialog>
      </Fragment>
    );
  }
}

ListDetailContainer.propTypes = {
  TableComponent: PropTypes.element, // Main Table 영역 Componnet
  DetailComponent: PropTypes.element, // 상세 내용 Component
  DetailComponentTitle: PropTypes.string, // 상세 상단 제목
  DetailComponentBtn: PropTypes.element, // 상세 하단의 버튼영역
  DetailComponentWidth: PropTypes.string, // 상세 영역 width
  isOpenDetail: PropTypes.bool, // 상세 (오른쪽 or 하단 or 팝업) Open 여부
  handleDialogClose: PropTypes.func, // 상세 Close Handler

  // appDialogMode, // 내부 사용자별 옵션 사용
  // dialogBoxMaxWidth, // ?
  // dialogfullWidth, // ?
  // flexBasis, // ?
};

ListDetailContainer.defaultProps = {
  TableComponent: null,
  DetailComponent: null,
  DetailComponentTitle: '',
  DetailComponentBtn: null,
  DetailComponentWidth: '',
  isOpenDetail: false,
  handleDialogClose: () => {},
};

const mapStateToProps = ({ settings }) => {
  const { appDialogMode } = settings;
  return { appDialogMode };
};

export default connect(
  mapStateToProps,
  {},
)(ListDetailContainer);
