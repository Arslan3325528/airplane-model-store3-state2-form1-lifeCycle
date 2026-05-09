// import React, { Component } from "react";
import css from "./Sorter.module.css";


//? Підняття стану
//! Звичайний компонент
export function Sorter({
  inputSearchValue, //! початкове значення inputSearch
  onHandleChangeInputSearchValue,
  isCartOn, //! тригер: "якщо активна кнопка «Кошик»"
  numberOfSelectedModels, //! кількість обраних моделей
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
          <input
            className={css.inputSearch}
            type="text"
            defaultValue={inputSearchValue} //! початкове значення inputSearch
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
