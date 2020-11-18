import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import BackArrow from 'components/BackArrow/BackArrow';
import { ToastContainer, toast } from 'react-toastify';

const ResetPass = props => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [rpass, setRpass] = React.useState('');
  const [stage, setStage] = React.useState('');
  const [token, setToken] = React.useState('');
  const [uid, setUid] = React.useState('');

  const succStageEmail = 'Письмо отправлено вам на почту.';
  const succStagePhone =
    'Код активации отправлен. Он действителен в течении 1 мин.';
  const succStagePass = 'Пароль успешно изменен';

  const notify = text =>
    toast.success(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined
    });

  useEffect(() => {
    const url = props.location.pathname.split('/');
    if (url.length == 7) {
      setStage('sendPass');
      setUid(url[url.length - 2]);
      setToken(url[url.length - 1]);
    } else if (url.length == 4) {
      setStage('sendEmail');
    }
  }, []);

  const onClickSave = () => {
    console.log('reset');
    if (stage == 'sendPass') {
      axios
        .post(
          'https://catalog-veneziastone.ru/account/djoser/users/reset_password_confirm/',
          {
            uid: uid,
            new_password: pass,
            re_new_password: rpass,
            token: token
          }
        )
        .then(res => {
          notify(succStagePass);
          return <Redirect to="/" />;
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            console.log(1, err.response.data.error);
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(2, err.request);
          } else {
            // anything else
            console.log(3, err);
          }
        });
    } else if (stage == 'sendEmail') {
      axios
        .post(
          'https://catalog-veneziastone.ru/account/djoser/users/reset_password/',
          {
            email: email
          }
        )
        .then(res => {
          notify(succStageEmail);
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
    }
  };

  if (stage == 'sendPass') {
    return (
      <div className="lk-container">
        <BackArrow history={props.history} />
        <h1 style={{ marginTop: '50px' }}>Восстановление пароля</h1>
        <div className="lk__personal-data" style={{ marginTop: '70px' }}>
          <div className="lk__pd-line">
            <input
              type="password"
              placeholder="Пароль"
              defaultValue={pass}
              onChange={e => {
                setPass(e.target.value);
              }}
            />
          </div>
          <div className="lk__pd-line">
            <input
              type="password"
              placeholder="Пароль еще раз"
              defaultValue={rpass}
              onChange={e => {
                setRpass(e.target.value);
              }}
            />
          </div>

          <div
            className="button button-text busket_button -hovered"
            onClick={onClickSave}
            style={{ margin: 20, marginTop: '50px', width: '200px' }}
          >
            Отправить
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </div>
    );
  } else if (stage == 'sendEmail') {
    return (
      <div className="lk-container">
        <BackArrow history={props.history} />
        <h1 style={{ marginTop: '50px' }}>Восстановление пароля</h1>
        <div className="lk__personal-data reset-pass" style={{ marginTop: '70px' }}>
          <div className="lk__pd-line">
            <input
              type="text"
              placeholder="Email"
              defaultValue={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="centered">
            <div
              className="button button-text busket_button -hovered "
              onClick={onClickSave}
              // style={{ margin: 20, marginTop: '50px', width: '200px' }}
            >
              Отправить
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default ResetPass;
