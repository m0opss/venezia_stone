import React from 'react';

import axios from 'axios';
import validator from 'validator';

const Login = props => {
  const [inputValues, setInputValues] = React.useState({
    l_email: '',
    l_pass: ''
  });

  const [lab_email, setLabelValues_l_email] = React.useState('');
  const [lab_pass, setLabelValues_l_pass] = React.useState('');

  const onResetLabels = () => {
    setLabelValues_l_email('');
    setLabelValues_l_pass('');
  };

  const onLogValidate = () => {
    let flag = true;
    if (!validator.isEmail(inputValues.l_email, { require_tld: false })) {
      flag = false;
      setLabelValues_l_email('Поле email пустое или имеет неверный формат');
    } else {
      setLabelValues_l_email('');
    }
    if (!validator.isLength(inputValues.l_pass, { min: 6, max: undefined })) {
      flag = false;
      setLabelValues_l_pass('Пароль не менее 5 символов');
    } else {
      setLabelValues_l_pass('');
    }

    if (flag) {
      onResetLabels();
    }
    return flag;
  };

  const onPushLog = () => {
    console.log('log')
    if (onLogValidate()) {
      axios
        .post('https://catalog-veneziastone.ru/account/login/', {
          email: inputValues.l_email,
          password: inputValues.l_pass
        })
        .then(response => {
          localStorage.setItem('auth_token', response.data.key)
          props.setVisible(false);
          props.setAuth(true);
          props.setToken(response.data.key);
          
          axios
          .post('https://catalog-veneziastone.ru/account/get_user_info/', {
            token: response.data.key
          })
          .then(res=> {
            console.log(123, res.data)
            props.setUserInfo(res.data)
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
        })
        .catch(err => {
          if (err.response) {
            console.log(1, err.response);
            if (err.response.data.hasOwnProperty('non_field_errors')) {
              setLabelValues_l_email(err.response.data.non_field_errors[0]);
            }
            if (err.response.data.hasOwnProperty('email')) {
              setLabelValues_l_email(err.response.data.email[0]);
            }
          } else if (err.request) {
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
    }
  };

  return (
    <div className="login__form">
      <p className="form-title">Bxoд в личный кабинет</p>
      <label htmlFor="">{lab_email}</label>
      <input
        className="login__log"
        type="text"
        defaultValue={inputValues.l_email}
        onChange={e =>
          setInputValues({ ...inputValues, l_email: e.target.value })
        }
        placeholder="Логин"
      />
      <label htmlFor="">{lab_pass}</label>
      <input
        className="login__pass"
        type="password"
        defaultValue={inputValues.l_pass}
        onChange={e =>
          setInputValues({ ...inputValues, l_pass: e.target.value })
        }
        placeholder="Пароль"
      />
      <div className="button -hovered" onClick={onPushLog}>
        Войти
      </div>
      <p className="login__reset-pass" onClick={() => {}}>
        Забыли пароль?
      </p>
      <div
        className="button -hovered unselectable"
        onClick={() => {
          props.setIsReg(true);
        }}
      >
        Зарегистрироваться
      </div>
    </div>
  );
};
export default Login;
