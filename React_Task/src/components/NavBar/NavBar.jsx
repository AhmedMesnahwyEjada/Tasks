import profile from './../../Assets/profile.svg'
import './NavBar.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
const NavBar = ()=> {
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        if (!theme) {
          document.body.style.backgroundColor = "#FFF";
          document.body.style.color = "#000";
        } else {
          document.body.style.backgroundColor = "#1F2128";
          document.body.style.color = "#FFF";
        }
      });
    const toggleTheme = () => {
        setTheme(!theme)
    }
    const firstName = useSelector((state) => state.user.firstName)
    return <nav className="navbar">
                <div className="container-fluid">
                    <div className='searchBar'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input id="input" type="text" placeholder="Search or type"/>
                    </div>
                    <div className="float-end">
                        
                        <button onClick={toggleTheme} className="me-3">change Theme</button>
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