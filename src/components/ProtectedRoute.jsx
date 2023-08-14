import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAuthData } from '../features/auth/authSlice';
import { verifyUser } from '../utils/functions/verifyUser';

const token = localStorage.getItem("surveyApp")

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // dispatch(fetchAuthData(
    //     {
    //         apiUrl: `${import.meta.env.VITE_API_URL}/auth/verifytoken`,
    //         bodyOfRequest: {token},
    //         method: "POST"
    //     }
    // ));


    // const str = useSelector(state => state.auth)
    // console.log("str ", str);

    const isAuthenticated = verifyUser();

    // useEffect(() => {
    //     dispatch(fetchAuthData(
    //         {
    //             apiUrl: `${import.meta.env.VITE_API_URL}/auth/verifytoken`,
    //             bodyOfRequest: { token },
    //             method: "POST"
    //         }
    //     ));
    // }, [token])

    useEffect(() => {
        verifyUser().then(resp => {
            if (!resp.status) {
                navigate("/")
            }
        })
    }, [isAuthenticated])

    return children;
};

export default ProtectedRoute