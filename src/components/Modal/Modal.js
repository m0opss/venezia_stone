import React from 'react';
import { Modal } from 'antd';
import './Modal.scss';

const MyModal = props => {

  return (
    <>
      <Modal
        title={props.title}
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        okText={props.okText}
      >
        {props.children}
      </Modal>
    </>
  );
};
export default MyModal;
