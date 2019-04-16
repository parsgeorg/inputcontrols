import React from 'react';

const View = ({valueNumericInput, textNumericInput, isNumericInputTouched, isNumericValid,
                  setFieldBorderByFocus, setFieldBorderByBlur, changeTextNumeric, defineValue, defineText}) => {
    return (
        <div className="list-group numeric-input">
            <input type='text'
                   className='numeric_field form-control'
                   placeholder="Введите значение для преобразования в число"
                   onChange={(ev) => changeTextNumeric(ev)}
                   onFocus={(ev) => setFieldBorderByFocus(ev)}
                   onBlur={(ev) => setFieldBorderByBlur(ev)}
                   defaultValue={valueNumericInput}
            />
            <div className="status">{isNumericInputTouched  && (isNumericValid ? 'OK!' : 'Ошибка преобразования')}</div>
            <ul>
                <li>Value: {valueNumericInput} </li>
                <li>Text: {textNumericInput} </li>
                <li>Valid: {isNumericValid && isNumericValid ? 'true': 'false'} </li>
            </ul>
            <div className="input-group mb-3">
                <button onClick={(ev) => defineValue(ev)}>Set value</button>
                <input type="text"
                       className="set_value_numeric_field form-control"
                />
            </div>
            <div className="input-group mb-3">
                <button onClick={(ev) => defineText(ev)}>Set text</button>
                <input type="text"
                       className="set_text_numeric_field form-control"
                />
            </div>
            <hr/>
        </div>
    );
}

export default View;
