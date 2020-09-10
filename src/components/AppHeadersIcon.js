import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'

export const AppHeaderIcon = (props) => (
    <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={25}/>
    )


