import profile from './../../Assets/profile.svg'
import './NavBar.scss'
const NavBar = ()=> {
    return <nav className="navbar">
                <div className="container-fluid">
                    <div className='searchBar'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input id="input" type="text" placeholder="Search or type"/>
                    </div>
                    <div className="float-end">
                        <i className="fa-regular fa-bell"></i>
                        &emsp;
                        <img src={profile}/>
                    </div>
                </div>
            </nav>
}
export default NavBar;