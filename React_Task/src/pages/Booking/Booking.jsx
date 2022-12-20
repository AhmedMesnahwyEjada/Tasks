import "./Booking.scss"
import CarCard from "../../components/CarCard/CarCard";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { collection, query, onSnapshot  } from "firebase/firestore";
import {db} from './../../firebase'
const Booking = () => {
    const [cars, setCars] = useState([]);
    const age = ["New", "Old"]
    const type = ["Toyota", "Ferrari", "Audi", "Lamborghini"]
    useEffect(() => {
        const q = query(collection(db, 'Car'))
        onSnapshot(q, (querySnapshot) => {
            setCars(querySnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })).sort((a, b) => {return a.data.name.localeCompare(b.data.name)}))
        })
    },[])
    return <div className="w-100 h-80 booking">
                <h1 className="m-3"> Booking </h1>
                <Dropdown title={"age"} items={age}/>
                <Dropdown title={"type"} items={type}/>
                <div className="float-end me-5">
                    <button className="m-2 shadow btn"> <i className="fa-solid fa-border-all"></i></button>
                    <button style={{backgroundColor: "#A162F7"}} className="m-2 shadow btn"> <i className="fa-solid fa-sliders"></i></button>
                </div>
                <br/>
                <div className="row row-cols-1 row-cols-md-3 w-100 g-1">
                    {cars.map(car => {
                        return <CarCard key={car.id} {...car.data} />
                    })}
                </div>
            </div>
}
export default Booking;