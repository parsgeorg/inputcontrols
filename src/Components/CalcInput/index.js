import React, {Component} from 'react';
import {setFieldBorderOnBlur, setFieldBorderOnFocus, validateNumeric} from '../../helpers/Validation';
import View from './View';

class CalcInput extends Component {

    state = {
        text: '',
        value: null,
        isValid: true
    }

    componentDidUpdate(prevProps, prevState) {
        this.setFieldBorderOnFocus();
    }

    _callSubscriber() {
        console.log('observer');
    }

    subscribe(observer) {
        this._callSubscriber = observer;
    }

    changeValue(ev) {
        const text = ev.target.value || '';
        const value = this._calculate(text) || '';
        const isValid = (text === '' && value === '') || validateNumeric(value) === '';

        this.setState({text, value, isValid});
    };

    setValue() {
        let value = document.querySelector('.set_value_calc_field').value;
        value = this._calculate(value);
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
            return sub == '' ? '' : '(' + sub + ')';
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
            while (exp.indexOf("^") !== -1)
                exp = exp.replace(match_power, power);
            while (match_mult_div.test(exp))
                exp = exp.replace(match_mult_div, mult_or_div);
            while (match_sum_diff.test(exp))
                exp = exp.replace(match_sum_diff, sum_or_diff);
            return exp;
        };
        while (str.indexOf("(") !== -1 && str.indexOf(")") !== -1) {
            // убираем скобки
            str = str.replace(/\(([^\(\)]*)\)/g, get_value);
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

        const data = {
            text,
            value,
            isValid,
            changeVal,
            defineValue,
            defineText,
            setFieldBorderByFocus,
            setFieldBorderByBlur
        }

        return <View {...data} />
    }

}

export default CalcInput;
