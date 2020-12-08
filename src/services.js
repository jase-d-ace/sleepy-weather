import _ from 'underscore'
const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?"

export const handleFormSubmit = (e, locationString, callback) => {
  e.preventDefault()
  fetch(`${API_BASE_URL}locations=${locationString}&aggregateHours=1&unitGroup=us&forecastDays=8&shortColumnNames=false&contentType=json&key=${process.env.REACT_APP_API_KEY}`)
  .then(data => data.json())
  .then(({locations}) => {
    // results from this api are bound to a dynamically generated key that is equal to whatever the location the user searched for, e.g. "troy,ny" or a pair of lon/lat coordinates
    let locationKey = Object.keys(locations)[0];
    const { address, values, currentConditions } = locations[locationKey];
    callback({address, values, currentConditions})
  })
  .catch(err => err)
}

export const handleFormInput = (callback, callbackArg) => (_.debounce(() => callback(callbackArg), 70))()