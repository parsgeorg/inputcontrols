import React, { Component } from 'react';
import {validateNumeric, setFieldBorderOnFocus, setFieldBorderOnBlur} from '../../helpers/Validation';
import View from './View';

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
        this.setFieldBorderOnFocus();
        this.setState({textNumericInput, valueNumericInput, isNumericValid, isNumericInputTouched: true});
    }

    setValue() {
        let valueNumericInput = document.querySelector('.set_value_numeric_field').value;
        const textNumericInput = valueNumericInput;
        const isNumericValid = validateNumeric(valueNumericInput) === '';
        valueNumericInput = isNumericValid ? valueNumericInput : NaN;
        valueNumericInput = isNumericValid ? valueNumericInput : NaN;
        this.setState({textNumericInput, valueNumericInput, isNumericValid, isNumericInputTouched: true});
    }

    setText() {
        const textNumericInput = document.querySelector('.set_text_numeric_field').value;
        const valueNumericInput = Number(textNumericInput);
        const isNumericValid = validateNumeric(valueNumericInput) === '';
        this.setState({textNumericInput, valueNumericInput, isNumericValid, isNumericInputTouched: true});
    }

    setFieldBorderOnFocus() {
        setFieldBorderOnFocus(this.state.isNumericValid, '.numeric_field');
    };

    setFieldBorderOnBlur() {
        setFieldBorderOnBlur(this.state.isNumericValid, '.numeric_field');
    };

    render() {
        const {valueNumericInput, textNumericInput, isNumericInputTouched, isNumericValid } = this.state;
        const {changeTextNumericInput, setValue, setText, setFieldBorderOnFocus, setFieldBorderOnBlur} = this;

        const changeTextNumeric = changeTextNumericInput.bind(this);
        const defineValue = setValue.bind(this);
        const defineText = setText.bind(this);
        const setFieldBorderByFocus = setFieldBorderOnFocus.bind(this);
        const setFieldBorderByBlur = setFieldBorderOnBlur.bind(this);

        const data = {valueNumericInput, textNumericInput, isNumericInputTouched, isNumericValid,
                    changeTextNumeric, defineValue, defineText, setFieldBorderByFocus, setFieldBorderByBlur }
        return <View {...data}/>
    }
}

export default NumericInput;
