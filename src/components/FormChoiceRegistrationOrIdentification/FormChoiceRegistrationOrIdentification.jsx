// import React, { Component } from "react";
import css from "./FormChoiceRegistrationOrIdentification.module.css";


//? Підняття стану
//! Звичайний компонент
export function FormChoiceRegistrationOrIdentification({
  onClose, //! відкриття/закриття модального вікна
  // activeUser, //! 🗣 активний (авторизований) користувач
  // onSignOut, //! завершення сеансу облікового запису
}) {
  // console.log("onClose:", onClose);
  // const signOut = () => {
  //   console.log("signOut");
  // };


  return (
    <div className={css.registrationIdentificationBox}>
      <h2 className={css.buttonRegistration}>Пройдіть реєстрацію або увійдіть у свій акаунт</h2>
      <div className={css.registrationIdentificationButtonBox}>
        

          <button
            className={css.buttonRegistration}
            type="button"
            // onClick={() => console.log('Клік в "Registration"')}
            onClick={onClose}
            // onClick={(event) => onClose(event.currentTarget.textContent)}
          >
            Registration
          </button>

          <button
            className={css.buttonIdentification}
            type="button"
            // onClick={() => console.log('Клік в "Identification"')}
            onClick={onClose}
            // onClick={(event) => onClose(event.currentTarget.textContent)}
          >
            Identification
          </button>
        
          <button
              className={css.loginButton}
              type="button"
              onClick={onClose}
            >
                Cancel
          </button>

      </div>
    </div>
  )
};
