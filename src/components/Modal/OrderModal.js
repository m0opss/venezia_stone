import React, { useEffect } from 'react';
import MyModal from 'components/Modal/Modal';
import axios from 'axios';
import { connect } from 'react-redux';
import validator from 'validator';

const OrderModal = props => {
  const [name, setName] = React.useState(
    localStorage.getItem('first_name') !== null
      ? localStorage.getItem('first_name')
      : ''
  );
  const [phone, setPhone] = React.useState(
    localStorage.getItem('phone') !== null ? localStorage.getItem('phone') : ''
  );
  const [phoneLabel, setPhoneLabel] = React.useState('');

  const [email, setEmail] = React.useState(
    localStorage.getItem('email') !== null ? localStorage.getItem('email') : ''
  );
  const [emailLabel, setEmailLabel] = React.useState('');

  const [visibleOkorder, setVisibleOkOrder] = React.useState(false);
  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangePhone = e => {
    setPhone(e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const validationFields = () => {
    let flag = true;
    setPhoneLabel('');
    setEmailLabel('');
    if (!validator.isMobilePhone(phone, 'any', ['strictMode'])) {
      setPhoneLabel('Неверный формат номера');
      flag = false;
    }
    if (!validator.isEmail(email)) {
      setEmailLabel('Неверный формат email');
      flag = false;
    }
    if(flag){
      setPhoneLabel('');
      setEmailLabel('');
    }
    return flag;
  };

  const fetchOrder = () => {
    let goods = props.goods;
    let arr = {};

    if (!Array.isArray(goods)) {
      if (goods.itms_izd == 'Слэбы') {
        arr[goods.ps] = '';
      } else {
        arr[goods.ps] = goods.S;
      }
    } else {
      goods.map(i => {
        if (i.itms_izd == 'Слэбы') {
          arr[i.ps] = '';
        } else {
          arr[i.ps] = i.S;
        }
      });
    }
    console.log(123)
    console.log(validationFields())
    if (validationFields()) {
      axios
        .post('https://catalog-veneziastone.ru/account/order/', {
          email: email,
          products: arr
        })
        .then(res => {
          setVisibleOkOrder(true);
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
    }
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
          <label className="reg_label" htmlFor="">{phoneLabel}</label>
          <input
            type="text"
            placeholder="Телефон"
            value={phone}
            onChange={onChangePhone}
          />
          <label className="reg_label" htmlFor="">{emailLabel}</label>
          <input
            type="text"
            placeholder="Email*"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
      </MyModal>
      <MyModal
        title="Спасибо за заказ!"
        onCancel={() => setVisibleOkOrder(false)}
        visible={visibleOkorder}
        buttonVision={false}
      >
        <div className="">
          {name}, Ваш заказ оформлен. В ближайшее время с вами свяжется
          менеджер. Спасибо что выбрали нас!
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
