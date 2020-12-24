import { getMonth, getDay, getDate } from "services";
// const [hourlyWeather, setHourlyWeather] = useState(null)

function HourlyRow({ datetime, temp, conditions }) {
    return (
        <li className="DailyCard__hourly">
            <div className="hour">
                <div>
                    {new Date(datetime).getHours() > 12 ?
                        (`${new Date(datetime).getHours() - 12}pm`) :
                        new Date(datetime).getHours() === 0 ? (`12am`) :
                            (`${new Date(datetime).getHours()}am`)}
                </div>
                <div>
                    {temp}
                </div>
                <div>
                    {conditions}
                </div>
                <div>
                    🌨️
                    </div>
            </div>


        </li>
    );
}

export default HourlyRow;
