import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


// Login function for user authentication
// Works by sending post request to api/auth/login to 
// establish new user connection
// Upon success, dispatches the AuthContext to be made available
// to all components
// Additionally, instantiates a user in the localStorage to remember upon app closure
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_DB_URL}/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            console.log(error);
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }
    }
    return { login, isLoading, error};
}