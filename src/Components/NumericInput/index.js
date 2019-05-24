import React, {Component} from 'react';
import {setFieldBorderOnBlur, setFieldBorderOnFocus, validateNumeric} from '../../helpers/Validation';
import View from './View';

/**component NumericInput*/
class NumericInput extends Component {
    
    /**local state of  NumericInput*/
    state = {
        valueNumericInput: '',
        textNumericInput: '',
        isNumericValid: true,
        isNumericInputTouched: false
    }

    /**component of life circle*/
    componentDidUpdate(prevProps, prevState) {
        /**call function to set border of field on focus*/
        this.setFieldBorderOnFocus();
    }

    /**method - handler  for change text in input*/
    changeTextNumericInput(ev) {
        const textNumericInput = ev.target.value;
        this._validateAndSet(textNumericInput);
    }

    /**method - for set value from input  in local state*/
    setValue() {
        const {id} = this.props;
        let valueNumericInput = document.getElementById(`input_value_field_${id}`).value;
        this.setState({valueNumericInput});
    }
    
    /**method - for validate and set value from inputs  in local state*/
    _validateAndSet(textNumericInput) {
        let valueNumericInput = textNumericInput === '' ? 'null' : Number(textNumericInput);
        const isNumericValid = valueNumericInput === '' || valueNumericInput === 'null' || validateNumeric(valueNumericInput) === '';
        if (!isNumericValid) {
            valueNumericInput = 'undefined';
        }
        this.setState({textNumericInput, valueNumericInput, isNumericValid, isNumericInputTouched: true});
    }

    /**method - for validate and set text from input */
    setText() {
        const {id} = this.props;
        const textNumericInput = document.getElementById(`input_text_field_${id}`).value;
        this._validateAndSet(textNumericInput);
    }

    /**method - for set border of field by focus*/
    setFieldBorderOnFocus() {
        const {id} = this.props;
        setFieldBorderOnFocus(this.state.isNumericValid, `field_${id}`);
    };

    /**method - for set border of field by event onBlur*/
    setFieldBorderOnBlur() {
        const {id} = this.props;
        setFieldBorderOnBlur(this.state.isNumericValid, `field_${id}`);
    };

    /**method - for render content of this component*/
    render() {
        const {id} = this.props;
        const {valueNumericInput, textNumericInput, isNumericInputTouched, isNumericValid} = this.state;
        const {changeTextNumericInput, setValue, setText, setFieldBorderOnFocus, setFieldBorderOnBlur} = this;

        const changeTextNumeric = changeTextNumericInput.bind(this);
        const defineValue = setValue.bind(this);
        const defineText = setText.bind(this);
        const setFieldBorderByFocus = setFieldBorderOnFocus.bind(this);
        const setFieldBorderByBlur = setFieldBorderOnBlur.bind(this);

        const data = {
            id,
            valueNumericInput, textNumericInput, isNumericInputTouched, isNumericValid,
            changeTextNumeric, defineValue, defineText, setFieldBorderByFocus, setFieldBorderByBlur
        }
        return <View {...data}/>
    }

}

export default NumericInput;
