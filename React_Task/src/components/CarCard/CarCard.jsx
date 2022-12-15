import './CarCard.scss'
const CarCard = ({Name , image, title, type, price, usersCount}) => {
    
    return <div className="card-container m-3 p-4">
                <h4 className="d-inline-block text-dark">{Name}</h4>
                <i className="fa-regular fa-heart d-inline-block float-end"></i>
                <h5 >{title}</h5>
                <img className='carImage' src={image}/>
                <br/>
                <i className="fa-regular fa-user d-inline-block"></i>
                <div className="d-inline-block" >{usersCount}</div>
                <i className="fa-solid fa-retweet d-inline-block ms-3"></i>
                <div className="d-inline-block">{type}</div>
                <div className="d-inline-block float-end"> ${price}/d</div>
        </div>
}   
export default CarCard;