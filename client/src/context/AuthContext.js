import { createContext, useContext, useState } from 'react';

//Create a context for authentication
const AuthContext = createContext();

//Provider component to manage authentication state and provide it to the component tree
export function AuthProvider({ children }){
    //State to track whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //Function to log in the user (sets authentication state to true)
    const login = () => setIsAuthenticated(true);

    //Function to log out the user (sets authentication state to false)
    const logout = () => setIsAuthenticated(false);

    return(
        //Provide the authentication state and functions to the component tree
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

//Custom hook to access the authentication context
export function useAuth(){
    return useContext(AuthContext);
}