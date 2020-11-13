import React, { useEffect } from 'react';
import MyModal from 'components/Modal/Modal';

const OrderModal = props => {
  return (
    <>
      <MyModal
        title="Оформить заказ"
        okText="Оформить заказ"
        onOk={props.onOk}
        onCancel={props.onCancel}
        visible={props.visible}
        buttonVision={true}
      >
        <div className="order-inputs">
          <input
            type="text"
            placeholder="Имя"
            defaultValue={
              localStorage.getItem('first_name') !== null
                ? localStorage.getItem('first_name')
                : ''
            }
          />
          <input
            type="text"
            placeholder="Телефон"
            defaultValue={
              localStorage.getItem('phone') !== null
                ? localStorage.getItem('phone')
                : ''
            }
          />
          <input
            type="text"
            placeholder="Email*"
            defaultValue={
              localStorage.getItem('email') !== null
                ? localStorage.getItem('email')
                : ''
            }
          />
        </div>
      </MyModal>
    </>
  );
};
export default OrderModal;
