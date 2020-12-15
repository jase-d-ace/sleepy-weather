import HourlyRow from './HourlyRow'


function DailyCard({ overnights }) {
    return (
        <div className="daily-card">
            <h1>We have a right column!</h1>
            <ul>
                {
                    overnights.map(night => < HourlyRow key={night["day"]} {...night} />)
                }
            </ul>
        </div>

    )
}


export default DailyCard;