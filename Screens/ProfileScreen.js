import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SendSMS from 'react-native-sms';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });

  const logout = async () => {
    try {
      const currentUser = auth().currentUser;

      // Check if a user is signed in
      if (!currentUser) {
        Alert.alert('No User', 'No user is currently signed in.');
        return;
      }

      // Proceed with Firebase sign-out
      await auth().signOut();

      // Clear AsyncStorage
      await AsyncStorage.removeItem('user');

      // Navigate to LoginPage
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });

      Alert.alert('Logged out successfully');
    } catch (error) {
      // Check if the error is related to no current user
      if (error.code === 'auth/no-current-user') {
        Alert.alert('No User', 'No user is currently signed in.');
      } else {
        // Handle other errors
        Alert.alert('Logout Error', error.message || 'Failed to log out');
      }
      console.log('Logout Error:', error);
    }
  };


  useEffect(() => {
    // Fetch user data from Firebase or AsyncStorage
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;

      if (currentUser) {
        // If the user is authenticated, use Firebase user info
        setUserData({
          name: currentUser.displayName || 'Unknown User',
          email: currentUser.email || 'No Email',
          profilePicture: currentUser.photoURL || require('../Assets/images/img1.png'), // fallback image
        });
      } else {
        // If not authenticated, use AsyncStorage to get the user info
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData({
            name: parsedUser.name || 'Unknown User',
            email: parsedUser.email || 'No Email',
            profilePicture: parsedUser.photo || require('../Assets/images/img1.png'), // fallback image
          });
        }
      }
    };

    fetchUserData();
  }, []);

  // Request SMS permission for Android (only for devices running Android 6.0 and above)
  const requestSMSPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'SMS Permission',
            message: 'App needs access to send SOS messages',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // No permission needed for iOS
  };

  // Function to send the SOS message
  const sendSOSMessage = async () => {
    const permissionGranted = await requestSMSPermission();

    if (permissionGranted) {
      SendSMS.send({
        body: 'SOS! I need help. Please contact me immediately.',
        recipients: ['+11234567890'], // Update with actual phone number
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true, // For Android 6.0 and above
      }, (completed, cancelled, error) => {
        if (completed) {
          Alert.alert('Success', 'SOS message sent successfully!');
        } else if (cancelled) {
          Alert.alert('Cancelled', 'SOS message sending was cancelled.');
        } else if (error) {
          Alert.alert('Error', `Failed to send SOS message. Error: ${error}`);
          console.log('Error:', error); // Log the error to get more details
        }
      });
    } else {
      Alert.alert('Permission Denied', 'App needs SMS permission to send SOS message.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={userData && userData.profilePicture ? { uri: userData.profilePicture } : require('../Assets/images/videoCall.jpg')} />
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileEmail}>{userData.email}</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { marginRight: 15 }]}>
            <Text style={styles.statLabel}>Rating</Text>
            <View style={styles.statValueContainer}>
              <AntDesign name='star' color='#f7e87b' size={14} />
              <Text style={styles.statValue}>4.82</Text>
            </View>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Trip</Text>
            <View style={styles.statValueContainer}>
              <MaterialIcons name='flight-takeoff' color='green' size={17} />
              <Text style={styles.statValue}>21</Text>
            </View>
          </View>
        </View>

      </View>
      <Text style={styles.sectionTitle}>Account Settings</Text>

      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <MaterialIcons name='sos' size={20} color='#000000' />
        </View>
        <TouchableOpacity onPress={sendSOSMessage} style={styles.settingContent}>
          <Text style={styles.settingText}>Emergency SOS 🚨</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <Ionicons name='notifications' size={20} color='#000000' />
        </View>
        <TouchableOpacity style={styles.settingContent}>
          <Text style={styles.settingText}>Notifications</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <Ionicons name='settings' size={20} color='#000000' />
        </View>
        <TouchableOpacity style={styles.settingContent}>
          <Text style={styles.settingText}>Settings</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <Ionicons name='star' size={20} color='#000000' />
        </View>
        <TouchableOpacity style={styles.settingContent}>
          <Text style={styles.settingText}>Saved Places</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <Ionicons name='wallet' size={20} color='#000000' />
        </View>
        <TouchableOpacity style={styles.settingContent}>
          <Text style={styles.settingText}>Payment Method</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <Ionicons name='car' size={20} color='#000000' />
        </View>
        <TouchableOpacity style={styles.settingContent}>
          <Text style={styles.settingText}>Plane My Trips</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <MaterialIcons name='discount' size={20} color='#000000' />
        </View>
        <TouchableOpacity style={styles.settingContent}>
          <Text style={styles.settingText}>Refer & Get Discount</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
      <View style={[styles.settingRow, { marginBottom: 15 }]}>
        <View style={styles.iconContainer}>
          <MaterialIcons name='logout' size={20} color='red' />
        </View>
        <TouchableOpacity onPress={logout} style={styles.settingContent}>
          <Text style={styles.settingText}>Logout</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  profileName: {
    fontWeight: '500',
    fontSize: 18,
    color: '#000000',
    marginTop: 8,
  },
  profileEmail: {
    fontSize: 12,
    fontWeight: '500',
  },
  editProfileButton: {
    backgroundColor: '#eeeaeb',
    borderRadius: 8,
    marginTop: 10,
  },
  editProfileText: {
    fontSize: 12,
    color: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  statBox: {
    paddingVertical: 10,
    borderColor: '#d6d6d1',
    borderWidth: 0.5,
    alignItems: 'center',
    flex: 1,
    borderRadius: 8,
  },
  statLabel: {
    fontWeight: '500',
  },
  statValueContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  statValue: {
    color: '#000000',
    fontWeight: '800',
    marginLeft: 8,
  },
  sectionTitle: {
    fontWeight: '500',
    color: '#000000',
    fontSize: 20,
    marginTop: 25,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: '#e3e2e2',
    borderRadius: 100,
    padding: 10,
  },
  settingContent: {
    flex: 1,
    marginLeft: 15,
  },
  settingText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#f3efef',
    marginTop: 10,
    width: '100%',
  },
});
