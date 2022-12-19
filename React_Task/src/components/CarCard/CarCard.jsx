import './CarCard.scss'
const CarCard = ({name , image, model, type, price, usersCount}) => {
    
    return <div className='col'>
        <div className="card-container ms-4 mb-2 p-4">
                <h4 className="d-inline-block title">{name}</h4>
                <i className="fa-regular fa-heart d-inline-block float-end"></i>
                <h5 >{model}</h5>
                <img className='carImage' src={image}/>
                <br/>
                <i className="fa-regular fa-user d-inline-block"></i>
                <div className="d-inline-block" >&nbsp;{usersCount}</div>
                <i className="fa-solid fa-retweet d-inline-block ms-3"></i>
                <div className="d-inline-block">&nbsp;{type}</div>
                <div className="d-inline-block float-end"> ${price}/d</div>
        </div>
    </div>
}   
export default CarCard;