const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?";
export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const getDay = (timestamp) => days[new Date(timestamp).getDay()];
export const getMonth = (timestamp) => months[new Date(timestamp).getMonth()];
export const getDate = (timestamp) => new Date(timestamp).getDate();

export const handleFormSubmit = (e, locationString, callback) => {
    e.preventDefault();
    //https://stackoverflow.com/questions/59037553/fetch-multiple-urls-at-the-same-time
    Promise.all([
        fetch(`${API_BASE_URL}locations=${locationString}&aggregateHours=1&unitGroup=us&forecastDays=6&shortColumnNames=false&contentType=json&key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .catch(err => err),
        fetch(`${API_BASE_URL}locations=${locationString}&aggregateHours=24&unitGroup=us&forecastDays=6&shortColumnNames=false&contentType=json&key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .catch(err => err)
    ])
        .then(([hourly, weekly]) => {
            const { locations: hourlyTemps } = hourly;
            let locationKey = Object.keys(hourlyTemps)[0];
            const { address, values, currentConditions } = hourlyTemps[locationKey];
            let relevantTemps = values.filter(
                ({ datetime }) =>
                    new Date(datetime) <= new Date(datetime - 5 * 60 * 60 * 1000).setHours(6, 0, 0) ||
                    (new Date(datetime) >= new Date(datetime - 5 * 60 * 60 * 1000).setHours(18, 0, 0) &&
                        new Date(datetime - 5 * 60 * 60 * 1000) <= new Date(datetime).setHours(23, 0, 0))
            );

            const { locations: weeklyTemps } = weekly;
            let weeklyLocationKey = Object.keys(weeklyTemps)[0];
            const { values: weeklyValues } = weeklyTemps[weeklyLocationKey];
            console.log(weeklyValues)
            callback({ address, relevantTemps, currentConditions, weeklyValues });
        })
        .catch(err => callback(err));
};

export const handleFormInput = (callback, callbackArg) => callback(callbackArg);

export const compareTemps = (obj, obj2, time) =>
    time === "high" ? Math.max(obj[time], obj2[time]) : Math.min(obj[time], obj2[time]);

export const getOvernightMetrics = (weekArray) => {
    let overnightTemperatures = [];
    let loopLength = weekArray.length - 1; // Do not loop the final day since we don't have nextMorning data
    weekArray.slice(0, loopLength).forEach((day, index) => {
        let overnight = {};
        let night = day.evening;
        let nextMorning = weekArray[index + 1].morning;
        overnight["day"] = day.day;
        overnight["high"] = compareTemps(night, nextMorning, "high");
        overnight["low"] = compareTemps(night, nextMorning, "low");
        overnightTemperatures.push(overnight);
    });
    return overnightTemperatures;
};
