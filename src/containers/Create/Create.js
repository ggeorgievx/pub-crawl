import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PubsList from '../../components/PubsList/PubsList';
import Map from '../../components/Map/Map';

const useStyles = makeStyles({
  create: {
    backgroundColor: 'rgb(36, 36, 36)',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 112px);',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    height: '40%',
    width: 'calc(100% - 40px);',
    margin: '30px 20px 30px 20px',
    '@media (max-width:850px)': {
      margin: '10px'
    }
  },
  map: {
    height: '100%',
    width: '100%'
  }
});

const Create = () => {
  const classes = useStyles();

  const [pubs, setPubs] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(true);

  const pubsLimit = process.env.NODE_ENV === 'production' ? 12 : 8;
  const onDragEndHandler = (result) => {
    const { destination, source } = result;

    // Dropped outside.
    if (!destination) {
      return;
    }

    const destinationIndex = destination.index;
    const sourceIndex = source.index;

    // Dropped at the same position.
    if (destinationIndex === sourceIndex) {
      return;
    }

    setPubs((oldPubs) => {
      const newPubs = [
        ...oldPubs
      ];

      const [deletedItem] = newPubs.splice(sourceIndex, 1);
      newPubs.splice(destinationIndex, 0, deletedItem);

      return newPubs;
    });
  };
  const addPubButtonHandler = () => {
    setPubs((oldPubs) => {
      const newPubs = [
        ...oldPubs
      ];

      if (oldPubs.length < pubsLimit) {
        newPubs.push({
          id: `${oldPubs.length}`,
          name: `${oldPubs.length}.Crafter`
        });
      }

      return newPubs;
    });
  };
  const okayButtonHandler = () => {
    setDialogOpen(false);
  };

  const googleMapUrl = process.env.NODE_ENV === 'production' ?
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}` :
    'https://maps.googleapis.com/maps/api/js';
  const loadingElement = (<div className={classes.container} />);
  const containerElement = (<div className={classes.container} />);
  const mapElement = (<div className={classes.map} />);

  return (
    <div className={classes.create}>
      <Map
        googleMapURL={googleMapUrl}
        loadingElement={loadingElement}
        containerElement={containerElement}
        mapElement={mapElement}
      />
      <PubsList
        pubs={pubs}
        dialogOpen={dialogOpen}
        pubsLimit={pubsLimit}
        onDragEndHandler={onDragEndHandler}
        addPubButtonHandler={addPubButtonHandler}
        okayButtonHandler={okayButtonHandler}
      />
    </div>
  );
};

export default Create;
