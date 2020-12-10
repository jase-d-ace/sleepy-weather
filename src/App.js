import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { handleFormSubmit, handleFormInput } from './services';

function App() {
    const [locationString, setLocationString] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [weeklyTempsByTime, setWeeklyTempsByTime] = useState(null)
    const [weeklyHighsAndLows, setWeeklyHighsAndLows] = useState(null)
    const [overnights, setOvernights] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        if (responseData) {
            if (!responseData.address) {
                setError(responseData);
                setResponseData(null);
            } else {
                // https://codereview.stackexchange.com/questions/111704/group-similar-objects-into-array-of-arrays
                // group relevant hourly data by day, to be parsed again into morning and evening hours later
                const hourHash = responseData.relevantTemps.reduce((hash, hour) => {
                    if (!hash.hasOwnProperty(hour["datetimeStr"].split("T")[0])) hash[hour["datetimeStr"].split("T")[0]] = [];
                    hash[hour["datetimeStr"].split("T")[0]].push(hour);
                    return hash;
                }, {});
                const groupedByDay = Object.keys(hourHash).map(hour => hourHash[hour]);
                // unorganized array of arrays of objects ordered by datetime ascending for 8 days
                setWeeklyHighsAndLows(groupedByDay)

                const groupedByTime = groupedByDay.map((day) => {
                    let mornings = [];
                    let evenings = [];
                    day.forEach(hour => {
                        if (new Date(hour["datetimeStr"]) <= new Date(hour["datetimeStr"]).setHours(6, 0, 0)) {
                            mornings.push(hour);
                        } else {
                            evenings.push(hour);
                        }
                    })
                    return [mornings, evenings]
                })
                // array of arrays of two-array pairs grouping days of weather data into morning or evening data
                setWeeklyTempsByTime(groupedByTime)
            }
        }
    }, [responseData])




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
