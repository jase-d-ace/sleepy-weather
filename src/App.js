import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { callAPI, handleFormSubmit, handleFormInput } from './services';

function App() {
  const [locationString, setLocationString] = useState(null);
  console.log(locationString)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <form onSubmit={(e) => handleFormSubmit(e, locationString, callAPI)}>
        <input type="text" placeholder="enter location" onChange={(e) => handleFormInput(setLocationString, e.target.value)} />
        <input type="submit" value="Click me" /> 
      </form>
    </div>
  );
}

export default App;
