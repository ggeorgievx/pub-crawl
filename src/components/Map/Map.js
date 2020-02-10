import React, { memo } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs
} from 'react-google-maps';
import style from './style';

const Map = () => {
  return (
    <GoogleMap
      zoom={12}
      center={{ lat: 42.698334, lng: 23.319941 }}
      options={{
        styles: style,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }}
    />
  );
};

export default memo(withScriptjs(withGoogleMap(Map)), () => {
  return true;
});
