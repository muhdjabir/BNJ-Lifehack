import { useAuthContext } from "./useAuthContext";

// Logout Function updates the localStorage to no longer contain user
// and removes the token
export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
    }

    return {logout}
}