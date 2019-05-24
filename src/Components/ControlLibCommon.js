import React from 'react';
import NumericInput from './NumericInput';
import CalcInput from './CalcInput';

/**common component of the library */
const ControlLibCommon = ({typeField}) => {
    const id = Math.random();
    return (<div className="lib-controls-component">
        {typeField === 'numeric' ? <NumericInput id={id}/> : <CalcInput id={id}/>}
    </div>);
}

export default ControlLibCommon;
