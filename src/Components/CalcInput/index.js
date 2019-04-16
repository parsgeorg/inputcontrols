import React, {Component, useState} from 'react';
import {validateNumeric, setFieldBorderOnFocus, setFieldBorderOnBlur} from '../../helpers/Validation';
import View from './View';

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

    //const [text, value, isValid] = useState([{ text: 'Learn Hooks' }]);

    _callSubscriber() {
        console.log('observer');
    }

    subscribe(observer) {
        this._callSubscriber = observer;
    }

    changeValue(ev) {
        const text = ev.target.value ||  'null';
        const value = this._calculate(text) || 'null';
        const isValid = validateNumeric(value) === '';

        this.setFieldBorderOnFocus();
        this.setState({text, value, isValid});

    };

    setValue() {
        let value = document.querySelector('.set_value_calc_field').value;
        value = this.calculate(value);
        const text = value;
        const isValid = validateNumeric(value) === '';
        this.setState({text, value, isValid});

    }

    setText() {
        const text = document.querySelector('.set_text_calc_field').value;
        const value = this.calculate(text);
        const isValid = validateNumeric(value) === '';
        this.setState({text, value, isValid});
    }

    _calculate(str) {
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

    setFieldBorderOnFocus() {
        setFieldBorderOnFocus(this.state.isValid, '.calc_field');
    };

    setFieldBorderOnBlur() {
        setFieldBorderOnBlur(this.state.isValid, '.calc_field');
    };

    render() {
        const {text, value, isValid} = this.state;
        const {changeValue, setValue, setText, setFieldBorderOnFocus, setFieldBorderOnBlur} = this;

        const changeVal = changeValue.bind(this);
        const defineValue = setValue.bind(this);
        const defineText = setText.bind(this);
        const setFieldBorderByFocus = setFieldBorderOnFocus.bind(this);
        const setFieldBorderByBlur = setFieldBorderOnBlur.bind(this);

        const data = {text, value, isValid, changeVal, defineValue, defineText, setFieldBorderByFocus, setFieldBorderByBlur}

        return <View {...data} />
    }
}

export default CalcInput;
