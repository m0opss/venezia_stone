import React from 'react';

import Reaptcha from 'reaptcha';
import { Checkbox } from 'antd';
import validator from 'validator';

import './Login.scss';

const Login = props => {
  const [verified, setVerified] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const [inputValues, setInputValues] = React.useState({
    l_login: '',
    l_pass: '',
    r_email: '',
    r_phone: '',
    r_pass: '',
    r_fname: '',
    r_lname: '',
    r_mname: '',
    r_pass: ''
  });

  const [labelValues, setLabelValues] = React.useState({
    l_login: '',
    l_pass: '',
    r_email: '',
    r_phone: '',
    r_pass: '',
    r_fname: '',
    r_lname: '',
    r_mname: '',
    r_pass: ''
  });

  const onVerifyCaptca = () => {
    setVerified(true);
  };

  const onChangeCheckDog = e => {
    setChecked(e.target.checked);
  };

  const onResetLabels = () => {
    setLabelValues({
      l_login: '',
      l_pass: '',
      r_email: '',
      r_phone: '',
      r_pass: '',
      r_fname: '',
      r_lname: '',
      r_mname: '',
      r_pass: ''
    });
  };

  const onLogValidate = () => {
    let flag = true;
    if (!validator.isEmail(inputValues.l_login, ['ru-RU'])) {
      setLabelValues({ ...labelValues, l_login: 'uncorrect!!' });
      flag = false;
    }
    if (!validator.isLength(inputValues.l_pass, { min: 6, max: undefined })) {
      setLabelValues({ ...labelValues, l_pass: 'uncorrect!!' });
      flag = false;
    }
    if (!flag) {
      console.log('NOT Validated!');
    } else {
      console.log(' Validated!');
      onResetLabels();
    }
  };

  const onRegValidate = () => {
    let flag = true;
    // if (verified && checked) {
    if (!checked) {
      console.log('NOT checked!');
      return;
    }

    if (!validator.isEmail(inputValues.r_email, ['ru-RU'])) {
      setLabelValues({ ...labelValues, r_email: 'uncorrect!!' });
      flag = false;
    }
    if (!validator.isMobilePhone(inputValues.r_phone, 'any', 'strictMode')) {
      setLabelValues({ ...labelValues, r_phone: 'uncorrect!!' });
      flag = false;
    }
    if (!validator.isLength(inputValues.r_pass, { min: 6, max: undefined })) {
      setLabelValues({ ...labelValues, r_pass: 'uncorrect!!' });
      flag = false;
    }
    if (
      !validator.isAlpha(inputValues.r_fname, ['ru-RU']) &&
      !validator.isAlpha(inputValues.r_fname, ['en-US'])
    ) {
      setLabelValues({ ...labelValues, r_fname: 'uncorrect!!' });
      flag = false;
    }
    if (
      !validator.isAlpha(inputValues.r_lname, ['ru-RU']) &&
      !validator.isAlpha(inputValues.r_lname, ['en-US'])
    ) {
      setLabelValues({ ...labelValues, r_lname: 'uncorrect!!' });
      flag = false;
    }
    if (
      !validator.isAlpha(inputValues.r_mname, ['ru-RU']) &&
      !validator.isAlpha(inputValues.r_mname, ['en-US'])
    ) {
      setLabelValues({ ...labelValues, r_mname: 'uncorrect!!' });
      flag = false;
    }

    if (!flag) {
      console.log('NOT Validated!');
    } else {
      console.log('Validated!');
      onResetLabels();
    }
  };

  const login_form = (
    <div className="login__form">
      <p className="form-title">Bxoд в личный кабинет</p>
      <label htmlFor="">{labelValues.l_login}</label>
      <input
        className="login__log"
        type="text"
        defaultValue={inputValues.l_login}
        onChange={ e =>
          setInputValues({ ...inputValues, l_login: e.target.value })
        }
        placeholder="Логин"
      />
      <label htmlFor="">{labelValues.l_pass}</label>
      <input
        className="login__pass"
        type="password"
        defaultValue={inputValues.l_pass}
        onChange={ e =>
          setInputValues({ ...inputValues, l_pass: e.target.value })
        }
        placeholder="Пароль"
      />
      <div className="button -hovered" onClick={onLogValidate}>
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

  const reg_form = (
    <div className="reg__form">
      <p className="form-title">Регистрация</p>
      <div className="input-form">
        <div className="input-form__block">
          <label htmlFor="">{labelValues.r_email}</label>
          <input
            className="reg__email"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_email: e.target.value })
            }
            defaultValue={inputValues.r_email}
            placeholder="E-mail *"
          />
          <label htmlFor="">{labelValues.r_phone}</label>
          <input
            className="reg__phone"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_phone: e.target.value })
            }
            defaultValue={inputValues.r_phone}
            placeholder="Телефон"
          />
          <label htmlFor="">{labelValues.r_pass}</label>
          <input
            className="reg__pass"
            type="password"
            onChange={e =>
              setInputValues({ ...inputValues, r_pass: e.target.value })
            }
            defaultValue={inputValues.r_pass}
            placeholder="Пароль"
          />
        </div>
        <div className="input-form__block">
          <label htmlFor="">{labelValues.r_fname}</label>
          <input
            className="reg__fname"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_fname: e.target.value })
            }
            defaultValue={inputValues.r_fname}
            placeholder="Имя"
          />
          <label htmlFor="">{labelValues.r_lname}</label>
          <input
            className="reg__lname"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_lname: e.target.value })
            }
            defaultValue={inputValues.r_lname}
            placeholder="Фамилия"
          />
          <label htmlFor="">{labelValues.r_mname}</label>
          <input
            className="reg__mname"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_mname: e.target.value })
            }
            defaultValue={inputValues.r_mname}
            placeholder="Отчество"
          />
        </div>
      </div>
      <div className="reg__bottom">
        <div className="reg__captcha">
          <Reaptcha
            sitekey="6LfSI9UZAAAAAAPmnX1YdULNQ-FJhugsTyCdCWmi"
            onVerify={onVerifyCaptca}
          />
        </div>
        <div className="reg_bottom-text">
          <p>* обязательные поля</p>
          <div className="reg__check-use-data">
            <Checkbox checked={checked} onChange={onChangeCheckDog} />
            <span className="check-text">
              Согласие на обработку
              <br />
              персональных данных
            </span>
          </div>
        </div>
      </div>
      <div className="button -hovered unselectable" onClick={onRegValidate}>
        Зарегистрироваться
      </div>
    </div>
  );
  return props.isReg ? reg_form : login_form;
};

export default Login;
// 6LfSI9UZAAAAAAPmnX1YdULNQ-FJhugsTyCdCWmi
// 6LfSI9UZAAAAAFAPE3a-HlHktZ5ZBAU9ZKfstYeV secret
