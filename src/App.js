import React from 'react';
import ControlComponent from "./Components/ControlComponent/ControlComponent";

/**main component of this app */
const App = () => {

    return (
        <div className="App">
            <header className="header">
                <h1>
                    Input controls text
                </h1>
            </header>
            <ControlComponent/>
        </div>
    );
}

export default App;
