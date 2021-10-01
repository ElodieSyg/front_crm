import { useState, createContext } from "react";

export const UserContext = createContext();

const LogContext = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const values = {
        isLogged,
        setIsLogged,
    };

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );
};

export default LogContext;