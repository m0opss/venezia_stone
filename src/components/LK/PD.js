import React, { useEffect } from 'react';

import edit from 'images/edit.png';
import cedit from 'images/cancel-edit.png';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile,
  isBrowser
} from 'react-device-detect';

import axios from 'axios';

const PersonalData = props => {
  const [ronly, set_ronly] = React.useState(true);
  const [canceled, setCanceled] = React.useState(false);

  const [pd_lname, set_pd_lname] = React.useState('');
  const [pd_fname, set_pd_fname] = React.useState('');
  const [pd_mname, set_pd_mname] = React.useState('');
  const [pd_email, set_pd_email] = React.useState('');
  const [pd_phone, set_pd_phone] = React.useState('');

  const setDefaultVal = () => {
    set_pd_lname(props.user_info.last_name);
    set_pd_fname(props.user_info.first_name);
    set_pd_mname(props.user_info.middle_name);
    set_pd_email(props.user_info.email);
    set_pd_phone(props.user_info.phone);
  };

  useEffect(() => {
    setDefaultVal();
  }, [canceled]);

  const onClickSave = () => {

    axios
      .post(`https://catalog-veneziastone.ru/account/change_profile/`, {
        token: props.token,
        last_name: pd_lname,
        first_name: pd_fname,
        middle_name: pd_mname,
        phone: pd_phone,
        email: pd_email
      })
      .then(res => {
        props.setUserInfo({
          last_name: pd_lname,
          first_name: pd_fname,
          middle_name: pd_mname,
          phone: pd_phone,
          email: pd_email
        });
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log(1, err.response);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log(2, err.request);
        } else {
          // anything else
          console.log(3, err);
        }
      });
  };

  const onClickCancel = () => {
    setCanceled(!canceled);
    set_pd_lname(props.user_info.last_name);
    setDefaultVal();
    set_ronly(true);
  };
  const onClickEdit = () => {
    set_ronly(false);
  };

  return (
    <div className="lk__personal-data">
      {isBrowser ? (
        <>
          <div className="lk__pd-line">
            {ronly ? (
              <input
                type="text"
                className="-readonly"
                placeholder="Фамилия"
                value={pd_lname}
                readOnly
              />
            ) : (
              <input
                type="text"
                placeholder="Фамилия"
                defaultValue={pd_lname}
                onChange={e => set_pd_lname(e.target.value)}
              />
            )}
          </div>
          <div className="lk__pd-line">
            {ronly ? (
              <input
                type="text"
                className="-readonly"
                placeholder="Имя"
                value={pd_fname}
                readOnly
              />
            ) : (
              <input
                type="text"
                placeholder="Имя"
                defaultValue={pd_fname}
                onChange={e => set_pd_fname(e.target.value)}
              />
            )}
          </div>
          <div className="lk__pd-line">
            {ronly ? (
              <input
                type="text"
                className="-readonly"
                placeholder="Отчество"
                value={pd_mname}
                readOnly
              />
            ) : (
              <input
                type="text"
                placeholder="Отчество"
                defaultValue={pd_mname}
                onChange={e => set_pd_mname(e.target.value)}
              />
            )}
          </div>
          <div className="lk__pd-line">
            {ronly ? (
              <input
                type="text"
                className="-readonly"
                placeholder="Телефон"
                value={pd_phone}
                readOnly
              />
            ) : (
              <input
                type="text"
                placeholder="Телефон"
                value={pd_phone}
                onChange={e => set_pd_phone(e.target.value)}
              />
            )}
          </div>
          <div className="lk__pd-line">
            <input
              type="text"
              className="-readonly"
              value={pd_email}
              readOnly
            />
          </div>
        </>
      ) : (
        <>
          <div className="lk__pd-line">
            <input
              type="text"
              placeholder="Фамилия"
              onChange={e => set_pd_lname(e.target.value)}
              value={pd_lname}
            />
          </div>
          <div className="lk__pd-line">
            <input
              type="text"
              placeholder="Имя"
              onChange={e => set_pd_fname(e.target.value)}
              value={pd_fname}
            />
          </div>
          <div className="lk__pd-line">
            <input
              type="text"
              placeholder="Отчество"
              onChange={e => set_pd_mname(e.target.value)}
              value={pd_mname}
            />
          </div>
          <div className="lk__pd-line">
            <input
              type="text"
              placeholder="Телефон"
              onChange={e => set_pd_phone(e.target.value)}
              value={pd_phone}
            />
          </div>
          <div className="lk__pd-line">
            <input
              type="text"
              className="-readonly"
              defaultValue={pd_email}
              readOnly
            />
          </div>
        </>
      )}

      {isBrowser ? (
        <div className="lk__pd-edit-buttons">
          <div
            className="lk__pd-edit-button -bordered -hovered"
            onClick={onClickSave}
          >
            Сохранить
          </div>
          <div className="lk__pd-edit-button" onClick={onClickEdit}>
            <img src={edit} />
          </div>
          <div className="lk__pd-edit-button" onClick={onClickCancel}>
            <img src={cedit} />
          </div>
        </div>
      ) : (
        <div className="lk__pd-edit-buttons">
          <div
            className="lk__pd-edit-button -bordered -hovered"
            onClick={onClickSave}
          >
            Сохранить
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalData;
