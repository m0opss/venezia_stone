import React from 'react';

import Reaptcha from 'reaptcha';
import { Checkbox } from 'antd';
import './Login.scss';

const Login = props => {
  // React.useEffect(()=>{
  //   setIsReg(false)
  // })

  const [verified, setVerified] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const onVerify = () => {
    setVerified(true);
  };
  const onChangeCheckDog = e => {
    setChecked(e.target.checked);
  };
  const onValidate = () => {
    console.log(1);
  };

  const login_form = (
    <div className="login__form">
      <p className="form-title">Bxoд в личный кабинет</p>
      <input className="login__log" type="text" placeholder="Логин" />
      <input className="login__pass" type="text" placeholder="Пароль" />
      <div className="button -hovered" onClick={() => {}}>
        Войти
      </div>
      <p className="login__reset-pass" onClick={() => {}}>
        Забыли пароль?
      </p>
      <div
        className="button -hovered"
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
          <input className="reg__email" type="text" placeholder="E-mail *" />
          <input className="reg__phone" type="text" placeholder="Телефон" />
          <input className="reg__pass" type="text" placeholder="Пароль" />
        </div>
        <div className="input-form__block">
          <input className="reg__name" type="text" placeholder="Имя" />
          <input className="reg__lname" type="text" placeholder="Фамилия" />
          <input className="reg__mname" type="text" placeholder="Отчество" />
        </div>
      </div>
      <div className="reg__bottom">
        <div className="reg__captcha">
          <Reaptcha
            sitekey="6LfSI9UZAAAAAAPmnX1YdULNQ-FJhugsTyCdCWmi"
            onVerify={onVerify}
          />
        </div>
        <div className="reg_bottom-text">
          <p>* обязательные поля</p>
          <div className="reg__check-use-data">
            <Checkbox checked={checked} onChange={onChangeCheckDog} />
            <span className='check-text'>
              Согласие на обработку<br />
              персональных данных
            </span>
          </div>
        </div>
      </div>
      <div className="button -hovered" onClick={onValidate}>
        Зарегистрироваться
      </div>
    </div>
  );
  return props.isReg ? reg_form : login_form;
};
export default Login;
// 6LfSI9UZAAAAAAPmnX1YdULNQ-FJhugsTyCdCWmi
// 6LfSI9UZAAAAAFAPE3a-HlHktZ5ZBAU9ZKfstYeV secret
