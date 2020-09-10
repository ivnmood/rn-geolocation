import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {MainScreen} from "../screens/MainScreen";
import {HistoryScreen} from "../screens/HistoryScreen";
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Item} from "../components/Item";


const Main = createStackNavigator({
        Main: MainScreen
    }
)
const HistoryScreens = createStackNavigator({
        History: HistoryScreen,
        Item:  Item
    },
)

const MainNavigator = createDrawerNavigator({
        Main: Main,
        History: {
            screen: HistoryScreens
        }
    }
)

export const AppNavigation = createAppContainer(MainNavigator)