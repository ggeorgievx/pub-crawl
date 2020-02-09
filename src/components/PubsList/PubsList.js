import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import Pub from '../../components/Pub/Pub';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { ReactComponent as First } from '../../assets/images/first.svg';
import { ReactComponent as Last } from '../../assets/images/last.svg';

const useStyles = makeStyles({
  backgroundPaper: {
    backgroundColor: 'rgb(20, 20, 20)',
    padding: '30px',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column'
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
  container: {
    pointerEvents: 'none'
  },
  button: {
    width: '480px',
    '@media (max-width:850px)': {
      width: '280px'
    },
    marginTop: '6px'
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

const PubsList = (props) => {
  const classes = useStyles();

  const dialogTitle = props.pubsLimit === 12 ?
    `The Golden Mile consists of ${props.pubsLimit} pubs. You can't add more than that.` :
    `You can't add more than ${props.pubsLimit} pubs.`;

  const addPubButtonElement = props.pubs.length < props.pubsLimit ?
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      size="large"
      endIcon={<AddCircleOutlineIcon />}
      onClick={props.addPubButtonHandler}
    >
      Add Pub
  </Button> :
    <Dialog
      className={classes.dialog}
      open={props.dialogOpen}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogActions>
        <Button
          onClick={props.okayButtonHandler}
          variant="contained"
          color="primary"
        >
          Okay
    </Button>
      </DialogActions>
    </Dialog>;

  return (
    <Paper className={classes.backgroundPaper} elevation={10}>
      <List className={classes.list}>
        <DragDropContext onDragEnd={props.onDragEndHandler}>
          <Droppable droppableId="0">
            {(provided, snapshot) => {
              const droppableColumnClassName =
                snapshot.isDraggingOver ? classes.container : '';

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

              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={droppableColumnClassName}
                >
                  {pubElements}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </List>
      {addPubButtonElement}
    </Paper>
  );
};

export default PubsList;
