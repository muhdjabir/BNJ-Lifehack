import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Signup hook that sends POST request to /api/auth/signup
// to create a new auth entry. Upon success user is logged in 
// similar to useLogin hook
export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [success, setSuccess] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (email, password, role, name, contact, position, years, level) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_DB_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, role})
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            console.log(error);
        }
        if (response.ok) {
            const response2 = await fetch(`${process.env.REACT_APP_DB_URL}/api/users/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, contact, years, position, level, email})
            });
            const json2 = response2.json();
            if (!response2.ok) {
                setIsLoading (false);
                setError(json2.error);
            }
            if (response2.ok) {
                // save user to local storage
                localStorage.setItem('user', JSON.stringify(json));

                //update the auth context
                dispatch({type: 'LOGIN', PAYLOAD: json});
                setIsLoading(false);
                setSuccess("Account successfully created");
            }
        }
    }
    return { signup, isLoading, error, success};
}