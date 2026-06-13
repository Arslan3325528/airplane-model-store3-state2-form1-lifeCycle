// console.log(
//   "%c 4.4.3.Складні форми + Генерація Id елементів форми",
//   "color: white; background-color: #D33F49",
// );

import React, { Component } from "react";
import { ComplexForms } from '@/components/ComplexForms/ComplexForms.jsx';
import { ComplexFormsGenerationID } from '@/components/ComplexFormsGenerationID/ComplexFormsGenerationID.jsx';
// import css from "./AppComplexForms.module.css";

export class AppComplexForms extends Component {
  state = {
    formInputLogin: "",
    formInputPassword: "",
  };

  submitForm = (data) => {
    console.log("✅Дані форми:", data);
    this.setState({
      formInputLogin: data.inputLogin,
      formInputPassword: data.inputPassword,
    });
  };

  render() {
    const {
      formInputLogin,
      formInputPassword,
    } = this.state;

    console.log("----------------------------------------------");
    console.log("✅Значення в App formInputLogin:", formInputLogin);
    console.log("✅Значення в App formInputPassword:", formInputPassword);
    console.log("______________________________________________");

    return (
      <>
        {/* <ComplexForms
          // onSubmit={values => console.log(values)}
          onSubmit={this.submitForm}
        /> */}
        <ComplexFormsGenerationID onSubmit={this.submitForm} />
        <ComplexFormsGenerationID onSubmit={this.submitForm} />
      </>
    );
  }
};
