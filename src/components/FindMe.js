import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, Button, Alert, Keyboard} from 'react-native'
import {THEME} from "../theme";
import {useDispatch} from 'react-redux'
import {addGeolocation, fetchCityWeather, fetchGeolocation} from "../store/geolocationAction";

export const FindMe = ({askPermission}) => {

    const [buttonClicked, setButtonClicked] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGeolocation())
    }, [buttonClicked])



    const sendGeolocation = () => {
        dispatch(addGeolocation()).then(() => {setButtonClicked(!buttonClicked)})
        askPermission()
    }

    return (
        <View style={styles.block}>
            <Button title='Find me' onPress={sendGeolocation}/>
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
        width: '80%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        padding: 5,
    }
})