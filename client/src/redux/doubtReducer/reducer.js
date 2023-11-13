import { DELETE_DOUBT_SUCCESS, DOUBT_FAILURE, DOUBT_REQ, DOUBT_REQ_SUCCESS, POST_DOUBT_SUCCESS, UPDATE_DOUBT_SUCCESS } from "./actionTypes"

const initialState = {
    isLoading : false,
    isError : false,
    doubts : [],
    errorMsg : '',
    isAdded : '',
    isDeleted : '',
    isUpdated : '',
}

export const reducer = (state = initialState, {type, payload}) => {
    switch(type){

        case DOUBT_REQ : {
            return {
                ...state,
                isLoading : true,
                isError : false,
                errorMsg : '',
                isAdded : '',
                isDeleted : '',
                isUpdated : '',
            }
        }

        case DOUBT_REQ_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                doubts : payload
            }
        }

        case POST_DOUBT_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isAdded : payload
            }
        }

        case UPDATE_DOUBT_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isUpdated : payload
            }
        }

        case DELETE_DOUBT_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isDeleted : payload
            }
        }

        case DOUBT_FAILURE : {
            return {
                ...state,
                isError : true,
                errorMsg : payload
            }
        }

        default : {
            return state
        }
    }
}