import React from 'react'
import {View, Text, StyleSheet, Alert, KeyboardAvoidingView} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeadersIcon";
import {GetWeather} from "../components/GetWeather";
import {THEME} from "../theme";
import * as Permissions from 'expo-permissions';
import {FindMe} from "../components/FindMe";
import {AppCard} from "../components/ui/AppCard";
import {useSelector} from "react-redux";


async function askPermission() {
    const {status} = await Permissions.askAsync(
        Permissions.LOCATION
    )
    if (status !== 'granted') {
        Alert.alert('Error', 'Enable geoposition search in the settings')
        return false
    }
    return true
}



export const MainScreen = ({}) => {

    const geolocation = useSelector(state => state.geo.geolocation)

    let content
    if (geolocation.length === 0) {
        content = <Text style={styles.text}>While it's empty</Text>
    } else {
        content = <View>
            <Text>Address: {geolocation[geolocation.length - 1].address}</Text>
            <Text>Date: {geolocation[geolocation.length - 1].date}</Text>
            <Text>Temperature: {geolocation[geolocation.length - 1].temp}</Text>
            <Text>Feels like: {geolocation[geolocation.length - 1].feelsLike}</Text>
            <Text>Description: {geolocation[geolocation.length - 1].description}</Text>
            <Text>Lat: {geolocation[geolocation.length - 1].lat}</Text>
            <Text>Lng: {geolocation[geolocation.length - 1].lng}</Text>
        </View>

    }

    return <View style={styles.center}>

        <View style={styles.getWeather}>
            <GetWeather/>
        </View>
        <FindMe askPermission={askPermission} />


        <AppCard>
            {content}
        </AppCard>
    </View>
}


MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Geolocation&Weather',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
            onPress={() => navigation.toggleDrawer()}
            iconName='ios-menu'
            title='Toggle Drawer'/>
    </HeaderButtons>
})

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    getWeather: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 10
    }
})