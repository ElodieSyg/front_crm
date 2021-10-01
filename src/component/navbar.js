import { useContext } from "react";
import { Link } from "react-router-dom";
// Import CSS
import "../css/navbar.modules.css";
// Import contexts
import { UserContext } from "../context/logContext";
// Import axios
import axios from "axios";

const Navbar = () => {
    const logState = useContext(UserContext);

    const handleClickLogout = () => {
        const fetchDatabase = async () => {
            const res = await axios.get(
                `http://localhost:3000/logout`,
                { withCredentials: true }
            );
            console.log(res);
        };
        fetchDatabase();
    };

    return (
        <div className="navbar_container">
            <div className="ml1">
                <h4 className="white_color">CRM</h4>
            </div>

            <div className="mr1">
                {logState.isLogged === true
                    ? <Link to="/register" >
                        <button className="button_navbar_style" onClick={handleClickLogout}>Logout</button>
                    </Link>
                    : <Link to="/register" >
                        <button className="button_navbar_style">Sign in</button>
                    </Link>}
            </div>
        </div>
    );
};

export default Navbar;