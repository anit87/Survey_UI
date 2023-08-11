import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    
    // const isAuthenticated = useSelector((state) => Boolean(state.auth.isAuthenticated));
    const isAuthenticated = localStorage.getItem("token");
   
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])

    return children;
};

export default ProtectedRoute