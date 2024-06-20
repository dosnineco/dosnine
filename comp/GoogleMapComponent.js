// components/GoogleMapComponent.js

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from './GoogleMapComponent.module.css';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 51.505, // Replace with your business's latitude
  lng: -0.09 // Replace with your business's longitude
};

const GoogleMapComponent = () => {
  return (
    <div className={styles.mapContainer}>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
