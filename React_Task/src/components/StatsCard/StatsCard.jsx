import './StatsCard.scss'

const StatsCard = ({backGroundColor, textColor, buttonBackgroundColor, icon, title, percentage, strokeEmptyColor, strokeFillColor}) =>{
    return  <div className="stats-container d-flex flex-column" style={{backgroundColor: backGroundColor}}>
                <button className="button-stats" style={{backgroundColor: buttonBackgroundColor}}>
                    {icon}
                </button>
                <h3 className='title-stats' style={{color: textColor}}>{title}</h3>
                <div className="percentage" style={{color: textColor}}> {percentage}% </div>
                <svg  viewBox="0 0.5 10 8">
                    <path d="M2 8 A 4 4 0 1 1 8 8" fill="none" strokeWidth="0.78" stroke={strokeEmptyColor} />
                    <path id={title} d="M2 8 A 4 4 0 1 1 8 8" fill="none" strokeWidth="0.8" stroke={strokeFillColor} style={{strokeDasharray: `${19 * percentage/100} 19`}} />
                </svg>
            </div>
}
export default StatsCard;