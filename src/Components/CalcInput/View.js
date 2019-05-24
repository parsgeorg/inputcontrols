import React from 'react';

/**dump component for render content from props of smart comp*/
const View = ({id, text, value, isValid, changeVal, defineValue, defineText, setFieldBorderByFocus, setFieldBorderByBlur}) => {
    return (
        <div className="list-group calculatedInput">
            <div className="input-group mb-3">
                <input id={`field_${id}`}
                       type="text"
                       className="calc_field form-control"
                       placeholder="Arithmetic expression"
                       aria-label="Arithmetic expression"
                       aria-describedby="basic-addon2"
                       onChange={(ev) => changeVal(ev, '')}
                       onFocus={(ev) => setFieldBorderByFocus(ev)}
                       onBlur={(ev) => setFieldBorderByBlur(ev)}
                       value={text}
                />
                <div className="input-group-append">
                    <span className="input-group-text exp_value">{isValid ? value : '?'}</span>
                </div>
            </div>
            <ul>
                <li>Value: {value} </li>
                <li>Text: {text}</li>
                <li>Valid: {isValid && isValid ? 'true' : 'false'} </li>
            </ul>
            <div className="input-group mb-3">
                <button className={'button mr-2'} onClick={(ev) => defineValue(ev)}>Set value</button>
                <input id={`input_value_field_${id}`}
                       type="text"
                       className="set_value_calc_field form-control"
                />
            </div>
            <div className="input-group mb-3">
                <button className={'button mr-2'} onClick={(ev) => defineText(ev)}>Set text</button>
                <input id={`input_text_field_${id}`}
                       type="text"
                       className="set_text_calc_field form-control"
                />
            </div>
        </div>

    );
}

export default View;
