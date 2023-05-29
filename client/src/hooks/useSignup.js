import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Signup hook that sends POST request to /api/auth/signup
// to create a new auth entry. Upon success user is logged in 
// similar to useLogin hook
export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (name, email, password, role) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, role})
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
    return { signup, isLoading, error};
}