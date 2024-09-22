import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Bottom Tab Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MapScreen from '../Screens/MapScreen';
import VideoCallScreen from '../Screens/VideoCallScreen';
import VideoCallHomeScreen from '../Screens/VideoCallHomeScreen';
import { StyleSheet } from 'react-native';
import Payment from '../Screens/Payment';
import ChatApp from '../Screens/Chat/ChatApp';


// Create Bottom Tab and Stack Navigators
const Tab = createBottomTabNavigator();
const VideoCallStack = createNativeStackNavigator();
const HomeScreenStack = createNativeStackNavigator();


const HomeScreenStackNavigator = () =>{
  return(
    <HomeScreenStack.Navigator initialRouteName="HomeScreen">
    <HomeScreenStack.Screen 
      name="HomeScreen" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
    <HomeScreenStack.Screen 
     
      name="ChatApp" 
      component={ChatApp} 
      options={{ headerShown: false }} 
    />
  </HomeScreenStack.Navigator>
  )
}
// Video Call Stack Navigator (for HomeScreen and VideoCallScreen)
const VideoCallStackNavigator = () => {
  return (
    <VideoCallStack.Navigator initialRouteName="VideoCallHomeScreen">
      <VideoCallStack.Screen 
        name="VideoCallHomeScreen" 
        component={VideoCallHomeScreen} 
        options={{ headerShown: false }} 
      />
      <VideoCallStack.Screen 
        name="VideoCallScreen" 
        component={VideoCallScreen} 
        options={{ title: 'Video Call' }} 
      />
    </VideoCallStack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'VideoCall') {
            iconName = focused ? 'videocam' : 'videocam-outline';
          } else if (route.name === 'Payment') {
            iconName = focused ? 'payment' : 'payment'; 
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return route.name === 'Payment' ? (
            <MaterialIcons name={iconName} size={size} color={color} />
          ) : (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#F368FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 55 },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenStackNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="VideoCall" component={VideoCallStackNavigator} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;

const styles = StyleSheet.create({});
