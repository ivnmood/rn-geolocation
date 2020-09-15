import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Button, Alert, Keyboard, Text} from 'react-native'
import {THEME} from "../theme";
import {useDispatch, useSelector} from 'react-redux'
import {fetchCityWeather, getWeather} from "../store/geolocationAction";
import {AppCard} from "./ui/AppCard";

export const GetWeather = ({}) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch()
    const [buttonClicked, setButtonClicked] = useState(false)


    useEffect(() => {
        dispatch(fetchCityWeather())
    }, [buttonClicked])

    const weather = useSelector(state => state.geo.cityWeather)

    const getWeatherCity = () => {
        if (value.trim()) {
            dispatch(getWeather(value)).then(()=> {setButtonClicked(!buttonClicked)})
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Input can\'t be empty')
        }
    }


    let content
    if (weather.length === 0) {
        content = <Text style={styles.text}>Enter city</Text>
    } else {
        content = <View>
            <Text>City: {weather[weather.length -1].title}</Text>
            <Text>Temperature: {weather[weather.length -1].temp}</Text>
            <Text>Feels like: {weather[weather.length -1].feelsLike}</Text>
            <Text>Description: {weather[weather.length -1].description}</Text>
        </View>

    }

    return (
        <View>
            <View style={styles.block}>
                <TextInput style={styles.input}
                           onChangeText={setValue}
                           value={value}
                           maxLength={64}
                           placeholder='Enter your city'/>
                <Button title='Get weather' onPress={getWeatherCity}/>


            </View>
            <AppCard>
                {content}
            </AppCard>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        width: '65%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        padding: 5,
    }
})