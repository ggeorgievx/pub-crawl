import React, { memo } from 'react';
import Pub from '../../components/Pub/Pub';
import { ReactComponent as First } from '../../assets/images/first.svg';
import { ReactComponent as Last } from '../../assets/images/last.svg';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const InnerPubList = (props) => {
  const iconsForIndex = (index) => {
    return props.pubs.length === 1 ? [First, Last] :
      index === 0 ? [First] :
        index === props.pubs.length - 1 ? [Last] : [];
  };

  const pubElements = props.pubs.map((pub, index) => (
    <Pub
      key={pub.id}
      draggableId={`${index}-${pub.id}`}
      name={pub.name}
      index={index}
      icons={iconsForIndex(index)}
    />
  ));

  return (pubElements);
};

InnerPubList.propTypes = forbidExtraProps({
  pubs: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
});

export default memo(InnerPubList);
