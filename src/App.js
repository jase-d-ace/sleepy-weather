import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { handleFormSubmit, handleFormInput, getOvernightMetrics } from './services';
import DailyCard from './DailyCard';
// import DailyRow from './DailyRow';
// test commit

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
                //array of arrays of objects where each sub-array is one day's worth of 12a-6a and 6p-11p weather data
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
                // array of arrays of tuple arrays, where each individual part of the tuple is a grouping of hours for a given day for the week
                setWeeklyTempsByTime(groupedByTime)

                // array of objects that reduces the above information into a high and low temperature
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

                // array of objects that has already compared the highs and lows of the array, and has returned the highest and lowest temp of the comparisons 
                setOvernights(getOvernightMetrics(drilledDown))
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
