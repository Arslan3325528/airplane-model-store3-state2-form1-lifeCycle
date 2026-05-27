import React, { Component } from "react";
import debounce from "lodash.debounce";

export class AppSearchDebounce extends Component {
  state = {
    value: "",
  };

  debouncedSearch = debounce((text) => {
    console.log("Пошук-debounce:", text);
  }, 500);

  handleChange = (event) => {
    const text = event.target.value; 

    this.setState({
      // value: event.target.value,
      value: text,
    });

    // this.debouncedSearch(event.target.value);
    this.debouncedSearch(text);
  };

  componentWillUnmount() {
    this.debouncedSearch.cancel();
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}