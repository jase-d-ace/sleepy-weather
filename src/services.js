const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?"

export const callAPI = () => {
  fetch(`${API_BASE_URL}locations=73.6918,42.7284&aggregateHours=24&unitGroup=us&shortColumnNames=false&contentType=json&key=${process.env.REACT_APP_API_KEY}`)
  .then(data => data.json())
  .then(json => console.log('json!', json))
  .catch(err => err)
}