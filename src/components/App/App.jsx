import React, { Component } from "react";
import debounce from "lodash.debounce";

import { ScaleSelection } from '@/components/ScaleSelection/ScaleSelection.jsx';
import { Filter } from '@/components/Filter/Filter.jsx';
import { Sorter } from '@/components/Sorter/Sorter.jsx';
import { Section } from '@/components/Section/Section.jsx';
import { PlanesList } from '@/components/PlanesList/PlanesList.jsx';

import aircrafts from '@/json/aircrafts.json';

import { updateSelectedModels } from '@/utils'; //! формуємо(оновлюємо) масив обраних моделей [selectedModels]

// import css from "./App.module.css";


//! Приклад початкового сортування на ім'я (за полем name.brief)
aircrafts.sort((a, b) => a.name.brief.localeCompare(b.name.brief));
//! Приклад початкового сортування за роком створення (за полем info.year)
// aircrafts.sort((a, b) => a.info.year - b.info.year);

//! Сортування, в якому моделі, яких немає в наявності знаходяться в кінці списку
// console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
const yes = aircrafts.filter(item => item.model.actualImages);
const no = aircrafts.filter(item => !item.model.actualImages);
// console.log("✅Є наявності", yes);
// console.log("❌Немає в наявності", no);

// aircrafts.splice(0, aircrafts.length);
//? або
aircrafts.length = 0;
// console.log("0️⃣aircrafts__Після очищення:", aircrafts);

aircrafts.push(...yes, ...no);
// console.log("🆗aircrafts__Після кінцевого сортування:", aircrafts);
// console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

//! Компонент-клас
export class App extends Component {
  state = {
    aircraftsArr: aircrafts,
    aircraftsTitle: "Магазин моделей літальних апаратів",
    activeButton: "allButton", //! візуалізація активної кнопки
    // indicesSelectedModels: [], //! масив індексів обраних моделей
    //! 1.localStorage - Ініціалізація state з localStorage
    indicesSelectedModels: JSON.parse(localStorage.getItem("indicesSelectedModels")) || [], //! масив індексів обраних моделей
    // selectedModels: [], //! масив обраних моделей
    selectedModels: (JSON.parse(localStorage.getItem("indicesSelectedModels")) || []).flatMap(id =>
      aircrafts.filter((el) => id === el.id)) //! масив обраних моделей
      .sort((a, b) => a.name.brief.localeCompare(b.name.brief)), //! масив обраних моделей
    isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
    // totalTypes: aircrafts.length, //! кількість типів ЛА (всіх літальних апаратів)
    inputSearchValue: "", //! значення inputSearch
    aircraftsArrAfterFiltration: aircrafts,  //! дубльоване значення aircraftsArr після фільтрації
    radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
    inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
    inputSearchValueTrigger: false, //! тригер для коректної роботи інпуту після очищення
  };

  //! 2.localStorage - Створення запису в localStorage під час першого запуску якщо його немає
  componentDidMount() {
    const saved = localStorage.getItem("indicesSelectedModels");
    if (!saved) {
      localStorage.setItem("indicesSelectedModels", JSON.stringify([]));
    }
  };

  //! 3.localStorage - Оновлення(синхронізація) localStorage при кожній зміні indicesSelectedModels
  componentDidUpdate(prevProps, prevState) {
    if (prevState.indicesSelectedModels !== this.state.indicesSelectedModels) {
      localStorage.setItem("indicesSelectedModels", JSON.stringify(this.state.indicesSelectedModels));
      this.setState({
        selectedModels: this.state.indicesSelectedModels.flatMap(id =>
          aircrafts.filter((el) => id === el.id))
          .sort((a, b) => a.name.brief.localeCompare(b.name.brief)) //! з сортуванням за полем "name.brief"
      });
    };
  };

  //! Рахуємо загальну кількість моделей <totalModels> виходячи з наявності фактичної ціни:
  //todo-1
  // getTotalModels = () => {
  //   return aircrafts.reduce((previousValue, element, index, array) => {
  //     const valuesArr = Object.values(element.model.colorsPrice);
  //     const totalAircraftSameType = valuesArr.filter(item => Number(item)).length;
  //     let total = previousValue + totalAircraftSameType;

  //     console.log("totalAircraftSameType:", totalAircraftSameType); //!
  //     console.log("valuesArr:", valuesArr); //!
  //     console.log("total:", total); //!
  //     console.log("---------------------------------");
  //     return total;
  //   }, 0);
  // };
  //todo-2
  // getTotalModels = () => aircrafts.reduce((previousValue, element) => {
  //     return previousValue + Object.values(element.model.colorsPrice).filter(item => Number(item)).length;
  // }, 0);
  //todo-3
  // getTotalModels = () =>
  //   aircrafts.reduce((previousValue, element) =>
  //     previousValue + Object.values(element.model.colorsPrice).filter(item => Number(item)).length, 0);

  allFiltration = () => {
    console.log("Клік в кнопку ВСІ");
    console.log("allAircrafts:", aircrafts);
    this.setState({
      aircraftsArr: aircrafts,
      aircraftsTitle: "Магазин моделей літальних апаратів",
      activeButton: "allButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: aircrafts.length, //! кількість типів ЛА (всіх літальних апаратів)
      aircraftsArrAfterFiltration: aircrafts,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
    });
    // console.log("✈️✈️✈️totalModels:", this.getTotalModels()); //! тимчасово
  };

  planeFiltration = () => {
    console.log("Клік в кнопку Літаки");
    const onlyPlanes = aircrafts.filter(aircraft => aircraft.aircraftType === "plane");
    console.log("onlyPlanes:", onlyPlanes);
    this.setState({
      aircraftsArr: onlyPlanes,
      aircraftsTitle: "Магазин моделей літаків",
      activeButton: "planeButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: onlyPlanes.length, //! кількість типів ЛА (літаків)
      aircraftsArrAfterFiltration: onlyPlanes,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
    });
  };

  biplaneFiltration = () => {
    console.log("Клік в кнопку Біплани");
    const onlyBiplane = aircrafts.filter(aircraft => aircraft.aircraftType === "biplane");
    console.log("onlyBiplane:", onlyBiplane);
    this.setState({
      aircraftsArr: onlyBiplane,
      aircraftsTitle: "Магазин моделей біпланів",
      activeButton: "biplaneButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: onlyBiplane.length, //! кількість типів ЛА (біпланів)
      aircraftsArrAfterFiltration: onlyBiplane,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
    });
  };

  helicopterFiltration = () => {
    console.log("Клік в кнопку Вертольоти");
    const onlyHelicopters = aircrafts.filter(aircraft => aircraft.aircraftType === "helicopter");
    console.log("onlyHelicopters:", onlyHelicopters);
    this.setState({
      aircraftsArr: onlyHelicopters,
      aircraftsTitle: "Магазин моделей вертольотів",
      activeButton: "helicopterButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: onlyHelicopters.length, //! кількість типів ЛА (вертольотів)
      aircraftsArrAfterFiltration: onlyHelicopters,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
    });
  };

  //! Імпортуємо з @/utils/updateSelectedModels.js
  //! Формуємо(оновлюємо) масив обраних моделей [selectedModels] НЕ зберігаючи його в state:
  // updateSelectedModels = () => this.state.indicesSelectedModels.flatMap(id => aircrafts.filter((el) => id === el.id)); //! без сортування
  // updateSelectedModels = () =>
  //   this.state.indicesSelectedModels.flatMap(id =>
  //     aircrafts.filter((el) => id === el.id))
  //     .sort((a, b) =>a.name.brief.localeCompare(b.name.brief)); //! з сортуванням за полем "name.brief"
  //! Формуємо(оновлюємо) масив обраних моделей [selectedModels] зберігаючи його в state:
  //*✅ Так додає останній елемент
  updateSelectedModels = () => {
    this.setState(prevState => ({
      selectedModels: prevState.indicesSelectedModels.flatMap(id =>
          aircrafts.filter((el) => id === el.id))
        .sort((a, b) => a.name.brief.localeCompare(b.name.brief)) //! з сортуванням за полем "name.brief"
    }));
  };

  //! Обробка кнопок-фільтрів
  cartFiltration = () => {
    console.log("Клік в кнопку Кошик");
    this.updateSelectedModels();
    // Формуємо(оновлюємо) масив обраних моделей [selectedModels] не зберігаючи його в state:
    // const selectedModels = this.state.indicesSelectedModels.flatMap(id => aircrafts.filter((el) => id === el.id));
    // console.log("selectedModels:", selectedModels);
    this.setState({
      // selectedModels,
      // aircraftsArr: selectedModels,
      // aircraftsArr: this.updateSelectedModels(), //! вже не треба, якщо є isCartButton
      aircraftsTitle: "Мої обрані моделі",
      activeButton: "cartButton", //! візуалізація активної кнопки
      isCartButton: true, //! тригер: "якщо активна кнопка «Кошик»"
      inputSearchValue: "", //! значення inputSearch
      aircraftsArrAfterFiltration: this.state.selectedModels,  //! дубльоване значення aircraftsArr після фільтрації
    });
  };

  //! Обробка кліка на кнопці <Додати до кошику>
  getActiveId = id => {
    console.log('🆔Індекс обраної моделі ("id"):', id); //!
    this.setState((prevState) => {
      //! Перевіряємо наявність елемента зі значенням <id> у масиві індексів обраних моделей [indicesSelectedModels]
      const exists = this.state.indicesSelectedModels.includes(id);
      if (exists) {
        console.log("Такий індекс моделі вже є,тоді ВИДАЛЯЄМО його!❌");
      } else {
        console.log("Такого індекса моделі ще немає,тоді ДОДАЄМО його!✅");
      };
      return {
        // inputSearchValue: "",
        indicesSelectedModels:
          exists
            // ? this.state.indicesSelectedModels.filter(item => item !== id)
            ? prevState.indicesSelectedModels.filter(item => item !== id)
            // : [...prevState.indicesSelectedModels, id] //! без сортування
            // : [...this.state.indicesSelectedModels, id].sort((a, b) => a - b), //! сортування за id
            : [...prevState.indicesSelectedModels, id].sort((a, b) => a - b), //! сортування за id
        // selectedModels: updateSelectedModels(prevState.indicesSelectedModels, aircrafts), //!❌ так НЕ додає останній елемент
      };
    });
    this.updateSelectedModels(); //*✅ так додає останній елемент
  };

  //! ВСЯ логіка фільтрації для обробки введених даних для пошуку(фільтрації)
  performSearch = textInput => {
    const prevArray =
      this.state.isCartButton
        ? this.state.indicesSelectedModels.flatMap(id => aircrafts.filter((el) => id === el.id))
          .sort((a, b) => a.name.brief.localeCompare(b.name.brief)) //! з сортуванням за полем "name.brief"
        // ? this.state.selectedModels
        : this.state.aircraftsArrAfterFiltration

    const inputSearchValueBrief = prevArray.filter(
      aircraft => aircraft.name.brief.toLowerCase().startsWith(textInput.trim().toLowerCase())
    );
    const inputSearchValueNickname = prevArray.filter(
      aircraft => aircraft.name.nickname.toLowerCase().includes(textInput.trim().toLowerCase())
    );
    const inputSearchValueCountry = prevArray.filter(
      // aircraft => aircraft.info.country.toLowerCase().startsWith(textInput.trim().toLowerCase())
      aircraft => aircraft.info.countries.some(country => country.toLowerCase().startsWith(textInput.trim().toLowerCase()))
    );
    const inputSearchValueYear = prevArray.filter(
      aircraft => String(aircraft.info.year).startsWith((textInput.trim()))
    );

    // console.log("⏰⏰⏰inputSearchValueYear:", inputSearchValueYear);
    // console.log("⏰⏰⏰inputSearchValueCountry:", inputSearchValueCountry);

    let result = [];

    switch (this.state.radioButtonValue) {
      case "brief":
        result = inputSearchValueBrief;
        break;
      case "nickname":
        result = inputSearchValueNickname;
        break;
      case "country":
        result = inputSearchValueCountry;
        break;
      case "year":
        result = inputSearchValueYear;
        break;
      default:
        fieldValue = "";
    };

    this.setState({
      aircraftsArr: result,
      selectedModels: result,
      inputSearchValueTrigger: false //! тригер для коректної роботи інпуту після очищення
    });
  };

  //! Створюємо debounce як class property:
  debouncedSearch = debounce((text) => {
    console.log("⏰debounce_text", text);
    this.performSearch(text);
  }, 500);

  
  //! Обробка введених даних для пошуку(фільтрації) карток за ім'ям або іншими параметрами
  // handleChangeInputSearchValue = debounce((event) => {  //? ❌ Так не працює!!!
  handleChangeInputSearchValue = event => {
    console.log("Подія onChange в inputSearch");
    const textInput = event.target.value;

    this.setState({
      inputSearchValue: textInput,
      inputSearchValueTrigger: true, //! тригер для коректної роботи інпуту після очищення
    });

    //todo: ❌ Без debounce:
    // this.performSearch(textInput); 

    //! ✅ Запуск debounce з логікою фільтрації:
    this.debouncedSearch(textInput);

    //! Виносимо логіку фільтрації в окремий метод performSearch
    // const prevArray =
    //   this.state.isCartButton
    //     ? this.state.indicesSelectedModels.flatMap(id => aircrafts.filter((el) => id === el.id))
    //       .sort((a, b) => a.name.brief.localeCompare(b.name.brief)) //! з сортуванням за полем "name.brief"
    //     // ? this.state.selectedModels
    //     : this.state.aircraftsArrAfterFiltration

    // const inputSearchValueBrief = prevArray.filter(
    //   aircraft => aircraft.name.brief.toLowerCase().startsWith(textInput.trim().toLowerCase())
    // );
    // const inputSearchValueNickname = prevArray.filter(
    //   aircraft => aircraft.name.nickname.toLowerCase().includes(textInput.trim().toLowerCase())
    // );
    // const inputSearchValueCountry = prevArray.filter(
    //   // aircraft => aircraft.info.country.toLowerCase().startsWith(textInput.trim().toLowerCase())
    //   aircraft => aircraft.info.countries.some(country => country.toLowerCase().startsWith(textInput.trim().toLowerCase()))
    // );
    // const inputSearchValueYear = prevArray.filter(
    //   aircraft => String(aircraft.info.year).startsWith((textInput.trim()))
    // );

    // console.log("⏰⏰⏰inputSearchValueYear:", inputSearchValueYear);
    // console.log("⏰⏰⏰inputSearchValueCountry:", inputSearchValueCountry);

    // switch (this.state.radioButtonValue) {
    //   case "brief":
    //     this.setState({
    //       inputSearchValue: textInput,
    //       aircraftsArr: inputSearchValueBrief,
    //       selectedModels: inputSearchValueBrief,
    //     });
    //     break;
    //   case "nickname":
    //     this.setState({
    //       inputSearchValue: textInput,
    //       aircraftsArr: inputSearchValueNickname,
    //       selectedModels: inputSearchValueNickname,
    //     });
    //     break;
    //   case "country":
    //     this.setState({
    //       inputSearchValue: textInput,
    //       aircraftsArr: inputSearchValueCountry,
    //       selectedModels: inputSearchValueCountry,
    //     });
    //     break;
    //   case "year":
    //     this.setState({
    //       inputSearchValue: textInput,
    //       aircraftsArr: inputSearchValueYear,
    //       selectedModels: inputSearchValueYear,
    //     });
    //     break;
    //   default:
    //     fieldValue = "";
    // };
  };
  // }, 500); //? ❌ Так не працює!!!


  //! Припинення debounce:
  componentWillUnmount() {
    this.debouncedSearch.cancel();
  };

  //! Обробка введених даних: значення параметра для пошуку/фільтрації радіо-кнопки
  handleChangeRadioButtonValue = event => {
    console.log("Подія checked");

    this.setState({
      inputSearchValue: "",
      aircraftsArr: this.state.aircraftsArrAfterFiltration,
      selectedModels:
        this.state.indicesSelectedModels.flatMap(id => aircrafts.filter((el) => id === el.id))
        .sort((a, b) => a.name.brief.localeCompare(b.name.brief)) //! з сортуванням за полем "name.brief",
    });

    const radioButtonValue = event.target.value;
    let inputSearchPlaceholder = "";

    switch (radioButtonValue) {
      case "brief":
        inputSearchPlaceholder = "Введіть назву ЛА";
        break;
      case "nickname":
        inputSearchPlaceholder = "Введіть прізвисько ЛА";
        break;
      case "country":
        inputSearchPlaceholder = "Введіть країну виробник ЛА";
        break;
      case "year":
        inputSearchPlaceholder = "Введіть рік випуску ЛА";
        break;
      default:
        inputSearchPlaceholder = "";
    };

    this.setState({
      radioButtonValue,
      inputSearchPlaceholder
    });
  };

  //! Функція підсвічування тексту та допоміжна функція ---> ВИНОСИМО в utils
  //* Якщо користувач буде вводити: . + * ? [ ] ( )
  //* то RegExp потрібно екранувати допоміжною функцією:
  // escapeRegExp = (str) => {
  //   return str.replace(
  //     /[.*+?^${}()|[\]\\]/g,
  //     "\\$&"
  //   );
  // };
  
  //! ---> ВИНОСИМО в utils
  //* Використання RegExp з экрануванням допоміжною функцією:
  // highlightTextProtection = (text, keyword) => {
  //   if (!keyword) return text;

  //   const escapedKeyword = this.escapeRegExp(keyword);

  //   const regex = new RegExp(
  //     `(${escapedKeyword})`,
  //     "gi"
  //   );

  //   return text
  //     .split(regex)
  //     .map((part, index) =>
  //       part.toLowerCase() === keyword.toLowerCase()
  //         ? (
  //           <span
  //             key={index}
  //             className={css.highlight}
  //           >
  //             {part}
  //           </span>
  //         )
  //         : part
  //     );
  // };

  render() {
    const {
      aircraftsArr,
      aircraftsTitle,
      activeButton, //! візуалізація активної кнопки
      indicesSelectedModels, //! масив індексів обраних моделей
      selectedModels, //! масив обраних моделей 
      isCartButton, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes //! кількість типів ЛА
      inputSearchValue, //! значення inputSearch
      aircraftsArrAfterFiltration,  //! дубльоване значення aircraftsArr після фільтрації
      radioButtonValue, //! значення параметра для пошуку/фільтрації радіо - кнопки
      inputSearchPlaceholder, //! значення placeholder для inputSearch
      inputSearchValueTrigger, //! тригер для коректної роботи інпуту після очищення
    } = this.state;

    //! Рахуємо кількість типів ЛА
    const totalTypes = aircraftsArr.length;
    
    //! Рахуємо загальну кількість моделей <totalModels> виходячи з наявності фактичної ціни
    const getTotalModels = (arr) =>
      arr.reduce((previousValue, element) =>
        previousValue + Object.values(element.model.colorsPrice).filter(item => Number(item)).length, 0);

    //! Формуємо(оновлюємо) масив обраних моделей [selectedModels]
    // const selectedModels = indicesSelectedModels.flatMap(id => aircrafts.filter((el) => id === el.id));
    // const selectedModels = this.updateSelectedModels();
    // const selectedModelsBeforeSorting = updateSelectedModels(indicesSelectedModels, aircrafts); //! якщо імпортуємо;  це до сортування
    //! Після сортування
    // const selectedModels = selectedModelsBeforeSorting.filter(
    //   aircraft => aircraft.name.brief.toLowerCase().startsWith(inputSearchValue.trim().toLowerCase())
    // );
    // const selectedModels = selectedModelsBeforeSorting;

    //! Кількість обраних моделей 
    const numberOfModels = indicesSelectedModels.length;

    //! Кількість обраних моделей після сортування
    const numberOfModelsAfterSorting = selectedModels.length;
    

    console.log("----------------------------------------------");
    console.log("ℹ️Mасив індексів обраних моделей :", indicesSelectedModels);
    console.log("Ⓜ️Масив обраних моделей:", selectedModels);
    console.log("🔢Кількість обраних моделей:", numberOfModels);
    console.log("🔡Значення inputSearch:", inputSearchValue);
    console.log("Ⓜ️Ⓜ️Дубльоване значення aircraftsArr після фільтрації:", aircraftsArrAfterFiltration);
    console.log("⭕️Значення параметра для пошуку/фільтрації радіо-кнопки:", radioButtonValue);
    console.log("🔲Значення placeholder для inputSearch:", inputSearchPlaceholder);
    console.log("______________________________________________");

    return (
      <>
        {/*//!  Вибір масштабу моделі */}
        <ScaleSelection
          // inputSearchValue={inputSearchValue} //! значення inputSearch
          
        />

        {/*//!  Filter */}
        <Filter
          onAll={this.allFiltration}
          onPlanes={this.planeFiltration}
          onBiplanes={this.biplaneFiltration}
          onHelicopters={this.helicopterFiltration}
          onCart={this.cartFiltration}
          filterButton={activeButton} //! візуалізація активної кнопки
          numberOfSelectedModels={numberOfModels} //! кількість обраних моделей
        />

        {/*//!  Sorter */}
        <Sorter
          inputSearchValue={inputSearchValue} //! значення inputSearch
          onHandleChangeInputSearchValue={this.handleChangeInputSearchValue}
          isCartOn={isCartButton} //! тригер: "якщо активна кнопка «Кошик»"
          numberOfSelectedModels={numberOfModels} //! кількість обраних моделей
          onHandleChangeRadioButtonValue={this.handleChangeRadioButtonValue}
          radioButtonValue={radioButtonValue} //! значення параметра для пошуку/фільтрації радіо-кнопки
          inputSearchPlaceholder={inputSearchPlaceholder} //! значення placeholder для inputSearch
        />

        {/*//! ВСІ */}
        <Section
          // title={aircraftsTitle}
          //! Використання логіки тригеру: "якщо активна кнопка «Кошик»" та порожній масив [indicesSelectedModels]
          //? title={(isCartButton === true && indicesSelectedModels.length === 0) ? "" : aircraftsTitle}
          //? або:
          title={(isCartButton && !indicesSelectedModels.length) ? "" : aircraftsTitle}
          allTypes={totalTypes} //! кількість типів ЛА
          totalModels={isCartButton ? getTotalModels(selectedModels) : getTotalModels(aircraftsArr)} //! загальна кількість моделей 
          numberOfSelectedModelsAfterSorting={numberOfModelsAfterSorting} //! кількість обраних моделей
          isCartOn={isCartButton} //! тригер: "якщо активна кнопка «Кошик»"
        >
          <PlanesList
            // items={aircraftsArr}
            //! Використання логіки тригеру: "якщо активна кнопка «Кошик»" 
            items={isCartButton ? selectedModels : aircraftsArr}
            indicesArray={indicesSelectedModels}
            onActiveId={this.getActiveId}
            inputSearchValue={inputSearchValue} //! значення inputSearch
            inputSearchValueTrigger={inputSearchValueTrigger} //! тригер для коректної роботи інпуту після очищення
            // onHighlightTextProtection={this.highlightTextProtection} //! функція підсвічування тексту та допоміжна функція ---> ВИНОСИМО в utils
            radioButtonValue={radioButtonValue} //! ⭕️ значення параметра для пошуку/фільтрації радіо-кнопки
          />
        </Section >
      </>
    )
  }
};

//! Перерендер компонентів відбувається у двох випадках:
//! 1.Коли до них приходять нові props
//! 2.Коли змінюється state
