import React, { useEffect } from 'react';
import MyModal from 'components/Modal/Modal';
import axios from 'axios';
import { connect } from 'react-redux';

const OrderModal = props => {
  const [name, setName] = React.useState(
    localStorage.getItem('first_name') !== null
      ? localStorage.getItem('first_name')
      : ''
  );
  const [phone, setPhone] = React.useState(
    localStorage.getItem('phone') !== null ? localStorage.getItem('phone') : ''
  );
  const [email, setEmail] = React.useState(
    localStorage.getItem('email') !== null ? localStorage.getItem('email') : ''
  );

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangePhone = e => {
    setPhone(e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const fetchOrder = () => {
    let goods = props.goods;
    let arr = {};

    if (!Array.isArray(goods)) arr = [goods.ps];
    else {
      goods.map(i => {
        if (i.itms_izd == 'Слэбы') arr[i.ps] = '';
        else {
          arr[i.ps] = i.S;
        }
      });
    }
    console.log(goods);
    console.log(arr);
    axios
      .post('https://catalog-veneziastone.ru/account/order/', {
        email: email,
        products: arr
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log(1, err.response);
          // props.setAuth(false);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log(2, err.request);
        } else {
          // anything else
          console.log(3, err);
        }
      });
    props.setVisible(false);
  };

  return (
    <>
      <MyModal
        title="Оформить заказ"
        okText="Оформить заказ"
        onOk={fetchOrder}
        onCancel={props.onCancel}
        visible={props.visible}
        buttonVision={true}
      >
        <div className="order-inputs">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={onChangeName}
          />
          <input
            type="text"
            placeholder="Телефон"
            value={phone}
            onChange={onChangePhone}
          />
          <input
            type="text"
            placeholder="Email*"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
      </MyModal>
    </>
  );
};
const mapStateToProps = store => {
  return {
    auth_token: store.auth_data.auth_token
  };
};

export default connect(mapStateToProps)(OrderModal);
