import profile from './../../Assets/profile.svg'
import './NavBar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/theme';
const NavBar = ()=> {
    const dispatch = useDispatch();
    const firstName = useSelector((state) => state.user.firstName)
    return <nav className="navbar">
                <div className="container-fluid">
                    <div className='searchBar'>
                        <i className="ms-2 fa-solid fa-magnifying-glass"></i>
                        <input id="input" type="text" placeholder="Search or type"/>
                    </div>
                    <div className="float-end">
                        <button onClick={() => dispatch(toggleTheme())} className="me-3 btn btn-primary">change Theme</button>
                        <i className="fa-regular fa-bell"></i>
                        &emsp;
                        <h3 style={{display: 'inline-block'}}>{firstName}</h3>
                        &emsp;
                        <img src={profile}/>
                    </div>
                </div>
            </nav>
}
export default NavBar;