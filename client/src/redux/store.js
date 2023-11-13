import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {reducer as authReducer} from './authReducer/reducer';
import {reducer as doubtReducer} from './doubtReducer/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    authReducer,
    doubtReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));