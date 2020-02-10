import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import InnerPubsList from '../../components/InnerPubsList/InnerPubsList';
import AddPub from '../AddPub/AddPub';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const useStyles = makeStyles({
  backgroundPaper: {
    backgroundColor: 'rgb(20, 20, 20)',
    padding: '22px 30px 30px 30px',
    maxHeight: 'calc(52% - 50px);',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width:850px)': {
      maxHeight: 'calc(56% - 50px);'
    }
  },
  list: {
    overflowY: 'auto',
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
  }
});

const PubsList = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.backgroundPaper} elevation={10}>
      {props.pubs.length > 0 &&
        <List className={classes.list}>
          <DragDropContext
            onDragStart={props.onDragStartHandler}
            onDragEnd={props.onDragEndHandler}
          >
            <Droppable droppableId="0">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <InnerPubsList pubs={props.pubs} />
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </List>
      }
      <AddPub
        pubsLength={props.pubs.length}
        pubsLimit={props.pubsLimit}
        addPubButtonHandler={props.addPubButtonHandler}
        autocompleteOpen={props.autocompleteOpen}
        onPlaceSelected={props.onPlaceSelected}
        autocompleteKeyPressed={props.autocompleteKeyPressed}
      />
    </Paper>
  );
};

PubsList.propTypes = forbidExtraProps({
  onDragStartHandler: PropTypes.func.isRequired,
  onDragEndHandler: PropTypes.func,
  pubs: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  pubsLimit: PropTypes.number.isRequired,
  addPubButtonHandler: PropTypes.func.isRequired,
  autocompleteOpen: PropTypes.bool.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  autocompleteKeyPressed: PropTypes.func.isRequired
});

export default PubsList;
