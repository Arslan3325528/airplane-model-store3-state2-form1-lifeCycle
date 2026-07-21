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
      <h2 className={css.titleRegistrationIdentification}>Шановний користувач,</h2>
      <h2 className={css.titleRegistrationIdentification}>для здійснення покупок</h2>
      <h2 className={css.titleRegistrationIdentification}>вам необхідно:</h2>
      <h2 className={`${css.titleRegistrationIdentification} ${css.titleRegistration}`}><u>пройти реєстрацію</u></h2>
      <h2 className={css.titleRegistrationIdentification}>або</h2>
      <h2 className={`${css.titleRegistrationIdentification} ${css.titleIdentification}`}><u>увійти до свого акаунту</u></h2>
      <div className={css.registrationIdentificationButtonBox}>
        
        <button
          className={`${css.buttonRegistrationIdentification} ${css.buttonRegistration}`}
            // className={css.buttonRegistration}
          type="button"
          // onClick={() => console.log('Клік в "Registration"')}
          onClick={onClose}
          // onClick={(event) => onClose(event.currentTarget.textContent)}
        >
          Registration
        </button>

        <button
          className={`${css.buttonRegistrationIdentification} ${css.buttonLogin}`}
          type="button"
          // onClick={() => console.log('Клік в "Login"')}
          onClick={onClose}
          // onClick={(event) => onClose(event.currentTarget.textContent)}
        >
          Login
        </button>
      
        <button
          className={`${css.buttonRegistrationIdentification} ${css.buttonCancel}`}
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>
    </div>
  )
};
