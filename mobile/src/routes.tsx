import React, { Component } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './pages/Home/index'
import Points from './pages/Points'
import Details from './pages/Details'

const AppStack = createStackNavigator()

const Routes = () =>{
    return(
        <NavigationContainer>
            <AppStack.Navigator
             headerMode="none"
             screenOptions={{
                 cardStyle:{
                     backgroundColor:'white'
                 }
             }}
             >
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Points" component={Points}/>
                <AppStack.Screen name="Details" component={Details}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes









