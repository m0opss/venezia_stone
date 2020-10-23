import React from 'react';

import edit from 'images/edit.png';
import cedit from 'images/cancel-edit.png';
import {
  MobileView,
  BrowserView,
  isTablet,
  isMobile
} from 'react-device-detect';

const PersonalData = props => {
  const [ronly, set_ronly] = React.useState(true);

  const [pd_lname, set_pd_lname] = React.useState(props.user_info.last_name);
  const [pd_fname, set_pd_fname] = React.useState(props.user_info.first_name);
  const [pd_mname, set_pd_mname] = React.useState(props.user_info.middle_name);
  const [pd_email, set_pd_email] = React.useState(props.user_info.email);
  const [pd_phone, set_pd_phone] = React.useState(props.user_info.phone);

  const setDefaultVal = () => {
    set_pd_lname(props.user_info.last_name);
    set_pd_fname(props.user_info.first_name);
    set_pd_mname(props.user_info.middle_name);
    set_pd_email(props.user_info.email);
    set_pd_phone(props.user_info.phone);
  };
  const onClickSave = () => {};

  const onClickCancel = () => {
    set_ronly(true);
    setDefaultVal();
  };
  const onClickEdit = () => {
    set_ronly(false);
  };

  return (
    <div className="lk__personal-data">
      <BrowserView>
        <div className="lk__pd-line">
          {ronly ? (
            <input
              type="text"
              className="-readonly"
              placeholder="Введите фамилию"
              defaultValue={pd_lname}
              readOnly
            />
          ) : (
            <input
              type="text"
              placeholder="Введите фамилию"
              defaultValue={pd_lname}
            />
          )}
        </div>
        <div className="lk__pd-line">
          {ronly ? (
            <input
              type="text"
              className="-readonly"
              placeholder="Введите имя"
              defaultValue={pd_fname}
              readOnly
            />
          ) : (
            <input
              type="text"
              placeholder="Введите имя"
              defaultValue={pd_fname}
            />
          )}
        </div>
        <div className="lk__pd-line">
          {ronly ? (
            <input
              type="text"
              className="-readonly"
              placeholder="Введите отчество"
              defaultValue={pd_mname}
              readOnly
            />
          ) : (
            <input
              type="text"
              placeholder="Введите отчество"
              defaultValue={pd_mname}
            />
          )}
        </div>
        <div className="lk__pd-line">
          {ronly ? (
            <input
              type="text"
              className="-readonly"
              placeholder="Введите телефон"
              defaultValue={pd_phone}
              readOnly
            />
          ) : (
            <input
              type="text"
              placeholder="Введите телефон"
              defaultValue={pd_phone}
            />
          )}
        </div>
        <div className="lk__pd-line">
          <input
            type="text"
            className="-readonly"
            defaultValue={pd_email}
            readOnly
          />
        </div>
      </BrowserView>

      <MobileView>
        <div className="lk__pd-line">
          <input
            type="text"
            placeholder="Введите фамилию"
            defaultValue={pd_lname}
          />
        </div>
        <div className="lk__pd-line">
          <input
            type="text"
            placeholder="Введите имя"
            defaultValue={pd_fname}
          />
        </div>
        <div className="lk__pd-line">
          <input
            type="text"
            placeholder="Введите отчество"
            defaultValue={pd_mname}
          />
        </div>
        <div className="lk__pd-line">
          <input
            type="text"
            placeholder="Введите телефон"
            defaultValue={pd_phone}
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
      </MobileView>

      <BrowserView>
        <div className="lk__pd-edit-buttons" onClick={onClickSave}>
          <div className="lk__pd-edit-button -bordered -hovered">Сохранить</div>
          <div className="lk__pd-edit-button" onClick={onClickEdit}>
            <img src={edit} />
          </div>
          <div className="lk__pd-edit-button" onClick={onClickCancel}>
            <img src={cedit} />
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="lk__pd-edit-buttons" onClick={onClickSave}>
          <div className="lk__pd-edit-button -bordered -hovered">Сохранить</div>
        </div>
      </MobileView>
    </div>
  );
};

export default PersonalData;
