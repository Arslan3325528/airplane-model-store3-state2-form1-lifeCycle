// import React, { Component } from "react";
import css from "./Sorter.module.css";


//? Підняття стану
//! Звичайний компонент
export function Sorter({
  inputSearchValue, //! початкове значення inputSearch
  onHandleChangeInputSearchValue,
  isCartOn, //! тригер: "якщо активна кнопка «Кошик»"
  numberOfSelectedModels, //! кількість обраних моделей
  onHandleChangeRadioButtonValue,
  radioButtonValue,  //! значення параметра для пошуку/фільтрації радіо-кнопки
  inputSearchPlaceholder, //! значення placeholder для inputSearch
})
{
  // console.log("(!isCartButton):", !isCartOn);
  // console.log("(isCartButton):", isCartOn);
  // console.log("numberOfSelectedModels:", !!numberOfSelectedModels);
  // console.log("(!isCartButton || numberOfSelectedModels):", (!isCartOn || numberOfSelectedModels));
  return (
    <>
      {(!isCartOn || numberOfSelectedModels) &&
        <div className={css.searchBox}>
          <h3 className={css.formTitle}>Вибір параметра для пошуку/фільтрації:</h3>
          <form className={css.formRadioButton}>
            <label>
              <input
                type="radio"
                name="sort"
                value="brief"
                checked={radioButtonValue === "brief"}
                onChange={onHandleChangeRadioButtonValue}
              />
              Назва
            </label>

            <label>
              <input
                type="radio"
                name="sort"
                value="nickname"
                checked={radioButtonValue === "nickname"}
                onChange={onHandleChangeRadioButtonValue}
              />
              Прізвисько
            </label>

            <label>
              <input
                type="radio"
                name="sort"
                value="country"
                checked={radioButtonValue === "country"}
                onChange={onHandleChangeRadioButtonValue}
              />
              Країна виробник
            </label>

            <label>
              <input
                type="radio"
                name="sort"
                value="year"
                checked={radioButtonValue === "year"}
                onChange={onHandleChangeRadioButtonValue}
              />
              Рік випуску
            </label>

            {/* <p>Ваш вібір: {radioButtonValue}</p> */}
          </form>

          <input
            className={css.inputSearch}
            type="text"
            // placeholder=" Введіть назву ЛА"
            placeholder={inputSearchPlaceholder}
            // defaultValue={inputSearchValue} //! початкове значення inputSearch
            value={inputSearchValue} //! початкове значення inputSearch
            // onChange={() => console.log("input")}
            // onChange={(event) => console.log(event.target.value)}
            onChange={onHandleChangeInputSearchValue}
          />

          {/* <button
            className={css.buttonSearch}
            type="button"
            onClick={() => console.log('Клік в "Пошук"')}
          >
            Пошук
          </button> */}
        </div>
      }
    </>
  )
};
