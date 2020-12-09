import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { handleFormSubmit, handleFormInput } from './services';

function App() {
  const [locationString, setLocationString] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [weeklyTempsByTime, setWeeklyTempsByTime] = useState(null)
  // const [weeklyHighsAndLows, setWeeklyHighsAndLows] = useState(null)
  // const [overnights, setOvernights] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    if (responseData) {
      if (!responseData.address) {
        setError(responseData);
        setResponseData(null);
      } else {
        let valuesArray = responseData.values;
        let relevantTemps = valuesArray.filter(({ datetimeStr }) => new Date(datetimeStr) <= new Date(datetimeStr).setHours(6, 0, 0) || (new Date(datetimeStr) >= new Date(datetimeStr).setHours(18, 0, 0) && new Date(datetimeStr) <= new Date(datetimeStr).setHours(23, 0, 0)))
        console.log('combined relevent temperatures:', relevantTemps)
        setWeeklyTempsByTime(relevantTemps)
      }
    }
  },[responseData])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={(e) => handleFormSubmit(e, locationString, setResponseData)}>
          <input type="text" placeholder="enter location" onChange={(e) => handleFormInput(setLocationString, e.target.value)} />
          <input type="submit" value="Click me" />
        </form>
      </header>
    </div>
  );
}

export default App;
