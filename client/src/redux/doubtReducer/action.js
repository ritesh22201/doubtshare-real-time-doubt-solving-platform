import axios from "axios";
import { DELETE_DOUBT_SUCCESS, DOUBT_FAILURE, DOUBT_REQ, DOUBT_REQ_SUCCESS, POST_DOUBT_SUCCESS, UPDATE_DOUBT_SUCCESS } from "./actionTypes";
const data = JSON.parse(localStorage.getItem('login-token')) || {};

export const getDoubts = () => async (dispatch) => {
    dispatch({ type: DOUBT_REQ });
    try {
        const response = await axios.get('https://doubts-cleared.onrender.com/api/doubt/history', {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data) {
            dispatch({ type: DOUBT_REQ_SUCCESS, payload: response.data.doubtHistory });
        }
    } catch (error) {
        console.log(error.message);
        dispatch({ type: DOUBT_FAILURE, payload: error.response.data.msg });
    }
}

export const postDoubt = (doubtData) => async (dispatch) => {
    dispatch({ type: DOUBT_REQ });
    try {
        const response = await axios.post('https://doubts-cleared.onrender.com/api/doubt/createDoubt', doubtData, {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.msg) {
            dispatch({ type: POST_DOUBT_SUCCESS, payload: response.data.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: DOUBT_FAILURE, payload: error.response.data.msg });
    }
}

export const deleteDoubt = (id) => async (dispatch) => {
    dispatch({ type: DOUBT_REQ });
    try {
        const response = await axios.delete(`https://doubts-cleared.onrender.com/api/doubt/deleteDoubt/${id}`, {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.msg) {
            dispatch({ type: DELETE_DOUBT_SUCCESS, payload: response.data.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: DOUBT_FAILURE, payload: error.response.data.msg });
    }
}

export const updateDoubtResolved = (id) => async (dispatch) => {
    dispatch({ type: DOUBT_REQ });
    try {
        const response = await axios.patch(`https://doubts-cleared.onrender.com/api/doubt/updateDoubt/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.msg) {
            dispatch({ type: UPDATE_DOUBT_SUCCESS, payload: response.data.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: DOUBT_FAILURE, payload: error.response.data.msg });
    }
}