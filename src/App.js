import React, { Component } from 'react';
import NumericInput  from './NumericInput';
import CalcInput  from './CalcInput';

//каждое поле - свой класс
//HTML: <div id="numInput" ></div>
//ES6: let numInput = new NumericInput('numInput');
//comments on eng
class App extends Component {
  state = {
    textNumericInput: 0,
    valueNumericInput: 0,
    isNumericInputTouched: false
  }

  changeTextNumericInput(ev) {
    let textNumericInput = ev.target.value;
    const valueNumericInput = Number(textNumericInput);
    this.setState({textNumericInput, valueNumericInput, isNumericInputTouched: true});
  }

  render() {
    /*When the ‘value’ property is assigned with the new value in code, it updates the ‘text’ property value with the value
     string representation (empty string for a null value), and isValid becomes true. If ‘value’ is assigned with an undefined 
     value, it’s converted to a null value.
     The ‘text’ property value is always in sync with the text in the input field.
     The common rule is that any change in the property values or input field should be immediately reflected in the control 
     state (all property values) and control’s visual representation.
    
     Events
      Each of the abovementioned properties has a corresponding “Changed” event, like valueChanged, textChanged and isValidChanged. 
      Such an event is triggered when corresponding property value has changed. 
      Events should provide a possibility to add multiple subscribers. They can be implemented using the Observer pattern
     */
    return (
      <div className="App">
        <header className="header">
          <h1>
            Своя библиотека чисел
          </h1>
          <NumericInput />
          <CalcInput />
        </header>
        <button>Destroy all</button>
      </div>
    );
  }
}

export default App;
