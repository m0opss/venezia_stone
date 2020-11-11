import React from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

import FullScreenDialog from 'components/FullScreenDialog/FullScreenDialog';
import CropperBook from 'components/Cropper/CropperBook';
import MyCropper from 'components/Cropper/MyCropper';
import DropdownSearch from 'components/Dropdown/DropdownSearch';

import vk from 'images/vk.svg';
import whatsapp from 'images/whatsapp.svg';
import viber from 'images/viber.svg';
import telegram from 'images/telegram.svg';
import mail from 'images/mail.svg';
import facebook from 'images/facebook.svg';
import pdf from 'images/pdf.svg';

import './OptionLine.scss';

const OptionLine = props => {
  const [isOpen, setOpen] = React.useState(false);
  const [isOpenBook, setOpenBook] = React.useState(false);
  const [dropVisible, setDropVisible] = React.useState(false);
  const openBook = () => {
    setOpenBook(true);
  };
  const openCrop = () => {
    setOpen(true);
  };

  const openDropdown = e => {
    setDropVisible(true);
  };
  const menu = (
    <div className="soc-drop">
      <Link className="soc-drop__item" to="/">
        <img src={mail} />
      </Link>
      <Link className="soc-drop__item" to="/">
        <img src={pdf} />
      </Link>
      <Link className="soc-drop__item" to="/">
        <img src={viber} />
      </Link>
      <Link className="soc-drop__item" to="/">
        <img src={vk} />
      </Link>
      <Link className="soc-drop__item" to="/">
        <img src={facebook} />
      </Link>
      <Link className="soc-drop__item" to="/">
        <img src={telegram} />
      </Link>
      <Link className="soc-drop__item" to="/">
        <img src={whatsapp} />
      </Link>
    </div>
  );
  return (
    <div
      className={`option-line ${isMobile ? 'option-line-mobile' : ''}`}
      style={props.style}
    >
      <FullScreenDialog open={isOpenBook} setVisible={setOpenBook}>
        <div className="dialog-wrapper">
          <CropperBook img={props.img} />
          <div
            className="dialog-wrapper__button"
            onClick={() => setOpenBook(false)}
          >
            Закрыть
          </div>
        </div>
      </FullScreenDialog>
      <FullScreenDialog open={isOpen} setVisible={setOpen}>
        <div className="dialog-wrapper">
          <MyCropper img={props.img} />
          <div
            className="dialog-wrapper__button"
            onClick={() => setOpen(false)}
          >
            Закрыть
          </div>
        </div>
      </FullScreenDialog>

      <div>
        <DropdownSearch
          visible={dropVisible}
          setVisible={setDropVisible}
          menuList={menu}
          placement="bottomRight"
        />
        <div className="option-line__item" onClick={openDropdown}>
          <svg
            width="24"
            height="23"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#BE9344"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M16.272 5.451c-.176-.45-.272-.939-.272-1.451 0-2.208 1.792-4 4-4s4 1.792 4 4-1.792 4-4 4c-1.339 0-2.525-.659-3.251-1.67l-7.131 3.751c.246.591.382 1.239.382 1.919 0 .681-.136 1.33-.384 1.922l7.131 3.751c.726-1.013 1.913-1.673 3.253-1.673 2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4c0-.51.096-.999.27-1.447l-7.129-3.751c-.9 1.326-2.419 2.198-4.141 2.198-2.76 0-5-2.24-5-5s2.24-5 5-5c1.723 0 3.243.873 4.143 2.201l7.129-3.75zm3.728 11.549c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm-15-9c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm15-7c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z" />
          </svg>
        </div>
      </div>

      {props.lamp ? (
        <div className="option-line__item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="25"
            fill="#BE9344"
            viewBox="0 0 26 25"
          >
            <path
              style={{ width: 26, height: 25 }}
              d="M22 8.51v1.372h-2.538c.02-.223.038-.448.038-.681 0-.237-.017-.464-.035-.69h2.535zm-10.648-6.553v-1.957h1.371v1.964c-.242-.022-.484-.035-.726-.035-.215 0-.43.01-.645.028zm5.521 1.544l1.57-1.743 1.019.918-1.603 1.777c-.25-.297-.593-.672-.986-.952zm-10.738.952l-1.603-1.777 1.019-.918 1.57 1.743c-.392.28-.736.655-.986.952zm-1.597 5.429h-2.538v-1.372h2.535c-.018.226-.035.454-.035.691 0 .233.018.458.038.681zm9.462 9.118h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm0 2h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm.25 2h-4.5l1.188.782c.154.138.38.218.615.218h.895c.234 0 .461-.08.615-.218l1.187-.782zm3.75-13.799c0 3.569-3.214 5.983-3.214 8.799h-1.989c-.003-1.858.87-3.389 1.721-4.867.761-1.325 1.482-2.577 1.482-3.932 0-2.592-2.075-3.772-4.003-3.772-1.925 0-3.997 1.18-3.997 3.772 0 1.355.721 2.607 1.482 3.932.851 1.478 1.725 3.009 1.72 4.867h-1.988c0-2.816-3.214-5.23-3.214-8.799 0-3.723 2.998-5.772 5.997-5.772 3.001 0 6.003 2.051 6.003 5.772z"
            />
          </svg>
        </div>
      ) : (
        <></>
      )}
      <div className="option-line__item" onClick={openBook}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="25"
          fill="#BE9344"
          viewBox="0 0 26 25"
        >
          <path
            style={{ width: 26, height: 25 }}
            d="M12 4.707c-2.938-1.83-7.416-2.567-12-2.707v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872-1.314 6.729-1.875 10.666-1.995v-17.714c-4.584.14-9.062.877-12 2.707zm-10 13.104v-13.704c5.157.389 7.527 1.463 9 2.334v13.168c-1.525-.546-4.716-1.505-9-1.798zm20 0c-4.283.293-7.475 1.252-9 1.799v-13.171c1.453-.861 3.83-1.942 9-2.332v13.704z"
          />
        </svg>
      </div>
      {props.fullscreen}
      <div className="option-line__item" onClick={openCrop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="25"
          fill="#BE9344"
          viewBox="0 0 26 25"
        >
          <path
            style={{ width: 26, height: 25 }}
            d="M24 18h-4v-14h-14v-4h-2v4h-4v2h4v14h14v4h2v-4h4v-2zm-18 0v-12h12v12h-12z"
          />
        </svg>
      </div>
    </div>
  );
};
export default OptionLine;
