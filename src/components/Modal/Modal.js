import React from 'react';
import { Modal } from 'antd';
import './Modal.scss';

const MyModal = props => {
  let content = <div className="">asdasas</div>;

  return (
    <>
      <Modal
        title={props.title}
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        okText={props.okText}
      >
        {props.content}
      </Modal>
    </>
  );
};
export default MyModal;
