import React, { Component } from 'react';
import {validateNumeric} from './helpers/Validation';

class NumericInput extends Component {
  state = {
    valueNumericInput: '',
    textNumericInput: '',
    isNumericValid: false,
    isNumericInputTouched: false
  }

  changeTextNumericInput(ev) {
    const textNumericInput = ev.target.value;
    const valueNumericInput = Number(textNumericInput);
    const isNumericValid = validateNumeric(valueNumericInput) === '';
    this.setState({textNumericInput, valueNumericInput, isNumericValid, isNumericInputTouched: true});
  }

  setValue(ev) {
    const value = document.querySelector('.set_value_field').value;
    this.setState({value});
  }

  setText(ev) {
      const text = document.querySelector('.set_text_field').value;
      this.setState({text});
  }

  setFieldFrame(ev) {
    const isNumericValid = this.state.isNumericValid;
    const field = document.querySelector('.numeric_field');
    field.classList.remove(isNumericValid ? 'err' : 'ok')
    field.classList.add(isNumericValid ? 'ok' : 'err')
  };

  render() {
    const { valueNumericInput, isNumericValid, isNumericInputTouched} = this.state;
   
    return (
      <div className="list-group numeric-input">
        <input type='text' 
              className='numeric_field form-control' 
              placeholder="Введите значение для преобразования в число"
              onChange={(ev) => this.changeTextNumericInput(ev)}
              onFocus={(ev) => this.setFieldFrame(ev)}
              onBlur={(ev) => this.setFieldFrame(ev)}
              defaultValue={valueNumericInput}
        />
        <div className="status">{isNumericInputTouched  && (isNumericValid ? 'OK!' : 'Ошибка преобразования')}</div>
        <ul>
          <li>Value: {valueNumericInput} </li>
          <li>Text: ""</li>
          <li>Valid: {isNumericValid && isNumericValid ? 'true': 'false'} </li>
        </ul>
        <div className="input-group mb-3">
          <button onClick={(ev) => this.setValue(ev)}>Set value</button>
          <input type="text"
                  className="set_value_field form-control"
          />
        </div>
        <div className="input-group mb-3">
          <button onClick={(ev) => this.setText(ev)}>Set text</button>
          <input type="text"
                  className="set_text_field form-control"
          />
        </div>
        <hr/>
      </div>
    );
  }
}

export default NumericInput;
