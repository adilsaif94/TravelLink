import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {

  const [userData, setUserData] = useState({
    name: '',
  });

  useEffect(() => {
    // Fetch user data from Firebase or AsyncStorage
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;

      if (currentUser) {
        // If the user is authenticated, use Firebase user info
        setUserData({
          name: currentUser.displayName || 'Unknown User',
        });
      } else {
        // If not authenticated, use AsyncStorage to get the user info
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData({
            name: parsedUser.name || 'Unknown User',
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const places = [
    { id: 1, name: 'Red Fort', image: require('../Assets/images/redfortjpg.jpg') },
    { id: 2, name: 'India Gate', image: require('../Assets/images/indiagate.jpg') },
    { id: 3, name: 'Lotus Temple', image: require('../Assets/images/lotustemple.jpg') },
    { id: 4, name: 'Qutub Minar', image: require('../Assets/images/qutubminar.jpg') },
    { id: 5, name: 'Humayun’s Tomb', image: require('../Assets/images/humayuntomb.jpg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {userData.name},</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ChatApp')}>< Ionicons name='chatbubbles-outline' color='#808080' size={28} /></TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Entypo name="magnifying-glass" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search places"
        />
        <MaterialIcons name="mic" size={20} color="blue" style={styles.icon} />
      </View>

      <ScrollView horizontal={true} style={styles.categoryScroll}>
        <View style={{ marginRight: 15 }}>
          <View style={{ backgroundColor: '#ef6161', borderRadius: 100, }}>
            <Ionicons name="fast-food-outline" size={24} color='#fff' style={{ padding: 17, alignSelf: 'center' }} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 3, fontWeight: '800' }}>Food</Text>
        </View>
        <View style={{ marginRight: 15 }}>
          <View style={{ backgroundColor: '#c37cc4', borderRadius: 100, }}>
            <Ionicons name="wine-outline" size={24} color='#fff' style={{ padding: 17, alignSelf: 'center' }} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 3, fontWeight: '800' }}>Bar</Text>
        </View>
        <View style={{ marginRight: 15 }}>
          <View style={{ backgroundColor: '#a3f081', borderRadius: 100, }}>
            <Ionicons name="location-outline" size={24} color='#fff' style={{ padding: 17, alignSelf: 'center' }} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 3, fontWeight: '800' }}>Landmark</Text>
        </View>
        <View style={{ marginRight: 15 }}>
          <View style={{ backgroundColor: '#81ebf0', borderRadius: 100, }}>
            <MaterialIcons name="directions-bike" size={24} color='#fff' style={{ padding: 17, alignSelf: 'center' }} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 3, fontWeight: '800' }}>Bike</Text>
        </View>
        <View style={{ marginRight: 15 }}>
          <View style={{ backgroundColor: '#ecea3f', borderRadius: 100, }}>
            <MaterialIcons name="shopify" size={24} color='#fff' style={{ padding: 17, alignSelf: 'center' }} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 3, fontWeight: '800' }}>Shopping</Text>
        </View>
        <View style={{}}>
          <View style={{ backgroundColor: '#ec9d3f', borderRadius: 100, }}>
            <MaterialCommunityIcons name="fuel" size={24} color='#fff' style={{ padding: 17, alignSelf: 'center' }} />
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 3, fontWeight: '800' }}>Fuel</Text>
        </View>
      </ScrollView>

      <TouchableOpacity>
        <LinearGradient
          colors={['#F368FF', '#ADBAFD']}
          style={styles.itineraryButton}>
          <MaterialIcons name='travel-explore' color="#fff" size={28} />
          <Text style={styles.itineraryText}>START YOUR ITINERARY</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.popularText}>Popular</Text>

      <View style={styles.imageContainer}>
        {places.map((place) => (
          <View key={place.id} style={styles.imageWrapper}>
            <Image source={place.image} style={styles.image} />
            <Text style={styles.imageName}>{place.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#000',
  },
  location: {
    flexDirection: 'row',
  },
  locationText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 17,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  categoryScroll: {
    marginTop: 5,
  },
  itineraryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  itineraryText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
    marginLeft: 10,
  },
  popularText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20
  },
  imageWrapper: {
    width: '48%', // Adjust this to control spacing between images
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imageName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    color: '#fff'
  },
});

export default HomeScreen;
