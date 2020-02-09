import React, { memo } from 'react';
import Pub from '../../components/Pub/Pub';
import { ReactComponent as First } from '../../assets/images/first.svg';
import { ReactComponent as Last } from '../../assets/images/last.svg';

const InnerPubList = (props) => {
  const iconsForIndex = (index) => {
    return props.pubs.length === 1 ? [First, Last] :
      index === 0 ? [First] :
        index === props.pubs.length - 1 ? [Last] : [];
  };

  const pubElements = props.pubs.map((pub, index) => (
    <Pub
      key={pub.id}
      draggableId={pub.id}
      index={index}
      icons={iconsForIndex(index)}
    />
  ));

  return (pubElements);
};

export default memo(InnerPubList);
