const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?"
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDay = (timestamp) => days[new Date(timestamp).getDay()];
export const getMonth = (timestamp) => months[new Date(timestamp).getMonth()];
export const getDate = (timestamp) => new Date(timestamp).getDate();

export const handleFormSubmit = (e, locationString, callback) => {
    e.preventDefault()
    fetch(`${API_BASE_URL}locations=${locationString}&aggregateHours=1&unitGroup=us&forecastDays=6&shortColumnNames=false&contentType=json&key=${process.env.REACT_APP_API_KEY}`)
        .then(data => data.json())
        .then((json) => {
            if (json.locations) {
                const { locations } = json
                // results from this api are bound to a dynamically generated key that is equal to whatever the location the user searched for, e.g. "troy,ny" or a pair of lon/lat coordinates
                let locationKey = Object.keys(locations)[0];
                const { address, values, currentConditions } = locations[locationKey];
                let relevantTemps = values.filter(({ datetime }) => new Date(datetime) <= new Date(datetime - (5 * 60 * 60 * 1000)).setHours(6, 0, 0) || (new Date(datetime) >= new Date(datetime - (5 * 60 * 60 * 1000)).setHours(18, 0, 0) && new Date(datetime - (5 * 60 * 60 * 1000)) <= new Date(datetime).setHours(23, 0, 0)))
                callback({ address, relevantTemps, currentConditions })
            } else {
                callback(json)
            }
        })
        .catch(err => callback(err))
}

export const handleFormInput = (callback, callbackArg) => callback(callbackArg)

export const compareTemps = (obj, obj2, time) => time === "high" ? Math.max(obj[time], obj2[time]) : Math.min(obj[time], obj2[time])

export const getOvernightMetrics = (weekArray) => {
    let overnightTemperatures = [];
    let loopLength = weekArray.length - 1 // Do not loop the final day since we don't have nextMorning data
    weekArray.slice(0, loopLength).forEach((day, index) => {
        let overnight = {};
        let night = day.evening;
        let nextMorning = weekArray[index + 1].morning;
        overnight["day"] = day.day;
        overnight["high"] = compareTemps(night, nextMorning, "high");
        overnight["low"] = compareTemps(night, nextMorning, "low");
        overnightTemperatures.push(overnight)
    })
    return overnightTemperatures;
};