import React, { Component } from "react";
import css from "./FormIdentification.module.css";

const INITIAL_STATE = {
    userEmail: "",
    userPassword: "",
};


export class FormIdentification extends Component {
    state = { ...INITIAL_STATE };

    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    // todo: NEW
    handleSubmit = event => {
        event.preventDefault();
        //! isActive - це тригер 🗣 активного (авторизованого) користувача
        const {  userEmail, userPassword } = this.state;
        
        // console.log(`✉️E-mail: ${userEmail},🈳Password: ${userPassword}`);
        //! Перевірка на наявність userEmail (Ідентифікація)
        const users = JSON.parse(localStorage.getItem("users"));
        const isEmail = users.some(user => user.userEmail === userEmail);
        console.log("📩Такий Email є в db?:", isEmail); //!
        
        if (!isEmail) {
            alert(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
            console.log(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
            return;
        };

        //! Перевірка Пароля (Аутентифікація)
        const user = users.find(user => user.userEmail === userEmail);
        console.log("🤷🏻‍♂️user:", user); //!

        if (user.userPassword !== userPassword) {
            alert(`Введений неправильний пароль☹️☹️`);
            console.log(`Введений неправильний пароль☹️☹️`);
            return;
        };
        alert(`Вітаю Вас, ${user.userName} 😊 \nІдентифікація/Аутентифікація пройдена ✅`);
        this.props.onAccountLogin({ ...this.state }); //! підняття стану + передача state в App.jsx
        this.reset();  //! очищуємо поля всіх інпутів
        this.props.onClose(); //todo: var.1 закриваємо модалку  
    };

    handleChange = event => {
        // console.log("event.currentTarget:", event.currentTarget); //!
        // console.log("event.currentTarget.name:", event.currentTarget.name); //!
        // console.log("event.currentTarget.value:", event.currentTarget.value); //!

        //! Деструктуризуємо:
        const { name, value } = event.currentTarget;
        //! Зберігаємо значення інпутів в state, використовуючи властивості об'єкта, що обчислюються
        this.setState({
            [name]: value,
        });
    };


    render() {
        const {
            userEmail,
            userPassword,

        } = this.state;

        console.log("-----------STATE FormIdentification-----------");
        console.log("🛅Значення userEmail:", userEmail);
        console.log("🛅Значення userPassword:", userPassword);
        console.log("______________________________________________");

        return (
            <>
                <h2 className={css.IdentificationFormTitle}>Ідентифікація/Аутентифікація</h2>
                <form
                    className={css.loginForm}
                    onSubmit={this.handleSubmit}
                >

                    <label className={css.loginFormLabel}>
                        E-mail:
                        <input
                            className={css.loginFormInput}
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            onChange={this.handleChange}
                        />
                    </label>
                    

                    <label className={css.loginFormLabel}>
                        Пароль:
                        <input
                            className={css.loginFormInput}
                            type="password"
                            name="userPassword"
                            value={userPassword}
                            onChange={this.handleChange}
                        />
                    </label>
                    
                    <button
                        className={css.loginButton}
                        type="submit"
                        // disabled={!userLicence} //! блокування кнопки чекбоксом
                    >
                        Login
                    </button>

                    <button
                        className={css.loginButton}
                        type="button"
                        onClick={this.props.onClose}
                    >
                        Cancel
                    </button>
                    
                </form>
            </>
            
        );
    }
};
