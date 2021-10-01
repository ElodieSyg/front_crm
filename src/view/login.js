import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// Import components
import Navbar from "../component/navbar";
// Import contexts
import { UserContext } from "../context/logContext";
// Import axios
import axios from "axios";
// Import CSS
import "../css/login.modules.css";
// Import pattern
import emailRegex from "../pattern/emailRegex";
import passwordRegex from "../pattern/passwordRegex";

const Login = () => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState(null);

    const logState = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        console.log(logState);
    }, [logState]);

    const preventDefault = (e) => (
        e.preventDefault()
    );

    const saveEmailValue = (e) => {
        setEmail(e.target.value);

        if (emailRegex.test(e.target.value)) {
            setIsEmailValid(true);
        } else {
            console.log("Invalid email or password");
        };
    };

    const savePasswordValue = (e) => {
        setPassword(e.target.value);

        if (passwordRegex.test(e.target.value)) {
            setIsPasswordValid(true);
        };
    };

    const handleClickLogin = () => {
        if (isEmailValid && isPasswordValid) {

            const fetchDatabase = async () => {
                const res = await axios.post(
                    `http://localhost:3000/login`,
                    { email, password },
                    { withCredentials: true },
                );
                if (res.data.status === "Sucess") {
                    history.push("/admin")
                } else {
                    return setError("Invalid token")
                };
            };
            fetchDatabase()
        };
    };

    return (
        <div>
            <Navbar />
            <div className="login_container">
                <p className="login_title">L O G I N</p>

                <form onChange={preventDefault} className="form_container">
                    <input
                        type="email"
                        id="email"
                        className="form_margin"
                        placeholder="email"
                        onChange={saveEmailValue}>
                    </input>

                    <input
                        type="password"
                        id="password"
                        className="form_margin"
                        placeholder="password"
                        onChange={savePasswordValue}>
                    </input>
                </form>

                <div>
                    <Link to="/admin" className="form_margin">
                        <button className="button_login_style" onClick={handleClickLogin}>login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;