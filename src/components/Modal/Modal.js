import React, { useEffect } from 'react';
import { Modal } from 'antd';
import './Modal.scss';

const MyModal = props => {
  // const [visible, setVisible] = React.useState(false);
  // useEffect(() => {
  //   setVisible(props.visible);
  // });

  return (
    <>
      <Modal
        className={props.buttonVision ? '' : `info-modal`}
        visible={props.visible}
        title={props.title}
        onOk={props.onOk}
        onCancel={props.onCancel}
      >
        {props.children}
      </Modal>
    </>
  );
};
export default MyModal;
