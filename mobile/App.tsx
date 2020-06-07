import Routes from './src/routes'
import React from 'react';
import {StatusBar} from 'react-native'
import {AppLoading} from 'expo'
import {Ubuntu_700Bold} from '@expo-google-fonts/ubuntu'
import {Roboto_400Regular,Roboto_500Medium,useFonts} from '@expo-google-fonts/roboto'
import Home from './src/pages/Home/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })
   if(!fontsLoaded){
     return <AppLoading/>
   }
  return (
    <>  
    <StatusBar barStyle='dark-content'  translucent/>
    <Routes/>
   </>
  )
}
