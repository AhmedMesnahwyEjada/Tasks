import RecommendationCard from '../../components/RecommendationCard/RecommendationCard';
import StatisticsCard from '../../components/StatisticsCard/StatisticsCard';
import StatsCard from '../../components/StatsCard/StatsCard';
import './Dashboard.scss'
import car1 from './../../Assets/RecCar1.svg'
import car2 from './../../Assets/RecCar2.svg'
import car3 from './../../Assets/RecCar3.svg'
import { useEffect } from 'react';
const Dashboard = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = "./src/assets/charts"
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    },[])
    const stats = [
        {
            backGroundColor: "#A162F7",
            textColor: "#ffffff",
            buttonBackgroundColor: "#a66ff0",
            icon: <i className="fa-solid fa-bolt border-1" style={{color: "white"}} ></i>, 
            title: "Energy", 
            percentage: 45, 
            strokeEmptyColor: "#B37EFC", 
            strokeFillColor: "#FFFFFF"
        },
        {
            buttonBackgroundColor: "rgba(255, 126, 134, 0.1)",
            icon: <i className="fa-solid fa-arrows-up-down" style={{color: "#FF7E86"}}></i>, 
            title: "Range", 
            percentage: 57, 
            strokeEmptyColor: "#F4F5F9", 
            strokeFillColor: "#FF7E86"
        },
        {
            buttonBackgroundColor: "rgba(161, 98, 247, 0.1)",
            icon: <i className="fa-solid fa-droplet" style={{color: "#A162F7"}}></i>, 
            title: "Break Fluid", 
            percentage: 9, 
            strokeEmptyColor: "#F4F5F9", 
            strokeFillColor: "#A162F7"
        },
        {
            buttonBackgroundColor: "rgba(161, 98, 247, 0.1)",
            icon: <i className="fa-solid fa-gear" style={{color: "#F6CC0D"}}></i>, 
            title: "Tire Wear", 
            percentage: 25, 
            strokeEmptyColor: "#F4F5F9", 
            strokeFillColor: "#F6CC0D"
        }
    ]
    const statistics = [
        {
            type: "barChart",
            title: "Miles",
            measured : "256 Miles",
            reverse : false,
            buttonBackgroundColor : "#2884FF"
        },
        {
            type: "lineChart",
            title: "Car",
            measured : "20 February 2022",
            reverse: true,
            buttonBackgroundColor : "#FF764C"
        }
    ]
    const recommendatations = [
        {
            id : 1,
            image: car1,
            backgroundColor : "#E1DFA4",
            name: "Mini Cooper",
            percentage : 64,
            miles: 132, 
            price: 32
        },
        {
            id : 2,
            image: car2,
            backgroundColor : "#E3ECF1",
            name: "Porsche 911 Carrera",
            percentage: 74,
            miles: 130, 
            price: 28
        },
        {
            id : 3,
            image: car3,
            backgroundColor : "#F4E3E5",
            name: "Porsche 911 Carrera",
            percentage: 74,
            miles: 130, 
            price: 28
        },
    ]
    return  <div className="content-container w-100 h-80 d-flex flex-column">
                <div className="d-flex flex-row">
                    {stats.map(stat => {
                        return <StatsCard key={stat.title} {...stat} />
                    })}
                </div>
                <div className="d-flex flex-row">
                    {statistics.map(stat => {
                        return <StatisticsCard key={stat.type} {...stat} />
                    })}
                </div>
                <div className='d-flex flex-row'>
                    {recommendatations.map(rec => {
                        return <RecommendationCard key={rec.id} {...rec} />
                    })}
                </div>
            </div>
}
export default Dashboard;