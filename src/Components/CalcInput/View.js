import React from 'react';

const View = ({text, value, isValid, changeVal, defineValue, defineText, setFieldBorderByFocus, setFieldBorderByBlur}) => {
    return (
        <div className="calculatedInput">
            <div className="input-group mb-3">
                <input type="text"
                       className="calc_field form-control "
                       placeholder="Введите числовое выражение"
                       aria-label="Вычисляемое значение"
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
                <li>Valid: {isValid && isValid ? 'true': 'false'} </li>
            </ul>
            <div className="input-group mb-3">
                <button onClick={(ev) => defineValue(ev)}>Set value</button>
                <input type="text"
                       className="set_value_calc_field form-control"
                />
            </div>
            <div className="input-group mb-3">
                <button onClick={(ev) => defineText(ev)}>Set text</button>
                <input type="text"
                       className="set_text_calc_field form-control"
                />
            </div>
        </div>

    );
}

export default View;
