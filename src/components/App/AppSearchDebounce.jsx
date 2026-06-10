// console.log(
//   "%c Пошук елементів + Debounce",
//   "color: white; background-color: #D33F49",
// );

import React, { Component } from "react";
import debounce from "lodash.debounce"; //! 2.Імпорт:

import data from '@/json/cards_10-10';
import css from "./AppSearchDebounce.module.css";

console.log("data:", data);


export class AppSearchDebounce extends Component {
  state = {
    inputValue: "",
    filteredElements: data
  };


  //! 3.Винесимо всю логіку фільтрації в окремий метод:
  performSearch = textInput => {
    //! _____________Логіка фільтрації___________
    const filteredArray = data.filter(item =>
      item.title.toLowerCase().includes(textInput.toLowerCase())
    );

    this.setState({
      filteredElements: filteredArray,
    });
    //! _________________________________________
  }


  //! 4.Створюємо debounce як class property:
  debouncedSearch = debounce((text) => {
    console.log("⏰Пошук-debounce:", text);
    this.performSearch(text);
  }, 500);


  // handleChange = debounce((event) => {  //? ❌ Так не працює!!!
  //   const text = event.target.value;

  //   this.setState({
  //     inputValue: text,
  //   });


  //   //! _____________Логіка фільтрації___________
  //   const filteredArray = data.filter(item =>
  //     item.title.toLowerCase().includes(text.toLowerCase())
  //   );

  //   this.setState({
  //     filteredElements: filteredArray,
  //   });
  //   //! _________________________________________
  // }, 500); //? ❌ Так не працює!!!


  handleChange = (event) => {
    const text = event.target.value;

    this.setState({
      inputValue: text,
    });

    //! 6.1 .Переносимо всю логіку фільтрації в окремий метод performSearch:
    //! _____________Логіка фільтрації___________
    // const filteredArray = data.filter(item =>
    //   item.title.toLowerCase().includes(text.toLowerCase())
    //     );

    // this.setState({
    //   filteredElements: filteredArray,
    // });
    //! _________________________________________

    //! 6.2 Запуск debounce з логікою фільтрації:
    this.debouncedSearch(text);
  };


  //! 5.Припинення debounce:
  componentWillUnmount() {
    this.debouncedSearch.cancel();
  };


  render() {
    const {
      inputValue, //! значення inputSearch
      filteredElements,  //! відфільтровані елементи 
    } = this.state;

    console.log("----------------------------------------------");
    console.log("🔡Значення input:", inputValue);
    console.log("Ⓜ️Масив відфільтрованих елементів:", filteredElements);
    console.log("______________________________________________");
    
    return (
      <>
        <input
          className={css.inputSearch}
          type="text"
          value={inputValue}
          onChange={this.handleChange}
          // onChange={debounce(this.handleChange, 500)} //? ❌ Так не працює!!!
        />
        <ul className={css.cards}>
          {filteredElements.map(item =>
            <li
              className={css.card}
              key={item.id}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          )}
        </ul>
      </>
    );
  }
};
