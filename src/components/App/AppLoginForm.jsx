import React, { Component } from "react";
import css from "./AppLoginForm.module.css"; 


export class AppLoginForm extends Component {
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
        <label htmlFor="username">Логін:</label>
        <input type="text" name="login" id="username" />

        <label htmlFor="pwd">Пароль:</label>
        <input type="password" name="password" id="pwd" />

        <button
          className={css.loginButton}
          type="submit">Login
        </button>
      </form>
    );
  }
}

// ReactDOM.render(
//   <AppLoginForm onSubmit={values => console.log(values)} />,
//   document.getElementById("root")
// );
