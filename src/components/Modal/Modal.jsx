//! 3. Модальне вікно(componentDidMount та componentWillUnmount)
   //! 3.1.Проблема z - index, як вирішувати без милиць(портали)
   //! 3.2.Слухач на keydown для Escape
   //! 3.3.Слухач на клік по Backdrop

import React, { Component } from 'react';
import { createPortal } from 'react-dom';  //! для модального вікна
import css from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');  //! для модального вікна


export class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    
    // window.addEventListener('keydown', event => {
    //     console.log("event.code:", event.code);
    //     if (event.code === 'Escape') {
    //       console.log("Натиснули ❌ESC, потрібно закрити модалку");
    //       this.props.onClose();
    //     };
    //   }
    // );
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    // window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log("Натиснули ❌ESC, потрібно закрити модалку");

      this.props.onClose();
    }
  };

  // handleBackdropClick = event => {
  //   // console.log('Кликнули в бекдроп');

  //   // console.log('currentTarget: ', event.currentTarget);
  //   // console.log('target: ', event.target);

  //   if (event.currentTarget === event.target) {
  //     this.props.onClose();
  //   }
  // };

  render() {
    //! Без createPortal
    // return (  
    //   <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
    //     <div className={css.modalContent} >{this.props.children}</div>
    //   </div>
    // );
    //* Для модального вікна з createPortal
    return createPortal(  
      <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
        <div className={css.modalContent} >{this.props.children}</div>
      </div>,
      modalRoot,
    );
  };
};
