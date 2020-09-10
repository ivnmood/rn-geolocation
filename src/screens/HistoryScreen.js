import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchGeolocation} from "../store/geolocationAction";
import {HistoryItem} from "../components/HistoryItem";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeadersIcon";
import {AppLoader} from "../components/ui/AppLoader";


export const HistoryScreen = ({navigation}) => {

    const openHistoryItem = geolocation => {
        navigation.navigate('Item',
            {
                geoId: geolocation.id,
                geolocation
            })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGeolocation())
    }, [])

    const allGeolocations = useSelector(state => state.geo.geolocation)


    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    )

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width)
        }
        Dimensions.addEventListener('change', update)
        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    let content =
        <View style={{width: deviceWidth, flex: 1}}>
            <FlatList
                data={allGeolocations}
                renderItem={({item}) => <HistoryItem navigation={navigation} geolocation={item} onOpen={openHistoryItem}/>}
                keyExtractor={item => item.id}/>
        </View>

    if (allGeolocations.length === 0) {
        content = <View>
            <Text style={styles.text}>History not found</Text>
        </View>
    }

    const loading = useSelector(state => state.geo.loading)

    if (loading) {
        return <AppLoader/>
    }


    return <View style={styles.center}>
        {content}
    </View>
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    text: {
        fontSize: 20
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 10
    }
})

HistoryScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'History',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
            onPress={() => navigation.toggleDrawer()}
            iconName='ios-menu'
            title='Toggle Drawer'/>
    </HeaderButtons>

})


