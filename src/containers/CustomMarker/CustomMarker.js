import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import Typography from '@material-ui/core/Typography';
import constants from '../../constants';

const CustomMarker = (props) => {
  const [infoMarkerOpen, setInfoMarkerOpen] = useState(false);

  const markerOverHandler = () => {
    setInfoMarkerOpen(() => {
      return true;
    });
  };
  const markerOutHandler = () => {
    setInfoMarkerOpen(() => {
      return false;
    });
  };
  const markerHandler = () => {
    setInfoMarkerOpen((prevInfoMarkerOpen) => {
      return !prevInfoMarkerOpen;
    });
  };

  const icon = {
    url: constants.PUB_MARKER_DEFAULT_BASE64
  };

  if (props.pubMarkersInfoLength > 1) {
    if (props.index === 0) {
      icon.url = constants.PUB_MARKER_FIRST_BASE64;
    } else if (props.index === props.pubMarkersInfoLength - 1) {
      icon.url = constants.PUB_MARKER_LAST_BASE64;
    } else {
      icon.url = constants[`PUB_MARKER_${props.index + 1}_BASE64`];
    }
  }

  return (
    <Marker
      position={props.location}
      onClick={markerHandler}
      onMouseOver={markerOverHandler}
      onMouseOut={markerOutHandler}
      icon={icon}
      animation={window.google.maps.Animation.DROP}
    >
      {infoMarkerOpen && (
        <InfoWindow>
          <Typography variant="h6">
            {props.name}
          </Typography>
        </InfoWindow>
      )}
    </Marker>
  );
};

CustomMarker.propTypes = forbidExtraProps({
  name: PropTypes.string.isRequired,
  location: PropTypes.exact({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  pubMarkersInfoLength: PropTypes.number.isRequired
});

export default CustomMarker;
