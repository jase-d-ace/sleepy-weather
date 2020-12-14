import { getMonth, getDay, getDate } from './services'
// const [hourlyWeather, setHourlyWeather] = useState(null)

function HourlyRow({ morning, evening, day }) {
    return (<li>
        <h1>{getDay(day)}, {getMonth(day)}, {getDate(day)}</h1>
        {evening.low} Degrees
    </li>)
}

export default HourlyRow;