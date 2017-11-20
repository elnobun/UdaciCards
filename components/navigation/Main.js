import React from 'react'
import {TabNavigator} from 'react-navigation'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import DeckStackNavigator from './Deck'
import AddDeckScreen from '../screens/AddDeck'
import SettingsScreen from '../screens/Settings'
import {color} from '../../utils/colors'

const IndexSection = TabNavigator(
  {
    DeckList: {
      screen: DeckStackNavigator,
      navigationOptions: {
        title: 'Deck List',
        tabBarLabel: 'Deck List',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name='desktop-mac' size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeckScreen,
      navigationOptions: {
        title: 'Add Deck',
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name='settings' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    animationEnabled: true,
    initialRouteName: 'DeckList',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: color.white,
      style: {
        height: 56,
        backgroundColor: color.blue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

export default IndexSection
