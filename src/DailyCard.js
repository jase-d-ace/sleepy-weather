import HourlyRow from './HourlyRow'


function DailyCard({ overnights }) {
    return (
        <div className="daily-card">
            <h1>We have a right column!</h1>
            <ul>
                {
                    overnights.map(night => <HourlyRow {...night} />)
                }
            </ul>
        </div>

    )
}


export default DailyCard;