import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const MapScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState({
    latitude: 15.2993,
    longitude: 74.1240,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8,
  });
  const [marker, setMarker] = useState({
    latitude: 15.2993,
    longitude: 74.1240,
  });

  const mapRef = useRef(null); // Reference to MapView

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    } else {
      StatusBar.setBarStyle('default');
      StatusBar.setBackgroundColor('#F368FF');
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);

  const handleSearch = async () => {
    if (!searchText) {
      Alert.alert('Please enter a location to search');
      return;
    }

    try {
      // Use Nominatim API for geocoding
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchText)}&format=json&limit=1`
      );

      if (response.data.length > 0) {
        const location = response.data[0];
        const newRegion = {
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
          latitudeDelta: 0.8, // Adjust as needed
          longitudeDelta: 0.8, // Adjust as needed
        };

        // Update map region and marker
        setRegion(newRegion);
        setMarker({
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
        });

        // Animate the map to the new region
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 2000); // Animate to new region with a 1-second duration
        }
      } else {
        Alert.alert('Location not found', 'Please enter a valid location');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while searching for the location');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        ref={mapRef} // Attach the reference
        region={region} // Ensure region is controlled
        showsUserLocation={true} // Optional: Shows the user's current location
      >
        <Marker coordinate={marker} title="Searched Location" />
      </MapView>

      {/* Search Bar and Icon Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    elevation: 3,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 18,
  },
});
