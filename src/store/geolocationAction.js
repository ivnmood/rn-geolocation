import {ADD_GEOLOCATION, FETCH_CITY_WEATHER, FETCH_GEOLOCATION, GET_WEATHER, REMOVE_GEOLOCATION} from "../types";
import {Http} from "../http";
import {Alert} from "react-native";
import * as Location from 'expo-location';
import Geocode from "react-geocode";



Geocode.setApiKey("AIzaSyDHrtLz-WzJtpfYaYkume2SouRxdpOqy-8");

const showLoader = () => {
    return dispatch => dispatch({type: SHOW_LOADER})
}
const hideLoader = () => {
    return dispatch => dispatch({type: HIDE_LOADER})
}
const showError = (error) => {
    return dispatch => dispatch({type: SHOW_ERROR, error})
}
const clearError = () => {
    return dispatch => dispatch({type: CLEAR_ERROR})
}


export const fetchGeolocation = () => {
    showLoader()
    clearError()
    return async dispatch => {
        try {
            const data = await Http.get('https://rn-geolocation-1341c.firebaseio.com/geolocation.json')
            const geolocation = Object.keys(data).map(key => ({...data[key], id: key}))
            dispatch({
                type: FETCH_GEOLOCATION,
                geolocation
            })
        } catch (e) {
            showError('Something went wrong...')
            console.log(e)
        } finally {
            hideLoader()
        }

    }
}

export const fetchCityWeather = () => {
    showLoader()
    clearError()
    return async dispatch => {
        try {
            const data = await Http.get('https://rn-geolocation-1341c.firebaseio.com/cityWeather.json')
            const cityWeather = Object.keys(data).map(key => ({...data[key], id: key}))
            dispatch({
                type: FETCH_CITY_WEATHER,
                cityWeather
            })
        } catch (e) {
            showError('Something went wrong...')
            console.log(e)
        } finally {
            hideLoader()
        }

    }
}

export const addGeolocation = () => {
    const options = {
        era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return async dispatch => {
        const location = await Location.getCurrentPositionAsync({});
        await Geocode.fromLatLng(location.coords.latitude, location.coords.longitude).then(
            async response => {
                const address = response.results[0].formatted_address;
                const api_url =
                    await fetch(`https://openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`);
                const dataWeather = await api_url.json();
                const temp = dataWeather.main.temp
                const feelsLike = dataWeather.main.feels_like
                const description = dataWeather.weather[0].description
                const lat = location.coords.latitude
                const lng = location.coords.longitude
                const date = (new Date()).toLocaleString("en", options)
                const data = await Http.post('https://rn-geolocation-1341c.firebaseio.com/geolocation.json', {temp, feelsLike,
                    description, lat, lng, address, date
                })
                dispatch({
                        type: ADD_GEOLOCATION,
                        date,
                        id: data.name,
                        temp,
                        feelsLike,
                        description,
                        lat,
                        lng,
                        address
                    }, error => {
                        console.error(error)
                        Alert.alert('Error', `${error}`)
                    }
                )
            })
    }
}

export const getWeather = title => {
    return async dispatch => {
        await Geocode.fromAddress(title).then(
            async response => {
                const {lat, lng} = await response.results[0].geometry.location;
                const api_url =
                    await fetch(`https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`);
                const dataWeather = await api_url.json();
                const temp = dataWeather.main.temp
                const feelsLike = dataWeather.main.feels_like
                const description = dataWeather.weather[0].description
                const data = await Http.post('https://rn-geolocation-1341c.firebaseio.com/cityWeather.json', {
                    title, temp, feelsLike,
                    description, lat, lng
                })
                dispatch({
                    type: GET_WEATHER,
                    id: data.name,
                    title,
                    temp: dataWeather.main.temp,
                    feelsLike: dataWeather.main.feels_like,
                    description: dataWeather.weather[0].description,
                    lat,
                    lng
                })
            },
            error => {
                console.error(error);
                Alert.alert('Error', `${error}`)
            }
        );
    }
}


// export const removeHistoryItem = id => {
//     return async dispatch => {
//         const data = await Http.get('https://rn-geolocation-1341c.firebaseio.com/geolocation.json')
//         const geolocation = Object.keys(data).map(key => ({...data[key], id: key}))
//         const geolocationItem = geolocation.find(g => g.id === id)
//         Alert.alert(
//             "Delete Todo",
//             `Do you want delete "${geolocationItem.address}"?`,
//             [
//                 {
//                     text: "Cancel",
//                     style: "cancel"
//                 },
//                 {
//                     text: "Delete", onPress: async () => {
//                         await Http.delete(`https://rn-geolocation-1341c.firebaseio.com/geolocation/${id}.json`)
//                         dispatch({type: REMOVE_GEOLOCATION, id})
//                     }
//                 }
//             ],
//             {cancelable: false}
//         );
//     }
// }