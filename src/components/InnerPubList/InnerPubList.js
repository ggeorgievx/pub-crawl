import React, { memo } from 'react';
import Pub from '../../containers/Pub/Pub';
import { ReactComponent as First } from '../../assets/images/first.svg';
import { ReactComponent as Last } from '../../assets/images/last.svg';
import { ReactComponent as PubMarker } from '../../assets/images/pub-marker.svg';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const InnerPubList = (props) => {
  const iconForIndex = (index) => {
    if (props.pubs.length > 1) {
      if (index === 0) {
        return First;
      }
      if (index === props.pubs.length - 1) {
        return Last;
      }
    }

    return PubMarker;
  };

  const pubElements = props.pubs.map((pub, index) => (
    <Pub
      key={`${index}-${pub.placeId}`}
      draggableId={`${index}-${pub.placeId}`}
      index={index}
      icon={iconForIndex(index)}
      formattedAddress={pub.formattedAddress}
      location={pub.location}
      name={pub.name}
      weekdayText={pub.weekdayText}
      placeId={pub.placeId}
      rating={pub.rating}
      duration={pub.duration}
      removePubButtonHandler={() => {
        return props.removePubButtonHandler(index);
      }}
      sliderChangeHandler={(value) => {
        return props.sliderChangeHandler(index, value);
      }}
    />
  ));

  return (pubElements);
};

InnerPubList.propTypes = forbidExtraProps({
  pubs: PropTypes.arrayOf(PropTypes.exact({
    formattedAddress: PropTypes.string.isRequired,
    location: PropTypes.exact({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    weekdayText: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.string).isRequired
    ]).isRequired,
    placeId: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    periods: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.string.isRequired
        ).isRequired
      ).isRequired
    ).isRequired
  })).isRequired,
  removePubButtonHandler: PropTypes.func.isRequired,
  sliderChangeHandler: PropTypes.func.isRequired
});

export default memo(InnerPubList);
