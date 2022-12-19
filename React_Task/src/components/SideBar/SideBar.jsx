import { useNavigate } from 'react-router-dom'
import logo from './../../Assets/logo.png'
import './SideBar.scss'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return <div className="d-flex flex-column p-3 sidebar">
        <div>
            <img alt="logo" src={logo}/>
            <h3 className="d-inline-block">&nbsp;Motiv.</h3> 
        </div>
        <br/>
        <ul className="h-100 w-100">
            <li className="pb-3 border-0 ps-0" onClick={() => navigate('/dashboard')}><i className="fa-solid fa-border-all"></i>&nbsp;Dashboard</li>
            <li className="pb-3 border-0 ps-0"><i className="fa-regular fa-life-ring"></i>&nbsp;Assets</li>
            <li className="pb-3 border-0 ps-0" onClick={() => navigate('/booking')}><i className="fa-solid fa-car"></i> &nbsp;Booking</li>
            <li className="pb-3 border-0 ps-0"><i className="fa-solid fa-bag-shopping"></i>&nbsp;Sell cars</li>
            <li className="pb-3 border-0 ps-0"><i className="fa-solid fa-cart-shopping"></i>&nbsp; Buy cars</li>
            <li className="pb-3 border-0 ps-0"><i className="fa-solid fa-scissors"></i> &nbsp;Services</li>
            <li className="pb-3 border-0 ps-0"><i className="fa-solid fa-calendar-days"></i>&nbsp; Calender</li>
            <li className="pb-3 border-0 ps-0" onClick={() => navigate('/messages')}><i className="fa-regular fa-comment-dots"></i>&nbsp;Messages</li>
            <div id="loginSection">
                <li className="pb-3 border-0 ps-0" ><i className="fa-solid fa-gear"></i> &nbsp;Settings</li>
                <li className="pb-3 border-0 ps-0" onClick={() => {dispatch(logout()); navigate('/login');}}><i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;Logout</li>
            </div>
            
        </ul>
    </div>
}
export default SideBar;