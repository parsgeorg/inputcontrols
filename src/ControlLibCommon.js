import React from 'react';
import NumericInput from './Components/NumericInput/index';
import CalcInput from './Components/CalcInput/index';

const ControlLibCommon = ({typeField}) => {
    return (<div className="lib-controls">
            {typeField === 'numeric' ? <NumericInput/> : <CalcInput/>}
        </div>);

}

export default ControlLibCommon;
