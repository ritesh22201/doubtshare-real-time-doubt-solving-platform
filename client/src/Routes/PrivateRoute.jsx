import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const data = JSON.parse(localStorage.getItem('login-token')) || {};

    return data.token ? children : <Navigate to={'/login'} />
}

export default PrivateRoute;