import { getMonth, getDay, getDate } from './services'
// const [hourlyWeather, setHourlyWeather] = useState(null)

function HourlyRow({ high, low, day }) {
    return (<li>
        <h1>{getDay(day)}, {getMonth(day)}, {getDate(day)}</h1>
        Overnight High: {high} Degrees, Overnight Low: {low} Degrees
    </li>)
}

export default HourlyRow;