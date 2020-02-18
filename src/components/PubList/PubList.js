import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import InnerPubList from '../InnerPubList/InnerPubList';
import AddPub from '../AddPub/AddPub';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import constants from '../../constants';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'rgb(33, 33, 33)',
    padding: '24px 30px 30px 30px',
    maxHeight: 'calc(100% - 54px)',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width:1200px)': {
      maxHeight: 'calc(56% - 50px)',
      padding: '24px 20px 30px 20px'
    }
  },
  list: {
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, .3)',
      borderRadius: '20px'
    },
    '@media (max-width:1200px)': {
      padding: '0px'
    }
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
  }
});

const PubList = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {props.pubs.length > 0 &&
        <List className={classes.list}>
          <DragDropContext
            onDragStart={props.dragStartHandler}
            onDragEnd={props.dragEndHandler}
          >
            <Droppable droppableId="0">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <InnerPubList
                      pubs={props.pubs}
                      removePubButtonHandler={props.removePubButtonHandler}
                      sliderChangeHandler={props.sliderChangeHandler}
                    />
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
        addPubButtonHandler={props.addPubButtonHandler}
        autocompleteOpen={props.autocompleteOpen}
        placeSelectedHandler={props.placeSelectedHandler}
        autocompleteKeyDownHandler={props.autocompleteKeyDownHandler}
      />
      {props.dialogOpen && (
        <Dialog
          className={classes.dialog}
          open={props.dialogOpen}
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogTitle>{constants.DIALOG_TITLE}</DialogTitle>
          <DialogActions>
            <Button
              onClick={props.okayButtonHandler}
              variant="contained"
              color="primary"
            >
              Okay
                </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
};

PubList.propTypes = forbidExtraProps({
  dragStartHandler: PropTypes.func.isRequired,
  dragEndHandler: PropTypes.func.isRequired,
  pubs: PropTypes.arrayOf(PropTypes.exact({
    formattedAddress: PropTypes.string.isRequired,
    location: PropTypes.exact({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    weekdayText: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
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
  addPubButtonHandler: PropTypes.func.isRequired,
  autocompleteOpen: PropTypes.bool.isRequired,
  placeSelectedHandler: PropTypes.func.isRequired,
  autocompleteKeyDownHandler: PropTypes.func.isRequired,
  removePubButtonHandler: PropTypes.func.isRequired,
  sliderChangeHandler: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  okayButtonHandler: PropTypes.func.isRequired
});

export default PubList;
