// import React, { Component } from "react";
import css from "./RegistrationIdentification.module.css";


//? Підняття стану
//! Звичайний компонент
export function RegistrationIdentification({
  onClose, //! відкриття/закриття модального вікна
}) {
  // console.log("onClose:", onClose);
  return (
    <div className={css.registrationIdentificationBox}>
      <div className={css.registrationIdentificationButtonBox}>
        <button
          className={css.buttonRegistration}
          type="button"
          // onClick={() => console.log('Клік в "Registration"')}
          onClick={onClose}
        >
          Registration
        </button>
        {/* <button
          className={css.buttonIdentification}
          type="button"
          onClick={() => console.log('Клік в "Identification"')}
        >
          Identification
        </button> */}
      </div>
    </div>
  )
};
