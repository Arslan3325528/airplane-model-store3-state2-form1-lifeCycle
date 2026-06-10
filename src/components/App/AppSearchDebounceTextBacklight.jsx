// console.log(
//   "%c Пошук елементів + Debounce + Підсвічування тексту",
//   "color: white; background-color: #D33F49",
// );

import React, { Component } from "react";
import debounce from "lodash.debounce"; //! 2.Імпорт:

import data from '@/json/cards_10-10';
import css from "./AppSearchDebounceTextBacklight.module.css";

console.log("data:", data);

const initialNumberCards = data.length;

export class AppSearchDebounceTextBacklight extends Component {
  state = {
    inputValue: "", //! значення inputSearch
    filteredElements: data, //! відфільтровані елементи 
    cardsCounter: initialNumberCards, //! кількість знайдених карток
  };


  //! 3.Винесимо всю логіку фільтрації в окремий метод:
  performSearch = textInput => {
    //! _____________Логіка фільтрації___________
    const filteredArray = data.filter(item =>
      item.title.toLowerCase().includes(textInput.toLowerCase())
    );

    this.setState({
      filteredElements: filteredArray,
      cardsCounter: filteredArray.length,
    });
    //! _________________________________________
  }


  //! 4.Створюємо debounce як class property:
  debouncedSearch = debounce((text) => {
    console.log("⏰Пошук-debounce:", text);
    this.performSearch(text);
  }, 500);


  handleChange = (event) => {
    const text = event.target.value;

    this.setState({
      inputValue: text,
    });

    //! 6.2 Запуск debounce з логікою фільтрації:
    this.debouncedSearch(text);
  };


  //! 5.Припинення debounce:
  componentWillUnmount() {
    this.debouncedSearch.cancel();
  };


  //* Функція підсвічування тексту
  highlightText = (text, keyword) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");

    return text
      .split(regex)
      .map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase()
          ? (
            <span
              key={index}
              className={css.highlight}
            >
              {part}
            </span>
          )
          : part
      );
  };

  //* Якщо користувач буде вводити: . + * ? [ ] ( )
  //* то RegExp потрібно екранувати допоміжною функцією:
  escapeRegExp = (str) => {
    return str.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
  };

  //* Використання RegExp з экрануванням допоміжною функцією:
  highlightTextProtection = (text, keyword) => {
    if (!keyword) return text;

    const escapedKeyword = this.escapeRegExp(keyword);

    const regex = new RegExp(
      `(${escapedKeyword})`,
      "gi"
    );

    return text
      .split(regex)
      .map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase()
          ? (
            <span
              key={index}
              className={css.highlight}
            >
              {part}
            </span>
          )
          : part
      );
  };

  //* Функція для відмінювання слова “картка”
  getWordForm = (number, words) => {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return words[2];
    if (n1 > 1 && n1 < 5) return words[1];
    if (n1 === 1) return words[0];
    return words[2];
  };



  render() {
    const {
      inputValue, //! значення inputSearch
      filteredElements,  //! відфільтровані елементи
      cardsCounter, //! кількість знайдених карток
    } = this.state;

    console.log("----------------------------------------------");
    console.log("🔡🔰Значення input:", inputValue);
    console.log("Ⓜ️🔰Масив відфільтрованих елементів:", filteredElements);
    console.log("🔢🔰Кількість знайдених карток:", cardsCounter);
    console.log("______________________________________________");

    return (
      <>
        <input
          className={css.inputSearch}
          type="text"
          value={inputValue}
          onChange={this.handleChange}
        />
        {/* <p className={css.cardsCounter}>Знайдено: {cardsCounter} картки</p> */}
        <p className={css.cardsCounter}>Знайдено: {cardsCounter} {this.getWordForm(cardsCounter, ['картка', 'картки', 'карток'])}</p>
        <ul className={css.cards}>
          {filteredElements.map(item =>
            <li
              className={css.card}
              key={item.id}
            >
              {/* <h3>{item.title}</h3> */}
              {/* //* Використання RegExp без захисту від введення символів: . + * ? [ ] ( ): */}
              {/* <h3>{this.highlightText(item.title, inputValue)}</h3> */}
              {/* //* Використання RegExp з экрануванням допоміжною функцією: */}
              <h3>{this.highlightTextProtection(item.title, inputValue)}</h3>
              <p>{item.body}</p>
            </li>
          )}
        </ul>
      </>
    );
  }
};
