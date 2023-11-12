import { AUTH_REQ, AUTH_REQ_FAILURE, AUTH_REQ_SUCCESS, CHANGE_PASSWORD, FORGET_PASSWORD, LOGIN_REQ_SUCCESS, RESEND_OTP_SUCCESS, VERIFY_FORGET_OTP, VERIFY_OTP_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading : false,
    isError : false,
    isAuth : false,
    isRegistered : '',
    registerErr : '',
    verifyOtpMsg : '',
    forgetPassMsg : '',
    changePassMsg : '',
    verifyForgetOtpMsg : ''
}

export const reducer = (state = initialState, {type, payload}) => {

    switch(type){
        case AUTH_REQ : {
            return  {
                ...state,
                isLoading : true,
                isError : false,
                isAuth : false,
                registerErr : '',
                isRegistered : '',
                verifyOtpMsg : '',
                forgetPassMsg : '',
                changePassMsg : ''
            }
        }

        case AUTH_REQ_SUCCESS : {
            return  {
                ...state,
                isLoading : false,
                isError : false,
                isRegistered : payload,
            }
        }

        case FORGET_PASSWORD : {
            return  {
                ...state,
                isLoading : false,
                isError : false,
                forgetPassMsg : payload
            }
        }

        case CHANGE_PASSWORD : {
            return  {
                ...state,
                isLoading : false,
                isError : false,
                changePassMsg : payload
            }
        }

        case VERIFY_OTP_SUCCESS : {
            return  {
                ...state,
                isLoading : false,
                isError : false,
                verifyOtpMsg : payload,
            }
        }

        case VERIFY_FORGET_OTP : {
            return  {
                ...state,
                isLoading : false,
                isError : false,
                verifyForgetOtpMsg : payload
            }
        }

        case LOGIN_REQ_SUCCESS : {
            return  {
                ...state,
                isLoading : false,
                isError : false,
                isAuth : true
            }
        }

        case AUTH_REQ_FAILURE : {
            return  {
                ...state,
                isLoading : false,
                isError : false,
                isRegistered : '',
                registerErr : payload,
            }
        }

        default : {
            return state;
        }
    }
}