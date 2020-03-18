import React, { Component } from 'react';
import { R, RU } from 'helpers/ramda';
import ImageCropper from 'components/ImageCropper';

const { imageURL_prefix } = RU;

class ImageCropperTest extends Component {
  state = {
    file: '',
  };

  handleFileAdd = e => {
    const newKey = e[0].key;
    const newImageURL = imageURL_prefix + newKey;
    this.setState({
      file: newImageURL,
    });
    console.log(this.state.file);
  };

  render() {
    const { file } = this.state;
    return (
      <div className="app-wrapper">
        <ImageCropper prevImg={file} handleFileAdd={target => this.handleFileAdd(target)} />
      </div>
    );
  }
}
export default ImageCropperTest;
