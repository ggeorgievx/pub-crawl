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
      zoom={props.zoom}
      center={props.mapCenter}
      options={{
        styles: style,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
        zoomControl: false,
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
              strokeColor: 'rgb(243, 0, 77)',
              strokeOpacity: .3
            }
          }}
        />
      )}
    </GoogleMap>
  );
};

Map.propTypes = forbidExtraProps({
  pubMarkersInfo: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    location: PropTypes.exact({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  }).isRequired).isRequired,
  zoom: PropTypes.number.isRequired,
  mapCenter: PropTypes.exact({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  directions: PropTypes.object
});

export default memo(
  withScriptjs(withGoogleMap(Map)), (prevProps, newProps) => {
    const prevPubMarkersInfo = JSON.stringify(prevProps.pubMarkersInfo);
    const newPubMarkersInfo = JSON.stringify(newProps.pubMarkersInfo);

    const prevMapCenter = JSON.stringify(prevProps.mapCenter);
    const newMapCenter = JSON.stringify(newProps.mapCenter);

    const prevContainerElementClassName = prevProps.containerElement.props.className;
    const newContainerElementClassName = newProps.containerElement.props.className;

    // Only rerender the Map component when the pubMarkersInfo, mapCenter or
    // containerElement.className change.
    return prevPubMarkersInfo === newPubMarkersInfo &&
      prevMapCenter === newMapCenter &&
      prevContainerElementClassName === newContainerElementClassName;
  }
);
