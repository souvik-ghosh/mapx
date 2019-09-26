import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import markersData from './coordinates';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
});

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
// Bangalore
const LATITUDE = 12.9716;
const LONGITUDE = 77.5946;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function Mapx() {
  const region = {
    longitude: LONGITUDE,
    latitude: LATITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };

  const [markers, setMarkers] = useState(markersData);

  const onMapPress = e => {
    setMarkers([
      ...markers,
      {
        coordinate: e.nativeEvent.coordinate,
        key: id++,
        color: randomColor()
      }
    ]);
  };

  const handlePress = marker => {
    console.log({ marker });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={onMapPress} initialRegion={region}>
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            pinColor={marker.color}
            onPress={() => handlePress(marker)}
          />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setMarkers([])} style={styles.bubble}>
          <Text>Tap to create a marker of random color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Mapx;
