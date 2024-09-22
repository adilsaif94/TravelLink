import { StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from '../Screens/LoginPage';
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor="#F368FF" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />

      </Stack.Navigator>
    </>

  );
};


export default RootNavigator

