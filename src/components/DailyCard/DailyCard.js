import HourlyRow from 'components/HourlyRow/HourlyRow'


function DailyCard({ overnights }) {
    return (
        <div className="DailyCard">
            <h1>
                We have a right column!
            </h1>
            <ul>
                {
                    overnights.map(night => < HourlyRow key={night["day"]} {...night} />)
                }
            </ul>
        </div>

    )
}


export default DailyCard;