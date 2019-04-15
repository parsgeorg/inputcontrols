import React from 'react';
import CalcInput from './CalcInput';
import NumericInput from './NumericInput';

const ControlLibCommon = ({typeField}) => {
    return (<div className="lib-controls">
            {typeField === 'numeric' ? <NumericInput/> : <CalcInput/>}
        </div>);

}

export default ControlLibCommon;
