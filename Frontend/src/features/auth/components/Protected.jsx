import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

import React from 'react'

const Protected = ({ children }) => {

    const { loading, user } = useAuth();
    //const navigate = useNavigate();

    if (loading) {
        return (<main><h1>Loading.....</h1></main>)
    }
    //use navigate is not working here , that's why we used Navigate component
    if (!user) {
        //navigate('/login')
        return <Navigate to={'/login'} />
        //return null

    }



    return children
}

export default Protected
