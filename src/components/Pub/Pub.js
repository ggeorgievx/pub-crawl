import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  card: {
    width: '480px',
    '@media (max-width:850px)': {
      width: '280px'
    },
    backgroundColor: 'rgb(46, 42, 50)',
    color: 'rgb(255,255,255)',
    marginBottom: '6px',
    // Prevent the user from selecting the text.
    userSelect: 'none',
    msUserSelect: 'none',
    msTouchSelect: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default'
  }
});

const Pub = (props) => {
  const classes = useStyles();

  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided) => (
        <Card
          className={classes.card}
          elevation={5}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent>
            <Typography noWrap variant="h5" component="h2">
              {props.draggableId}. Crafter
            </Typography>
            <Typography color="secondary">
              3 am - 10 pm
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default Pub;
