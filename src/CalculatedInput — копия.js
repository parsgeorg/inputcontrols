import React, { Component } from 'react';
import {validateNumeric} from './helpers/Validation';

class CalculatedInput extends Component {
  state = {
    text: 0,
    value: 0,
    isValid: false
  }

  changeValue(ev, valueOfSetValue) {
    //alert(ev.target.value);
    const calcField = document.querySelector('.calc_field');
    let text = valueOfSetValue !== '' ? valueOfSetValue : ev.target.value;
    let was_str;
    let sum_or_diff = (sub, a, sign, b) => {
     return sign == "-" ? a-b : +a + +b;
    };
    let mult_or_div = (sub, a, sign, b) => {
     return sign  =="*" ? a*b : a/b;
    };
    let power= (sub, a, b) => {
     return Math.pow(a, b);
    };
    let match_power= /(-?[\d\.]+)\s*\^\s*(-?[\d\.]+)/g;
    let match_mult_div= /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/g;
    let match_sum_diff= /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/g;
    
    let get_value= (sub, exp) => {
      while(exp.indexOf("^")!==-1)
        exp = exp.replace(match_power, power);
      while(match_mult_div.test(exp))
        exp = exp.replace(match_mult_div, mult_or_div);
      while(match_sum_diff.test(exp))
        exp = exp.replace(match_sum_diff, sum_or_diff);
        this.setState({value: exp});
        typeof exp === 'number' ? calcField.classList.add('err') : calcField.classList.add('ok');
      return exp;
    };

    while(text.indexOf("(") !== -1) // убираем скобки
      text = text.replace(/\(([^\(\)]*)\)/g, get_value);
    
    this.setState({text});
    return get_value("", text);
    
  };

  setValue(ev) {
      const value = document.querySelector('.set_value_field').value;
      this.changeValue('', value);
      //this.setState({value});
  }

  render() {
    
    const {text, value} = this.state;
    
    return (
        <div className="calculatedInput">
            <div class="input-group mb-3">
                <input type="text" 
                    className=" calc_field form-control" 
                    placeholder="Введите числовое выражение" 
                    aria-label="Вычисляемое значение" 
                    aria-describedby="basic-addon2" 
                    onChange={(ev) => this.changeValue(ev, '')}
                />
                <div className="input-group-append">
                <span className="input-group-text exp_value">{value !== 'NaN' ? value : '?'}</span>
                </div>
            </div>
            <ul>
                <li>Value: {value} </li>
                <li>Text: {text}</li>
                <li>Valid: {value !== 'NaN' ? 'true' : 'false'} </li>
            </ul>
            <div class="input-group mb-3">
                <button onClick={(ev) => this.setValue(ev)}>Set value</button>
                <input type="text" 
                    className="set_value_field form-control" 
                />
            </div>
            <div className="input-group mb-3">
                <button>Set text</button>
                <input type="text" 
                    className="calc_field form-control" 
                    onBlur={(ev) => this.changeText(ev)}
                />
            </div>
        </div>
        
    );
  }
}

export default CalculatedInput;
