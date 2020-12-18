import { getMonth, getDay, getDate } from '../../services'
// const [hourlyWeather, setHourlyWeather] = useState(null)

function HourlyRow({ high, low, day }) {
    return (<li>
        <p>{getDay(day)}, {getMonth(day)}, {getDate(day)}</p>
        Overnight High: {high} Degrees, Overnight Low: {low} Degrees
    </li>)
}

export default HourlyRow;