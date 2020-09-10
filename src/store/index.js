import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {geolocationReducer} from "./geolocationReducer";


const rootReducer = combineReducers({
    geo: geolocationReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))