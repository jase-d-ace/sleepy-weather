import HourlyRow from 'components/HourlyRow/HourlyRow'
import { getDay, getDate, getMonth } from '../../services'


function DailyCard({ high, low, day }) {
    return (
        <div className="DailyCard">
            <div className="DailyCard__summary">
                <div className="summary-date">
                    {getDay(day)}, {getMonth(day)} {getDate(day)}
                </div>
                <div className="summary-overnights">
                    Overnight: {high}/{low}
                </div>

            </div>
            <div className="summary-advice">
                It's gonna be chilly, break out the fuzzies and comforter!
                </div>
            {/* <ul>
                {
                    overnights.map(night => < HourlyRow key={night["day"]} {...night} />)
                }
            </ul> */}
        </div>

    )
}


export default DailyCard;