// console.log(
//   "%c 4.4.3.Складні форми + \n 4.4.4.Генерація Id елементів форми + \n 4.4.5.Радіокнопки ",
//   "color: white; background-color: #D33F49",
// );

import React, { Component } from "react";
import { ComplexForms } from '@/components/ComplexForms/ComplexForms.jsx';
import { ComplexFormsGenerationID } from '@/components/ComplexFormsGenerationID/ComplexFormsGenerationID.jsx';
import { ComplexFormsGenerationIDRadioButton} from '@/components/ComplexFormsGenerationIDRadioButton/ComplexFormsGenerationIDRadioButton.jsx';
// import css from "./AppComplexForms.module.css";

export class AppComplexForms extends Component {
  state = {
    formInputLogin: "",
    formInputPassword: "",
    formRadioButtonExperience: "",
  };

  submitForm = (data) => {
    console.log("✅Дані форми:", data);
    this.setState({
      formInputLogin: data.inputLogin,
      formInputPassword: data.inputPassword,
      formRadioButtonExperience: data.experience,
    });
  };

  render() {
    const {
      formInputLogin,
      formInputPassword,
      formRadioButtonExperience
    } = this.state;

    console.log("----------------------------------------------");
    console.log("✅Значення в App formInputLogin:", formInputLogin);
    console.log("✅Значення в App formInputPassword:", formInputPassword);
    console.log("✅Значення в App formRadioButtonExperience:", formRadioButtonExperience);
    console.log("______________________________________________");

    return (
      <>
        {/*//! 4.4.3.Складні форми */}
        {/* <ComplexForms
          // onSubmit={values => console.log(values)}
          onSubmit={this.submitForm}
        /> */}
        {/*//! 4.4.4.Генерація Id елементів форми */}
        {/* <ComplexFormsGenerationID onSubmit={this.submitForm} /> */}
        {/* <ComplexFormsGenerationID onSubmit={this.submitForm} /> */}
        {/*//! 4.4.5.Радіокнопки */}
        <ComplexFormsGenerationIDRadioButton
          onSubmit={this.submitForm}
        />
      </>
    );
  }
};
