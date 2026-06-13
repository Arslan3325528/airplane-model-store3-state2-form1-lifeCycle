import React, { Component } from "react";
import { nanoid } from 'nanoid' //! для генерації Id елементів форми
import css from "./ComplexFormsGenerationID.module.css";

const INITIAL_STATE = {
    inputLogin: "",
    inputPassword: "",
};


export class ComplexFormsGenerationID extends Component {
    state = { ...INITIAL_STATE };

    //! Для генерації Id елементів форми:
    //! Для кожного інпуту робимо окрему властивість класу:
    loginInputId = nanoid();
    passwordInputId = nanoid();

    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    // todo: NEW
    handleSubmit = event => {
        event.preventDefault();
        const { inputLogin, inputPassword } = this.state;
        console.log(`🈂️Login: ${inputLogin}, 🈳Password: ${inputPassword}`);
        this.props.onSubmit({ ...this.state }); //! підняття стану + передача state в AppComplexForms.jsx
        this.reset();  //! очищуємо поля всіх інпутів
    };

    handleChange = event => {
        // console.log("event.currentTarget.value:", event.currentTarget);
        // console.log("event.currentTarget.value:", event.currentTarget.name);
        // console.log("event.currentTarget.value:", event.currentTarget.value);

        //! Деструктуризуємо:
        const { name, value } = event.currentTarget;
        //! Зберігаємо значення інпутів в state, використовуючи властивості об'єкта, що обчислюються
        this.setState({
            [name]: value,
        });
    };


    render() {
        const {
            inputLogin,
            inputPassword,
        } = this.state;

        console.log("----------------------------------------------");
        console.log("🛅Значення inputLogin:", inputLogin);
        console.log("🛅Значення inputPassword:", inputPassword);
        console.log("______________________________________________");

        return (
            <form
                className={css.loginForm}
                onSubmit={this.handleSubmit}
            >
                <label
                    className={css.loginFormLabel}
                    // htmlFor="username"
                    htmlFor={this.loginInputId} //? для генерації Id елементів форми
                >
                    Логін:
                </label>
                <input
                    className={css.loginFormInput}
                    type="text"
                    name="inputLogin"
                    // id="username"
                    id={this.loginInputId} //? для генерації Id елементів форми
                    value={inputLogin}
                    onChange={this.handleChange}
                />

                <label
                    className={css.loginFormLabel}
                    // htmlFor="pwd"
                    htmlFor={this.passwordInputId} //* для генерації Id елементів форми
                >
                    Пароль:
                </label>
                <input
                    className={css.loginFormInput}
                    type="password"
                    name="inputPassword"
                    // id="pwd"
                    id={this.passwordInputId} //* для генерації Id елементів форми
                    value={inputPassword}
                    onChange={this.handleChange}
                />

                <button
                    className={css.loginButton}
                    type="submit"
                >
                    Login
                </button>
            </form>
        );
    }
};
