import './DailyRow.scss';
import { getDay, getDate, getMonth, TIMEZONE_DIFFERENCE } from '../../services'

function DailyRow({ conditions, datetime, maxt, mint, high, low, day }) {

    return (
        <div className="DailyRow">
            <div className="date-container">
                <span className="date">{getDay(datetime - TIMEZONE_DIFFERENCE)}</span>
            </div>
            <div className="date-container">
                <span className="date">{getMonth(datetime - TIMEZONE_DIFFERENCE)} {getDate(datetime - TIMEZONE_DIFFERENCE)}</span>
            </div>

            <div>
                <span className="high">{maxt}</span>/<span className="low">{mint}</span>
            </div>
            <div>
                <span className="overnight">{low ? low : "N/A"}</span>
            </div>
            <div>
                {conditions}
            </div>
            <div>
                🌨️
            </div>
        </div>

    )
}


export default DailyRow;