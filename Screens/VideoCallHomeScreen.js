import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VideoCallHomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [roomNo, setRoomNo] = useState('');

  const handleJoinRoom = () => {
    // Navigate to the VideoCallScreen with name and room number
    if (!name || !roomNo) {
      Alert.alert('Please Enter Name And Room No.');
    } else {
      navigation.navigate('VideoCallScreen', { name, roomNo });
    }
    console.log('Name:', name, 'Room No:', roomNo);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../Assets/images/videoCall.jpg')} />
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="meeting-room" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter room number"
          value={roomNo}
          onChangeText={setRoomNo}
          keyboardType="numeric"
        />
      </View>

      <LinearGradient colors={['#F368FF', '#ADBAFD']} style={styles.linearButton}>
        <TouchableOpacity style={styles.googleButton} onPress={handleJoinRoom}>
          <Text style={styles.buttonText}>Join Room</Text>
          <Icon name="videocam" size={20} style={styles.buttonIcon} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default VideoCallHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 30,
    marginBottom: 45,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 17,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  icon: {
    padding: 10,
    color: '#666',
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 17,
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
  buttonText: {
    fontSize: 19,
    color: '#fff',
    fontWeight: '500',
  },
  buttonIcon: {
    marginLeft: 10,
    color: '#fff',
  },
});
