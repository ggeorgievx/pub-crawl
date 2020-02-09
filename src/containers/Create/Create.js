import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PubsList from '../../components/PubsList/PubsList';

const useStyles = makeStyles({
  create: {
    backgroundColor: 'rgb(36, 36, 36)',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 112px);',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  }
});

const Create = () => {
  const classes = useStyles();
  const [pubs, setPubs] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(true);

  const pubsLimit = 12;

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

  return (
    <div className={classes.create}>
      <PubsList
        pubs={pubs}
        dialogOpen={dialogOpen}
        onDragEndHandler={onDragEndHandler}
        addPubButtonHandler={addPubButtonHandler}
        okayButtonHandler={okayButtonHandler}
        pubsLimit={pubsLimit}
      />
    </div>
  );
};

export default Create;
