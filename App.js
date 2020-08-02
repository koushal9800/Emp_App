
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AddEmployee from './screens/AddEmployee';
import EditEmployee from './screens/EditEmployee';
import ViewEmployee from './screens/ViewEmployee';

import { createStackNavigator, createAppContainer } from 'react-navigation';



const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Add: {screen: AddEmployee},
    View: {screen: ViewEmployee},
    Edit: {screen: EditEmployee},
  }, {
    defaultNavigationOptions: {
      headerTintColor:"#fff",
      headerStyle:{
        backgroundColor:"#218F76",
      },
      headerTitleStyle:{
        color:'#fff'
      }
    }
  }
)

const App = createAppContainer(MainNavigator);
export default App;
