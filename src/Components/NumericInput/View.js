import React from 'react';

/**dump component for render content from props of smart comp*/
const View = ({
                  id, valueNumericInput, textNumericInput, isNumericValid,
                  setFieldBorderByFocus, setFieldBorderByBlur, changeTextNumeric, defineValue, defineText
              }) => {
    return (
        <div className="list-group numeric-input">
            <input id={`field_${id}`}
                   type='text'
                   className='numeric_field form-control'
                   placeholder="Number"
                   onChange={(ev) => changeTextNumeric(ev)}
                   onFocus={(ev) => setFieldBorderByFocus(ev)}
                   onBlur={(ev) => setFieldBorderByBlur(ev)}
                   value={textNumericInput}
            />
            <ul>
                <li>Value: {valueNumericInput} </li>
                <li>Text: {textNumericInput} </li>
                <li>Valid: {isNumericValid && isNumericValid ? 'true' : 'false'} </li>
            </ul>
            <div className="input-group mb-3">
                <button className={'button mr-2'} onClick={(ev) => defineValue(ev)}>Set value</button>
                <input id={`input_value_field_${id}`}
                       type="text"
                       className="set_value_numeric_field form-control"
                />
            </div>
            <div className="input-group mb-3">
                <button className={'button mr-2'} onClick={(ev) => defineText(ev)}>Set text</button>
                <input id={`input_text_field_${id}`}
                       type="text"
                       className="set_text_numeric_field form-control"
                />
            </div>
            <hr/>
        </div>
    );
}

export default View;
