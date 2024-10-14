import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { addCoordinate } from '../../../../../../redux/venue';


const VenueLocationPicker = () => {
  const venueCoordinate = useSelector(state => state?.venueSlice?.venueRegistration?.coordinate)

  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch()

  const handleMapPress = (event) => {
    // Get the coordinates from the event
    const { latitude, longitude } = event.nativeEvent.coordinate;
    dispatch(addCoordinate({ latitude, longitude }))
    setSelectedLocation({ latitude, longitude });
  };

  const GOOGLE_API_KEY = "AIzaSyCYS3v8KzdkJ47tevkzLUnMxXODbgeaWsk"
  useEffect(() => {
    if (venueCoordinate?.latitude && venueCoordinate?.longitude) {
      setSelectedLocation(venueCoordinate)
    }
  }, [])

  // 
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 2.0469, // Initial latitude (e.g., Mogadishu)
          longitude: 45.3182, // Initial longitude (e.g., Mogadishu)
          latitudeDelta: 0.0922, // Zoom level
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress} // Detect user tap
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Venue Location"
            description={`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
          />
        )}
      </MapView>
      {/* {selectedLocation && (
        <View style={{ padding: 10 }}>
          <Text>Selected Location:</Text>
          <Text>Latitude: {selectedLocation.latitude}</Text>
          <Text>Longitude: {selectedLocation.longitude}</Text>
        </View>
      )} */}
    </View>
  );
};

export default VenueLocationPicker;
