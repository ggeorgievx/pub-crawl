import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import Typography from '@material-ui/core/Typography';
import constants from '../../constants';

const CustomMarker = (props) => {
  const [infoMarkerOpen, setInfoMarkerOpen] = useState(false);

  const onMouseOverHandler = () => {
    setInfoMarkerOpen(() => {
      return true;
    });
  };
  const onMouseOutHandler = () => {
    setInfoMarkerOpen(() => {
      return false;
    });
  };

  const icon = {
    url: constants.PUB_MARKER_BASE64
  };

  if (props.pubMarkersInfoLength > 1) {
    if (props.index === 0) {
      icon.url = constants.FIRST_MARKER_BASE64;
    } else if (props.index === props.pubMarkersInfoLength - 1) {
      icon.url = constants.LAST_MARKER_BASE64;
    }
  }

  return (
    <Marker
      position={props.location}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      icon={icon}
    >
      {infoMarkerOpen && (
        <InfoWindow>
          <Typography variant="h6" component="h2">
            {props.name}
          </Typography>
        </InfoWindow>
      )}
    </Marker>
  );
};

CustomMarker.propTypes = forbidExtraProps({
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  pubMarkersInfoLength: PropTypes.number.isRequired
});

export default CustomMarker;
