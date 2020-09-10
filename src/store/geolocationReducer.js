import {
    CLEAR_ERROR,
    HIDE_LOADER,
    SHOW_ERROR,
    SHOW_LOADER,
    ADD_GEOLOCATION, REMOVE_GEOLOCATION, UPDATE_GEOLOCATION, FETCH_GEOLOCATION, GET_WEATHER, FETCH_CITY_WEATHER
} from "../types";


const initialState = {
    geolocation: [],
    cityWeather: [],
    loading: true,
    error: null
}

const handlers = {
    [ADD_GEOLOCATION]: (state, {id, temp, feelsLike, description, lat, lng, address, date}) => ({
        ...state,
        geolocation: [...state.geolocation, {id, temp, feelsLike, description, lat, lng, address, date}]
    }),
    [GET_WEATHER]: (state, {title, id, temp, feelsLike, description, lat, lng}) => ({
        ...state,
        cityWeather: [...state.cityWeather, {id, title, temp, feelsLike, description, lat, lng}],
        loading: false
    }),
    [REMOVE_GEOLOCATION]: (state, {id}) => ({
        ...state,
        geolocation: state.geolocation.filter(geo => geo.id !== id)
    }),
    [SHOW_LOADER]: (state) => ({...state, loading: true}),
    [HIDE_LOADER]: (state) => ({...state, loading: false}),
    [SHOW_ERROR]: (state, {error}) => ({...state, error}),
    [CLEAR_ERROR]: (state) => ({...state, error: null}),
    [FETCH_GEOLOCATION]: (state, {geolocation}) => ({...state, geolocation, loading: false}),
    [FETCH_CITY_WEATHER]: (state, {cityWeather}) => ({...state, cityWeather, loading: false}),

    DEFAULT: state => state
}


export const geolocationReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}