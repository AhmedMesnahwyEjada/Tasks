import SideBar from "./../components/SideBar/SideBar";
import NavBar from "./../components/NavBar/NavBar";
import './Layout.scss'
const Layout = ({children}) => {
    return <>
                <SideBar />
                <div className="d-flex flex-column w-100 h-100 layout">
                    <NavBar/>    
                    {children}
                </div>
            </>
}
export default Layout;