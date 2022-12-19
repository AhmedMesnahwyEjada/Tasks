import './StatisticsCard.scss'

const StatisticsCard = ({type, title, measured, reverse, buttonBackgroundColor}) => {
    return  <div className="statistics-container d-flex flex-column">
                <div><b>{title}</b> Statistics</div>    
                <div className={`d-flex ${!reverse? 'flex-row' : 'flex-row-reverse' } mt-3`}> 
                    <div className={`d-flex float-start ${!reverse? 'me-5' : 'ms-5' } h-auto`}>
                        <button className="btn" style={{backgroundColor: buttonBackgroundColor}}>Day</button>
                        <button className="btn">Week</button>
                        <button className="btn">Month</button>
                    </div>
                    <div className={`d-flex float-end measured ${!reverse? 'ms-5' : 'me-4' }`} >{measured}</div>
                </div>
                <canvas id={type} className="mt-3"></canvas>
            </div>
}
export default StatisticsCard;