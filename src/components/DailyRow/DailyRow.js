import './DailyRow.scss';
import { getDay, getDate, getMonth } from '../../services'

function DailyRow({ conditions, datetime, maxt, mint, humidity, precip }) {

    return (
        <div className="DailyRow">
            <div>
                {getDay(datetime)}
            </div>
            <div>
                {getMonth(datetime)} {getDate(datetime)}
            </div>

            <div>
                {maxt}/{mint}
            </div>
            <div>
                19
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