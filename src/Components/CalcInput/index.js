import React, {Component} from 'react';
import {setFieldBorderOnBlur, setFieldBorderOnFocus, validateNumeric} from '../../helpers/Validation';
import calculate from '../../helpers/calc'
import View from './View';


/**component CalcInput */
class CalcInput extends Component {

    /**local state of this component*/
    state = {
        text: '',
        value: '',
        isValid: true
    }

    /**component of life circle*/
    componentDidUpdate(prevProps, prevState) {
         /**call function to set border of field on focus*/
        this.setFieldBorderOnFocus();
    }

    /**this method and method subscribe can be used for subcribe on store changes - now is not active */
    _callSubscriber() {
        console.log('observer');
    }

    subscribe(observer) {
        this._callSubscriber = observer;
    }

    /**method - handler  for change val in input*/
    changeValue(ev) {
        const text = ev.target.value || '';
        this._validateAndSet(text);
    };

    /**method - handler  for set val in input*/
    setValue() {
        const {id} = this.props;
        let value = document.getElementById(`input_value_field_${id}`).value;
        this.setState({value});
    }

    /**method - handler  for set text in input*/
    setText() {
        const {id} = this.props;
        const text = document.getElementById(`input_text_field_${id}`).value;
        this._validateAndSet(text);
    }

    /**method - for validate and set value from inputs  in local state*/
    _validateAndSet(text) {
        const calculateValue = calculate(text);
        let value = calculateValue === 0 ? 0 : calculateValue || 'null';
        const isValid = (text === '' && value === 'null') || validateNumeric(value) === '';
        if (!isValid) {
            value = 'undefined';
        }

        this.setState({text, value, isValid});
    }

    

    /**method - for set border of field by focus*/
    setFieldBorderOnFocus() {
        const {id} = this.props;
        setFieldBorderOnFocus(this.state.isValid, `field_${id}`);
    };

    /**method - for set border of field by blur*/
    setFieldBorderOnBlur() {
        const {id} = this.props;
        setFieldBorderOnBlur(this.state.isValid, `field_${id}`);
    };

    /**method - for render content of this component*/
    render() {
        const {id} = this.props;
        const {text, value, isValid} = this.state;
        const {changeValue, setValue, setText, setFieldBorderOnFocus, setFieldBorderOnBlur} = this;

        const changeVal = changeValue.bind(this);
        const defineValue = setValue.bind(this);
        const defineText = setText.bind(this);
        const setFieldBorderByFocus = setFieldBorderOnFocus.bind(this);
        const setFieldBorderByBlur = setFieldBorderOnBlur.bind(this);

        const data = {
            id,
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
