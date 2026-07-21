import React, { Component } from 'react';
import { createPortal } from 'react-dom';  //! для модального вікна
import css from "./ModalRegistrationIdentification.module.css";

const modalRoot = document.querySelector('#modal-root');  //! для модального вікна


export class ModalRegistrationIdentification extends Component {
  componentDidMount() {
    // console.log('1️⃣❗️❗️.Modal componentDidMount');
    //* ✅ Для закриття модаки клавішею ESC - так БУДЕ працювати з StrictMode!!!
    window.addEventListener('keydown', this.handleKeyDownESC);
  };

  
  componentDidUpdate(prevProps, prevState) {
    // console.log("2️⃣❗️❗️.Modal componentDidUpdate");
  };


  componentWillUnmount() {
    // console.log('3️⃣❗️❗️.Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDownESC);
  };


  //! Для закриття модаки клавішею ESC 
  handleKeyDownESC = event => {
    // console.log("event.code:", event.code); //!
    if (event.code === 'Escape') {
      // console.log("Натиснули ❌ESC, потрібно закрити модалку");
      this.props.onClose();
    };
  };


  //! Для закриття модаки по кліку в Backdrop
  handleBackdropClick = event => {
    // console.log('Клікнули в Backdrop');

    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    };
  };


  render() {
    // console.log("0️⃣❗️❗️.Modal render");
    return createPortal(  
      <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
        <div className={css.modalContent} >{this.props.children}</div>
      </div>,
      modalRoot,
    );
  };
};
