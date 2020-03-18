import React, { Component } from 'react';
import { Modal, Button } from 'antd';

export default class ImgFailed extends Component {
    render() {
        const { lng } = this.props;
        return (
            <Modal visible={true} footer={false} closable={false}>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    {lng === 'kr' ? '인터넷 속도가 느려지고 캔버스를로드 할 수 없습니다! 언젠가 다시 시도하십시오.' : 'Unable to load canvas due to slow internet! Please retry after sometime.'}
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
                    <Button style={{ backgroundColor: 'transparent' }} onClick={() => { window.location.href = '../../' }}>
                        {lng === 'kr' ? '확인' : 'OK'}
                    </Button>
                </div>
            </Modal>
        )
    }
}