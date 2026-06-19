// import React, { Component } from "react";
import css from "./ScaleSlection.module.css";


//? Підняття стану
//! Звичайний компонент
export function ScaleSlection({
  // inputSearchValue, //! початкове значення inputSearch
  // onHandleChangeInputSearchValue,
  // isCartOn, //! тригер: "якщо активна кнопка «Кошик»"
  // numberOfSelectedModels, //! кількість обраних моделей
  // onHandleChangeRadioButtonValue,
  // radioButtonValue,  //! значення параметра для пошуку/фільтрації радіо-кнопки
  // inputSearchPlaceholder, //! значення placeholder для inputSearch
})
{
  // console.log("(!isCartButton):", !isCartOn);
  // console.log("(isCartButton):", isCartOn);
  // console.log("numberOfSelectedModels:", !!numberOfSelectedModels);
  // console.log("(!isCartButton || numberOfSelectedModels):", (!isCartOn || numberOfSelectedModels));
  return (
    <>
      {/* {(!isCartOn || numberOfSelectedModels) && */}
      <div className={css.scaleSlectionBox}>
        <h3 className={css.scaleSlectionTitle}>Оберіть масштаб моделі:</h3>
          <label>
            {/* масштаб моделі */}
            <select
              className={css.scaleSlectionSelect}
              name="scale"
              // value={modelScale}
              // onChange={this.handleChange}
            >
              <option className={css.scaleSlectionOption} value="all">Всі</option>
              <option className={css.scaleSlectionOption} value="114">1:114</option>
              <option className={css.scaleSlectionOption} value="100">1:100</option>
              <option className={css.scaleSlectionOption} value="72">1:72</option>
              <option className={css.scaleSlectionOption} value="60">1:60</option>
              <option className={css.scaleSlectionOption} value="48">1:48</option>
              <option className={css.scaleSlectionOption} value="32">1:32</option>
            </select>
          </label>
        </div>
      {/* } */}
    </>
  )
};
