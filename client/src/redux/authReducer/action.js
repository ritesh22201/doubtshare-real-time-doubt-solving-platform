import { AUTH_REQ, AUTH_REQ_FAILURE, AUTH_REQ_SUCCESS, CHANGE_PASSWORD, FORGET_PASSWORD, GET_SINGLE_PROFILE, LOGIN_REQ_SUCCESS, LOGOUT_REQ_SUCCESS, UPDATE_PROFILE, VERIFY_FORGET_OTP, VERIFY_OTP_SUCCESS } from "./actionTypes";
import axios from 'axios';

const data = JSON.parse(localStorage.getItem('login-token')) || {};

export const signup = (user) => async (dispatch) => {
    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.post('https://doubts-cleared.onrender.com/api/auth/register', user);
        if (response.data) {
            dispatch({ type: AUTH_REQ_SUCCESS, payload: response.data.msg });
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg });
    }
}

export const login = (user) => async (dispatch) => {

    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.post('https://doubts-cleared.onrender.com/api/auth/login', user);
        if (response?.data) {
            dispatch({ type: LOGIN_REQ_SUCCESS, payload: response.data });
            localStorage.setItem('login-token', JSON.stringify(response.data));
        }
    } catch (error) {
        console.log(error.message)
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg });
    }
}

export const verifyOtp = (data) => async (dispatch) => {

    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.post('https://doubts-cleared.onrender.com/api/auth/verify', data);
        if (response.data) {
            dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data.msg });
            localStorage.setItem('login-token', JSON.stringify(response.data));
        }
    } catch (error) {
        console.log(error.message)
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg })
    }
}

export const forgetPassword = (user) => async (dispatch) => {
    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.post('https://doubts-cleared.onrender.com/api/auth/forgetPassword', user);
        if (response.data) {
            dispatch({ type: FORGET_PASSWORD, payload: response.data.msg });
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg });
    }
}

export const verifyOtpForForgetPass = (user) => async (dispatch) => {
    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.post('https://doubts-cleared.onrender.com/api/auth/verifyOtp', user);
        if (response.data) {
            dispatch({ type: VERIFY_FORGET_OTP, payload: response.data.msg });
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg });
    }
}

export const changePassword = (user) => async (dispatch) => {
    console.log(user)
    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.post('https://doubts-cleared.onrender.com/api/auth/changePassword', user);
        if (response.data) {
            dispatch({ type: CHANGE_PASSWORD, payload: response.data.msg });
        }
    } catch (error) {
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response?.data.msg });
    }
}


export const logout = (email) => async (dispatch) => {

    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.patch(`https://doubts-cleared.onrender.com/api/auth/logout/${email}`, {}, {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data) {
            dispatch({ type: LOGOUT_REQ_SUCCESS, payload: response.data.msg });
            localStorage.removeItem('login-token');
        }
    } catch (error) {
        console.log(error.message)
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg });
    }
}

export const updateProfile = (idVal, userDetails) => async (dispatch) => {

    dispatch({ type: AUTH_REQ });
    try {
        let response = await axios.put(`https://doubts-cleared.onrender.com/api/auth/updateProfile/${idVal.id}`, {...userDetails}, {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data) {
            dispatch({ type: UPDATE_PROFILE, payload: response.data.msg });
        }
    } catch (error) {
        console.log(error.message)
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg });
    }
}

export const getSingleUser = (payloadData) => async(dispatch) => {
    try {
        const response = await axios.get(`https://doubts-cleared.onrender.com/api/auth/users/${payloadData.email}`, {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.data.user) {
            dispatch({type : GET_SINGLE_PROFILE, payload : response.data.user});
        }
    } catch (error) {
        dispatch({ type: AUTH_REQ_FAILURE, payload: error.response.data.msg });
    }
}