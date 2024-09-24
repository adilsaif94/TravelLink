import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

const VideoCallScreen = ({ route,navigation }) => {
  // Destructure params from route
  const { name, roomNo } = route.params || {}; // Use a fallback to avoid errors if params are undefined

  return (
    <View style={styles.container}>
    <ZegoUIKitPrebuiltCall
        appID={appID}
        appSign={'appSign'}
        userID={name + 'userID'} // userID can be something like a phone number or the user id on your own user system. 
        userName={name}
        callID={roomNo} // callID can be any unique string. 

        config={{
            // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onCallEnd: (callID, reason, duration) => { navigation.navigate('VideoCallHomeScreen') },
        }}
    />
</View>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
  },
});

