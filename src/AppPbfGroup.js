import React, { Component } from 'react';
import {validateNumeric} from './helpers/Validation';
import UsersDevices  from './UsersDevices';

class App extends Component {
  state = {
    textNumericInput: 0,
    valueNumericInput: 0,
    isNumericInputTouched: false
  }

  render() {
    
    return (
      <div className="App">
        <header className="header">
          <h1>
            Устройства пользователей
          </h1>
          <UsersDevices />
        </header>
      </div>
    );
  }
}

export default App;
