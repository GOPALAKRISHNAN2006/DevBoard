import "./Navbar.css"
const Navbar = () =>{
    return(
        <nav className="navbar bg-white shadow-sm px-4">
            <h3 className="mb-0">Dashboard</h3>
            <div className="d-flex align-items-center">
                <img src="https://ui-avatars.com/api/?name=Gopal"
                className="rounded-circle me-2" width="40" height="40"/>
                <span>Welcome, Gopal</span>
            </div>
        </nav>
    );
};

export default Navbar;