import './DailyRow.scss';
import { getDay, getDate, getMonth } from '../../services'

function DailyRow({ conditions, datetime, maxt, mint, humidity, precip }) {

    return (
        <div className="DailyRow">
            <div className="date-container">
                <span className="date">{getDay(datetime)}</span>
            </div>
            <div className="date-container">
                <span className="date">{getMonth(datetime)} {getDate(datetime)}</span>
            </div>

            <div>
                <span className="high">{maxt}</span>/<span className="low">{mint}</span>
            </div>
            <div>
                <span className="overnight ">19</span>
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