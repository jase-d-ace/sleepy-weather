import HourlyRow from 'components/HourlyRow/HourlyRow'
import { getDay, getDate, getMonth } from '../../services'


function DailyCard({ high, low, day, hourly }) {
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
            <ul>
                <li className="DailyCard__hourly">
                    <div className="hour">
                        <div>
                            6pm
                        </div>
                        <div>
                            24F
                        </div>
                        <div>
                            Clear Skies
                        </div>
                        <div>
                            🌨️
                    </div>
                    </div>


                </li>

                {/* {
                    hourly.map(hour => < HourlyRow key={hour["datetime"]} {...hour} />)
                } */}
            </ul>
        </div>

    )
}


export default DailyCard;