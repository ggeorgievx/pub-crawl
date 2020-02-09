import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import Pub from '../../components/Pub/Pub';

const useStyles = makeStyles({
  create: {
    backgroundColor: 'rgb(36, 36, 36)',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 112px);',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  paper: {
    backgroundColor: 'rgb(20, 20, 20)',
    padding: '30px',
    maxHeight: '90%',
    display: 'flex'
  },
  list: {
    width: '500px',
    overflowY: 'auto',
    padding: '0px',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.3)',
      borderRadius: '20px'
    },
    '@media (max-width:850px)': {
      width: '300px'
    }
  },
  addButton: {
    width: '480px',
    '@media (max-width:850px)': {
      width: '280px'
    }
  }
});

const Create = () => {
  const classes = useStyles();
  const [pubs, setPubs] = useState([]);

  const pubsLimit = 12;

  const onDragEndHandler = (result) => {
    const { destination, source } = result;

    // Dropped outside.
    if (!destination) {
      return;
    }

    const { index: destinationIndex } = destination;
    const { index: sourceIndex } = source;

    // Dropped at the same position.
    if (destinationIndex === sourceIndex) {
      return;
    }

    const newPubs = [
      ...pubs
    ];

    const [deletedItem] = newPubs.splice(sourceIndex, 1);
    newPubs.splice(destinationIndex, 0, deletedItem);

    setPubs(newPubs);
  };

  const addPubButtonHandler = () => {
    setPubs((prevPubs) => {
      const newPubs = [
        ...prevPubs
      ];

      if (prevPubs.length < pubsLimit) {
        newPubs.push({
          id: `${prevPubs.length}`,
          name: `${prevPubs.length}.Crafter`
        });
      }

      return newPubs;
    });
  };

  return (
    <div className={classes.create}>
      <Paper className={classes.paper} elevation={10}>
        <List className={classes.list}>
          <DragDropContext onDragEnd={onDragEndHandler}>
            <Droppable droppableId="0">
              {(provided) => {
                const pubElements = pubs.map((pub, index) => (
                  <Pub key={pub.id} draggableId={pub.id} index={index} />
                ));

                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {pubElements}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
          {
            pubs.length < pubsLimit ?
              <Button
                className={classes.addButton}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<AddCircleOutlineIcon />}
                onClick={addPubButtonHandler}
              >
                Add Pub
              </Button>
              : null}
        </List>
      </Paper>
    </div>
  );
};

export default Create;
