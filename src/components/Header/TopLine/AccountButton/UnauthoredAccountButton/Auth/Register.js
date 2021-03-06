import React from 'react';

import axios from 'axios';

import Reaptcha from 'reaptcha';
import { Checkbox } from 'antd';
import validator from 'validator';
import pdf_file from 'images/1.pdf';

const Register = props => {
  const [verified, setVerified] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  let hoveredStyle = '';

  const [inputValues, setInputValues] = React.useState({
    r_email: '',
    r_phone: '',
    r_pass: '',
    r_fname: '',
    r_lname: '',
    r_mname: ''
  });

  const [labelValues_r_email, setLabelValues_r_email] = React.useState('');
  const [labelValues_r_phone, setLabelValues_r_phone] = React.useState('');
  const [labelValues_r_pass, setLabelValues_r_pass] = React.useState('');
  const [labelValues_r_fname, setLabelValues_r_fname] = React.useState('');
  const [labelValues_r_lname, setLabelValues_r_lname] = React.useState('');
  const [labelValues_r_mname, setLabelValues_r_mname] = React.useState('');

  const onVerifyCaptca = () => {
    setVerified(true);
  };

  const onChangeCheckDog = e => {
    setChecked(e.target.checked);
  };

  const onResetLabels = () => {
    setLabelValues_r_email('');
    setLabelValues_r_phone('');
    setLabelValues_r_pass('');
    setLabelValues_r_fname('');
    setLabelValues_r_lname('');
    setLabelValues_r_mname('');
  };

  const onRegValidate = () => {
    let flag = true;
    // if (!verified && !checked) {
    if (!checked) {
      console.log('NOT checked!');
      return;
    }

    if (!validator.isEmail(inputValues.r_email)) {
      setLabelValues_r_email('Неверный формат email');
      flag = false;
    } else {
      setLabelValues_r_email('');
    }
    if (inputValues.r_phone > 0) {
      if (
        !validator.isMobilePhone(inputValues.r_phone, 'any', ['strictMode'])
        || (inputValues.r_phone[0] == "8" && inputValues.r_phone.length == 11)
      ) {
        setLabelValues_r_phone('Неверный формат номера. Номер должен начинаться с +7');
        flag = false;
      } else {
        setLabelValues_r_phone('');
      }
    }
    if (!validator.isLength(inputValues.r_pass, { min: 6, max: undefined })) {
      setLabelValues_r_pass('Пароль не менее 5 символов');
      flag = false;
    } else {
      setLabelValues_r_pass('');
    }
    if (inputValues.r_fname > 0) {
      if (
        !validator.isAlpha(inputValues.r_fname, ['ru-RU']) &&
        !validator.isAlpha(inputValues.r_fname, ['en-US'])
      ) {
        setLabelValues_r_fname('Неверный формат имени');
        flag = false;
      } else {
        setLabelValues_r_fname('');
      }
    }
    if (inputValues.r_lname > 0) {
      if (
        !validator.isAlpha(inputValues.r_lname, ['ru-RU']) &&
        !validator.isAlpha(inputValues.r_lname, ['en-US'])
      ) {
        setLabelValues_r_lname('Неверный формат имени');
        flag = false;
      } else {
        setLabelValues_r_lname('');
      }
    }
    if (inputValues.r_mname > 0) {
      if (
        !validator.isAlpha(inputValues.r_mname, ['ru-RU']) &&
        !validator.isAlpha(inputValues.r_mname, ['en-US'])
      ) {
        setLabelValues_r_mname('Неверный формат имени');
        flag = false;
      } else {
        setLabelValues_r_mname('');
      }
    }
    if (flag) {
      onResetLabels();
    }
    return flag;
  };

  const onPushReg = () => {
    console.log('reg');
    if (onRegValidate()) {
      axios
        .post('https://catalog-veneziastone.ru/account/djoser/users/', {
          email: inputValues.r_email,
          phone: inputValues.r_phone,
          first_name: inputValues.r_fname,
          middle_name: inputValues.r_mname,
          last_name: inputValues.r_lname,
          password: inputValues.r_pass
        })
        .then(response => {
          console.log(response.data);
          props.setVisible(false);
          document.getElementsByClassName('reg_label')[0].style.height = '0px';
          document.getElementsByClassName('reg_label')[1].style.height = '0px';
          document.getElementsByClassName('reg_label')[2].style.height = '0px';
          document.getElementsByClassName('reg_label')[3].style.height = '0px';
          document.getElementsByClassName('reg_label')[4].style.height = '0px';
          document.getElementsByClassName('reg_label')[5].style.height = '0px';
        })
        .catch(err => {
          if (err.response) {
            document.getElementsByClassName('reg_label')[0].style.height =
              '20px';
            document.getElementsByClassName('reg_label')[1].style.height =
              '20px';
            document.getElementsByClassName('reg_label')[2].style.height =
              '20px';
            document.getElementsByClassName('reg_label')[3].style.height =
              '20px';
            document.getElementsByClassName('reg_label')[4].style.height =
              '20px';
            document.getElementsByClassName('reg_label')[5].style.height =
              '20px';
            if (err.response.data.hasOwnProperty('email')) {
              if (
                err.response.data.email[0] ==
                'user with this Email address already exists.'
              ) {
                setLabelValues_r_email(
                  'Пользователь с таким почтовым ящиком уже существует.'
                );
              } else {
                setLabelValues_r_email(err.response.data.email[0]);
              }
            } else if (err.response.data.hasOwnProperty('password')) {
              if (
                err.response.data.password[0] ==
                'This password is too short. It must contain at least 8 characters.'
              ) {
                setLabelValues_r_pass(
                  'Пароль должен быть длиной минимум 8 символов.'
                );
              } else if (
                err.response.data.password[0] == 'This password is too common.'
              ) {
                setLabelValues_r_pass(
                  'Введённый пароль слишком распространён.'
                );
              } else if (
                err.response.data.password[0] ==
                'This password is entirely numeric.'
              ) {
                setLabelValues_r_pass(
                  'Пароль состоит только из цифр, необходимо добавить буквы.'
                );
              } else {
                setLabelValues_r_pass(err.response.data.password[0]);
              }
            } else if (err.response.data.hasOwnProperty('error')) {
              if (err.response.data.error.hasOwnProperty('email')) {
                setLabelValues_r_email(err.response.data.error.email[0]);
              }
              if (err.response.data.error.hasOwnProperty('phone')) {
                if (
                  err.response.data.email[0] ==
                  'The phone number entered is not valid.'
                ) {
                  setLabelValues_r_email(
                    'Введённый телефонный номер не корректен (+7)'
                  );
                } else {
                  setLabelValues_r_phone(err.response.data.error.phone[0]);
                }
              }
            } else if (err.response.data.hasOwnProperty('phone')) {
              if (
                err.response.data.phone[0] ==
                'The phone number entered is not valid.'
              ) {
                setLabelValues_r_phone(
                  'Введённый телефонный номер не корректен (+7)'
                );
              } else {
                setLabelValues_r_phone(err.response.data.phone[0]);
              }
            } else {
              setLabelValues_r_phone(err.response.data[0]);
            }

            console.log(1, err.response);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
    }
  };
  if (checked) hoveredStyle = '-hovered';
  // if (verified && checked) hoveredStyle = '-hovered'

  return (
    <div className="reg__form">
      <p className="form-title">Регистрация</p>
      <div className="input-form">
        <div className="input-form__block">
          <label className="reg_label" htmlFor="">
            {labelValues_r_email}
          </label>
          <input
            className="reg__email"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_email: e.target.value })
            }
            defaultValue={inputValues.r_email}
            placeholder="E-mail *"
          />
          <label className="reg_label" htmlFor="">
            {labelValues_r_phone}
          </label>
          <input
            className="reg__phone"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_phone: e.target.value })
            }
            defaultValue={inputValues.r_phone}
            placeholder="Телефон"
          />
          <label className="reg_label" htmlFor="">
            {labelValues_r_pass}
          </label>
          <input
            className="reg__pass"
            type="password"
            onChange={e =>
              setInputValues({ ...inputValues, r_pass: e.target.value })
            }
            defaultValue={inputValues.r_pass}
            placeholder="Пароль *"
          />
        </div>
        <div className="input-form__block">
          <label className="reg_label" htmlFor="">
            {labelValues_r_fname}
          </label>
          <input
            className="reg__fname"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_fname: e.target.value })
            }
            defaultValue={inputValues.r_fname}
            placeholder="Имя"
          />
          <label className="reg_label" htmlFor="">
            {labelValues_r_lname}
          </label>
          <input
            className="reg__lname"
            type="text"
            onChange={e =>
              setInputValues({ ...inputValues, r_lname: e.target.value })
            }
            defaultValue={inputValues.r_lname}
            placeholder="Фамилия"
          />
          <label className="reg_label" htmlFor="">
            {labelValues_r_mname}
          </label>
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
        {/* <Reaptcha
          // size="compact"
          className="g-recaptcha"
          sitekey="6Ld92NYZAAAAAGxOdWjx7wQ-CbTfhJDqmtRMY9on"
          onVerify={onVerifyCaptca}
        /> */}
        <div className="reg_bottom-text">
          <p>* обязательные поля</p>
          <div className="reg__check-use-data">
            <Checkbox checked={checked} onChange={onChangeCheckDog} />
            <a className="check-text" href={pdf_file} open target="_blank">
              Согласие на обработку
              <br />
              персональных данных
            </a>
          </div>
        </div>
      </div>
      <div
        className={`button ${hoveredStyle} unselectable`}
        onClick={onPushReg}
      >
        Зарегистрироваться
      </div>
    </div>
  );
};

export default Register;
// 6Ld92NYZAAAAAGxOdWjx7wQ-CbTfhJDqmtRMY9on
// 6Ld92NYZAAAAAKELvIbIOCmxEGAb3ffLurCncDEw secret
