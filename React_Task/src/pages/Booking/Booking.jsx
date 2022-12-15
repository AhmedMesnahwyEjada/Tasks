import "./Booking.scss"
import CarCard from "../../components/CarCard/CarCard";
import Car1 from './../../Assets/car1.svg'
import Car2 from './../../Assets/car2.svg'
import Car3 from './../../Assets/car3.svg'
import Car4 from './../../Assets/car4.svg'
import Car5 from './../../Assets/car5.svg'
import Car6 from './../../Assets/car6.svg'
import Dropdown from "../../components/Dropdown/Dropdown";
const Booking = () => {
    const cars = [
        {
            id: 1,
            Name: "Toyota",
            image : Car1,
            title: "Coupe",
            price: 400,
            type: "manual"
        },
        {
            id: 2,
            Name: "Porche 718 Cayman S",
            image : Car2,
            title: "Coupe",
            price: 200,
            type: "manual"
        },
        {
            id: 3,
            Name: "Porche 718 Cayman S",
            image : Car3,
            title: "Coupe",
            price: 400,
            type: "manual"
        },
        {
            id: 4,
            Name: "Porche 718 Cayman S",
            image : Car4,
            title: "Coupe",
            price: 400,
            type: "manual"
        },
        {
            id: 5,
            Name: "Porche 718 Cayman S",
            image : Car5,
            title: "Coupe",
            price: 400,
            type: "manual"
        },
        {
            id: 6,
            Name: "Porche 718 Cayman S",
            image : Car6,
            title: "Coupe",
            price: 600,
            type: "automatix"
        },
    ]
    const age = ["New", "Old"]
    const type = ["Toyota", "Ferrari", "Audi", "Lamborghini"]
    return <div className="w-100 h-80 booking">
                <h1 className="m-3"> Booking </h1>
                <Dropdown title={"age"} items={age}/>
                <Dropdown title={"type"} items={type}/>

                <div className="float-end me-5">
                    <button className="m-2 shadow btn"> <i className="fa-solid fa-border-all"></i></button>
                    <button style={{backgroundColor: "#A162F7"}} className="m-2 shadow btn"> <i className="fa-solid fa-sliders"></i></button>
                </div>
                <br/>
                {cars.map(car => {
                    return <CarCard key={car.id} {...car} />
                })}
            </div>
}
export default Booking;