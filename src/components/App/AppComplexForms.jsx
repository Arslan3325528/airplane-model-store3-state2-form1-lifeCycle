// console.log(
//   "%c 4.4.3.Складні форми",
//   "color: white; background-color: #D33F49",
// );

import React, { Component } from "react";
import css from "./AppComplexForms.module.css";


export class AppComplexForms extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    console.log(login, password);
    this.props.onSubmit({ login, password });
    form.reset();
  };

  render() {
    return (
      <form
        className={css.loginForm}
        onSubmit={this.handleSubmit}
      >
        <label
          className={css.loginFormLabel}
          htmlFor="username"
        >
          Логін:
        </label>
        <input
          className={css.loginFormInput}
          type="text"
          name="login"
          id="username"
        />

        <label
          className={css.loginFormLabel}
          htmlFor="pwd"
        >
          Пароль:
        </label>
        <input
          className={css.loginFormInput}
          type="password"
          name="password"
          id="pwd"
        />

        <button
          className={css.loginButton}
          type="submit">Login
        </button>
      </form>
    );
  }
};
