import React, {Component} from 'react';
import {validateNumeric} from './helpers/Validation';

class CalcInput extends Component {
    /*•	If the text is empty, then the ‘value’ property value is null, isValid is true.
    When the ‘value’ property is assigned with the new value in code, it updates the ‘text’
    property value with the value string representation (empty string for a null value), and
    isValid becomes true. If ‘value’ is assigned with an undefined value, it’s converted to a null value.
    предусмотреть  Focused, invalid:
    */
    state = {
        text: '',
        value: null,
        isValid: true
    }

    _callSubscriber() {
        console.log('observer');
    }

    subscribe(observer) {
        this._callSubscriber = observer;
    }

    changeValue(ev) {
        //const calcField = document.querySelector('.calc_field');
        const text = ev.target.value || '';
        //const value = this.calculateResult(text) || 'undefined';
        //const text = ev.target.value || 'null'; //(3+4)7 - дает 77
        //const value = this.calculate(text) || 'undefined';
        const value = this.calculate(text);
        const isValid = validateNumeric(value) === '';
        this.setState({text, value, isValid});
        // this.setFieldBorderOnFocus();
    };

    setValue(ev) {
        let value = document.querySelector('.set_value_calc_field').value;
        value = this.calculate(value);
        const text = value;
        const isValid = validateNumeric(value) === '';
        this.setState({text, value, isValid});
    }

    setText(ev) {
        const text = document.querySelector('.set_text_calc_field').value;
        const value = this.calculate(text);
        const isValid = validateNumeric(value) === '';
        this.setState({text, value, isValid});
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    calculate(str) {
        if (str.replace(/[\d+\-\/*\(\)]+/g, '').length > 0) {
            return NaN;
        }
        let number_group = function (sub) {
            return sub=='' ? '' : '(' + sub + ')';
        };
        str = str.replace(/[\d]*/g, number_group);
        if (str.indexOf(')(') != -1) {
            return NaN;
        }

        let sum_or_diff = function (sub, a, sign, b) {
            return sign === "-" ? a - b : +a + +b;
        };
        let mult_or_div = function (sub, a, sign, b) {
            return sign === "*" ? a * b : a / b;
        };
        let power = function (sub, a, b) {
            return Math.pow(a, b);
        };
        const match_power = /(-?[\d\.]+)\s*\^\s*(-?[\d\.]+)/g;
        const match_mult_div = /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/g;
        const match_sum_diff = /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/g;

        let get_value = function (sub, exp) {
            console.log('sub', sub);
            console.log('exp', exp);
            while (exp.indexOf("^") !== -1)
                exp = exp.replace(match_power, power);
            while (match_mult_div.test(exp))
                exp = exp.replace(match_mult_div, mult_or_div);
            while (match_sum_diff.test(exp))
                exp = exp.replace(match_sum_diff, sum_or_diff);
            return exp;
        };
        while (str.indexOf("(") !== -1 && str.indexOf(")") !== -1) {
            console.log('str >> ', str);
            // убираем скобки
            str = str.replace(/\(([^\(\)]*)\)/g, get_value);
            console.log('str << ', str);
        }

        if (str.indexOf("(") !== -1 || str.indexOf(")") !== -1) {
            return NaN;
        }

        return parseInt(get_value("", str));
    };

    setFieldBorderOnFocus(ev) {
        const isValid = this.state.isValid;
        const field = document.querySelector('.calc_field');
        if(isValid) {
            field.classList.remove('err');
            field.classList.remove('focusInValid');
            field.classList.add('ok');
        }
        else {
            field.classList.remove('ok');
            field.classList.remove('err');
            field.classList.add('focusInValid');
        }
    };

    setFieldBorderOnBlur(ev) {
        const isValid = this.state.isValid;
        const field = document.querySelector('.calc_field');
        if(isValid) {
            field.classList.remove('err');
            field.classList.remove('focusInValid');
            field.classList.add('ok');
        }
        else {
            field.classList.remove('ok');
            field.classList.remove('focusInValid');
            field.classList.add('err');
        }
    };


    // setFieldBorderOnFocus(ev) {
    //     const isValid = this.state.isValid;
    //     // console.log('setFieldBorderOnFocus -> isValid -> ', isValid);
    //     const field = document.querySelector('.calc_field');
    //     field.classList.remove('err');
    //     field.classList.remove(isValid ? 'focusInValid' : 'ok');
    //     field.classList.add(isValid ? 'ok' : 'focusInValid');
    // };

    // setFieldBorderOnBlur(ev) {
    //     const isValid = this.state.isValid;
    //     // console.log('setFieldBorderOnBlur -> isValid -> ', isValid);
    //     const field = document.querySelector('.calc_field');
    //     field.classList.remove('focusInValid');
    //     field.classList.remove(isValid ? 'err' : 'ok');
    //     field.classList.add(isValid ? 'ok' : 'err');
    // };

    render() {
        const {text, value, isValid} = this.state;

        // console.log('state -> isValid -> ', isValid);

        // const customStyles = {
        //     control: (base, state) => ({
        //         ...base,
        //         borderColor: state.isFocused ?
        //             '#ddd' : isValid ?
        //                 '#ddd' : 'red',
        //         // overwrittes hover style
        //         '&:hover': {
        //             borderColor: state.isFocused ?
        //                 '#ddd' : isValid ?
        //                     '#ddd' : 'red'
        //         }
        //     })
        // }

        return (
            <div className="calculatedInput">
                <div className="input-group mb-3">
                    <input type="text"
                           className="calc_field form-control "
                           placeholder="Введите числовое выражение"
                           aria-label="Вычисляемое значение"
                           aria-describedby="basic-addon2"
                           onChange={(ev) => this.changeValue(ev, '')}
                           onFocus={(ev) => this.setFieldBorderOnFocus(ev)}
                           onBlur={(ev) => this.setFieldBorderOnBlur(ev)}
                           value={text}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text exp_value">{isValid ? value : '?'}</span>
                    </div>
                </div>
                <ul>
                    <li>Value: {value} </li>
                    <li>Text: {text}</li>
                    <li>Valid: {isValid && isValid ? 'true': 'false'} </li>
                </ul>
                <div className="input-group mb-3">
                    <button onClick={(ev) => this.setValue(ev)}>Set value</button>
                    <input type="text"
                           className="set_value_calc_field form-control"
                    />
                </div>
                <div className="input-group mb-3">
                    <button onClick={(ev) => this.setText(ev)}>Set text</button>
                    <input type="text"
                           className="set_text_calc_field form-control"
                    />
                </div>
            </div>

        );
    }
}

export default CalcInput;
