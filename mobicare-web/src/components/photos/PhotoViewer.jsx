import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import '../../assets/styles/photos/photo-viewer.css'

function PhotoViewer({
  photo, index, showModal, clickClose, clickNext, clickPrev
}) {
  return (
    <Modal
      visible={showModal}
      footer={null}
      centered={true}
      onCancel={clickClose}
    >
      {
        clickPrev &&
        <div className="pre" onClick={() => clickPrev(index)}>
          <i class="material-icons" >
            arrow_back_ios
          </i>
        </div>
      }
      <img src={photo.imageURL} alt={photo.imageURL} />
      {
        clickNext &&
        <div className="next" onClick={() => clickNext(index)}>
          <i class="material-icons">
            arrow_forward_ios
          </i>
        </div>
      }
      
    </Modal>
  )
}

PhotoViewer.propTypes = {
  showModal: PropTypes.bool.isRequired,
  photo: PropTypes.object.isRequired,
  clickClose: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

PhotoViewer.defaultProps = {
  clickNext: null,
  clickPrev: null
};

export default PhotoViewer;


