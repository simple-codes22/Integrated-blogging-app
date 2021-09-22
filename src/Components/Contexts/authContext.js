import { useState, createContext, useEffect } from "react";
import supabase from "../Backend/supaBaseClient";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    
    // const getDetails = async (authDetails) => {
    //     if (authDetails !== null) {
    //         if (authDetails.role === "authenticated") {
    //             try {
    //                 const data = await supabase
    //                 .from('blogger_profiles')
    //                 .select("*")
    //                 .is('id', authDetails.id);
    //                 return setUser(data.data);
    //             }
    //             catch(error) {
    //                 return setUser('Error');
    //             }
    //         }   
    //         else {
    //             return setUser('Error');
    //         }
    //     } 
    // }
    
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;