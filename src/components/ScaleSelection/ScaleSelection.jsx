import React, { Component } from "react";

import aircrafts from '@/json/aircrafts.json';

import css from "./ScaleSelection.module.css";


//? Підняття стану
//! Компонент-клас
export class ScaleSelection extends Component {
  state = {
    modelScale: "all", //! масштаб моделі
    modelsSelectedScale: [] //! масив моделей обраного масштабу
  };

  handleChangeModelScale = (event) => {
    // console.log("Зміна масштабу моделі");
    // console.log("event.currentTarget:", event.currentTarget);
    // console.log("event.currentTarget.name:", event.currentTarget.name);
    // console.log("event.currentTarget.value:", event.currentTarget.value);

    //! Деструктуризуємо:
    const { name, value } = event.currentTarget;

    // const inputSearchValueCountry = prevArray.filter(
    //   // aircraft => aircraft.info.country.toLowerCase().startsWith(textInput.trim().toLowerCase())
    //   aircraft => aircraft.info.countries.some(country => country.toLowerCase().startsWith(textInput.trim().toLowerCase()))
    // );
    const modelsSelectedScale = aircrafts.filter(aircraft => aircraft.model.scale.some(item => item === Number(value)));


    //! Зберігаємо значення інпутів в state, використовуючи властивості об'єкта, що обчислюються
    this.setState({
      [name]: value,
      modelsSelectedScale,
    });
  }

  render() {
    const {
      modelScale, //! масштаб моделі
      modelsSelectedScale //! масив моделей обраного масштабу
    } = this.state;

    console.log("******************************************************");
    console.log("📕Масштаб моделі :", modelScale);
    console.log("📕Масив моделей обраного масштабу :", modelsSelectedScale);
    console.log("******************************************************");

    return (
      <>
        {/* {(!isCartOn || numberOfSelectedModels) && */}
        <div className={css.scaleSelectionBox}>
          <h3 className={css.scaleSelectionTitle}>Оберіть масштаб моделі:</h3>
          <label>
            {/* масштаб моделі */}
            <select
              className={css.scaleSelectionSelect}
              name="modelScale"
              value={modelScale}
              onChange={this.handleChangeModelScale}
            >
              <option className={css.scaleSelectionOption} value="all">Всі</option>
              <option className={css.scaleSelectionOption} value="200">1:200</option>
              <option className={css.scaleSelectionOption} value="144">1:144</option>
              <option className={css.scaleSelectionOption} value="100">1:100</option>
              <option className={css.scaleSelectionOption} value="72">1:72</option>
              <option className={css.scaleSelectionOption} value="60">1:60</option>
              <option className={css.scaleSelectionOption} value="48">1:48</option>
              <option className={css.scaleSelectionOption} value="32">1:32</option>
            </select>
          </label>
        </div>
        {/* } */}
      </>
    )
  }
};