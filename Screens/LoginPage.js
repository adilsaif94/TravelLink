import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginPage = ({ navigation }) => {

  useEffect(() => {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId: '423381510776-25fdk09bslcs3e8cpp8up1rrcmu34pgf.apps.googleusercontent.com',
      offlineAccess: true,  // Required to retrieve idToken
    });

    // Check if user is already logged in
    const checkUserLoggedIn = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        // Navigate to Home if user is already logged in
        navigation.navigate('HomeTabNavigator');
      }
    };

    checkUserLoggedIn();
  }, []);

  

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();  // Sign out previous session if exists
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const { idToken } = tokens;

      if (!idToken) {
        throw new Error('Failed to retrieve idToken');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      // Store user login status in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));

      // Navigate to Role Selection Screen or Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabNavigator' }], // Replace 'HomeTabNavigator' with the name of your main tab navigator screen
      });
      Alert.alert('Signed in with Google successfully!');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google sign-in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play services are not available');
      } else {
        Alert.alert('Sign-In Error', error.message || 'Failed to retrieve idToken');
      }
      console.log('Google Sign-In Error:', error);
    }
  };


  return (
    <View style={styles.linearGradient}>
      <View style={styles.imageContainer}>
        <View style={styles.imageRow}>
          <Image style={styles.img1} source={require('../Assets/images/img1.png')} />
          <Image style={styles.img1} source={require('../Assets/images/img2.png')} />
          <Image style={styles.img1} source={require('../Assets/images/img3.jpg')} />
        </View>
        <View style={styles.imageRow}>
          <Image style={styles.img1} source={require('../Assets/images/img2.png')} />
          <Image style={styles.img1} source={require('../Assets/images/img3.jpg')} />
          <Image style={styles.img1} source={require('../Assets/images/img1.png')} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainTitle}>Welcome to TravelLink</Text>
        <Text style={styles.subtitle}>"Let’s find some beautiful place to get lost"</Text>

        <LinearGradient colors={['#F368FF', '#ADBAFD']} style={styles.linearButton}>
          <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
            <Image style={styles.icon} source={require('../Assets/images/google.png')} />
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={styles.appleButton}>
          <Image style={styles.icon} source={require('../Assets/images/apple.png')} />
          <Text style={styles.buttonText}>Sign In with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton} >
          <Fontisto name='facebook' color='#fff' size={25} style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>Sign In with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  imageRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  img1: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 5,
  },
  textContainer: {
    marginHorizontal: 18,
  },
  mainTitle: {
    fontSize: 44,
    lineHeight: 55,
    marginTop: 25,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '500',
    color: '#000000',
  },
  linearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 11,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 11,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 11,
    backgroundColor: '#316FF6',
    borderRadius: 10,
    marginTop: 20
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 19,
    color: '#fff',
    fontWeight: '500',
  },
});

export default LoginPage;
