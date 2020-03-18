import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import axios from 'axios';
import { urlMaster, getAjaxData } from 'helpers/ajax';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import Box from 'components/BoxOld';
import Divider from '@material-ui/core/Divider';
import { R, RU } from 'helpers/ramda';
import classnames from 'classnames';
import DialogInfoForm from 'components/DialogInfoForm';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogBtnBox } from 'helpers/ui';

const { checkUploadFileExt, imageURL_prefix } = RU;

class ImageCropper extends Component {
  state = {
    isOpen: false,
    croppedImage: '',
    selectedImg: '',
    originalImage: '',
    fileName: '',
  };

  constructor(props) {
    super(props);
    this.cropRef = React.createRef();
  }

  setFileURL = a => {
    this.setState({
      originalImage: URL.createObjectURL(a[0]),
    });
  };

  urltoFile = (url, filename, mimeType) => {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    return fetch(url)
      .then(function(res) {
        return res.arrayBuffer();
      })
      .then(function(buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  cropImage = async () => {
    const { croppedImage, selectedImg, fileName } = this.state;
    const { handleFileAdd, authUser } = this.props;
    if (typeof this.cropRef.current.getCroppedCanvas() === 'undefined') {
      return;
    }

    // selectedImg 필요시 주석 제거
    const temp = this.cropRef.current.getCroppedCanvas().toDataURL();

    this.setState({
      selectedImg: temp,
    });

    const file = await this.urltoFile(croppedImage, fileName);

    const formData = new FormData();

    formData.append('ACL', 'public-read');
    formData.append('file', file);

    if (authUser !== null) {
      formData.append('LFID', authUser.MyLFID);

      const res = await axios.post(`${urlMaster}/ext/file`, formData);
      const result = getAjaxData(res);
      handleFileAdd(result);
    } else {
      handleFileAdd(formData);
    }
  };

  _crop() {
    // const { croppedImage } = this.state;
    const temp = this.cropRef.current.getCroppedCanvas().toDataURL();
    this.setState({
      croppedImage: temp,
    });
  }

  render() {
    const { croppedImage, selectedImg, originalImage } = this.state;
    const { prevImg, width } = this.props;
    const applyWidth = width || 200;
    let dropzoneRef;
    return (
      <>
        <DialogInfoForm
          open={this.state.isOpen}
          title="사진 등록"
          actions={
            <>
              <ButtonN
                color="primary"
                type="large"
                label="저장"
                onClick={e => {
                  this.cropImage();
                  this.setState({
                    isOpen: false,
                    originalImage: '',
                    croppedImage: '',
                  });
                }}
              />
              <ButtonN
                color="inverted"
                type="large"
                label="취소"
                onClick={e => {
                  this.setState({
                    isOpen: false,
                    originalImage: '',
                    croppedImage: '',
                  });
                }}
              />
            </>
          }
        >
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
              <ButtonN
                color="primary"
                size="small"
                label="파일선택"
                onClick={e => {
                  dropzoneRef.open();
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
              {originalImage && (
                <>
                  <Cropper
                    //  ref="cropper"
                    ref={this.cropRef}
                    src={originalImage}
                    style={{ height: 200, width: 200 }}
                    aspectRatio={1 / 1}
                    guides={false}
                    crop={this._crop.bind(this)}
                    checkCrossOrigin={false}
                  />
                  <img
                    //  crossOrigin="anonymous"
                    alt="croppedImage"
                    src={croppedImage || './assets/images/Meet Talk_20190802_110919.jpg'}
                    style={{ width: 200, height: 200, border: '2px solid lightgray' }}
                  />
                </>
              )}
              {!originalImage && (
                <img
                  src={prevImg || './assets/images/profile.png'}
                  alt="img"
                  style={{ width: 200, height: 200, border: '2px solid lightgray' }}
                />
              )}
            </div>
            <Dropzone
              accept="image/*"
              ref={node => {
                dropzoneRef = node;
              }}
              onDrop={async (accepted, rejected) => {
                if (accepted) {
                  let fileName = '';
                  R.map(file => {
                    const fileExt = R.pipe(
                      R.split('.'),
                      R.last,
                    )(file.name);
                    fileName = file.name;

                    return null;
                  })(accepted);

                  this.setState({
                    fileName,
                  });
                  this.setFileURL(accepted);
                }
              }}
              style={{ display: 'none' }}
            />
          </>
        </DialogInfoForm>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            // crossOrigin="anonymous"
            alt="croppedImage"
            src={selectedImg || prevImg || './assets/images/profile.png'}
            style={{ width: applyWidth, height: applyWidth, border: '2px solid lightgray' }}
          />
          <br />
          <ButtonN
            color="primary"
            label="사진 등록"
            onClick={e => {
              this.setState({
                isOpen: true,
              });
            }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageCropper);
