import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from "../../theme";


export const AppCard = props => <View style={styles.default}>{props.children}</View>


const styles = StyleSheet.create({
    default: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // elevation: 8,
        backgroundColor: '#fff',
        // shadowColor: '#000',
        // shadowRadius: 2,
        // shadowOpacity: 0.3,
        // shadowOffset: { width: 2, height: 2}
    }
})