import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {AppCard} from "./ui/AppCard";
import {removeHistoryItem} from "../store/geolocationAction";


export const HistoryItem = ({geolocation, onOpen}) => {
    return (
        <TouchableOpacity
            onPress={() => onOpen(geolocation)}
            // onLongPress={() => removeHistoryItem(geolocation.id)}
        >
                <AppCard>
                    <View style={styles.item}>
                        <Text>
                            {geolocation.address}
                        </Text>
                        <Text>
                            {geolocation.date}
                        </Text>
                    </View>
                </AppCard>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
