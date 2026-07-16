// import React, { Component } from "react";
import css from "./RegistrationIdentification.module.css";


//? Підняття стану
//! Звичайний компонент
export function RegistrationIdentification({
  onClose, //! відкриття/закриття модального вікна
  activeUser, //! 🗣 активний (авторизований) користувач
  onSignOut, //! завершення сеансу облікового запису
}) {
  // console.log("onClose:", onClose);
  // const signOut = () => {
  //   console.log("signOut");
  // };


  return (
    <div className={css.registrationIdentificationBox}>
      {activeUser && <h2 className={css.buttonRegistration}>Вітаю вас, {activeUser.userName}</h2>}
      <div className={css.registrationIdentificationButtonBox}>
        {activeUser && <button
          className={css.buttonRegistration}
          type="button"
          onClick={onSignOut}
        >
          SignOut
        </button>
        }

        {!activeUser && <button
          className={css.buttonRegistration}
          type="button"
          // onClick={() => console.log('Клік в "Registration"')}
          onClick={onClose}
        >
          Registration
        </button>
        }

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
