import './RecommendationCard.scss'
const RecommendationCard = ({image, backgroundColor, name, percentage, miles, price}) =>{
    return  <div className="d-flex flex-column recommendation-container" style={{backgroundColor: backgroundColor}}>
                <div>
                    <i className="fa-solid fa-arrows-spin"></i> &nbsp; {percentage}% Recommended
                </div>
                <img className="recCar" src={image} />
                <h2>{name}</h2>
                <div className="d-flex flex-row w-100 info">
                    <i className="fa-solid fa-retweet d-inline-block m-auto ms-0 me-0"></i>
                    <div className="d-inline-block ms-3" >{miles}K</div>
                    <i className="fa-solid fa-gear m-auto ms-3 me-0"></i>
                    <i className="fa-solid fa-bolt m-auto ms-4 me-0"></i>
                    <div className="d-flex float-end ms-5"> ${price}/h</div>
                </div>
            </div>
} 
export default RecommendationCard;