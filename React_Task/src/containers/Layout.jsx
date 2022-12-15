import SideBar from "./../components/SideBar/SideBar";
import NavBar from "./../components/NavBar/NavBar";
const Layout = ({children}) => {
    return <>
                <SideBar />
                <div
                className="d-flex flex-column w-100 h-100"
                style={{ marginLeft: "18.5%" }}
                >
                    <NavBar />    
                    {children}
                </div>
            </>

}
export default Layout;