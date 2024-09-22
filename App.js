import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Navigation/RootNavigator'; // Ensure RootNavigator is correctly implemented
import { firebase } from '@react-native-firebase/app'; // Import 'firebase' instead of 'initializeApp'

const firebaseConfig = {
  apiKey: 'AIzaSyA9qr6bjfoF728gyH-AWWQ20rxst4-l77k',
  authDomain: 'travellink-9862f.firebaseapp.com',
  databaseURL: 'https://travellink-9862f-default-rtdb.firebaseio.com',
  projectId: 'travellink-9862f',
  storageBucket: 'travellink-9862f.appspot.com',
  messagingSenderId: '423381510776',
  appId: '1:423381510776:android:b23cb47a7034f833971b8d',
};

// Check if the app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
