import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PubsList from '../../components/PubsList/PubsList';
import Map from '../../components/Map/Map';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

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
    margin: '20px 20px 30px 20px',
    '@media (max-width:850px)': {
      margin: '10px'
    }
  },
  map: {
    height: '100%',
    width: '100%'
  },
  dialog: {
    // Prevent the user from selecting the text.
    userSelect: 'none',
    msUserSelect: 'none',
    msTouchSelect: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default'
  },
  dialogPaper: {
    backgroundColor: 'rgb(20, 20, 20)',
    color: 'rgb(255, 255, 255)'
  },
  disablePointerEvents: {
    pointerEvents: 'none'
  },
  enablePointerEvents: {
    pointerEvents: 'auto'
  }
});

const Create = () => {
  const classes = useStyles();

  const [pubs, setPubs] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);

  const pubsLimit = process.env.NODE_ENV === 'production' ? 12 : 4;
  const googleMapUrl = 1 ?
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places` :
    'https://maps.googleapis.com/maps/api/js?libraries=places';

  const dialogTitle = pubsLimit === 12 ?
    `The Golden Mile consists of ${pubsLimit} pubs. You can't add any more pubs, drunkard! 🍻` :
    `You reached the limit of ${pubsLimit} pubs, drunkard! 🍻`;

  const okayButtonHandler = () => {
    setDialogOpen(() => {
      return false;
    });
  };

  const onDragStartHandler = () => {
    document.body.className = classes.disablePointerEvents;
  };
  const onDragEndHandler = (result) => {
    document.body.className = classes.enablePointerEvents;

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
    setAutocompleteOpen(() => {
      return true;
    });
  };
  const onPlaceSelected = (place) => {
    setPubs((oldPubs) => {
      const newPubs = [
        ...oldPubs
      ];

      newPubs.push({
        id: place.place_id,
        name: place.place_id
      });

      if (newPubs.length === pubsLimit) {
        setDialogOpen(() => {
          return true;
        });
      }

      return newPubs;
    });

    setAutocompleteOpen(() => {
      return false;
    });
  };
  const autocompleteKeyPressed = (event) => {
    if (event.key === 'Escape') {
      setAutocompleteOpen(() => {
        return false;
      });
    }
  };

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
        pubsLimit={pubsLimit}
        onDragStartHandler={onDragStartHandler}
        onDragEndHandler={onDragEndHandler}
        addPubButtonHandler={addPubButtonHandler}
        autocompleteOpen={autocompleteOpen}
        onPlaceSelected={onPlaceSelected}
        autocompleteKeyPressed={autocompleteKeyPressed}
      />
      {dialogOpen &&
        <Dialog
          className={classes.dialog}
          open={dialogOpen}
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogActions>
            <Button
              onClick={okayButtonHandler}
              variant="contained"
              color="primary"
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      }
    </div>
  );
};

export default Create;
