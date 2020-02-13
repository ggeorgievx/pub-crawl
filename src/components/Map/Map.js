import React, { memo } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';
import style from './style';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import CustomMarker from '../../containers/CustomMarker/CustomMarker';

const Map = (props) => {
  return (
    <GoogleMap
      zoom={12}
      defaultCenter={{ lat: 42.698334, lng: 23.319941 }}
      options={{
        styles: style,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
        minZoom: 5,
        maxZoom: 20
      }}
    >
      {props.pubMarkersInfo.map((pubMarkerInfo, index) => (
        <CustomMarker
          key={index}
          name={pubMarkerInfo.name}
          location={pubMarkerInfo.location}
          index={index}
          pubMarkersInfoLength={props.pubMarkersInfo.length}
        />
      ))}
      {props.directions && (
        <DirectionsRenderer
          directions={props.directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              clickable: false,
              strokeColor: '#f3004d',
              strokeOpacity: .3
            }
          }}
        />
      )}
    </GoogleMap>
  );
};

Map.propTypes = forbidExtraProps({
  pubMarkersInfo: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  }).isRequired).isRequired
});

export default withScriptjs(withGoogleMap(Map));
