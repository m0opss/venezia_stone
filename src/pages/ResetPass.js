import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import BackArrow from 'components/BackArrow/BackArrow';

import './LK.scss';

const ResetPass = props => {
  const [pass, setPass] = React.useState('');
  const [rpass, setRpass] = React.useState('');

  useEffect(() => {}, []);

  const onClickSave = () => {
    console.log('reset');
    axios
      .post('https://catalog-veneziastone.ru/account/djoser/users/reset_password/', {
        token: response.data.key
      })
      .then(res => {
        console.log(123, res.data);
        props.setUserInfo(res.data);
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
  };

  if (!props.isAuth) {
    return (
      <div className="lk-container">
        <BackArrow history={props.history} />
        <h1 style={{ marginTop: '50px' }}>Восстановление пароля</h1>
        <div className="lk__personal-data" style={{ marginTop: '70px' }}>
          <div className="lk__pd-line">
            <input type="password" placeholder="Пароль" defaultValue={pass} />
          </div>
          <div className="lk__pd-line">
            <input
              type="password"
              placeholder="Пароль еще раз"
              defaultValue={rpass}
            />
          </div>

          <div
            className="button button-text busket_button -hovered"
            onClick={onClickSave}
            style={{ margin: 20, marginTop: '50px', width: '200px' }}
          >
            Сохранить
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default ResetPass;
