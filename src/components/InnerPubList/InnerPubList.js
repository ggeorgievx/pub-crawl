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
      key={`${index}-${pub.place_id}`}
      draggableId={`${index}-${pub.place_id}`}
      index={index}
      icon={iconForIndex(index)}
      formatted_address={pub.formatted_address}
      location={pub.location}
      name={pub.name}
      weekday_text={pub.weekday_text}
      place_id={pub.place_id}
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
    formatted_address: PropTypes.string.isRequired,
    location: PropTypes.exact({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    weekday_text: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.string).isRequired
    ]).isRequired,
    place_id: PropTypes.string.isRequired,
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
