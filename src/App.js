import React from 'react';
import ControlLibCommon from './ControlLibCommon';

const App = () => {
    return (<div className="App">
            <header className="header">
                <h1>
                    Своя библиотека чисел
                </h1>
                <ControlLibCommon typeField="numeric"/>
                <ControlLibCommon typeField="calc"/>
            </header>
            <button>Destroy all</button>
        </div>);
}

export default App;
