import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { handleFormSubmit, handleFormInput, getMonth, getDay, getDate } from './services';
import DailyCard from './DailyCard';
// import DailyRow from './DailyRow';

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
                    if (!hash.hasOwnProperty(new Date(hour.datetime).getDate())) hash[new Date(hour.datetime).getDate()] = [];
                    hash[new Date(hour.datetime).getDate()].push(hour);
                    return hash;
                }, {});
                const groupedByDay = Object.keys(hourHash).map(hour => hourHash[hour])
                //unorganized array of arrays of objects ordered by datetime ascending for 8 days
                setWeeklyHighsAndLows(groupedByDay)

                const groupedByTime = groupedByDay.map((day) => {
                    let mornings = [];
                    let evenings = [];
                    day.forEach(hour => {
                        if (new Date(hour.datetime).getHours() <= 6) {
                            mornings.push(hour);
                        } else if ((new Date(hour.datetime) >= new Date(hour.datetime - (5 * 60 * 60 * 1000)).setHours(18, 0, 0) && new Date(hour.datetime) <= new Date(hour.datetime - (5 * 60 * 60 * 1000)).setHours(23, 0, 0))) {
                            evenings.push(hour);
                        }
                    });
                    return [mornings, evenings]
                });
                // array of arrays of two - array pairs grouping days of weather data into morning or evening data
                setWeeklyTempsByTime(groupedByTime)
                const drilledDown = groupedByTime.map((timebuckets) => {
                    // array of temperatures per hour grouped by time bucket
                    const highsAndLowsPerBucket = timebuckets.map(bucket => bucket.map(hour => hour["temp"]));
                    return {
                        morning: {
                            high: highsAndLowsPerBucket[0].length ? Math.max(...highsAndLowsPerBucket[0]) : null,
                            low: highsAndLowsPerBucket[0].length ? Math.min(...highsAndLowsPerBucket[0]) : null,
                        },
                        evening: {
                            high: Math.max(...highsAndLowsPerBucket[1]),
                            low: Math.max(...highsAndLowsPerBucket[1])
                        },
                        day: timebuckets[0].length ? new Date(timebuckets[0][0]["datetime"]) : new Date(timebuckets[1][0]["datetime"])
                    }
                })

                // aggregate array of objects that hold morning high and low for each day
                setOvernights(drilledDown)
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
                {
                    overnights &&
                    <DailyCard overnights={overnights} />
                }

            </header>
        </div>
    );
}

export default App;
