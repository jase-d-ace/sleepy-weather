import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { handleFormSubmit, handleFormInput } from './services';

function App() {
  const [locationString, setLocationString] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (responseData) {
      if (!responseData.address) {
        setResponseData(null);
        setError(responseData);
      }
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <form onSubmit={(e) =>handleFormSubmit(e, locationString, setResponseData)}>
        <input type="text" placeholder="enter location" onChange={(e) => handleFormInput(setLocationString, e.target.value)} />
        <input type="submit" value="Click me" /> 
      </form>
    </div>
  );
}

export default App;
