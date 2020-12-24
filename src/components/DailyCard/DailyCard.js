import HourlyRow from 'components/HourlyRow/HourlyRow'
import { getDay, getDate, getMonth, TIMEZONE_DIFFERENCE } from '../../services'


function DailyCard({ datetime, high, low, day, hourly }) {
    return (
        <div className="DailyCard">
            <div className="DailyCard__summary">
                <div className="summary-date">
                    {getDay(day - TIMEZONE_DIFFERENCE)}, {getMonth(day - TIMEZONE_DIFFERENCE)} {getDate(day - TIMEZONE_DIFFERENCE)}
                </div>
                <div className="summary-overnights">
                    Overnight: {high}/{low}
                </div>

            </div>
            <div className="summary-advice">
                It's gonna be chilly, break out the fuzzies and comforter!
                </div>
            <ul>
                {
                    hourly.map(hour => < HourlyRow key={hour["datetime"]} {...hour} />)
                }
            </ul>
        </div>

    )
}


export default DailyCard;