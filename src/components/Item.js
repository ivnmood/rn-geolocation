import React from 'react';
import {Text, View, Button} from 'react-native';
import {AppCard} from "./ui/AppCard";
import {THEME} from "../theme";
import {removeHistoryItem} from "../store/geolocationAction";


export const Item = ({navigation}) => {

    const geolocation = navigation.getParam('geolocation')


    // const removeItem = () => {
    //     navigation.navigate('History')
    //     removeHistoryItem(geolocation.id)
    // }


    Item.navigationOptions = {
        headerTitle: `History Item`
    }

    return (
            <AppCard>
                <View>
                    <Text>Address: {geolocation.address}</Text>
                    <Text>Lat: {geolocation.lat}</Text>
                    <Text>Lng: {geolocation.lng}</Text>
                    <Text>Date: {geolocation.date}</Text>
                    <Text>Temperature: {geolocation.temp}</Text>
                    <Text>Feels Like: {geolocation.feelsLike}</Text>
                    <Text>Description: {geolocation.description}</Text>
                    {/*<View style={{marginTop: 10}}>*/}
                    {/*    <Button onPress={() => removeItem()} title='Delete' color={THEME.GREY_COLOR} />*/}
                    {/*</View>*/}

                </View>

            </AppCard>


    )
}


